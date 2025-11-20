import type { DispatchLog, Schedule, Associate, WorkItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export function DispatchActivity({
  logs,
  schedules,
  associates,
  workItems
}: {
  logs: DispatchLog[];
  schedules: Schedule[];
  associates: Associate[];
  workItems: WorkItem[];
}) {
  const scheduleMap = new Map(schedules.map((schedule) => [schedule.id, schedule]));
  const associateMap = new Map(associates.map((associate) => [associate.id, associate]));
  const workMap = new Map(workItems.map((work) => [work.id, work]));

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-800">Automation activity</h2>
      <div className="space-y-2">
        {logs.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
            No automation events yet. Once your dispatches run, they&apos;ll appear here.
          </div>
        )}
        {logs.map((log) => {
          const schedule = scheduleMap.get(log.scheduleId);
          const associate = schedule ? associateMap.get(schedule.associateId) : undefined;
          const work = schedule ? workMap.get(schedule.workItemId) : undefined;
          const statusStyles =
            log.status === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-rose-200 bg-rose-50 text-rose-700';

          return (
            <article
              key={log.id}
              className={`rounded-lg border ${statusStyles} px-4 py-3 text-sm shadow-sm`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide">
                <span className="font-semibold">{log.status === 'success' ? 'Dispatched' : 'Error'}</span>
                <span>{formatDate(log.dispatchedAt)}</span>
              </div>
              <div className="mt-1 text-sm font-medium">
                {associate ? associate.name : 'Unknown associate'} → {work ? work.title : 'Unknown work'}
              </div>
              <p className="mt-2 text-sm text-slate-600">{log.message}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
