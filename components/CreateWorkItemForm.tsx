'use client';

import { useTransition } from 'react';
import { createWorkItem } from '@/app/actions';

export function CreateWorkItemForm() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-3"
      action={(formData) => {
        startTransition(async () => {
          await createWorkItem(formData);
        });
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Title
          <input
            name="title"
            required
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Customer follow-up"
          />
        </label>
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Description
          <textarea
            name="description"
            rows={3}
            className="mt-1 resize-none rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Include context, assets, or step-by-step instructions."
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-600">
          Estimated Effort (min)
          <input
            type="number"
            name="estimatedMinutes"
            min={5}
            step={5}
            defaultValue={30}
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-600">
          Category
          <input
            name="category"
            placeholder="Support"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:cursor-progress disabled:bg-emerald-400"
      >
        {isPending ? 'Saving work item…' : 'Save work item'}
      </button>
    </form>
  );
}
