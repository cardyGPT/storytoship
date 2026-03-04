# Elixir i18N Framework

## Setup
1. Run `docker-compose up --build`
2. Seed the database: `curl http://localhost:3000/api/translations/seed`
3. Access Frontend: `http://localhost:4200`

## Features
- Real-time language hot-swapping using Angular Signals.
- Backend localized string retrieval from PostgreSQL.
- Fallback mechanism for missing keys.
- RBAC Menu localization implementation.