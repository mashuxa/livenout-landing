import { useEffect, useRef } from 'react';

export default function SwipeToClose({ onSwipeLeft, className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
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
      if (!tracking || triggered) return;
      const dx = e.touches[0].clientX - startX;
      if (dx <= -20) {
        triggered = true;
        onSwipeLeft();
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
  }, [onSwipeLeft]);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
