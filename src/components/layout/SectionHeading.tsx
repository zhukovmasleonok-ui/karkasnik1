import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'max-w-[720px]',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-3 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.22em]',
            align === 'center' && 'justify-center',
            dark ? 'text-oak-soft' : 'text-oak'
          )}
        >
          <span className={cn('h-[1px] w-8', dark ? 'bg-oak-soft/60' : 'bg-oak/60')} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-balance font-display text-[clamp(28px,4.4vw,46px)] font-medium leading-[1.12]',
          dark ? 'text-[#f7f5f0]' : 'text-graphite'
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            'mt-4 text-pretty text-[16px] leading-relaxed',
            dark ? 'text-[#e9e6dc]/70' : 'text-graphite-soft'
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}
