'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { company, nav } from '@/content/site';
import { cn } from '@/lib/utils';
import { openLeadDialog } from '@/components/forms/LeadDialog';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onKeyNav = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKeyNav);
    return () => window.removeEventListener('keydown', onKeyNav);
  }, [onKeyNav]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-pine text-[#f7f5f0] transition-shadow duration-300',
        scrolled && 'shadow-[0_10px_30px_-12px_rgba(15,42,21,0.55)]'
      )}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
        <Link href="/" aria-label="Строят Крымчане — на главную" className="shrink-0">
          <Logo compact />
        </Link>

        <nav aria-label="Основное меню" className="hidden items-center gap-7 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-[14.5px] font-medium tracking-[0.01em] text-[#f7f5f0]/85 transition-colors hover:text-white',
                pathname === item.href && 'text-white underline decoration-oak underline-offset-8'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap text-[15px] font-semibold tracking-wide md:flex lg:text-base"
            aria-label={`Позвонить: ${company.phone}`}
          >
            <Phone className="h-4 w-4 text-oak-soft" strokeWidth={2.2} />
            {company.phone}
          </a>
          <button
            type="button"
            onClick={() => openLeadDialog({ type: 'callback', title: 'Заказать обратный звонок' })}
            className="hidden rounded-sm border border-[#f7f5f0]/35 px-4 py-2 text-[14px] font-semibold transition-colors hover:border-oak hover:bg-[#f7f5f0]/5 md:inline-flex"
          >
            Заказать звонок
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#f7f5f0]/30 transition-colors hover:bg-[#f7f5f0]/10 xl:hidden"
            aria-label="Открыть меню"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={cn(
          'fixed inset-0 z-[60] flex flex-col bg-pine-ink text-[#f7f5f0] transition-all duration-300 xl:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
      >
        <div className="container-x flex h-[68px] items-center justify-between">
          <Logo compact />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#f7f5f0]/30"
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Мобильное меню" className="container-x mt-6 flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'group flex items-baseline justify-between border-b border-[#f7f5f0]/12 py-4 transition-opacity',
                open ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDelay: `${80 + i * 40}ms` }}
            >
              <span className="font-display text-2xl font-medium">{item.label}</span>
              <span className="text-xs text-[#f7f5f0]/40">0{i + 1}</span>
            </Link>
          ))}
        </nav>

        <div className="container-x mt-auto flex flex-col gap-4 pb-10">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openLeadDialog({ type: 'consult', title: 'Получить консультацию' });
            }}
            className="w-full rounded-sm bg-oak px-5 py-4 text-center text-[15px] font-semibold text-[#1c1408] transition-colors hover:bg-[#b98e5e]"
          >
            Получить консультацию
          </button>
          <a href={company.phoneHref} className="flex items-center gap-3 text-lg font-semibold">
            <Phone className="h-5 w-5 text-oak-soft" />
            {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="text-sm text-[#f7f5f0]/70 underline underline-offset-4"
          >
            {company.email}
          </a>
        </div>
      </div>
    </header>
  );
}
