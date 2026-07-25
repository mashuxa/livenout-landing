const eventTemplates = [
  { title: 'Retro Wave — koncert synth-pop', category: 'Muzyka', tags: ['Dziś', 'Na żywo', 'Super samemu'], description: 'Koncert z coverami hitów lat 80.: synth-pop, neony i taneczny wibe na całą noc.' },
  { title: 'Kolacja przy świecach na dachu', category: 'Jedzenie i napoje', tags: ['Romantyczne', 'Mała grupa'], description: 'Kameralna kolacja na dachu z widokiem na miasto: 4 dania i kieliszek wina w prezencie.' },
  { title: 'Poranna joga nad morzem', category: 'Sport', tags: ['Na luzie', 'Za darmo'], description: 'Łagodna praktyka o wschodzie słońca, prosto na piasku. Maty niepotrzebne — tylko dobry humor.' },
  { title: 'Open mic: wieczór stand-upu', category: 'Sztuka i kultura', tags: ['Wyluzowane', '18+'], description: 'Pięciu komików, jeden mikrofon i żadnych zasad. Przyjdź ze znajomymi albo sam — nie zanudzisz się.' },
  { title: 'Miejski przejazd rowerowy, 20 km', category: 'Sport', tags: ['Aktywne', 'Grupa'], description: 'Spokojny wieczorny przejazd wzdłuż nabrzeża z postojami na zdjęcia i lody.' },
  { title: 'Warsztat ceramiki', category: 'Sztuka i kultura', tags: ['Warsztat', 'Mała grupa'], description: 'Lepimy na kole garncarskim pod okiem mistrza. Swoją pracę odbierasz po tygodniu.' },
  { title: 'Kino pod chmurką', category: 'Kino', tags: ['Wyluzowane', 'Weź koc'], description: 'Pokaz kultowego filmu na dużym ekranie na podwórku. Koc i popcorn — swój albo na miejscu.' },
  { title: 'Gry planszowe w barze', category: 'Networking', tags: ['Swobodnie', 'Super samemu'], description: 'Biblioteka pięćdziesięciu gier i towarzystwo gotowe zagrać w każdą z nich.' },
  { title: 'Bieg na 5 km wzdłuż nabrzeża', category: 'Sport', tags: ['Aktywne', 'Za darmo'], description: 'Towarzyski bieg bez pomiaru czasu. Potem rozciąganie i świeżo wyciskane soki.' },
  { title: 'Free market i wymiana ubrań', category: 'Społeczność', tags: ['Eko', 'Wstęp wolny'], description: 'Przynieś rzeczy, których już nie nosisz, i znajdź nowe — bez pieniędzy, tylko wymiana.' },
];

const places = ['Riverside Terrace', 'Central Square', 'South Beach Court', 'Blue Note Bar', 'Old Town Yard', 'Rooftop 25', 'Gallery Hall', 'Skate Park', 'Botanical Garden', 'Loft 9'];
const languages = ['Polski, English', 'Polski, Українська', 'English', 'Polski, English, Русский'];
const dayLabels = ['Dziś', 'Jutro', 'Pt', 'Sob', 'Nie', 'Pon'];

export const events = Array.from({ length: 30 }, (_, i) => {
  const template = eventTemplates[i % eventTemplates.length];
  const going = 8 + ((i * 7) % 90);
  const goal = going + 3 + (i % 5) * 4;
  const hour = 10 + ((i * 3) % 12);
  return {
    id: i,
    title: template.title,
    category: template.category,
    tags: template.tags,
    description: template.description,
    place: places[i % places.length],
    languages: languages[i % languages.length],
    distanceKm: (1.2 + (i % 12) * 3.7).toFixed(1),
    date: `${dayLabels[i % dayLabels.length]}, ${hour}:00`,
    duration: `${1 + (i % 3)}h`,
    going,
    goal,
    image: `https://picsum.photos/seed/livenout-${i}/900/1200`,
  };
});

export const markerIndexes = [0, 3, 7, 11, 14, 18, 22, 27];
export const markerPositions = [
  { top: '32%', left: '58%' },
  { top: '48%', left: '22%' },
  { top: '65%', left: '70%' },
  { top: '20%', left: '40%' },
  { top: '75%', left: '35%' },
  { top: '40%', left: '80%' },
  { top: '58%', left: '12%' },
  { top: '15%', left: '65%' },
];
