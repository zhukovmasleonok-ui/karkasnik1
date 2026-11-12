import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Оригинальный логотип «Строят Крымчане» (PNG со старого сайта,
 * белая версия для тёмной шапки и футера).
 */
export function Logo({
  className,
  compact = false,
  footer = false,
}: {
  className?: string;
  compact?: boolean;
  footer?: boolean;
}) {
  return (
    <Image
      src={footer ? '/images/logo-footer.png' : '/images/logo-white.png'}
      alt='Логотип строительной компании «Строят Крымчане» — дуб в геральдическом щите'
      width={0}
      height={0}
      sizes='(max-width: 768px) 150px, 190px'
      className={cn('h-auto w-auto max-w-[190px]', compact && 'max-w-[150px]', className)}
      style={{ width: compact ? 150 : 190, height: 'auto' }}
      priority
    />
  );
}
