# RBAC i18N Implementation

## Setup
1. `docker-compose up --build`
2. Backend will auto-generate tables.
3. Use a SQL client to insert seed data:
```sql
INSERT INTO menus (id, key, "isActive") VALUES (gen_random_uuid(), 'PERMISSIONS_TAB', true);
-- Insert translations for the created menu ID
INSERT INTO menu_translations ("menuId", "langCode", label) VALUES ('<ID>', 'en', 'Permissions');
INSERT INTO menu_translations ("menuId", "langCode", label) VALUES ('<ID>', 'es', 'Permisos');
```

## Architecture
- **Backend:** NestJS + TypeORM. Localizes strings based on `Accept-Language` header.
- **Frontend:** Angular 17+ Reactive Store. Subscribes to language changes via `BehaviorSubject`.
- **Database:** Normalized Menu and MenuTranslation tables for multi-language support.