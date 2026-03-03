# Cardinality Automated i18N Engine

This project implements PICS-1716, providing an AI-driven translation system that replaces static `.json` translation files.

## Features
- **Dynamic Translation**: Real-time translation of UI labels and error messages.
- **Tiered Strategy**: Uses OpenAI GPT-4o-mini for complex nuances and static APIs for labels.
- **Dual-Layer Caching**: Redis (L1) and PostgreSQL (L2) to ensure sub-500ms latency.
- **Angular Pipe**: `autoTranslate` pipe for seamless UI integration.

## Getting Started
1. Copy `.env.example` to `.env` and add your `OPENAI_API_KEY`.
2. Run `docker-compose up`.
3. Access Frontend at `http://localhost:4200`.
4. API Docs at `http://localhost:3000/api/docs`.