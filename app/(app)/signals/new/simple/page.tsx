import { redirect } from 'next/navigation';
import { HUMAN_TEMPLATE_PATH } from '@/lib/telegram/setup-flow';

export default async function SimpleSignalPage() {
  redirect(HUMAN_TEMPLATE_PATH);
}
