const eventTemplates = [
  { title: 'Retro Wave — synth-pop концерт', category: 'Музыка', tags: ['Today', 'Live', 'Great alone'], description: 'Живой концерт с кавер-версиями хитов 80-х: синти-поп, неон и танцевальный вайб на всю ночь.' },
  { title: 'Ужин при свечах на крыше', category: 'Еда и напитки', tags: ['Romantic', 'Small group'], description: 'Камерный ужин на крыше с видом на город: сет из 4 блюд и бокал вина в подарок.' },
  { title: 'Утренняя йога у моря', category: 'Спорт', tags: ['Relaxed', 'Free'], description: 'Мягкая практика на закате прямо на песке. Коврики не нужны — только хорошее настроение.' },
  { title: 'Open mic: стендап-вечер', category: 'Искусство и культура', tags: ['Chill', '18+'], description: 'Пять комиков, один микрофон и никаких правил. Заходи с друзьями или один — не соскучишься.' },
  { title: 'Городской велозаезд, 20 км', category: 'Спорт', tags: ['Active', 'Group'], description: 'Неспешный вечерний заезд по набережной с остановками на фото и мороженое.' },
  { title: 'Мастер-класс по керамике', category: 'Искусство и культура', tags: ['Hands-on', 'Small group'], description: 'Лепим на гончарном круге под руководством мастера. Забираешь свою работу через неделю.' },
  { title: 'Кино под открытым небом', category: 'Кино', tags: ['Chill', 'Bring a blanket'], description: 'Показ культового фильма на большом экране во дворе. Плед и попкорн — с собой или на месте.' },
  { title: 'Настольные игры в баре', category: 'Нетворкинг', tags: ['Casual', 'Great alone'], description: 'Библиотека из полусотни игр и компания, готовая сыграть в любую из них.' },
  { title: 'Забег на 5 км по набережной', category: 'Спорт', tags: ['Active', 'Free'], description: 'Дружеский забег без хронометража. После — растяжка и свежевыжатые соки.' },
  { title: 'Фримаркет и своп одежды', category: 'Сообщество', tags: ['Eco', 'Free entry'], description: 'Принеси вещи, которые больше не носишь, и найди новые — без денег, только обмен.' },
];

const places = ['Riverside Terrace', 'Central Square', 'South Beach Court', 'Blue Note Bar', 'Old Town Yard', 'Rooftop 25', 'Gallery Hall', 'Skate Park', 'Botanical Garden', 'Loft 9'];
const languages = ['Русский, English', 'Polski, English', 'Русский, Українська', 'English', 'Русский, Polski, English'];
const dayLabels = ['Сегодня', 'Завтра', 'Пт', 'Сб', 'Вс', 'Пн'];

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
