import { useCallback, useEffect, useState } from 'react';
import Map from './Map.jsx';
import Feed from './Feed.jsx';

export default function App() {
  const [onFeeds, setOnFeeds] = useState(false);

  const openFeed = useCallback(() => {
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

  return (
    <div className="relative w-dvw h-dvh overflow-hidden">
      <div
        className="flex flex-row size-full transition-transform duration-300 ease-in-out"
        style={{ transform: onFeeds ? 'translateX(-100dvw)' : 'translateX(0)' }}
      >
        <Map onOpenFeed={openFeed} />
        <Feed onClose={closeFeed} />
      </div>
    </div>
  );
}
