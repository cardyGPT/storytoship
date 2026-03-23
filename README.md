# In-App Documentation POC (PICS-482)

## Setup
1. `docker-compose up --build`
2. Backend API: http://localhost:3000/api
3. Frontend: http://localhost:4200

## Deep Linking
Access direct documentation via:
`http://localhost:4200/?docId=ops-guide`

## Architecture
- **Backend**: NestJS with TypeORM & PostgreSQL.
- **Frontend**: Angular 17 with a Sidecar UI Pattern.
- **State**: Reactive BehaviorSubjects in `HelpService` for global state management.
- **Content**: Markdown-ready document entities.