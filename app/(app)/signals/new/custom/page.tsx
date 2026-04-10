import { redirect } from 'next/navigation';
import { SignalBuilderForm } from '@/components/app/SignalBuilderForm';
import { getAuthenticatedUser } from '@/lib/auth/session';
import { SIGNAL_TEMPLATE_PRESETS, type SignalTemplateId } from '@/lib/signals/templates';
import { getTelegramLinkStatus } from '@/lib/telegram/link-state';
import { buildTelegramPath, buildTemplatePath } from '@/lib/telegram/setup-flow';

interface CustomSignalPageProps {
  searchParams?: Promise<{ preset?: string }> | { preset?: string };
}

export default async function CustomSignalPage({ searchParams }: CustomSignalPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const presetParam = resolvedSearchParams?.preset;
  const user = await getAuthenticatedUser();
  const telegramStatus = user
    ? await getTelegramLinkStatus()
    : { linked: false, linkedAt: null, appUserId: null, telegramUsername: null };
  const hasPreset = (value: string): value is SignalTemplateId =>
    SIGNAL_TEMPLATE_PRESETS.some((preset) => preset.id === value);
  const initialPreset =
    typeof presetParam === 'string' && hasPreset(presetParam) ? presetParam : undefined;
  const templatePath = buildTemplatePath(initialPreset);

  if (!telegramStatus.linked) {
    redirect(
      buildTelegramPath({
        status: 'required',
        returnTo: templatePath,
      })
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-secondary">Custom builder</p>
        <h1 className="font-zen text-3xl sm:text-4xl">Customize your own signal inputs</h1>
        <p className="mt-2 max-w-2xl text-secondary">
          Use this when the guided vault or protocol builders do not cover the exact vault, market, token, or address set you need yet.
        </p>
      </div>

      <SignalBuilderForm initialPreset={initialPreset} telegramLinked={telegramStatus.linked} />
    </div>
  );
}
