# Associate Work Automation Hub

A Next.js automation console that orchestrates scheduled work dispatches to your associate teams. Capture your roster, define reusable work packages, create delivery timelines, and trigger on-demand sweeps that send assignments through the channel of your choice.

## Features

- Centralized roster management with timezone and capacity tracking
- Reusable work package catalog including effort estimates and categories
- Scheduling console for pairing associates and work packages across email, Slack, or webhook channels
- Automation sweep that batches due dispatches, records delivery results, and highlights failures
- Activity timeline and KPI rollups to understand upcoming work and historical throughput
- REST endpoint ready for Vercel Cron jobs (`/api/dispatch`) to keep automation running continuously

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the automation dashboard.

## Automation Sweep API

The automation engine runs server-side and can be triggered manually or on a schedule.

- `POST`/`GET /api/dispatch`: executes a sweep that gathers all pending dispatches whose send time falls within ±15 minutes of the current time. Successful dispatches are marked as sent and logged.

### Recommended Vercel Cron

```json
{
  "crons": [
    {
      "path": "/api/dispatch",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

Save the snippet as `vercel.json` or configure the cron rule in the Vercel dashboard so dispatches run automatically every five minutes.

## Deployment

```bash
npm run build
npm start
```

For Vercel production deploys, use `vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-530c13df`.

## Data Storage

Automation data is persisted in `data/store.json`. The file is created automatically on first run and is safe to commit if you want seed data. For managed persistence in production, replace the lightweight JSON store with a database provider and update `lib/store.ts` accordingly.

## Project Structure

```
app/                Next.js app router pages, API routes, and server actions
components/         Client-side UI building blocks
lib/                Domain utilities, scheduler logic, and persistence layer
public/             Static assets
```

## Testing the Automation Loop

1. Add at least one associate and work package using the sidebar forms.
2. Schedule a dispatch with a time in the next few minutes.
3. Click **Run automation now** on the dashboard or hit `GET /api/dispatch`.
4. Review the status chip in the schedule table and the log cards in the automation activity feed.

## Next Steps

- Integrate with email, Slack, or webhook providers inside `lib/scheduler.ts`.
- Replace JSON persistence with Postgres or Supabase for multi-region resiliency.
- Extend scheduling logic with capacity and skill matching heuristics.

Happy automating!
