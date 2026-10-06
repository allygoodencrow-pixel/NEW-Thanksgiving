import type { Dish } from './App';

const preview = (file: string, alt: string) => ({
  src: `/resources/printables/${file}.jpeg`,
  alt: `${alt} · printable styling example`,
});

// Select by stable card identity, so editing a printed title cannot break its photo.
export function printableThumbnail(id: string, dishes: Pick<Dish, 'id' | 'group'>[]) {
  if (id === 'menu' || id.startsWith('guest-'))
    return preview('menu-place-setting', 'Thanksgiving menus and printed details at a place setting');
  if (id === 'leftovers')
    return preview('take-home', 'Take-home thank-you signs beside favors and boxes');
  if (id === 'kids')
    return preview('napkin-wraps', 'Thanksgiving napkin wraps at the table');
  if (id.startsWith('activity-'))
    return /gratitude|conversation|thanks/i.test(id)
      ? preview('gratitude-cards', 'Leave a little thanks sign with cards and pens')
      : preview('thanksgiving-sign', 'Thanksgiving gathering sign');
  const dish = dishes.find(d => `dish-${d.id}` === id);
  if (dish?.group === 'Dessert')
    return preview('pie-table', 'Pie table sign and dessert labels');
  if (dish?.group.startsWith('Drink'))
    return preview('thanksgiving-sign', 'Thanksgiving station sign');
  return dish?.group === 'Starch'
    ? preview('food-labels-close', 'Food label cards beside turkey, dressing and potatoes')
    : preview('food-labels', 'Food label cards arranged across a Thanksgiving buffet');
}
