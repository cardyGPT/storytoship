# Localized Formio Application

This project implements a multi-language Formio solution using NestJS and Angular.

## Prerequisites
- Docker & Docker Compose

## Running the app
1. `docker-compose up --build`
2. Frontend: http://localhost:4200
3. API: http://localhost:3000

## How it works
- **Backend**: Serves JSON translation files via dynamic endpoints.
- **Frontend**: Uses `i18next` to fetch translations and merges them with Formio's renderer via the `i18n` option.
- **Localization Service**: Manages language state and reactive UI updates.