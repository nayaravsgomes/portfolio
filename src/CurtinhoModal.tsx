import { Fragment, useEffect, useRef } from 'react'
import { curtinhos, curtinhosEn } from './data/curtinhos'
import type { ModalImg } from './data/curtinhos'
import { LightboxHost, ZoomImage, type LbItem } from './Lightbox'

// Links externos dos botões dos modais (o botão só aparece se o link estiver preenchido)
export const LINKS = {
  jogo: 'https://broil-scuba-03241232.figma.site/',
  behance: 'https://www.behance.net/gallery/120068681/Prontuapp-UXUI',
}

const img = (src: string) => `${import.meta.env.BASE_URL}assets/curtinhos/${src}`
const P = 'font-pr text-[14px] leading-[1.5] tracking-[-0.08px] text-black/80'
const CAP = 'mt-3 text-center font-pr text-[12px] italic leading-[1.5] tracking-[-0.06px] text-black/55'

function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((t, i) => (i % 2 ? <strong key={i} className="font-ps">{t}</strong> : <Fragment key={i}>{t}</Fragment>))}
    </>
  )
}

function Paras({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((t, i) => (
        <p key={i} className={P}>
          <Bold text={t} />
        </p>
      ))}
    </div>
  )
}

function Fig({ m }: { m: ModalImg }) {
  return (
    <figure>
      <ZoomImage file={m.src} url={img(m.src)} alt={m.caption ?? ''} w={m.w} h={m.h} framed className="w-full" />
      {m.caption ? <figcaption className={CAP}>{m.caption}</figcaption> : null}
    </figure>
  )
}

function ExtLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex w-fit items-center gap-3 rounded-[24px] border border-black/80 px-5 py-3 font-ps text-[16px] tracking-[-0.08px] text-black/80 transition-colors hover:bg-[#ffe9f5]"
    >
      {label}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M10.5 3h4.5v4.5M15 3l-6.5 6.5M13 10.5V14a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

export const MODAL_ORDER = ['quick-access', 'consumo', 'jogo', 'prontuapp']

export default function CurtinhoModal({
  slug,
  onClose,
  onNavigate,
  en,
  labels,
}: {
  slug: string
  onClose: () => void
  onNavigate: (slug: string) => void
  en: boolean
  labels: { close: string; prev: string; next: string; of: string }
}) {
  const c = (en ? curtinhosEn : curtinhos)[slug]
  const scrollRef = useRef<HTMLDivElement>(null)
  const idx = MODAL_ORDER.indexOf(slug)
  const go = (d: number) => {
    const n = MODAL_ORDER[idx + d]
    if (n) onNavigate(n)
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    const el = document.getElementById('app-scroll') ?? document.body
    const prev = el.style.overflow
    el.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      el.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  })
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [slug])
  if (!c) return null
  const href = c.linkKey ? LINKS[c.linkKey] : ''
  const items: LbItem[] = c.layout === 'stack' ? (c.sections ?? []).flatMap((s) => s.imgs) : c.img ? [c.img] : []
  const imgFrame = c.img?.bare ? '' : 'rounded-[16px] border border-black/10'
  const head = (
    <div>
      <h1 className="font-pm text-[24px] leading-[1.2] tracking-[-0.48px] text-black/80">{c.title}</h1>
      {c.subtitle ? <p className="mt-3 font-pr text-[14px] italic text-black/55">{c.subtitle}</p> : null}
    </div>
  )
  const navBtn = 'grid size-9 cursor-pointer place-items-center rounded-full text-black/80 transition-colors hover:bg-[#ffe9f5] disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent'
  return (
    <LightboxHost items={items} dir="curtinhos" alternate>
    <div role="dialog" aria-modal="true" aria-label={c.title} onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-3 backdrop-blur-[2px]">
      <div onClick={(e) => e.stopPropagation()} className="relative grid h-[90vh] w-[94vw] max-w-[1680px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.25)] md:h-[85vh] md:w-[90vw]">
        <div className="absolute right-[60px] top-4 z-20 flex items-center gap-1">
          <button onClick={() => go(-1)} disabled={idx <= 0} aria-label={labels.prev} className={navBtn}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M11 3.5L5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span aria-live="polite" className="min-w-[48px] text-center font-pr text-[13px] tracking-[-0.06px] text-black/60">
            {idx + 1} {labels.of} {MODAL_ORDER.length}
          </span>
          <button onClick={() => go(1)} disabled={idx >= MODAL_ORDER.length - 1} aria-label={labels.next} className={navBtn}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M7 3.5L12.5 9 7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <button onClick={onClose} aria-label={labels.close} className="absolute right-4 top-4 z-20 grid size-10 cursor-pointer place-items-center rounded-full bg-white/90 text-black/80 transition-colors hover:bg-[#ffe9f5]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="shrink-0 px-6 pb-2 pt-16 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-[1360px] pr-12">{head}</div>
        </div>
        <div className="relative mb-16 min-h-0 [container-type:size]">
          <div ref={scrollRef} className="modal-scroll absolute inset-0 overflow-y-auto px-6 md:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1360px] pb-6">
              {c.layout === 'stack' ? (
                <div className="flex flex-col gap-16 pt-6">
                  {c.sections?.map((s) => (
                    <section key={s.title} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[37px]">
                      <div className="flex flex-col gap-5">
                        <h2 className="font-ps text-[16px] leading-[1.5] tracking-[-0.08px] text-black/80">{s.title}</h2>
                        <Paras items={s.paras} />
                      </div>
                      <div className="flex flex-col gap-6">
                        {s.imgs.map((m) => (
                          <Fig key={m.src} m={m} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <>
                  {c.img ? (
                    <ZoomImage file={c.img.src} url={img(c.img.src)} alt="" w={c.img.w} h={c.img.h} framed={!c.img.bare} className="mb-8 mt-6 w-full lg:hidden" />
                  ) : null}
                  {c.img ? (
                    <div className="sticky top-0 z-10 hidden h-0 lg:block">
                      <div className={`absolute left-0 top-6 aspect-[2511/1536] w-[min(calc((100%_-_32px)_*_2_/_3),calc((100cqh_-_48px)_*_1.635))] overflow-hidden ${imgFrame}`}>
                        <ZoomImage fill file={c.img.src} url={img(c.img.src)} alt="" w={c.img.w} h={c.img.h} fit="cover" className="h-full w-full" />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-5 pt-6 max-lg:pt-0 lg:pl-[calc(min(calc((100%_-_32px)_*_2_/_3),calc((100cqh_-_48px)_*_1.635))_+_32px)]">
                    <Paras items={c.paras ?? []} />
                    {href && c.button ? <ExtLink href={href} label={c.button} /> : null}
                  </div>
                </>
              )}
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute left-0 right-3 top-0 z-[5] h-6 bg-gradient-to-b from-white to-white/0" />
          <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-3 z-[5] h-6 bg-gradient-to-t from-white to-white/0" />
        </div>
      </div>
    </div>
    </LightboxHost>
  )
}
