import { redirect } from 'next/navigation';
import { SIGNAL_TEMPLATE_PRESETS, type SignalTemplateId } from '@/lib/signals/templates';
import { buildTemplatePath } from '@/lib/telegram/setup-flow';

interface AdvancedSignalPageProps {
  searchParams?: Promise<{ preset?: string }> | { preset?: string };
}

export default async function AdvancedSignalPage({ searchParams }: AdvancedSignalPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const presetParam = resolvedSearchParams?.preset;
  const hasPreset = (value: string): value is SignalTemplateId =>
    SIGNAL_TEMPLATE_PRESETS.some((preset) => preset.id === value);
  const initialPreset =
    typeof presetParam === 'string' && hasPreset(presetParam) ? presetParam : undefined;
  redirect(buildTemplatePath(initialPreset));
}
