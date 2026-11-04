# DataPrivo — Next.js en Cloudflare Workers

Landing + quiz DPO + formulario de leads que envía un correo a tu bandeja.
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

## 4. Pendientes antes de lanzar

- `NEXT_PUBLIC_WHATSAPP_NUMBER` (ej. `5939XXXXXXXX`) como variable de build para mostrar el botón de WhatsApp; si no se define, el botón se oculta.
- Completar razón social, RUC y dirección en `components/PrivacyButton.tsx`.
- Verificar el correo `contacto@dataprivo.com`.
- Respaldar con fuentes oficiales la sanción a LIGAPRO/FEF y el "1% del volumen de negocio".
