# Cardinality PICS - i18N Menu Translation

## Setup
1. Copy `backend/.env.example` to `backend/.env`
2. Run `docker-compose up`

## Architecture
- **Backend**: NestJS with TypeORM. Exposes `/api/v1/lookup/translations/:locale/:module`.
- **Frontend**: Angular 17. Uses a custom `I18nPipe` and `TranslationService` with Signals for real-time UI updates.
- **Database**: PostgreSQL storing `i18n_lookup` table.
