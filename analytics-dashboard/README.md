# CompanyTech Analytics Dashboard

A standalone Express server that provides a local-only admin interface for viewing website analytics stored in Supabase.

## What It Does

- Connects to the CompanyTech Supabase project using the parent project's `.env.local`
- Exposes JSON API endpoints for visitors, visits, contacts, chat messages, and newsletter subscribers
- Serves a static HTML/CSS/JS dashboard UI from the `public/` directory

## Prerequisites

- Node.js 20.x
- The parent project's `.env.local` must contain `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

## Quick Start

```bash
cd analytics-dashboard
npm install        # first time only
npm start          # → http://localhost:4000
```

## API Endpoints

| Route                             | Table                        | Description                  |
| --------------------------------- | ---------------------------- | ---------------------------- |
| `GET /api/stats`                  | All tables                   | Aggregate counts for summary |
| `GET /api/visitors`               | `visitors`                   | All visitors, newest first   |
| `GET /api/visits`                 | `visits` + `visitors`        | All page views with metadata |
| `GET /api/contacts`               | `contacts` + `visitors`      | Contact form submissions     |
| `GET /api/chat-messages`          | `chat_messages` + `visitors` | CWF chatbot conversations    |
| `GET /api/newsletter-subscribers` | `newsletter_subscribers`     | Email subscriptions          |

## Configuration

| Variable                    | Source              | Required           |
| --------------------------- | ------------------- | ------------------ |
| `SUPABASE_URL`              | Parent `.env.local` | Yes                |
| `SUPABASE_SERVICE_ROLE_KEY` | Parent `.env.local` | Yes                |
| `DASHBOARD_PORT`            | Parent `.env.local` | No (default: 4000) |

## Security

- **Local only** — this server has NO authentication and should NEVER be exposed to the internet
- Uses the `service_role` key which bypasses all RLS policies
- Run behind a firewall or on localhost only
