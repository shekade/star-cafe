export interface BakeryItem {
  id: string;
  name: string;
  price: number;
  category: 'pastry' | 'bread' | 'coffee' | 'box';
  badge?: string;
  description: string;
  image: string;
  dietary?: string[];
}

export const BAKERY_ITEMS: BakeryItem[] = [
  {
    id: 'classic-croissant',
    name: 'Classic Butter Croissant',
    price: 4.50,
    category: 'pastry',
    badge: 'Our Signature',
    description: '72 laminated folds of cultured Normandy butter. Flakes when you look at it.',
    image: '/src/assets/images/hero_croissant_crumb_1793434738701.jpg',
    dietary: ['Vegetarian', 'Nut-Free'],
  },
  {
    id: 'cardamom-bun',
    name: 'Cardamom Morning Bun',
    price: 5.00,
    category: 'pastry',
    badge: 'Daily Sellout',
    description: 'Laminated dough swirled with toasted green cardamom and raw demerara sugar crunch.',
    image: '/src/assets/images/pastry_cinnamon_bun_1793434739515.jpg',
    dietary: ['Vegetarian'],
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    price: 5.25,
    category: 'pastry',
    description: 'Double batons of 70% dark Valrhona tucked into cloud-like butter layers.',
    image: '/src/assets/images/pastry_pain_chocolat_1793434739673.jpg',
    dietary: ['Vegetarian', 'Nut-Free'],
  },
  {
    id: 'country-sourdough',
    name: 'Country Sourdough Batard',
    price: 9.00,
    category: 'bread',
    badge: '36hr Ferment',
    description: 'Stoneground flour, wild starter, blistered crust with deep airy crumb pockets.',
    image: '/src/assets/images/bakery_counter_bag_1793434740010.jpg',
    dietary: ['Vegan', 'Dairy-Free', 'Nut-Free'],
  },
  {
    id: 'almond-brioche',
    name: 'Almond Frangipane Brioche',
    price: 6.25,
    category: 'pastry',
    description: 'Twice-baked enriched brioche filled with roasted almond cream and flaked almonds.',
    image: '/src/assets/images/pastry_cinnamon_bun_1793434739515.jpg',
    dietary: ['Vegetarian'],
  },
  {
    id: 'weekend-box',
    name: 'Weekend Pastry Box (6)',
    price: 28.00,
    category: 'box',
    badge: 'Best Value',
    description: 'Two croissants, two morning buns, two pains au chocolat. Instant neighborhood hero.',
    image: '/src/assets/images/pastry_table_spread_1793434739663.jpg',
    dietary: ['Vegetarian'],
  },
];

export const CAFE_INFO = {
  name: 'Sunday Crumb',
  tagline: 'A little crust, a lot of joy.',
  aboutKicker: 'A little flour. A lot of Sunday.',
  aboutParagraphs: [
    "We're Sunday Crumb, a neighborhood bakery for slow mornings, quick coffee stops, and the pastry you think about all day.",
    "We give our dough time, our loaves a good crust, and our counter a little something for everyone. Come for your usual. Leave with a new favorite.",
  ],
  address: '18 Market Lane, Brookfield',
  hours: [
    { day: 'Tuesday–Friday', time: '7am–3pm' },
    { day: 'Saturday–Sunday', time: '8am–2pm' },
    { day: 'Monday', time: 'Closed (Resting Dough)' },
  ],
  phone: '(555) 234-5678',
  email: 'hello@sundaycrumb.com',
  instagram: '@sundaycrumb',
  googleMapsUrl: 'https://maps.google.com/?q=18+Market+Lane+Brookfield',
};

export const FAQ_ITEMS = [
  {
    question: 'Do I need to pre-order?',
    answer:
      'Not for daily cravings! We bake all morning for walk-ins. However, if you need more than 6 pastries or our weekend breakfast boxes, placing a pre-order 24 hours ahead guarantees your box is packed and waiting.',
  },
  {
    question: 'Can I collect a pastry box?',
    answer:
      'Yes! Choose your pickup time between 7:30am and 1:30pm. Our express pickup counter lets you skip the main queue, grab your freshly packed box, and be on your way in under 2 minutes.',
  },
  {
    question: 'Will my favourite be available?',
    answer:
      'Our butter croissants and morning buns come out in three hot batches: 7:00am, 9:30am, and 11:30am. Seasonal tarts and weekend specials are limited to single morning bakes, so earlier is always crunchier.',
  },
  {
    question: 'What about dietary requirements?',
    answer:
      'Our sourdough loaves and baguettes are 100% naturally vegan (flour, water, sea salt, wild starter). We offer vegan oat-milk flat whites and a weekly plant-based fruit galette. Because we love butter and flour, cross-contact with gluten is present in our kitchen.',
  },
  {
    question: 'Do you offer catering for events and offices?',
    answer:
      'We certainly do! We cater breakfast meetings, weddings, photo shoots, and neighborhood gatherings with mini pastries, coffee urns, and sandwich boards. Head over to our Catering tab or send us a message below.',
  },
];
