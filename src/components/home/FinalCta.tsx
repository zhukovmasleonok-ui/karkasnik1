import { Reveal } from '@/components/layout/Reveal';
import { LeadForm } from '@/components/forms/LeadForm';
import { company } from '@/content/site';

export function FinalCta() {
  return (
    <section className="bg-pine-ink py-16 text-[#f7f5f0] lg:py-24" aria-label="Оставить заявку">
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.22em] text-oak-soft">
            <span className="h-[1px] w-8 bg-oak-soft/60" aria-hidden="true" />
            Первый шаг
          </p>
          <h2 className="text-balance font-display text-[clamp(28px,4.4vw,46px)] font-medium leading-[1.12]">
            Сметный расчёт и эскизный проект Вашего дома —{' '}
            <span className="italic text-oak-soft">бесплатно</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-pretty text-[16px] leading-relaxed text-[#e9e6dc]/75">
            Оставьте заявку: консультируем, выезжаем на участок, подбираем дом под
            Ваши задачи и бюджет. Перезвоним в рабочее время.
          </p>
          <div className="mt-10 space-y-4">
            <a
              href={company.phoneHref}
              className="block font-display text-[clamp(24px,3vw,34px)] font-semibold text-[#f7f5f0] transition-colors hover:text-oak-soft"
            >
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="block text-[15px] text-[#e9e6dc]/75 underline underline-offset-4 hover:text-white"
            >
              {company.email}
            </a>
            <p className="text-[13.5px] text-[#e9e6dc]/55">{company.workHours}</p>
          </div>
        </Reveal>

        <Reveal delay={120} className="rounded-sm bg-[#f7f5f0] p-6 text-graphite shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] sm:p-8">
          <LeadForm
            type="consult"
            source="home-final"
            submitLabel="Получить консультацию"
            messagePlaceholder="Например: участок в Судаке, дом 60 м² под ключ"
          />
        </Reveal>
      </div>
    </section>
  );
}
