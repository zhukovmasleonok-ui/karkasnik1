import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Landmark, FileText } from 'lucide-react';
import { CtaButton } from '@/components/forms/CtaButton';
import { Reveal } from '@/components/layout/Reveal';
import { company, trustBullets } from '@/content/site';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-pine-ink text-[#f7f5f0]" aria-label="Главный экран">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-aframe.jpg"
          alt="Современный А-образный дом в горах Крыма на закате"
          fill
          priority
          sizes="100vw"
          className="hero-img object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pine-ink/85 via-pine-ink/55 to-pine-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-ink/70 via-transparent to-pine-ink/30" />
      </div>

      <div className="container-x relative flex min-h-[640px] flex-col justify-end pb-14 pt-36 sm:min-h-[700px] lg:min-h-[760px] lg:pb-20">
        <Reveal className="max-w-[780px]">
          <p className="mb-5 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em] text-oak-soft">
            <span className="h-[1px] w-10 bg-oak-soft/70" aria-hidden="true" />
            {company.tagline}
          </p>
          <h1 className="text-balance font-display text-[clamp(38px,6.5vw,72px)] font-medium leading-[1.06]">
            Кто строит дом —{' '}
            <span className="italic text-oak-soft">тот строит счастье</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-pretty text-[17px] leading-relaxed text-[#e9e6dc]/90 sm:text-[18px]">
            СИП-панельные, каркасные и модульные дома «под ключ» на территории
            Республики Крым. Для жизни, отдыха и семейной истории, которая
            начинается с доверия.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton
              size="lg"
              variant="bronze"
              payload={{ type: 'consult', title: 'Получить консультацию' }}
            >
              Получить консультацию
            </CtaButton>
            <Link
              href="/selection"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-sm border border-[#f7f5f0]/40 px-8 py-4 text-base font-semibold text-[#f7f5f0] transition-colors hover:border-oak hover:bg-[#f7f5f0]/10"
            >
              Подобрать дом за 4 шага
              <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-12 lg:mt-16">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[13.5px] font-medium text-[#e9e6dc]/85">
            <li className="flex items-center gap-2.5">
              <Landmark className="h-4 w-4 text-oak-soft" aria-hidden="true" />
              Аккредитованы в Сбербанке, ВТБ и ДОМ.РФ
            </li>
            <li className="flex items-center gap-2.5">
              <FileText className="h-4 w-4 text-oak-soft" aria-hidden="true" />
              Договор с фиксацией цены до 1 января
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-oak-soft" aria-hidden="true" />
              Гарантия и сопровождение
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Бегущая строка фактов (медленная, останавливается при reduced-motion) */
export function FactsMarquee() {
  const facts = [
    'Свои бригады по всему Крыму',
    'Фиксация цены до 1 января',
    'Материнский капитал и ипотека',
    'Сметный расчёт и эскизный проект — бесплатно',
    'Каркасные дома «Префаб» — единственные в Крыму',
    'Экскурсии на производство и объекты',
    'Специальные условия отдельным категориям граждан',
  ];
  const row = [...facts, ...facts];
  return (
    <div className="overflow-hidden border-y border-line bg-paper-2 py-3.5" aria-hidden="true">
      <div className="marquee-track flex w-max gap-10 pr-10">
        {row.map((f, i) => (
          <span
            key={i}
            className="flex items-center gap-4 whitespace-nowrap text-[12.5px] font-semibold uppercase tracking-[0.16em] text-graphite-soft"
          >
            {f}
            <span className="h-1 w-1 rounded-full bg-oak/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Краткая строка цифр под hero (не выдуманные: из текстов компании) */
export function KeyFacts() {
  const items = [
    { value: 'от 650 000 ₽', label: 'модульный дом 15 м² «под ключ»' },
    { value: 'до 20 дней', label: 'возведение СИП-панельного дома' },
    { value: 'до 30 дней', label: 'производство каркасного «Префаб»' },
    { value: 'весь Крым', label: 'работаем только своими бригадами' },
  ];
  return (
    <section aria-label="Ключевые факты" className="border-b border-line">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal
            key={it.value}
            delay={i * 60}
            className="border-line px-2 py-8 sm:px-6 lg:py-10 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 lg:border-l lg:first:border-l-0"
          >
            <p className="font-display text-[clamp(22px,2.6vw,34px)] font-semibold leading-tight text-pine">
              {it.value}
            </p>
            <p className="mt-2 max-w-[220px] text-[13.5px] leading-snug text-graphite-soft">
              {it.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export { trustBullets };
