const tagPalette = [
  'border-pink-400/60 text-pink-300',
  'border-sky-400/60 text-sky-300',
  'border-emerald-400/60 text-emerald-300',
];

export default function EventCard({ event, index, total }) {
  return (
    <article id={`event-${index}`} className="card">
      <div className="flex h-full flex-col bg-neutral-950 text-white">
        <div className="relative mx-4 mt-4 min-h-0 flex-1 overflow-hidden rounded-3xl bg-neutral-800">
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
          <button className="absolute right-3 top-14 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <circle cx="7.5" cy="10.5" r="2.25" />
              <circle cx="16.5" cy="6" r="2.25" />
              <circle cx="16.5" cy="18" r="2.25" />
              <path strokeLinecap="round" d="m9.4 9.4 5.2-2.8M9.4 11.6l5.2 2.8" />
            </svg>
          </button>
        </div>

        <div className="shrink-0 px-4 pt-3">
          <h2 className="line-clamp-2 text-xl font-bold leading-snug">{event.title}</h2>

          <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/80">
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 7v5l3 2" />
              </svg>
              {event.date}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 7v5l3 2" />
              </svg>
              {event.duration}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2" />
              </svg>
              {event.place} · {event.distanceKm} km
            </span>
          </div>

          <p className="mt-2 text-xs text-white/50">
            {event.category} · {event.languages}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {event.tags.map((tag, i) => (
              <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-medium ${tagPalette[i % tagPalette.length]}`}>
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-white/70">{event.description}</p>
        </div>

        <div className="flex shrink-0 items-center gap-3 px-4 pb-2 pt-3">
          <button className="flex-1 rounded-full border border-white/20 py-3 text-sm font-semibold">Zobacz szczegóły</button>
          <button
            className="flex-1 rounded-full py-3 text-sm font-semibold text-black"
            style={{ background: 'linear-gradient(90deg, #ff3d8b, #ff8a3d)' }}
          >
            Dołącz
          </button>
        </div>

        <div className="shrink-0 pb-3 text-center text-xs text-white/40">
          {index + 1} / {total}
        </div>
      </div>
    </article>
  );
}
