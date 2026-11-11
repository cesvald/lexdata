-- Esquema de D1 (base dataprivo-leads).
-- Aplicar en remoto: npx wrangler d1 execute dataprivo-leads --remote --file=schema.sql
-- Aplicar en local:  npx wrangler d1 execute dataprivo-leads --local  --file=schema.sql
-- Nota: si la tabla ya existe, ejecuta solo los ALTER/CREATE nuevos (ver migraciones abajo).
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  tamano TEXT NOT NULL,
  interes TEXT NOT NULL,
  consentimiento INTEGER NOT NULL DEFAULT 1,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  anonimizado_en TEXT,
  empresa TEXT,
  actividad TEXT,
  consulta TEXT,
  acepta_avisos INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS solicitudes_eliminacion (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email_hash TEXT NOT NULL,
  creado_en TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Migraciones ya aplicadas en remoto (2026-11-04):
--   ALTER TABLE leads ADD COLUMN anonimizado_en TEXT;
--   CREATE TABLE solicitudes_eliminacion (...);

-- Migración de la oferta de DPD externo (2026-11-10). APLICAR EN REMOTO ANTES de desplegar
-- el código nuevo (agregar columnas no afecta al código actual):
--   ALTER TABLE leads ADD COLUMN actividad TEXT;
--   ALTER TABLE leads ADD COLUMN consulta TEXT;
--   ALTER TABLE leads ADD COLUMN acepta_avisos INTEGER NOT NULL DEFAULT 0;
-- `interes` pasa a guardar el nivel (Base, Estándar, Complejo, Aún no sé) y `tamano` queda vacío.
