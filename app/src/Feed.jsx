import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { events } from './events.js';
import EventCard from './EventCard.jsx';

const WINDOW_RADIUS = 2;

function FeedScroller({ initialIndex }) {
  const feedRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useLayoutEffect(() => {
    const el = feedRef.current;
    if (el) el.scrollTop = initialIndex * el.clientHeight;
  }, []);

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;

    let raf = null;
    function handleScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const cardHeight = el.clientHeight || 1;
        const index = Math.round(el.scrollTop / cardHeight);
        setActiveIndex(Math.max(0, Math.min(events.length - 1, index)));
      });
    }

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const windowStart = Math.max(0, activeIndex - WINDOW_RADIUS);
  const windowEnd = Math.min(events.length - 1, activeIndex + WINDOW_RADIUS);
  const visibleEvents = events.slice(windowStart, windowEnd + 1);
  const cardsBefore = windowStart;
  const cardsAfter = events.length - 1 - windowEnd;

  return (
    <div id="feed" className="feed" ref={feedRef}>
      {cardsBefore > 0 && <div style={{ flex: `0 0 ${cardsBefore * 100}dvh` }} />}

      {visibleEvents.map((event, i) => (
        <EventCard key={event.id} event={event} index={windowStart + i} total={events.length} />
      ))}

      {cardsAfter > 0 && <div style={{ flex: `0 0 ${cardsAfter * 100}dvh` }} />}
    </div>
  );
}

export default function Feed({ target, onClose }) {
  return (
    <>
      <FeedScroller key={target.key} initialIndex={target.index} />

      <button
        type="button"
        onClick={onClose}
        className="absolute left-4 top-4 z-30 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-sm text-white backdrop-blur"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
        </svg>
        Zmień lokalizację
      </button>
    </>
  );
}
