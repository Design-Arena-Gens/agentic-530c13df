'use client';

import { useTransition } from 'react';
import type { Associate, WorkItem } from '@/lib/types';
import { scheduleDispatch } from '@/app/actions';

export function ScheduleForm({
  associates,
  workItems
}: {
  associates: Associate[];
  workItems: WorkItem[];
}) {
  const [isPending, startTransition] = useTransition();
  const hasData = associates.length > 0 && workItems.length > 0;

  return (
    <form
      className="space-y-3"
      action={(formData) => {
        startTransition(async () => {
          await scheduleDispatch(formData);
        });
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Associate
          <select
            name="associateId"
            required
            disabled={!hasData}
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100"
          >
            <option value="">Select associate</option>
            {associates.map((associate) => (
              <option key={associate.id} value={associate.id}>
                {associate.name} — {associate.role || 'No role'}
              </option>
            ))}
          </select>
        </label>
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Work package
          <select
            name="workItemId"
            required
            disabled={!hasData}
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100"
          >
            <option value="">Select work package</option>
            {workItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({item.estimatedMinutes} min)
              </option>
            ))}
          </select>
        </label>
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Dispatch channel
          <select
            name="channel"
            defaultValue="email"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="email">Email</option>
            <option value="slack">Slack</option>
            <option value="webhook">Webhook</option>
          </select>
        </label>
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Send at
          <input
            type="datetime-local"
            name="sendAt"
            required
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </label>
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Notes (optional)
          <textarea
            name="notes"
            rows={2}
            className="mt-1 resize-none rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Add instructions, links, or attachments references."
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={!hasData || isPending}
        className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isPending ? 'Scheduling…' : 'Schedule dispatch'}
      </button>
    </form>
  );
}
