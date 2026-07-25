import { useCallback, useEffect, useRef, useState } from 'react';
import Map from './Map.jsx';
import Feed from './Feed.jsx';

export default function App() {
  const [onFeeds, setOnFeeds] = useState(false);
  const [feedTarget, setFeedTarget] = useState({ index: 0, key: 0 });
  const wrapperRef = useRef(null);
  const onFeedsRef = useRef(onFeeds);

  const openFeed = useCallback((index) => {
    if (typeof index === 'number') {
      setFeedTarget((t) => ({ index, key: t.key + 1 }));
    }
    setOnFeeds(true);
    history.pushState({ view: 'feed' }, '', '');
  }, []);

  const closeFeed = useCallback(() => {
    if (history.state && history.state.view === 'feed') {
      history.back();
    } else {
      setOnFeeds(false);
    }
  }, []);

  useEffect(() => {
    function onPopState(e) {
      if (!e.state || e.state.view !== 'feed') {
        setOnFeeds(false);
      }
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    onFeedsRef.current = onFeeds;
  }, [onFeeds]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let startX = 0;
    let tracking = false;
    let triggered = false;

    function onTouchStart(e) {
      startX = e.touches[0].clientX;
      tracking = true;
      triggered = false;
    }

    function onTouchMove(e) {
      if (!tracking || triggered || !onFeedsRef.current) return;
      const dx = e.touches[0].clientX - startX;
      if (dx <= -20) {
        triggered = true;
        closeFeed();
      }
    }

    function onTouchEnd() {
      tracking = false;
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [closeFeed]);

  return (
    <div ref={wrapperRef} className="relative w-dvw h-dvh overflow-hidden">
      <div
        className="flex flex-row size-full transition-transform duration-300 ease-in-out"
        style={{ transform: onFeeds ? 'translateX(-100dvw)' : 'translateX(0)' }}
      >
        <Map onOpenFeed={openFeed} />
        <Feed target={feedTarget} onClose={closeFeed} />
      </div>
    </div>
  );
}
