import type { Associate, Schedule, WorkItem } from '@/lib/types';
import { differenceInHours, isAfter } from 'date-fns';

export function StatsOverview({
  associates,
  workItems,
  schedules
}: {
  associates: Associate[];
  workItems: WorkItem[];
  schedules: Schedule[];
}) {
  const pending = schedules.filter((schedule) => schedule.status === 'pending');
  const sent = schedules.filter((schedule) => schedule.status === 'sent');
  const nextDispatch = pending
    .map((schedule) => new Date(schedule.sendAt))
    .sort((a, b) => a.getTime() - b.getTime())[0];

  const now = new Date();
  const hoursToNext = nextDispatch && isAfter(nextDispatch, now) ? differenceInHours(nextDispatch, now) : null;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      <StatCard label="Associates" value={associates.length} highlight />
      <StatCard label="Work packages" value={workItems.length} />
      <StatCard label="Scheduled" value={pending.length} />
      <StatCard label="Completed" value={sent.length} />
      <div className="sm:col-span-4">
        <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 shadow-sm">
          {nextDispatch ? (
            <div className="flex items-center justify-between">
              <span className="font-medium">Next dispatch window</span>
              <span>{nextDispatch.toLocaleString()}</span>
              <span>{hoursToNext === null ? 'Now' : `${hoursToNext}h out`}</span>
            </div>
          ) : (
            <span>No future dispatches planned yet. Create one to kick off automation.</span>
          )}
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 shadow-sm ${
        highlight ? 'border-indigo-200 bg-white' : 'border-slate-200 bg-white'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}
