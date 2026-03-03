# Cardinality PICS - i18n RBAC Menu

Reference implementation for dynamic translation using NestJS + Angular Signals.

## Getting Started
1. `docker-compose up`
2. Frontend: `http://localhost:4200`
3. Backend API: `http://localhost:3000/api/lookup/translations?module=rbac&locale=es-ES`

## Features
- Tiered Fallback (DB -> Locale -> English)
- No-refresh UI updates via Angular Signals & ngx-translate
- TypeORM integration for translation lookup service.