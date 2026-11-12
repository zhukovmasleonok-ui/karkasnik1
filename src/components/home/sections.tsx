import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, MapPin, Plus } from 'lucide-react';
import { Reveal } from '@/components/layout/Reveal';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { CtaButton } from '@/components/forms/CtaButton';
import { realProjects } from '@/content/projects';
import { realObjects } from '@/content/portfolio';
import {
  manifesto,
  technologies,
  projectCategories,
  advantages,
  workSteps,
  configurations,
  specialGroups,
  company,
  trustBullets,
  faq,
} from '@/content/site';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ------------------- Манифест «Дома с душой» ------------------- */

export function Manifesto() {
  return (
    <section className="py-16 lg:py-24" aria-label="Философия компании">
      <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Философия"
            title={
              <>
                Мы верим, что счастье живёт там, куда{' '}
                <span className="italic text-pine">вложена душа</span>
              </>
            }
          />
          <div className="mt-8 space-y-5 text-pretty text-[16px] leading-relaxed text-graphite/85">
            {manifesto.paragraphs.slice(0, 4).map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} className="mt-10">
            <p className="border-l-2 border-oak pl-5 font-display text-[20px] italic leading-relaxed text-pine-deep">
              {manifesto.final}
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="relative">
          <div className="relative overflow-hidden rounded-sm">
            <Image
              src="/images/family2.jpg"
              alt="Семья на природе — семейный подход как внутренняя ценность компании"
              width={574}
              height={720}
              className="h-full w-full rounded-sm object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div className="mt-6 space-y-4 text-pretty text-[15px] leading-relaxed text-graphite-soft">
            {manifesto.closing.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------- Технологии ------------------- */

export function TechnologiesSection() {
  return (
    <section className="border-t border-line bg-paper-2/60 py-16 lg:py-24" aria-label="Технологии строительства">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Технологии"
            title={
              <>
                Разные технологии — под разные задачи{' '}
                <span className="italic text-pine">и формат жизни</span>
              </>
            }
            text="Не навязываем одну технологию всем. Подбираем дом под Ваш участок, задачи, бюджет, сроки и то, каким Вы видите свой будущий дом."
          />
          <Reveal delay={100}>
            <Link
              href="/technologies"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-pine"
            >
              Все технологии подробно
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((t, i) => (
            <Reveal
              key={t.slug}
              delay={i * 90}
              as="article"
              className="group flex flex-col overflow-hidden rounded-sm border border-line bg-card transition-shadow duration-500 hover:shadow-[0_20px_50px_-24px_rgba(15,42,21,0.35)]"
            >
              <Link href={`/technologies#${t.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-pine px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#f7f5f0]">
                  {t.term.replace(/(Срок.*—\s*)/, '')}
                </span>
                {t.isDemoImage && (
                  <span className="demo-chip absolute right-4 top-4">демо-фото</span>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[22px] font-semibold text-graphite">
                  {t.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-graphite-soft">
                  {t.short}
                </p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-display text-[19px] font-semibold text-pine">{t.priceFrom}</p>
                  <p className="mt-0.5 text-[12.5px] text-graphite-soft">{t.priceNote}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------- Проекты: Комфорт+ / Бизнес+ ------------------- */

export function ProjectsTeaser() {
  const shown = realProjects.slice(0, 3);
  const fmt = new Intl.NumberFormat('ru-RU');
  return (
    <section className="py-16 lg:py-24" aria-label="Проекты домов">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Проекты"
            title={
              <>
                27 проектов — от «Комфорт+» до{' '}
                <span className="italic text-pine">«Бизнес+»</span>
              </>
            }
            text="Реальные проекты с действующего прайса: три уровня цен — «черновая», «предчистовая» и «под ключ». Фильтры по технологии, площади и бюджету."
          />
          <Reveal delay={100}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-pine"
            >
              Смотреть каталог
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 90}
              as="article"
              className="group flex flex-col overflow-hidden rounded-sm border border-line bg-card transition-shadow duration-500 hover:shadow-[0_20px_50px_-24px_rgba(15,42,21,0.35)]"
            >
              <Link href={`/projects/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={p.images[0] || '/images/project-sip.jpg'}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-[#f7f5f0]/95 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-pine-deep">
                  {p.techNames[0]}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[21px] font-semibold text-graphite">{p.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-graphite-soft line-clamp-3">
                  {p.description[0]}
                </p>
                <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <p className="font-display text-[19px] font-semibold text-pine">
                      от {fmt.format(p.minPrice)} ₽
                    </p>
                    <p className="mt-0.5 text-[12px] text-graphite-soft">
                      {p.area} м²{p.features[1] ? ` · ${p.features[1]}` : ''}
                    </p>
                  </div>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-graphite transition-colors hover:border-pine hover:bg-pine hover:text-[#f7f5f0]"
                    aria-label={`Подробнее о проекте ${p.name}`}
                  >
                    <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCategories() {
  return (
    <section className="pb-4" aria-label="Категории проектов">
      <div className="container-x grid gap-6 md:grid-cols-2">
        {projectCategories.map((c, i) => (
          <Reveal
            key={c.key}
            delay={i * 80}
            className="rounded-sm border border-line bg-card p-7"
          >
            <p className="font-display text-[24px] font-semibold text-pine">{c.name}</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-graphite-soft">{c.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------- Преимущества (реальные фото) ------------------- */

export function Advantages() {
  return (
    <section className="border-t border-line bg-paper-2/60 py-16 lg:py-24" aria-label="Преимущества компании">
      <div className="container-x">
        <SectionHeading
          eyebrow="Почему мы"
          title={
            <>
              Преимущества, которые{' '}
              <span className="italic text-pine">видно на стройке</span>
            </>
          }
          text="Факты из нашей работы — без общих слов: свои бригады, материалы камерной сушки, договор и гарантия."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {advantages.map((a, i) => (
            <Reveal
              key={a.title}
              delay={(i % 2) * 90}
              as="article"
              className="group relative overflow-hidden rounded-sm"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={a.image}
                  alt={a.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-ink/85 via-pine-ink/25 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-[20px] font-semibold text-[#f7f5f0]">
                  {a.title}
                </h3>
                <p className="mt-1.5 max-w-[420px] text-[13.5px] leading-relaxed text-[#e9e6dc]/85">
                  {a.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------- Этапы работы ------------------- */

export function WorkSteps() {
  return (
    <section className="py-16 lg:py-24" aria-label="Этапы работы">
      <div className="container-x">
        <SectionHeading
          eyebrow="Как мы работаем"
          title={
            <>
              Шесть шагов — от участка{' '}
              <span className="italic text-pine">до заселения</span>
            </>
          }
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {workSteps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 60}
              as="li"
              className="bg-card p-7"
            >
              <p className="font-display text-[34px] font-semibold leading-none text-oak/70">{s.n}</p>
              <h3 className="mt-4 font-display text-[19px] font-semibold text-graphite">{s.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-graphite-soft">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------- Комплектации ------------------- */

export function Configurations() {
  return (
    <section className="border-t border-line bg-paper-2/60 py-16 lg:py-24" aria-label="Комплектации">
      <div className="container-x">
        <SectionHeading
          eyebrow="Комплектации"
          title={
            <>
              От базового решения до дома{' '}
              <span className="italic text-pine">«под ключ»</span>
            </>
          }
          text="Честно и без сложных строительных терминов объясняем, что входит в каждый вариант отделки."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {configurations.map((c, i) => (
            <Reveal key={c.n} delay={i * 90} className="relative rounded-sm border border-line bg-card p-7">
              <span className="absolute right-6 top-6 font-display text-[44px] font-semibold leading-none text-pine/10">
                {c.n}
              </span>
              <h3 className="max-w-[240px] font-display text-[20px] font-semibold text-graphite">
                {c.name}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-graphite-soft">{c.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150} className="mt-10 flex flex-col items-start gap-4 rounded-sm border border-oak/35 bg-oak-soft/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] leading-relaxed text-graphite">
            Приглашаем на производство и проводим экскурсии на строящихся или готовых
            объектах — оцените качество вживую и задайте любые вопросы.
          </p>
          <CtaButton
            variant="primary"
            payload={{ type: 'tour', title: 'Записаться на экскурсию', submitLabel: 'Записаться' }}
            className="shrink-0"
          >
            Записаться на экскурсию
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------- Почему нам доверяют ------------------- */

export function Trust() {
  return (
    <section className="py-16 lg:py-24" aria-label="Почему нам доверяют">
      <div className="container-x">
        <SectionHeading
          eyebrow="Доверие"
          title={
            <>
              Почему нам{' '}
              <span className="italic text-pine">доверяют?</span>
            </>
          }
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <Reveal>
            <figure>
              <Image
                src="/images/certificates.jpg"
                alt="Сертификаты соответствия системы добровольной сертификации компании"
                width={1280}
                height={372}
                className="rounded-sm border border-line bg-white object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <figcaption className="mt-3 text-[12.5px] text-graphite-soft">
                Сертификаты соответствия системы добровольной сертификации
              </figcaption>
            </figure>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {trustBullets.map((b, i) => (
                <Reveal key={b} delay={i * 50} as="li" className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-pine" strokeWidth={2.4} aria-hidden="true" />
                  <span className="text-[14.5px] leading-relaxed text-graphite/85">{b}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="overflow-hidden rounded-sm border border-line bg-card">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/family.jpg"
                alt="Семья — специальные условия для отдельных категорий граждан и их семей"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-[20px] font-semibold text-graphite">
                Специальные условия
              </h3>
              <p className="mt-1.5 text-[13.5px] text-graphite-soft">
                На постоянной основе предоставляем специальные условия для отдельных
                категорий граждан и их семей:
              </p>
              <ul className="mt-4 flex max-h-[168px] flex-wrap gap-2 overflow-y-auto scroll-thin pr-1">
                {specialGroups.map((g) => (
                  <li
                    key={g}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2/70 px-3 py-1.5 text-[12px] leading-tight text-graphite/80"
                  >
                    <Plus className="h-3 w-3 shrink-0 text-oak" aria-hidden="true" />
                    {g}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] text-graphite-soft">
                Уточните подробности по телефону{' '}
                <a href={company.phoneHref} className="font-semibold text-pine underline underline-offset-4">
                  {company.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------- Ипотека teaser ------------------- */

export function MortgageTeaser() {
  return (
    <section className="border-y border-line bg-night text-[#f7f5f0] py-16 lg:py-20" aria-label="Ипотека и оплата">
      <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <SectionHeading
          dark
          eyebrow="Ипотека и оплата"
          title={
            <>
              Договор. Материнский капитал.{' '}
              <span className="italic text-oak-soft">Ипотека</span>
            </>
          }
          text="Аккредитованы в Сбербанке, ВТБ и ДОМ.РФ. Гибкие условия оплаты и фиксация стоимости при заключении договора до 1 января — забудьте о росте цен."
        />
        <Reveal delay={120} className="flex flex-col gap-4">
          <CtaButton
            variant="bronze"
            payload={{ type: 'mortgage', title: 'Расчёт ипотеки', message: 'Интересует ипотека / материнский капитал' }}
          >
            Рассчитать ипотеку
          </CtaButton>
          <Link
            href="/mortgage"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm border border-[#f7f5f0]/35 px-6 py-3.5 text-[15px] font-semibold transition-colors hover:border-oak hover:bg-[#f7f5f0]/10"
          >
            Ипотека и калькуляторы
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------- География ------------------- */

export function Geography() {
  return (
    <section className="py-16 lg:py-20" aria-label="География работы">
      <div className="container-x">
        <SectionHeading
          eyebrow="География"
          title={
            <>
              Работаем только своими бригадами{' '}
              <span className="italic text-pine">по всей территории Крыма</span>
            </>
          }
        />
        <Reveal delay={100} className="mt-10">
          <div className="relative overflow-hidden rounded-sm">
            <Image
              src="/images/karta-geografiya.png"
              alt="Спутниковая карта Крыма — работаем своими бригадами по всему полуострову"
              width={1280}
              height={750}
              className="w-full rounded-sm object-cover"
              loading="lazy"
              sizes="100vw"
            />
          </div>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {['Севастополь', 'Симферополь', 'Ялта', 'Керчь', 'Белогорск', 'Судак', 'Феодосия'].map(
            (c, i) => (
              <Reveal key={c} delay={i * 40}>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[13.5px] font-medium text-graphite/80">
                  <MapPin className="h-3.5 w-3.5 text-oak" aria-hidden="true" />
                  {c}
                </span>
              </Reveal>
            )
          )}
          <Reveal delay={320}>
            <span className="inline-flex items-center gap-2 rounded-full border border-oak/40 bg-oak-soft/50 px-4 py-2 text-[13.5px] font-semibold text-[#7a5a33]">
              + весь Крым
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------- FAQ ------------------- */

export function FaqSection() {
  return (
    <section className="border-t border-line py-16 lg:py-24" aria-label="Частые вопросы">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Частые{' '}
              <span className="italic text-pine">вопросы</span>
            </>
          }
          text="Не нашли ответ? Позвоните нам или оставьте заявку — консультируем бесплатно, выезжаем на участок."
        />
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-left font-display text-[17px] font-medium text-graphite hover:text-pine [&>svg]:text-oak">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[14.5px] leading-relaxed text-graphite-soft">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------- Отзывы заказчиков (реальные, со старого сайта) ------------------- */

export function ReviewsTeaser() {
  const withReviews = realObjects.filter((o) => o.review).slice(0, 3);
  if (withReviews.length === 0) return null;
  return (
    <section className="border-t border-line bg-paper-2/60 py-16 lg:py-24" aria-label="Отзывы заказчиков">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Отзывы"
            title={
              <>
                Живые отзывы <span className="italic text-pine">с реальных объектов</span>
              </>
            }
            text="Настоящие отзывы заказчиков с Авито — по домам, построенным в разных городах Крыма."
          />
          <Reveal delay={100}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-pine"
            >
              Все объекты и отзывы
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {withReviews.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 80}
              as="figure"
              className="flex flex-col rounded-sm border border-line bg-card p-6"
            >
              <blockquote className="flex-1 text-[14px] leading-relaxed text-graphite/85">
                «{o.review!.text.slice(0, 240)}
                {o.review!.text.length > 240 ? '…' : ''}»
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-4 text-[13.5px] font-semibold text-graphite">
                {o.review!.author || 'Заказчик'}
                <span className="mt-0.5 block text-[12px] font-normal text-graphite-soft">
                  {o.review!.source} · {o.location || 'Крым'}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
