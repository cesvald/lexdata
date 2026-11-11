# DataPrivo — Next.js en Cloudflare Workers

Landing de la oferta de DPD externo (niveles y precios de referencia) + formulario de interés (aviso de apertura y consultas) que guarda en D1 y envía un correo a tu bandeja.
Stack: Next.js 15 (App Router) + Tailwind 4 + OpenNext para Cloudflare.

## 1. Correo (API key)

Cloudflare Workers no permite conexiones SMTP directas, así que el envío usa la
API HTTP de **Resend** (que también ofrece SMTP, pero la API funciona en Workers).

1. Crea cuenta en https://resend.com y genera una **API key**.
2. Verifica tu dominio en Resend (para enviar desde `leads@tudominio.ec`).
   Mientras tanto puedes usar `onboarding@resend.dev`, que solo entrega al correo
   dueño de la cuenta de Resend.
3. Ajusta en `wrangler.jsonc` → `vars`:
   - `LEAD_TO_EMAIL`: donde recibes los leads.
   - `LEAD_FROM_EMAIL`: remitente verificado, p. ej. `DataPrivo <leads@tudominio.ec>`.

## 2. Desarrollo local

```bash
npm install
cp .dev.vars.example .dev.vars   # pega tu RESEND_API_KEY
npm run dev                      # http://localhost:3000
```

## 3. Desplegar en Cloudflare

```bash
npx wrangler login
npx wrangler secret put RESEND_API_KEY   # pega la API key (no queda en el repo)
npm run deploy
```

Para tu dominio: Cloudflare → Workers & Pages → lexdata → Settings → Domains & Routes.

## 4. Antes de fusionar la rama de la oferta de DPD

1. **Migración de D1 (obligatoria, antes de desplegar):** el formulario nuevo guarda `actividad`, `consulta` y
   `acepta_avisos`. Ejecuta los tres `ALTER TABLE` que están al final de `schema.sql` en remoto:
   `npx wrangler d1 execute dataprivo-leads --remote --command "ALTER TABLE leads ADD COLUMN actividad TEXT"` (y los otros dos).
   Agregar columnas no rompe el código que está en producción.
2. `npm install && npm test` en tu equipo (en el entorno de trabajo no se pudieron instalar dependencias).
3. Confirmar que el nombre y la dirección del responsable en `components/PrivacyButton.tsx` coinciden con el RUC.
4. Verificar el correo `contacto@dataprivo.com`.
5. En GTM, crear los disparadores de `clic_cta_hero`, `clic_nivel` y `generate_lead` (parámetros `nivel`, `aviso`, `consulta`).

Pendiente, sin cambios: el quiz (`components/Quiz.tsx`) quedó fuera de la página hasta rehacerlo con criterio legal;
`NEXT_PUBLIC_WHATSAPP_NUMBER` ya no se usa.
