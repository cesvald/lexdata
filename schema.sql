-- Tabla de leads (D1). Aplicar en remoto:  npx wrangler d1 execute dataprivo-leads --remote --file=schema.sql
-- Aplicar en local:                         npx wrangler d1 execute dataprivo-leads --local  --file=schema.sql
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  tamano TEXT NOT NULL,
  interes TEXT NOT NULL,
  consentimiento INTEGER NOT NULL DEFAULT 1,
  creado_en TEXT NOT NULL DEFAULT (datetime('now'))
);
