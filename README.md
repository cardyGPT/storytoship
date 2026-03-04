# Nested Tab Navigation System (PICS-617)

## Setup
1. Copy `backend/.env.example` to `backend/.env`
2. Run `docker-compose up --build`
3. Seed the database with `POST http://localhost:3000/api/navigation/seed`
4. Access app at `http://localhost:4200`

## Features
- Recursive tab component structure
- URL-driven navigation state
- TypeORM backend hierarchy
- JWT protected configuration API
