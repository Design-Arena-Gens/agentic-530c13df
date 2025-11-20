'use client';

import { useTransition } from 'react';
import { formatDate } from '@/lib/utils';
import type { Associate, Schedule, WorkItem } from '@/lib/types';
import { cancelSchedule, triggerSweep } from '@/app/actions';

const channelLabel: Record<Schedule['channel'], string> = {
  email: 'Email',
  slack: 'Slack',
  webhook: 'Webhook'
};

export function ScheduleTable({
  schedules,
  associates,
  workItems
}: {
  schedules: Schedule[];
  associates: Associate[];
  workItems: WorkItem[];
}) {
  const [isCancelling, startCancel] = useTransition();
  const [isSweeping, startSweep] = useTransition();

  const associateMap = new Map(associates.map((associate) => [associate.id, associate]));
  const workMap = new Map(workItems.map((work) => [work.id, work]));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Upcoming dispatches</h2>
        <button
          type="button"
          onClick={() => {
            startSweep(async () => {
              await triggerSweep();
            });
          }}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-progress"
          disabled={isSweeping}
        >
          {isSweeping ? 'Running automation…' : 'Run automation now'}
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Associate
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Work package
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Channel
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Send at
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {schedules.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                  No scheduled work yet. Create a plan to see it here.
                </td>
              </tr>
            )}
            {schedules.map((schedule) => {
              const associate = associateMap.get(schedule.associateId);
              const work = workMap.get(schedule.workItemId);
              return (
                <tr key={schedule.id} className="bg-white">
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <div className="font-medium">{associate?.name ?? 'Unknown'}</div>
                    <div className="text-xs text-slate-500">{associate?.email ?? '—'}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <div className="font-medium">{work?.title ?? 'Unknown'}</div>
                    <div className="text-xs text-slate-500">{work?.category ?? '—'}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{channelLabel[schedule.channel]}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{formatDate(schedule.sendAt)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        schedule.status === 'sent'
                          ? 'bg-emerald-100 text-emerald-700'
                          : schedule.status === 'failed'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      {schedule.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        startCancel(async () => {
                          await cancelSchedule(schedule.id);
                        });
                      }}
                      disabled={isCancelling}
                      className="inline-flex items-center rounded-md border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-600 shadow-sm transition hover:bg-rose-50 disabled:cursor-progress"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
