'use client';

import { useTransition } from 'react';
import { createAssociate } from '@/app/actions';

export function CreateAssociateForm() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-3"
      action={(formData) => {
        startTransition(async () => {
          await createAssociate(formData);
        });
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Name
          <input
            name="name"
            required
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Alex Rivera"
          />
        </label>
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="alex@example.com"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-600">
          Role
          <input
            name="role"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Operations Analyst"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-600">
          Weekly Capacity (hrs)
          <input
            type="number"
            name="capacity"
            min={1}
            defaultValue={40}
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </label>
        <label className="col-span-2 flex flex-col text-sm font-medium text-slate-600">
          Timezone
          <select
            name="timezone"
            defaultValue="UTC"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern</option>
            <option value="America/Chicago">Central</option>
            <option value="America/Denver">Mountain</option>
            <option value="America/Los_Angeles">Pacific</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Berlin">Berlin</option>
            <option value="Asia/Singapore">Singapore</option>
            <option value="Asia/Tokyo">Tokyo</option>
            <option value="Australia/Sydney">Sydney</option>
          </select>
        </label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-progress disabled:bg-indigo-400"
      >
        {isPending ? 'Adding associate…' : 'Add associate'}
      </button>
    </form>
  );
}
