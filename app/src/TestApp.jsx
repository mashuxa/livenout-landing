import { useState } from 'react';
import { Drawer } from '@base-ui/react/drawer';
import Map from './Map.jsx';
import { FeedScroller } from './Feed.jsx';

export default function TestApp() {
  const [open, setOpen] = useState(false);
  const [feedTarget, setFeedTarget] = useState({ index: 0, key: 0 });

  function openFeed(index = 0) {
    setFeedTarget((t) => ({ index, key: t.key + 1 }));
    setOpen(true);
  }

  return (
    <Drawer.Provider>
      <Drawer.IndentBackground className="fixed inset-0 bg-black" />

      <Drawer.Indent
        className="relative h-dvh w-dvw origin-top overflow-hidden will-change-transform
          [transition:transform_0.4s_cubic-bezier(0.32,0.72,0,1),border-radius_0.25s_cubic-bezier(0.32,0.72,0,1)]
          [transform:scale(1)] data-active:[transform:scale(0.94)] data-active:rounded-[1.5rem]"
      >
        <Map onOpenFeed={openFeed} />
      </Drawer.Indent>

      <Drawer.Root swipeDirection="right" open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Backdrop
            className="fixed inset-0 bg-black/50 transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]
              opacity-[calc(1-var(--drawer-swipe-progress))] data-swiping:duration-0
              data-ending-style:opacity-0 data-starting-style:opacity-0"
          />
          <Drawer.Viewport className="fixed inset-0 flex items-stretch justify-end">
            <Drawer.Popup
              className="relative h-dvh w-dvw overflow-hidden bg-neutral-950 transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                [transform:translateX(var(--drawer-swipe-movement-x))] data-swiping:select-none
                data-ending-style:[transform:translateX(100%)] data-starting-style:[transform:translateX(100%)]"
            >
              <FeedScroller key={feedTarget.key} initialIndex={feedTarget.index} />

              <Drawer.Close className="absolute left-4 top-4 z-30 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-sm text-white backdrop-blur">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
                </svg>
                Zmień lokalizację
              </Drawer.Close>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </Drawer.Provider>
  );
}
