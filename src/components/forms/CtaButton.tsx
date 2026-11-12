'use client';

import { openLeadDialog } from './LeadDialog';
import { cn } from '@/lib/utils';

export type CtaPayload = {
  type?: 'consult' | 'callback' | 'quiz' | 'tour' | 'contact' | 'mortgage';
  title?: string;
  subtitle?: string;
  message?: string;
  submitLabel?: string;
};

/**
 * Кнопка-CTA, открывающая диалог заявки.
 * variant: primary — зелёная, bronze — дуб, outline — контурная.
 */
export function CtaButton({
  children,
  payload,
  variant = 'primary',
  className,
  size = 'md',
}: {
  children: React.ReactNode;
  payload?: CtaPayload;
  variant?: 'primary' | 'bronze' | 'outline' | 'outline-light';
  className?: string;
  size?: 'md' | 'lg';
}) {
  return (
    <button
      type="button"
      onClick={() => openLeadDialog(payload)}
      className={cn(
        'inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[15px] font-semibold transition-colors',
        size === 'lg' && 'min-h-[56px] px-8 py-4 text-base',
        variant === 'primary' && 'bg-pine text-[#f7f5f0] hover:bg-pine-deep',
        variant === 'bronze' && 'bg-oak text-[#1c1408] hover:bg-[#b98e5e]',
        variant === 'outline' && 'border border-pine/50 text-pine hover:bg-pine hover:text-[#f7f5f0]',
        variant === 'outline-light' &&
          'border border-[#f7f5f0]/40 text-[#f7f5f0] hover:border-oak hover:bg-[#f7f5f0]/10',
        className
      )}
    >
      {children}
    </button>
  );
}
