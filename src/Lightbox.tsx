import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type LbItem = { src: string; w: number; h: number; caption?: string | null }

export const ZoomCtx = createContext<(file: string) => void>(() => {})

const isEn = () => typeof document !== 'undefined' && document.documentElement.lang.startsWith('en')

/** Imagem com skeleton enquanto carrega e clique para ampliar (cursor de zoom). */
export function ZoomImage({
  file,
  url,
  alt,
  w,
  h,
  className = '',
  fill = false,
  fit = 'contain',
  framed = false,
}: {
  file: string
  url: string
  alt: string
  w: number
  h: number
  className?: string
  fill?: boolean
  fit?: 'contain' | 'cover'
  framed?: boolean
}) {
  const open = useContext(ZoomCtx)
  const [loaded, setLoaded] = useState(false)
  const ref = useCallback((el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true)
  }, [])
  return (
    <button
      type="button"
      onClick={() => open(file)}
      aria-label={`${isEn() ? 'Enlarge image' : 'Ampliar imagem'}${alt ? `: ${alt}` : ''}`}
      className={`relative block cursor-zoom-in overflow-hidden ${framed ? 'rounded-[16px]' : ''} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff87a5] ${className}`}
      style={fill ? undefined : { aspectRatio: `${w} / ${h}` }}
    >
      {!loaded ? <span aria-hidden className="absolute inset-0 animate-pulse bg-black/[0.06]" /> : null}
      <img
        ref={ref}
        src={url}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${fit === 'cover' ? 'object-cover object-top' : 'object-fill'} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {framed ? <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[16px] border border-black/10" /> : null}
    </button>
  )
}

function Lightbox({ items, dir, index, setIndex, onClose }: { items: LbItem[]; dir: string; index: number; setIndex: (i: number) => void; onClose: () => void }) {
  const it = items[index]
  const en = isEn()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(false), [index])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        onClose()
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.stopImmediatePropagation()
        setIndex(index - 1)
      } else if (e.key === 'ArrowRight' && index < items.length - 1) {
        e.stopImmediatePropagation()
        setIndex(index + 1)
      }
    }
    const el = document.getElementById('app-scroll')
    const prev = el?.style.overflow ?? ''
    if (el) el.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey, true)
    return () => {
      if (el) el.style.overflow = prev
      window.removeEventListener('keydown', onKey, true)
    }
  }, [index, items.length, onClose, setIndex])
  const btn = 'grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white/10'
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={en ? 'Image viewer' : 'Visualizador de imagem'}
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
      className="fixed inset-0 z-[70] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm"
    >
      <button onClick={(e) => { e.stopPropagation(); onClose() }} aria-label={en ? 'Close' : 'Fechar'} className={`${btn} absolute right-4 top-4 z-10`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      {items.length > 1 ? (
        <>
          <button onClick={(e) => { e.stopPropagation(); setIndex(index - 1) }} disabled={index === 0} aria-label={en ? 'Previous image' : 'Imagem anterior'} className={`${btn} absolute left-4 top-1/2 z-10 -translate-y-1/2`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M11 3.5L5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIndex(index + 1) }} disabled={index === items.length - 1} aria-label={en ? 'Next image' : 'Próxima imagem'} className={`${btn} absolute right-4 top-1/2 z-10 -translate-y-1/2`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M7 3.5L12.5 9 7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </>
      ) : null}
      <div className="relative flex min-h-[120px] min-w-[120px] items-center justify-center">
        {!loaded ? <span role="status" aria-label={en ? 'Loading' : 'Carregando'} className="absolute size-8 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}
        <img
          key={it.src}
          src={`${import.meta.env.BASE_URL}assets/${dir}/${it.src}`}
          alt={it.caption ?? ''}
          width={it.w}
          height={it.h}
          onLoad={() => setLoaded(true)}
          style={{ maxWidth: `min(92vw, ${it.w}px)`, maxHeight: 'calc(100vh - 130px)' }}
          className={`block h-auto w-auto rounded-[8px] bg-white object-contain transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <p className="max-w-[92vw] text-center font-pr text-[13px] leading-[1.5] text-white/80">
        {it.caption ? <span>{it.caption} · </span> : null}
        {index + 1} {en ? 'of' : 'de'} {items.length}
      </p>
    </div>,
    document.body,
  )
}

export function LightboxHost({ items, dir, children, alternate = false }: { items: LbItem[]; dir: string; children: ReactNode; alternate?: boolean }) {
  const [idx, setIdx] = useState<number | null>(null)
  const open = useCallback(
    (file: string) => {
      const i = items.findIndex((x) => x.src === file)
      if (i >= 0) setIdx(i)
    },
    [items],
  )
  const close = useCallback(() => setIdx(null), [])
  return (
    <ZoomCtx.Provider value={open}>
      {alternate ? <div className={idx !== null ? 'invisible' : undefined}>{children}</div> : children}
      {idx !== null && items[idx] ? <Lightbox items={items} dir={dir} index={idx} setIndex={setIdx} onClose={close} /> : null}
    </ZoomCtx.Provider>
  )
}
