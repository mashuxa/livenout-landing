import { useEffect, useRef, useState } from 'react';
import { events } from './events.js';
import EventCard from './EventCard.jsx';

const PAGE_SIZE = 5;

export default function Feed({ onClose }) {
  const [loaded, setLoaded] = useState(PAGE_SIZE);
  const [showToast, setShowToast] = useState(false);
  const feedRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (loaded >= events.length) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            setShowToast(true);
            setTimeout(() => {
              setLoaded((n) => Math.min(n + PAGE_SIZE, events.length));
              setShowToast(false);
            }, 500);
          }
        });
      },
      { root: feedRef.current, threshold: 0.6 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loaded]);

  const visibleEvents = events.slice(0, loaded);

  return (
    <section className="relative size-full shrink-0 overflow-hidden">
      <div id="feed" ref={feedRef} className="feed">
        {visibleEvents.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} total={events.length} />
        ))}
        {loaded < events.length && <div ref={sentinelRef} className="h-px shrink-0" />}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute left-4 top-4 z-30 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-sm text-white backdrop-blur"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
        </svg>
        Назад
      </button>

      <div
        className={`pointer-events-none fixed bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black transition-opacity duration-200 ${
          showToast ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Загружаем ещё…
      </div>
    </section>
  );
}
