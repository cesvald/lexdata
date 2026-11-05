import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Simulamos el contexto de Cloudflare: una base D1 falsa y variables de entorno.
const state = vi.hoisted(() => ({
  env: {} as Record<string, unknown>,
  runImpl: null as null | (() => Promise<unknown>),
  bindArgs: [] as unknown[][],
}));

vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: async () => ({ env: state.env }),
}));

import { POST } from "../app/api/lead/route";

const validBody = {
  nombre: "Ana Pérez",
  empresa: "Panadería Los Andes",
  email: "ana@empresa.ec",
  tamano: "11-50",
  interes: "Autogestión guiada",
  consentimiento: true,
  website: "",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function fakeDB() {
  return {
    prepare: (sql: string) => ({
      bind: (...args: unknown[]) => {
        state.bindArgs.push([sql, ...args]);
        return {
          run: () => (state.runImpl ? state.runImpl() : Promise.resolve({ success: true })),
        };
      },
    }),
  };
}

describe("POST /api/lead", () => {
  beforeEach(() => {
    state.env = { DB: fakeDB() };
    state.runImpl = null;
    state.bindArgs = [];
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("guarda un registro válido en D1 y responde ok", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(state.bindArgs).toHaveLength(1);
    const [sql, ...args] = state.bindArgs[0];
    expect(String(sql)).toContain("INSERT INTO leads");
    expect(args).toEqual(["Ana Pérez", "Panadería Los Andes", "ana@empresa.ec", "11-50", "Autogestión guiada"]);
  });

  it("rechaza un registro sin nombre de empresa", async () => {
    const res = await POST(makeRequest({ ...validBody, empresa: "   " }));
    expect(res.status).toBe(400);
    expect(state.bindArgs).toHaveLength(0);
  });

  it("rechaza un correo inválido sin guardar nada", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "no-es-correo" }));
    expect(res.status).toBe(400);
    expect(state.bindArgs).toHaveLength(0);
  });

  it("rechaza un tamaño de empresa que no está en la lista", async () => {
    const res = await POST(makeRequest({ ...validBody, tamano: "999" }));
    expect(res.status).toBe(400);
    expect(state.bindArgs).toHaveLength(0);
  });

  it("rechaza un plan que no existe", async () => {
    const res = await POST(makeRequest({ ...validBody, interes: "Plan gratis infinito" }));
    expect(res.status).toBe(400);
  });

  it("exige el consentimiento de privacidad", async () => {
    const res = await POST(makeRequest({ ...validBody, consentimiento: false }));
    expect(res.status).toBe(400);
    expect(state.bindArgs).toHaveLength(0);
  });

  it("acepta cada uno de los planes ofrecidos", async () => {
    const planes = [
      "Autogestión guiada",
      "Revisión de documentos por DPO",
      "DPO como servicio",
      "Evaluación gratuita",
      "Aún no sé",
    ];
    for (const interes of planes) {
      const res = await POST(makeRequest({ ...validBody, interes }));
      expect(res.status, interes).toBe(200);
    }
    expect(state.bindArgs).toHaveLength(planes.length);
  });

  it("rechaza el nombre antiguo del plan de DPO que ya no se ofrece", async () => {
    const res = await POST(makeRequest({ ...validBody, interes: "Consultoría y aprobación por DPO" }));
    expect(res.status).toBe(400);
  });

  it("rechaza nombre vacío o solo espacios", async () => {
    const res = await POST(makeRequest({ ...validBody, nombre: "   " }));
    expect(res.status).toBe(400);
  });

  it("rechaza un cuerpo que no es JSON", async () => {
    const req = new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{no json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("anti-bots: si el campo oculto tiene texto, responde ok pero no guarda", async () => {
    const res = await POST(makeRequest({ ...validBody, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(state.bindArgs).toHaveLength(0);
  });

  it("si D1 falla, responde 500 con mensaje claro", async () => {
    state.runImpl = () => Promise.reject(new Error("D1 down"));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/No pudimos guardar/);
  });

  it("sin claves de Resend no intenta enviar correo y aun así guarda", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(state.bindArgs).toHaveLength(1);
  });

  it("con Resend configurado envía el aviso con el correo del lead como respuesta", async () => {
    state.env = {
      ...state.env,
      RESEND_API_KEY: "re_test",
      LEAD_TO_EMAIL: "dueno@dataprivo.com",
      LEAD_FROM_EMAIL: "DataPrivo <leads@dataprivo.com>",
    };
    const fetchSpy = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const payload = JSON.parse((init as RequestInit).body as string);
    expect(payload.reply_to).toBe("ana@empresa.ec");
    expect(payload.to).toEqual(["dueno@dataprivo.com"]);
    expect(payload.subject).toContain("Ana Pérez");
  });

  it("si el envío de correo falla, el registro igual queda guardado", async () => {
    state.env = {
      ...state.env,
      RESEND_API_KEY: "re_test",
      LEAD_TO_EMAIL: "dueno@dataprivo.com",
      LEAD_FROM_EMAIL: "DataPrivo <leads@dataprivo.com>",
    };
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    expect(state.bindArgs).toHaveLength(1);
  });

  it("escapa HTML en el aviso para evitar inyección", async () => {
    state.env = {
      ...state.env,
      RESEND_API_KEY: "re_test",
      LEAD_TO_EMAIL: "dueno@dataprivo.com",
      LEAD_FROM_EMAIL: "DataPrivo <leads@dataprivo.com>",
    };
    const fetchSpy = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);

    await POST(makeRequest({ ...validBody, nombre: "<script>alert(1)</script>" }));
    const payload = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
    expect(payload.html).not.toContain("<script>");
    expect(payload.html).toContain("&lt;script&gt;");
  });
});
