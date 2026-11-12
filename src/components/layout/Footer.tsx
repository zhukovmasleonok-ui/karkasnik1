'use client';

import Link from 'next/link';
import { Phone, Mail, Clock } from 'lucide-react';
import { Logo } from './Logo';
import { company, nav, technologies, cities } from '@/content/site';
import { openLeadDialog } from '@/components/forms/LeadDialog';

export function Footer() {
  return (
    <footer className="mt-auto bg-pine-ink text-[#e9e6dc]">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Бренд */}
          <div>
            <Link href="/" className="inline-block w-fit" aria-label="На главную — Строят Крымчане">
              <Logo footer />
            </Link>
            <p className="mt-5 font-display text-[22px] leading-snug text-[#f7f5f0]">
              Дома с душой в Крыму.
            </p>
            <p className="mt-2 max-w-[300px] text-[13.5px] leading-relaxed text-[#e9e6dc]/60">
              Для жизни, отдыха и семейной истории, которая начинается с доверия.
            </p>
            <div className="mt-6 flex gap-2.5">
              {company.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#f7f5f0]/20 text-[13px] font-bold text-[#e9e6dc]/80 transition-colors hover:border-oak hover:text-white"
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <nav aria-label="Меню в подвале">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#e9e6dc]/45">
              Меню
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14.5px] text-[#e9e6dc]/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/selection"
                  className="text-[14.5px] text-[#e9e6dc]/85 transition-colors hover:text-white"
                >
                  Подбор дома
                </Link>
              </li>
            </ul>
          </nav>

          {/* Технологии */}
          <nav aria-label="Технологии">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#e9e6dc]/45">
              Технологии
            </p>
            <ul className="mt-4 space-y-2.5">
              {technologies.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/technologies#${t.slug}`}
                    className="text-[14.5px] text-[#e9e6dc]/85 transition-colors hover:text-white"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Контакты */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#e9e6dc]/45">
              Контакты
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={company.phoneHref}
                className="flex items-center gap-2.5 text-[16px] font-semibold text-[#f7f5f0]"
              >
                <Phone className="h-4 w-4 text-oak" />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2.5 text-[14.5px] text-[#e9e6dc]/85 hover:text-white"
              >
                <Mail className="h-4 w-4 text-oak" />
                {company.email}
              </a>
              <p className="flex items-center gap-2.5 text-[13.5px] text-[#e9e6dc]/60">
                <Clock className="h-4 w-4 text-oak" />
                {company.workHours}
              </p>
              <p className="text-[13.5px] text-[#e9e6dc]/60">
                Работаем по всей территории Республики Крым
              </p>
              <button
                type="button"
                onClick={() => openLeadDialog({ type: 'callback', title: 'Заказать обратный звонок' })}
                className="mt-2 w-fit rounded-sm border border-oak/70 px-4 py-2.5 text-[13.5px] font-semibold text-oak-soft transition-colors hover:bg-oak hover:text-[#1c1408]"
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </div>

        {/* Города */}
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#f7f5f0]/10 pt-7 text-[13px] text-[#e9e6dc]/50">
          {cities.map((c) => (
            <span key={c}>{c}</span>
          ))}
          <span>и весь Крым</span>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#f7f5f0]/10 pt-7 text-[12.5px] text-[#e9e6dc]/45 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
              <p>© {new Date().getFullYear()} ИП Амерян В. С. «Строят Крымчане». Все права защищены.</p>
              <p>
                ИНН {company.requisites.inn} · ОГРНИП {company.requisites.ogrnip}
              </p>
            </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-[#e9e6dc]/80">
              Политика конфиденциальности
            </Link>
            <Link href="/privacy#consent" className="transition-colors hover:text-[#e9e6dc]/80">
              Согласие на обработку данных
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
