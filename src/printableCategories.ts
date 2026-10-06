import collection from './printCollection.json';

const categories = [
  { id: 'signs', name: 'Signs', description: 'Food stations, drinks, Little Sips, welcome and table signs.', photo: 'thanksgiving-sign.jpeg' },
  { id: 'menus', name: 'Menus', description: 'Dinner, harvest and drink menus.', photo: 'menu-place-setting.jpeg' },
  { id: 'labels', name: 'Labels + tent cards', description: 'Buffet labels, dessert stickers, drink labels and allergy notes.', photo: 'food-labels.jpeg' },
  { id: 'places', name: 'Place cards', description: 'Personalized cards for the guests in your plan.', photo: 'menu-place-setting.jpeg' },
  { id: 'toppers', name: 'Toppers + flags', description: 'Food picks, straw flags, round toppers and treat-bag toppers.', photo: 'food-labels-close.jpeg' },
  { id: 'wraps', name: 'Wraps + bands', description: 'Napkin bands, cup sleeves and food and drink wraps.', photo: 'napkin-wraps.jpeg' },
  { id: 'tags', name: 'Tags + charms', description: 'Drink charms, Charm Bar and Build a Charm.', photo: 'menu-place-setting.jpeg' },
  { id: 'activities', name: 'Activities + kids', description: 'Gratitude, coloring, sketching, memory and gift-bag station signs.', photo: 'gratitude-cards.jpeg' },
  { id: 'take-home', name: 'Take-home + favors', description: 'Please Take One, A Little Thanks, Thank You and leftover details.', photo: 'take-home.jpeg' },
];

// Keep collection designs independent of the menu. Personalized cards keep their stable IDs.
export function groupPrintables<T extends { id: string }>(cards: T[]) {
  const categoryFor = (id: string) => id === 'menu' ? 'menus'
    : id.startsWith('dish-') ? 'labels'
    : id.startsWith('guest-') ? 'places'
    : id === 'leftovers' ? 'take-home' : 'activities';
  return categories.map(category => ({
    ...category,
    src: `/resources/printables/${category.photo}`,
    cards: cards.filter(card => categoryFor(card.id) === category.id),
    designs: collection.filter(item => item.category === category.id),
  }));
}
