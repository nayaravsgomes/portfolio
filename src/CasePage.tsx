import { Fragment, useState, type ReactNode } from 'react'
import { caseData, caseDataEn } from './data/cases'
import { LightboxHost, ZoomImage, type LbItem } from './Lightbox'
import type { CaseBlock, CaseImg } from './data/cases'

const img = (src: string) => `${import.meta.env.BASE_URL}assets/cases/${src}`

// Subscritos (₂) viram <sub>
function Rich({ text }: { text: string }) {
  const parts = text.split(/([₀-₉])/)
  return (
    <>
      {parts.map((p, i) =>
        /^[₀-₉]$/.test(p) ? <sub key={i}>{'₀₁₂₃₄₅₆₇₈₉'.indexOf(p)}</sub> : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  )
}

const P = 'font-pr text-[14px] leading-[1.5] tracking-[-0.08px] text-black/80'
const H2 = 'font-ps text-[20px] leading-[1.5] tracking-[-0.4px] text-[#ff87a5]'
const H3 = 'font-ps text-[16px] leading-[1.5] tracking-[-0.08px] text-black/80'
const CAP = 'mt-3 text-center font-pr text-[12px] italic leading-[1.5] tracking-[-0.06px] text-black/55'
const FRAME = 'block h-auto w-full rounded-[16px] border border-black/10'

function GifPlayer({ m }: { m: CaseImg }) {
  const [playing, setPlaying] = useState(false)
  const [run, setRun] = useState(0)
  const en = typeof document !== 'undefined' && document.documentElement.lang.startsWith('en')
  return (
    <button
      type="button"
      onClick={() => {
        setPlaying((v) => !v)
        setRun((r) => r + 1)
      }}
      aria-label={playing ? (en ? 'Stop animation' : 'Parar animação') : en ? 'Play animation' : 'Reproduzir animação'}
      className="group relative block w-full cursor-pointer"
    >
      <img key={playing ? `gif-${run}` : 'poster'} alt={m.caption ?? ''} src={img(playing && m.gif ? m.gif : m.src)} width={m.w} height={m.h} className={FRAME} />
      <span className={`absolute inset-0 grid place-items-center rounded-[16px] transition-colors ${playing ? 'bg-transparent' : 'bg-black/10 group-hover:bg-black/20'}`}>
        {playing ? (
          <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden><rect x="2" y="2" width="3.5" height="10" rx="1" /><rect x="8.5" y="2" width="3.5" height="10" rx="1" /></svg>
          </span>
        ) : (
          <span className="grid size-16 place-items-center rounded-full bg-white/95 text-black/80 shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-105">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" /></svg>
          </span>
        )}
      </span>
    </button>
  )
}

function Pic({ m }: { m: CaseImg }) {
  if (m.gif) return <GifPlayer m={m} />
  return <ZoomImage file={m.src} url={img(m.src)} alt={m.caption ?? ''} w={m.w} h={m.h} framed={!m.bare} className="w-full" />
}

function Paras({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-[22px]">
      {items.map((t, i) => (
        <p key={i} className={P}>
          <Rich text={t} />
        </p>
      ))}
    </div>
  )
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
      <path d="M3 8.5l3.2 3.2L13 4.8" stroke="#ff87a5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Cards({ items }: { items: { title: string; text: string }[] }) {
  // 4 cards: 2 × 2 · 3 cards: uma linha só quando há largura (cada card ≥ ~260px) · 2 cards: lado a lado
  const cols = items.length >= 4 ? 'md:grid-cols-2' : items.length === 3 ? 'min-[900px]:grid-cols-3' : 'md:grid-cols-2'
  return (
    <div className={`grid grid-cols-1 gap-[14px] ${cols}`}>
      {items.map((it) => (
        <div key={it.title} className="flex flex-col gap-2 rounded-[16px] bg-[#fff8fb] p-6">
          <h4 className="font-ps text-[14px] leading-[1.5] tracking-[-0.08px] text-black/80">{it.title}</h4>
          <p className={P}>
            <Rich text={it.text} />
          </p>
        </div>
      ))}
    </div>
  )
}

function Block({ b }: { b: CaseBlock }) {
  switch (b.t) {
    case 'p':
      return (
        <p className={`${P}`}>
          <Rich text={b.text} />
        </p>
      )
    case 'h3':
      return <h3 className={`${H3} pt-6`}>{b.text}</h3>
    case 'cards':
      return <Cards items={b.items} />
    case 'results':
      return <Cards items={b.items} />
    case 'checks':
      return (
        <ul className="flex flex-col gap-1">
          {b.items.map((t) => (
            <li key={t} className="flex items-start gap-[15px] rounded-[12px] bg-[#fff8fb] px-5 py-[11px]">
              <span className="mt-[2.5px] flex"><Check /></span>
              <span className={P}>{t}</span>
            </li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div className="mx-auto w-full max-w-[1176px] overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th key={h} className="px-[26px] py-4 font-ps text-[14px] leading-[1.5] tracking-[-0.08px] text-black/80">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-black/10">
                  {r.map((c, j) => (
                    <td key={j} className={`px-[26px] py-[15px] align-top ${P}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'figs': {
      const row = b.items.length > 1
      return (
        <figure className="flex flex-col items-center">
          <div className={`flex w-full items-start justify-center gap-4 ${row ? '' : ''}`}>
            {b.items.map((m) => (
              <div key={m.src} className="flex min-w-0 flex-col" style={row ? { flex: `${m.w / m.h} 1 0%` } : { width: '100%', maxWidth: m.dw }}>
                <Pic m={m} />
                {m.caption ? <figcaption className={CAP}>{m.caption}</figcaption> : null}
              </div>
            ))}
          </div>
          {b.caption ? <figcaption className={CAP}>{b.caption}</figcaption> : null}
        </figure>
      )
    }
    default:
      return null
  }
}

function SplitRow({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-[38px]">
      <div className="flex flex-col gap-5">{left}</div>
      <div>{right}</div>
    </div>
  )
}

export default function CasePage({ slug, en }: { slug: string; en: boolean }) {
  const c = (en ? caseDataEn : caseData)[slug]
  if (!c) return null
  const items: LbItem[] = []
  for (const s of c.sections)
    for (const b of s.blocks) {
      if (b.t === 'split' && b.img) items.push({ ...b.img, caption: b.img.caption ?? b.caption })
      else if (b.t === 'figs') b.items.forEach((m) => !m.gif && items.push({ ...m, caption: m.caption ?? b.caption }))
      else if (b.t === 'solution') b.items.forEach((it) => it.imgs.forEach((m) => !m.gif && items.push({ ...m, caption: m.caption ?? it.title })))
    }
  return (
    <LightboxHost items={items} dir="cases">
    <main className="flex w-full flex-col items-center px-6 pb-10 pt-[88px] md:px-10 lg:px-16">
      <section className="w-full max-w-[960px] pt-8">
        <p className="font-pr text-[14px] uppercase leading-[1.5] tracking-[-0.08px] text-black/70 md:text-[16px]">
          <span className="font-ps text-black/80">{c.eyebrow[0]}</span> <span className="px-1">•</span> {c.eyebrow[1]}
        </p>
        <h1 className="mt-4 font-ps text-[32px] leading-[1.15] tracking-[-0.96px] text-black/80 md:text-[40px]">{c.title}</h1>
        <p className="mt-5 font-pr text-[16px] leading-[1.5] tracking-[-0.12px] text-black/55">
          <Rich text={c.intro} />
        </p>
        <img alt="" src={img(c.cover)} className="mx-auto mt-10 h-auto w-full max-w-[800px]" />
      </section>

      <div className="mt-10 flex w-full max-w-[960px] flex-col gap-20 lg:mt-6">
        {c.sections.map((s) => {
          const first = s.blocks[0]
          if (first && first.t === 'split') {
            return (
              <section key={s.title}>
                <SplitRow
                  left={
                    <>
                      <h2 className={H2}>{s.title}</h2>
                      <Paras items={first.paras} />
                    </>
                  }
                  right={
                    first.img ? (
                      <figure>
                        <Pic m={first.img} />
                        {first.caption ? <figcaption className={CAP}>{first.caption}</figcaption> : null}
                      </figure>
                    ) : null
                  }
                />
              </section>
            )
          }
          const sol = s.blocks.find((b) => b.t === 'solution')
          if (sol && sol.t === 'solution') {
            return (
              <section key={s.title} className="flex flex-col gap-10">
                <h2 className={H2}>{s.title}</h2>
                <div className="flex flex-col gap-20">
                  {sol.items.map((it) => (
                    <SplitRow
                      key={it.title}
                      left={
                        <>
                          <h3 className={H3}>{it.title}</h3>
                          <Paras items={it.paras} />
                        </>
                      }
                      right={
                        <div className="flex flex-col gap-6">
                          {it.imgs.map((m) => (
                            <Pic key={m.src} m={m} />
                          ))}
                        </div>
                      }
                    />
                  ))}
                </div>
              </section>
            )
          }
          return (
            <section key={s.title} className="flex flex-col gap-5">
              <h2 className={H2}>{s.title}</h2>
              {s.blocks.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </section>
          )
        })}
      </div>
    </main>
    </LightboxHost>
  )
}
