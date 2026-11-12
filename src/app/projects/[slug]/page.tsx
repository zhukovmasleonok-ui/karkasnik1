import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Ruler, Maximize, Warehouse } from 'lucide-react';
import { Reveal } from '@/components/layout/Reveal';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { LeadForm } from '@/components/forms/LeadForm';
import { CtaButton } from '@/components/forms/CtaButton';
import { technologies, company } from '@/content/site';
import { realProjects } from '@/content/projects';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function generateStaticParams() {
  return realProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = realProjects.find((x) => x.slug === slug);
  if (!p) return {};
  const fmt = new Intl.NumberFormat('ru-RU');
  return {
    title: `${p.name} — ${p.techNames.join(' / ')} ${p.area} м² | Строят Крымчане`,
    description: `${p.description[0]} Цена от ${fmt.format(p.minPrice)} ₽ (${p.prices
      .map((x) => `${fmt.format(x.amount)} ₽ — ${x.label}`)
      .join('; ')}). Сметный расчёт и эскизный проект бесплатно.`,
    openGraph: { images: [{ url: p.images[0] || '/images/project-sip.jpg' }] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = realProjects.find((x) => x.slug === slug);
  if (!p) notFound();
  const fmt = new Intl.NumberFormat('ru-RU');
  const tech = technologies.find((t) => p.tech.includes(t.slug as never)) || technologies[0];
  const related = realProjects
    .filter((x) => x.slug !== p.slug && (x.tech.some((t) => p.tech.includes(t)) || x.sections.some((s) => p.sections.includes(s))))
    .slice(0, 3);

  const kindLabel = p.kind === 'bath' ? 'баня' : p.kind === 'commercial' ? 'коммерческий объект' : 'дом';

  return (
    <>
      <section className="pt-10 lg:pt-14" aria-label="Проект">
        <div className="container-x">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-graphite-soft transition-colors hover:text-pine"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Все проекты
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                <Image
                  src={p.images[0] || '/images/project-sip.jpg'}
                  alt={p.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-[#f7f5f0]/95 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-pine-deep">
                  {p.techNames.join(' / ')}
                </span>
              </div>

              {p.images.length > 1 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {p.images.slice(1, 4).map((img, i) => (
                    <div key={img + i} className="relative aspect-[4/3] overflow-hidden rounded-sm">
                      <Image
                        src={img}
                        alt={`${p.name} — фото ${i + 2}`}
                        fill
                        sizes="(max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-700 hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}

              <h1 className="mt-8 text-balance font-display text-[clamp(30px,4.5vw,48px)] font-medium leading-[1.1] text-graphite">
                {p.name}
              </h1>
              <p className="mt-3 text-[14px] font-semibold uppercase tracking-[0.14em] text-oak">
                {p.sections.map((s) => (s === 'comfort' ? 'Комфорт+' : 'Бизнес+')).join(' · ')} · {kindLabel}
              </p>
              {p.description.map((d, i) => (
                <p key={i} className="mt-4 text-pretty text-[16px] leading-relaxed text-graphite/85">
                  {d}
                </p>
              ))}

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: Ruler, label: 'Площадь', value: p.features[0] || `${p.area} м²` },
                  ...p.features.slice(1, 3).map((f, i) => ({
                    icon: i === 0 ? Maximize : Warehouse,
                    label: i === 0 ? 'Состав' : 'Дополнительно',
                    value: f,
                  })),
                  { icon: Warehouse, label: 'Доставка', value: 'в радиусе 100 км' },
                ].map((c) => (
                  <div key={c.label} className="rounded-sm border border-line bg-card p-4">
                    <c.icon className="h-4.5 w-4.5 text-oak" strokeWidth={2} aria-hidden="true" />
                    <dt className="mt-2.5 text-[12px] uppercase tracking-[0.08em] text-graphite-soft">
                      {c.label}
                    </dt>
                    <dd className="mt-1 text-[14.5px] font-semibold leading-snug text-graphite">
                      {c.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {p.features.length > 3 && (
                <div className="mt-8 rounded-sm border border-line bg-card p-6">
                  <h2 className="font-display text-[20px] font-semibold text-graphite">
                    Состав помещений
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {p.features.slice(1).map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-pine" strokeWidth={2.4} aria-hidden="true" />
                        <span className="text-[14px] leading-relaxed text-graphite/85">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={100} className="rounded-sm border border-line bg-card p-6 sm:p-7">
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-graphite-soft">
                  Стоимость
                </p>
                <p className="mt-2 font-display text-[clamp(26px,3vw,34px)] font-semibold text-pine">
                  от {fmt.format(p.minPrice)} ₽
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-graphite-soft">
                  Цена стартовой комплектации. {company.deliveryRadius}
                </p>

                <div className="mt-5 space-y-3">
                  {p.prices.map((tier, i) => (
                    <div key={tier.label} className="flex items-center justify-between gap-3 rounded-sm bg-paper-2/70 px-4 py-3">
                      <span className="text-[13.5px] leading-snug text-graphite/85">
                        {tier.label.replace(/Цена в ["«]?|Цена ["«]?|["»]/g, '')}
                      </span>
                      <span className="font-display text-[16px] font-semibold whitespace-nowrap text-pine">
                        от {fmt.format(tier.amount)} ₽
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-graphite-soft">
                  Три уровня готовности — от «черновой» до «под ключ».{' '}
                  <Link href="/komplektacii" className="font-semibold text-pine underline underline-offset-4 hover:no-underline">
                    Что входит в каждую комплектацию
                  </Link>
                </p>

                <div className="mt-6">
                  <LeadForm
                    type="consult"
                    source={`project-${p.slug}`}
                    compact
                    withMessage={false}
                    defaultMessage={`Интересует проект «${p.name}» (${p.area} м²)`}
                    submitLabel="Получить сметный расчёт"
                  />
                </div>
                <p className="mt-4 text-[12.5px] leading-relaxed text-graphite-soft">
                  Сметный расчёт и эскизный проект — бесплатно. Фиксируем стоимость в
                  договоре до 1 января.
                </p>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <section className="mt-16 border-t border-line bg-paper-2/60 py-16 lg:py-20" aria-label="О технологии проекта">
        <div className="container-x">
          <SectionHeading
            eyebrow="Технология"
            title={tech.name}
            text={tech.short}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tech.features.slice(0, 6).map((f, i) => (
              <Reveal key={f} delay={i * 50} className="flex items-start gap-3 rounded-sm border border-line bg-card p-4">
                <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-pine" strokeWidth={2.4} aria-hidden="true" />
                <span className="text-[13.5px] leading-relaxed text-graphite/85">{f}</span>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton
              variant="outline"
              payload={{ type: 'tour', title: 'Записаться на экскурсию', submitLabel: 'Записаться' }}
            >
              Записаться на экскурсию на объект
            </CtaButton>
            <Link
              href={`/technologies#${tech.slug}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-sm px-6 py-3.5 text-[15px] font-semibold text-pine underline underline-offset-4 hover:text-pine-deep"
            >
              Подробнее о технологии
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 lg:py-20" aria-label="Похожие проекты">
          <div className="container-x">
            <SectionHeading
              eyebrow="Смотрите также"
              title={
                <>
                  Похожие <span className="italic text-pine">проекты</span>
                </>
              }
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 60}>
                  <Link
                    href={`/projects/${r.slug}`}
                    className="group block overflow-hidden rounded-sm border border-line bg-card transition-shadow duration-500 hover:shadow-[0_20px_50px_-24px_rgba(15,42,21,0.35)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={r.images[0] || '/images/project-sip.jpg'}
                        alt={r.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-[19px] font-semibold text-graphite">{r.name}</h3>
                      <p className="mt-1.5 text-[13px] text-graphite-soft">
                        {r.area} м² · от {fmt.format(r.minPrice)} ₽
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
