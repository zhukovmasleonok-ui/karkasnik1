'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, SearchX } from 'lucide-react';
import { realProjects, type RealProject } from '@/content/projects';
import { projectCategories } from '@/content/site';
import { cn } from '@/lib/utils';

const areaOptions = [
  { key: 'all', label: 'Любая', test: () => true },
  { key: 's', label: 'до 40 м²', test: (a: number) => a <= 40 },
  { key: 'm', label: '40–80 м²', test: (a: number) => a > 40 && a <= 80 },
  { key: 'l', label: 'от 80 м²', test: (a: number) => a > 80 },
];

const techOptions = [
  { key: 'all', label: 'Все технологии' },
  { key: 'sip', label: 'СИП-панельные' },
  { key: 'prefab', label: 'Каркасные «Префаб»' },
  { key: 'modular', label: 'Модульные' },
];

const kindOptions = [
  { key: 'all', label: 'Любой тип' },
  { key: 'house', label: 'Дома' },
  { key: 'bath', label: 'Бани' },
  { key: 'commercial', label: 'Коммерческие' },
];

const MAX_PRICE = 6_000_000;

export function CatalogClient() {
  const [category, setCategory] = useState<'all' | 'comfort' | 'business'>('all');
  const [tech, setTech] = useState('all');
  const [area, setArea] = useState('all');
  const [kind, setKind] = useState('all');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const filtered = useMemo(() => {
    return realProjects.filter((p) => {
      if (category !== 'all' && !p.sections.includes(category)) return false;
      if (tech !== 'all' && !p.tech.includes(tech as RealProject['tech'][number])) return false;
      const areaOpt = areaOptions.find((o) => o.key === area)!;
      if (!areaOpt.test(p.area)) return false;
      if (kind !== 'all' && p.kind !== kind) return false;
      if (p.minPrice > maxPrice) return false;
      return true;
    });
  }, [category, tech, area, kind, maxPrice]);

  const reset = () => {
    setCategory('all');
    setTech('all');
    setArea('all');
    setKind('all');
    setMaxPrice(MAX_PRICE);
  };

  const selectCls =
    'h-11 w-full rounded-sm border border-line bg-card px-3.5 text-[14px] font-medium text-graphite transition-colors focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/20';

  return (
    <>
      {/* Фильтры */}
      <form
        className="mt-10 rounded-sm border border-line bg-card p-5 sm:p-6"
        role="search"
        aria-label="Фильтры проектов"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-graphite-soft">
            Фильтры
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-[13px] font-semibold text-pine underline underline-offset-4 hover:no-underline"
          >
            Сбросить
          </button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="f-tech" className="mb-1.5 block text-[12.5px] font-semibold text-graphite">
              Технология
            </label>
            <select id="f-tech" value={tech} onChange={(e) => setTech(e.target.value)} className={selectCls}>
              {techOptions.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-area" className="mb-1.5 block text-[12.5px] font-semibold text-graphite">
              Площадь
            </label>
            <select id="f-area" value={area} onChange={(e) => setArea(e.target.value)} className={selectCls}>
              {areaOptions.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-kind" className="mb-1.5 block text-[12.5px] font-semibold text-graphite">
              Тип постройки
            </label>
            <select id="f-kind" value={kind} onChange={(e) => setKind(e.target.value)} className={selectCls}>
              {kindOptions.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-price" className="mb-1.5 block text-[12.5px] font-semibold text-graphite">
              Бюджет до:{' '}
              <span className="text-pine">{new Intl.NumberFormat('ru-RU').format(maxPrice)} ₽</span>
            </label>
            <input
              id="f-price"
              type="range"
              min={1_180_000}
              max={MAX_PRICE}
              step={50_000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-[#1e5128]"
              aria-valuemin={1180000}
              aria-valuemax={MAX_PRICE}
              aria-valuenow={maxPrice}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Категория проекта">
          {[{ key: 'all' as const, name: 'Все категории' }, ...projectCategories].map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key)}
              aria-pressed={category === c.key}
              className={cn(
                'min-h-[40px] rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors',
                category === c.key
                  ? 'border-pine bg-pine text-[#f7f5f0]'
                  : 'border-line bg-transparent text-graphite/75 hover:border-pine/50'
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </form>

      {/* Результаты */}
      <p className="mt-8 text-[14px] text-graphite-soft" role="status" aria-live="polite">
        Найдено проектов: <span className="font-semibold text-graphite">{filtered.length}</span>
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-sm border border-dashed border-line bg-card px-6 py-16 text-center">
          <SearchX className="h-9 w-9 text-oak" strokeWidth={1.6} aria-hidden="true" />
          <p className="font-display text-xl text-graphite">Под ваш фильтр пока ничего не нашлось</p>
          <p className="max-w-[420px] text-[14px] leading-relaxed text-graphite-soft">
            Мы реализуем как типовые, так и уникальные проекты — оставьте заявку, и мы
            подберём или спроектируем дом под Ваш участок и бюджет.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 min-h-[44px] rounded-sm border border-pine/50 px-5 py-2.5 text-[14px] font-semibold text-pine hover:bg-pine hover:text-[#f7f5f0]"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-sm border border-line bg-card transition-shadow duration-500 hover:shadow-[0_20px_50px_-24px_rgba(15,42,21,0.35)]"
            >
              <Link href={`/projects/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={p.images[0] || '/images/project-sip.jpg'}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-[#f7f5f0]/95 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-pine-deep">
                  {p.techNames[0]}
                </span>
                {p.kind === 'bath' && (
                  <span className="absolute right-4 top-4 rounded-sm bg-[#1f3d2b]/90 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#f7f5f0]">
                    баня
                  </span>
                )}
                {p.kind === 'commercial' && (
                  <span className="absolute right-4 top-4 rounded-sm bg-oak/95 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#f7f5f0]">
                    коммерческий
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[21px] font-semibold text-graphite">{p.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-graphite-soft line-clamp-3">
                  {p.description[0]}
                </p>
                <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <p className="font-display text-[19px] font-semibold text-pine">
                      от {new Intl.NumberFormat('ru-RU').format(p.minPrice)} ₽
                    </p>
                    <p className="mt-0.5 text-[12px] text-graphite-soft">
                      {p.area} м²{p.features[1] ? ` · ${p.features[1]}` : ''} · «{p.prices[0]?.label.replace(/Цена в ["«]?|Цена ["«]?|["»]/g, '') || 'черновая'}»
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
            </article>
          ))}
        </div>
      )}
    </>
  );
}
