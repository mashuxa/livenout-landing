import { events, markerIndexes, markerPositions } from './events.js';

export default function Map({ onOpenFeed }) {
  return (
    <section
      className="relative size-full shrink-0 bg-neutral-900 bg-cover bg-center"
      style={{ backgroundImage: "url('https://livenout.com/images/map-dark.jpg')" }}
    >
      {markerIndexes.map((index, i) => {
        const pos = markerPositions[i];
        return (
          <button
            key={index}
            type="button"
            aria-label={events[index].title}
            className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black/30 bg-green-500"
            style={{ top: pos.top, left: pos.left }}
            onClick={() => onOpenFeed(index)}
          />
        );
      })}

      <button
        type="button"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg"
        onClick={() => onOpenFeed()}
      >
        Explore events <span className="text-neutral-500">({events.length})</span>
      </button>
    </section>
  );
}
