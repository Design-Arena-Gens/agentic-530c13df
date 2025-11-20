import { store } from '@/lib/store';
import { CreateAssociateForm } from '@/components/CreateAssociateForm';
import { CreateWorkItemForm } from '@/components/CreateWorkItemForm';
import { ScheduleForm } from '@/components/ScheduleForm';
import { ScheduleTable } from '@/components/ScheduleTable';
import { StatsOverview } from '@/components/StatsOverview';
import { DispatchActivity } from '@/components/DispatchActivity';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await store.getData();
  const sortedSchedules = [...data.schedules].sort(
    (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime()
  );
  const latestLogs = data.dispatchLogs.slice(0, 10);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      <header className="flex flex-col gap-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Automation Control Center</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Automate delivery of repeatable work packages to the right associates at the right moment. Track
          dispatch performance, prioritize upcoming work, and trigger manual sweeps when needed.
        </p>
      </header>

      <StatsOverview
        associates={data.associates}
        workItems={data.workItems}
        schedules={data.schedules}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <ScheduleTable
            schedules={sortedSchedules}
            associates={data.associates}
            workItems={data.workItems}
          />
          <DispatchActivity
            logs={latestLogs}
            schedules={data.schedules}
            associates={data.associates}
            workItems={data.workItems}
          />
        </div>
        <aside className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Schedule new dispatch</h2>
            <p className="mt-1 text-sm text-slate-500">
              Define which associate receives which work item and when. Automation runs continuously.
            </p>
            <div className="mt-4">
              <ScheduleForm associates={data.associates} workItems={data.workItems} />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Add associate</h2>
            <p className="mt-1 text-sm text-slate-500">Keep your roster fresh with current availability.</p>
            <div className="mt-4">
              <CreateAssociateForm />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Create work package</h2>
            <p className="mt-1 text-sm text-slate-500">
              Codify the repeatable work you want to automate and track effort expectations.
            </p>
            <div className="mt-4">
              <CreateWorkItemForm />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
