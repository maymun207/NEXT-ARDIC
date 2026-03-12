# Supabase Schema Management

> **Rule #1**: Never commit `.sql` schema files to the repository.
> All schema dumps live in `.local/` (gitignored).

## Quick Reference

| Action                 | Command                            |
| ---------------------- | ---------------------------------- |
| Pull current schema    | `./scripts/export-schema-local.sh` |
| Create a new migration | `supabase migration new <name>`    |
| Apply migrations       | `supabase db push`                 |
| View migration history | `supabase migration list`          |
| Start local Supabase   | `supabase start`                   |
| Stop local Supabase    | `supabase stop`                    |

## Prerequisites

1. Install the Supabase CLI:

   ```bash
   brew install supabase/tap/supabase
   ```

2. Set the database URL in `.env.local`:

   ```bash
   SUPABASE_DB_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres
   ```

3. Replace `YOUR_SUPABASE_PROJECT_ID` in `supabase/config.toml` with your actual project ID from
   [Supabase Dashboard → Settings → General](https://supabase.com/dashboard/project/ftfktaeqanspjdbhfjnc/settings/general).

## Workflow

### 1. Export the Current Schema (Local Only)

```bash
./scripts/export-schema-local.sh
```

This dumps the live schema to `.local/schema-YYYYMMDD.sql`. The file is
**gitignored** — it never enters the repository.

### 2. Create a New Migration

```bash
supabase migration new add_user_preferences
```

This creates a timestamped `.sql` file in `supabase/migrations/`. Write your
DDL changes there.

### 3. Apply Migrations to Production

```bash
supabase db push
```

This runs all pending migrations against the remote database.

### 4. Seed Data (Local Development Only)

```bash
cp supabase/seed.example.sql supabase/seed.sql
# Edit seed.sql with your local test data
supabase db reset   # Re-creates local DB and runs seed
```

`seed.sql` is gitignored — only `seed.example.sql` (with anonymized data) is committed.

## File Structure

```
supabase/
├── config.toml          # CLI config (committed — placeholder project_id)
├── seed.example.sql     # Anonymized example data (committed)
├── seed.sql             # Your local seed data (gitignored)
├── migrations/          # Timestamped migration files (gitignored)
│   └── *.sql
└── README.md            # This file

.local/                  # Schema dumps (gitignored)
├── schema-20260305.sql
└── ...
```

## Important Links

- [Supabase Dashboard](https://supabase.com/dashboard/project/ftfktaeqanspjdbhfjnc)
- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Migration Guide](https://supabase.com/docs/guides/cli/managing-environments)

## Security Reminders

- ⛔ **Never commit** `.sql` schema dumps to git
- ⛔ **Never commit** `seed.sql` (may contain real data)
- ✅ Only `config.toml`, `seed.example.sql`, and this `README.md` are safe to commit
- ✅ All credentials live in `.env.local` (gitignored) and Vercel environment variables
