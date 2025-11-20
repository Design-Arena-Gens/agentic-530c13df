'use server';

import { revalidatePath } from 'next/cache';
import { store } from '@/lib/store';
import type { Schedule } from '@/lib/types';

export async function createAssociate(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const role = String(formData.get('role') ?? '').trim();
  const capacity = Number(formData.get('capacity') ?? '0');
  const timezone = String(formData.get('timezone') ?? 'UTC');

  if (!name || !email) {
    throw new Error('Name and email are required');
  }

  await store.addAssociate({ name, email, role, capacity, timezone });
  revalidatePath('/');
}

export async function createWorkItem(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const estimatedMinutes = Number(formData.get('estimatedMinutes') ?? '0');
  const category = String(formData.get('category') ?? 'General');

  if (!title) {
    throw new Error('Title is required');
  }

  await store.addWorkItem({ title, description, estimatedMinutes, category });
  revalidatePath('/');
}

export async function scheduleDispatch(formData: FormData) {
  const associateId = String(formData.get('associateId') ?? '');
  const workItemId = String(formData.get('workItemId') ?? '');
  const channel = formData.get('channel') as Schedule['channel'];
  const sendAt = String(formData.get('sendAt') ?? '');
  const notes = String(formData.get('notes') ?? '').trim() || undefined;

  if (!associateId || !workItemId || !sendAt) {
    throw new Error('Associate, work item, and send time are required');
  }

  await store.addSchedule({ associateId, workItemId, channel, sendAt, notes, status: 'pending' });
  revalidatePath('/');
}

export async function cancelSchedule(scheduleId: string) {
  await store.removeSchedule(scheduleId);
  revalidatePath('/');
}

export async function triggerSweep() {
  const { runDispatchSweep } = await import('@/lib/scheduler');
  const result = await runDispatchSweep();
  revalidatePath('/');
  return result;
}
