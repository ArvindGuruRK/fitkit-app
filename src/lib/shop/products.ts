import type { Product, ProductCategory, FilterParams } from './types';

export const products: Product[] = [
  // ── Whey Protein ───────────────────────────────────────────────────────────
  {
    id: 'prod-001',
    slug: 'on-gold-standard-whey',
    name: 'Gold Standard 100% Whey',
    brand: 'Optimum Nutrition',
    category: 'whey-protein',
    shortDescription: 'The world\'s best-selling whey protein powder. 24g of protein per serving.',
    description: 'Optimum Nutrition\'s Gold Standard 100% Whey uses pure whey protein isolates as the primary ingredient. Each serving delivers 24g of protein, 5.5g of BCAAs, and only 1–3g of fat. Ideal for post-workout recovery and lean muscle building.',
    images: [
      '/images/products/gold-standard-whey.png',
    ],
    price: 3499,
    originalPrice: 4199,
    rating: 4.8,
    reviewCount: 1247,
    variants: [
      { id: 'v1', label: '1 kg', priceModifier: 0, inStock: true },
      { id: 'v2', label: '2 kg', priceModifier: 2200, inStock: true },
      { id: 'v3', label: '5 kg', priceModifier: 6500, inStock: false },
    ],
    tags: ['whey isolate', 'post-workout', 'lean muscle'],
    inStock: true,
    isBestSeller: true,
    isFeatured: true,
    nutritionFacts: {
      'Serving Size': '30g',
      'Protein': '24g',
      'BCAAs': '5.5g',
      'Calories': '120',
      'Fat': '1.5g',
      'Carbs': '3g',
    },
    reviews: [
      { id: 'r1', author: 'Rahul M.', rating: 5, comment: 'Best whey on the market. Mixes perfectly and tastes great!', date: '2025-03-15' },
      { id: 'r2', author: 'Priya S.', rating: 5, comment: 'Great quality protein. The chocolate flavor is amazing.', date: '2025-02-28' },
      { id: 'r3', author: 'Ankit K.', rating: 4, comment: 'Good protein but a bit pricey. Worth it for the quality.', date: '2025-01-20' },
    ],
    createdAt: '2024-06-01',
  },
  {
    id: 'prod-002',
    slug: 'muscleblaze-biozyme-whey',
    name: 'Biozyme Performance Whey',
    brand: 'MuscleBlaze',
    category: 'whey-protein',
    shortDescription: 'Enhanced absorption with BioZyme technology. 25g protein per serving.',
    description: 'MuscleBlaze Biozyme uses patented enzyme technology for up to 50% better absorption than regular whey. With 25g of whey protein and added digestive enzymes, it\'s perfect for athletes who want maximum results from every scoop.',
    images: [
      '/images/products/biozyme-performance-whey.png',
    ],
    price: 2799,
    originalPrice: 3299,
    rating: 4.6,
    reviewCount: 834,
    variants: [
      { id: 'v1', label: '1 kg', priceModifier: 0, inStock: true },
      { id: 'v2', label: '2 kg', priceModifier: 1800, inStock: true },
    ],
    tags: ['enhanced absorption', 'digestive enzymes', 'performance'],
    inStock: true,
    isBestSeller: true,
    nutritionFacts: {
      'Serving Size': '33g',
      'Protein': '25g',
      'BCAAs': '5.8g',
      'Calories': '130',
      'Fat': '2g',
      'Carbs': '4g',
    },
    reviews: [
      { id: 'r1', author: 'Vikram R.', rating: 5, comment: 'Best Indian whey protein. No bloating and great taste.', date: '2025-04-10' },
    ],
    createdAt: '2024-08-10',
  },
  {
    id: 'prod-003',
    slug: 'dymatize-iso100-whey',
    name: 'ISO100 Hydrolyzed Whey',
    brand: 'Dymatize',
    category: 'whey-protein',
    shortDescription: 'Ultra-pure hydrolyzed isolate. 25g protein, 0g sugar per serving.',
    description: 'Dymatize ISO100 is made from 100% whey protein isolate and hydrolyzed whey. With 25g of protein and virtually zero fat, sugar, or lactose per serving, it\'s the cleanest protein for serious athletes and those with lactose sensitivity.',
    images: [
      '/images/products/iso100-hydrolyzed-whey.png',
    ],
    price: 4299,
    rating: 4.7,
    reviewCount: 562,
    variants: [
      { id: 'v1', label: '600g', priceModifier: 0, inStock: true },
      { id: 'v2', label: '1.36 kg', priceModifier: 2500, inStock: true },
    ],
    tags: ['hydrolyzed', 'zero sugar', 'lactose free'],
    inStock: true,
    isNew: true,
    nutritionFacts: {
      'Serving Size': '32g',
      'Protein': '25g',
      'BCAAs': '5.6g',
      'Calories': '110',
      'Fat': '0.5g',
      'Sugar': '0g',
    },
    reviews: [
      { id: 'r1', author: 'Sneha P.', rating: 5, comment: 'Zero bloating! Perfect for my lactose intolerance.', date: '2025-05-01' },
    ],
    createdAt: '2025-01-15',
  },

  // ── Creatine ────────────────────────────────────────────────────────────────
  {
    id: 'prod-004',
    slug: 'on-micronized-creatine',
    name: 'Micronized Creatine Monohydrate',
    brand: 'Optimum Nutrition',
    category: 'creatine',
    shortDescription: 'Pure micronized creatine for strength, power, and muscle volume.',
    description: 'Optimum Nutrition\'s Micronized Creatine Monohydrate is the most researched form of creatine. It mixes easily, is unflavored, and can be added to any drink or protein shake. 3g of pure creatine per serving to fuel your high-intensity workouts.',
    images: [
      '/images/products/micronized-creatine.png',
    ],
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewCount: 2103,
    variants: [
      { id: 'v1', label: '300g', priceModifier: 0, inStock: true },
      { id: 'v2', label: '600g', priceModifier: 800, inStock: true },
    ],
    tags: ['creatine monohydrate', 'strength', 'unflavored'],
    inStock: true,
    isBestSeller: true,
    isFeatured: true,
    nutritionFacts: {
      'Serving Size': '5g',
      'Creatine Monohydrate': '5g',
      'Calories': '0',
      'Protein': '0g',
      'Fat': '0g',
    },
    reviews: [
      { id: 'r1', author: 'Karan J.', rating: 5, comment: 'Noticeable strength gains in 2 weeks. No side effects.', date: '2025-03-22' },
      { id: 'r2', author: 'Deepa L.', rating: 5, comment: 'Mixes perfectly with my protein shake. Essential supplement.', date: '2025-02-14' },
    ],
    createdAt: '2024-05-20',
  },
  {
    id: 'prod-005',
    slug: 'muscleblaze-creatine-hcl',
    name: 'Creatine HCL (Hydrochloride)',
    brand: 'MuscleBlaze',
    category: 'creatine',
    shortDescription: 'More soluble form of creatine. No loading phase, no bloating.',
    description: 'MuscleBlaze Creatine HCL is bonded to hydrochloric acid for greater solubility and bioavailability. Requires a smaller dose than monohydrate, absorbs faster, and produces no water retention or bloating. Ideal for those sensitive to creatine monohydrate.',
    images: [
      '/images/products/creatine-hcl.png',
    ],
    price: 1499,
    rating: 4.5,
    reviewCount: 421,
    variants: [
      { id: 'v1', label: '75 Servings', priceModifier: 0, inStock: true },
    ],
    tags: ['creatine hcl', 'no bloating', 'fast absorption'],
    inStock: true,
    isNew: true,
    nutritionFacts: {
      'Serving Size': '1g',
      'Creatine HCL': '750mg',
      'Calories': '0',
    },
    reviews: [],
    createdAt: '2025-02-01',
  },

  // ── Mass Gainer ──────────────────────────────────────────────────────────────
  {
    id: 'prod-006',
    slug: 'serious-mass-gainer',
    name: 'Serious Mass Weight Gainer',
    brand: 'Optimum Nutrition',
    category: 'mass-gainer',
    shortDescription: '1250 calories, 50g protein per serving. The ultimate mass builder.',
    description: 'Optimum Nutrition\'s Serious Mass is the ultimate weight gain formula. With over 1250 calories per serving, 50g of blended protein, 250g of carbohydrates, and 25 vitamins and minerals, it\'s engineered for those looking to add serious size. Mix with water, milk, or blend with your favorite ingredients.',
    images: [
      '/images/products/serious-mass-gainer.png',
    ],
    price: 3999,
    originalPrice: 4799,
    rating: 4.6,
    reviewCount: 987,
    variants: [
      { id: 'v1', label: '2.72 kg', priceModifier: 0, inStock: true },
      { id: 'v2', label: '5.44 kg', priceModifier: 2800, inStock: true },
      { id: 'v3', label: '12 kg', priceModifier: 9000, inStock: false },
    ],
    tags: ['mass gainer', 'bulking', 'high calorie'],
    inStock: true,
    isBestSeller: true,
    isFeatured: true,
    nutritionFacts: {
      'Serving Size': '334g',
      'Calories': '1250',
      'Protein': '50g',
      'Carbohydrates': '252g',
      'Fat': '4.5g',
      'Vitamins & Minerals': '25',
    },
    reviews: [
      { id: 'r1', author: 'Ajay B.', rating: 5, comment: 'Gained 4kg in 2 months. Tastes great with milk!', date: '2025-04-05' },
    ],
    createdAt: '2024-07-01',
  },
  {
    id: 'prod-007',
    slug: 'muscleblaze-super-gainer-xxl',
    name: 'Super Gainer XXL',
    brand: 'MuscleBlaze',
    category: 'mass-gainer',
    shortDescription: 'Enriched with 30g protein and digestive enzymes for mass building.',
    description: 'MuscleBlaze Super Gainer XXL is a scientifically formulated weight gainer enriched with complex carbohydrates, 30g of blended protein, and digestive enzymes for better nutrient absorption. Ideal for hard gainers looking to pack on quality muscle mass.',
    images: [
      '/images/products/super-gainer-xxl.png',
    ],
    price: 2499,
    originalPrice: 2999,
    rating: 4.4,
    reviewCount: 632,
    variants: [
      { id: 'v1', label: '3 kg', priceModifier: 0, inStock: true },
      { id: 'v2', label: '6 kg', priceModifier: 1800, inStock: true },
    ],
    tags: ['mass gainer', 'digestive enzymes', 'hard gainer'],
    inStock: true,
    nutritionFacts: {
      'Serving Size': '150g',
      'Calories': '600',
      'Protein': '30g',
      'Carbohydrates': '96g',
      'Fat': '5g',
    },
    reviews: [],
    createdAt: '2024-09-15',
  },

  // ── Protein Shake ───────────────────────────────────────────────────────────
  {
    id: 'prod-008',
    slug: 'on-essential-amino-energy',
    name: 'Essential Amino Energy',
    brand: 'Optimum Nutrition',
    category: 'protein-shake',
    shortDescription: 'Energy + amino acids. Pre-workout, intra-workout, or anytime.',
    description: 'Optimum Nutrition\'s Essential Amino Energy combines essential amino acids (EAAs) with a natural energy blend. Use it as a pre-workout for focus and energy, during training to support muscle endurance, or as an afternoon pick-me-up. 5g of amino acids per serving with 100mg of caffeine from natural sources.',
    images: [
      '/images/products/essential-amino-energy.png',
    ],
    price: 1899,
    originalPrice: 2299,
    rating: 4.7,
    reviewCount: 743,
    variants: [
      { id: 'v1', label: '270g (30 srvgs)', priceModifier: 0, inStock: true },
      { id: 'v2', label: '585g (65 srvgs)', priceModifier: 1400, inStock: true },
    ],
    tags: ['amino energy', 'pre-workout', 'energy'],
    inStock: true,
    isFeatured: true,
    nutritionFacts: {
      'Serving Size': '9g',
      'Calories': '10',
      'Total Amino Acids': '5g',
      'Caffeine (natural)': '100mg',
      'Vitamin C': '250mg',
    },
    reviews: [
      { id: 'r1', author: 'Ritu N.', rating: 5, comment: 'Great energy boost without the jitters. Love the watermelon flavor!', date: '2025-04-18' },
    ],
    createdAt: '2024-06-20',
  },
  {
    id: 'prod-009',
    slug: 'myprotein-impact-whey-shake',
    name: 'Impact Whey Protein Shake',
    brand: 'Myprotein',
    category: 'protein-shake',
    shortDescription: 'Convenient ready-to-drink 25g protein shake. No prep needed.',
    description: 'Myprotein\'s Impact Whey Protein Shake is a convenient ready-to-drink option delivering 25g of high-quality whey protein. Perfect for on-the-go nutrition after the gym or as a healthy snack. Low in fat and sugar, available in a range of delicious flavors.',
    images: [
      '/images/products/impact-whey-shake.png',
    ],
    price: 299,
    rating: 4.3,
    reviewCount: 312,
    variants: [
      { id: 'v1', label: 'Single (500ml)', priceModifier: 0, inStock: true },
      { id: 'v2', label: 'Pack of 6', priceModifier: 1100, inStock: true },
      { id: 'v3', label: 'Pack of 12', priceModifier: 2000, inStock: true },
    ],
    tags: ['ready to drink', 'rtd', 'on the go'],
    inStock: true,
    nutritionFacts: {
      'Serving Size': '500ml',
      'Calories': '200',
      'Protein': '25g',
      'Fat': '5g',
      'Sugar': '4g',
    },
    reviews: [],
    createdAt: '2024-10-01',
  },
  {
    id: 'prod-010',
    slug: 'nakpro-plant-protein',
    name: 'Nakpro Plant Protein',
    brand: 'Nakpro',
    category: 'protein-shake',
    shortDescription: '100% vegan protein blend. 24g protein from pea, brown rice & hemp.',
    description: 'Nakpro Plant Protein is a premium vegan protein powder made from a blend of pea protein, brown rice protein, and hemp seed protein. With 24g of complete protein per serving and a rich chocolate flavor, it\'s perfect for vegans and those with dairy intolerances.',
    images: [
      '/images/products/nakpro-plant-protein.png',
    ],
    price: 2199,
    originalPrice: 2599,
    rating: 4.5,
    reviewCount: 289,
    variants: [
      { id: 'v1', label: '500g', priceModifier: 0, inStock: true },
      { id: 'v2', label: '1 kg', priceModifier: 1600, inStock: true },
    ],
    tags: ['vegan', 'plant protein', 'dairy free'],
    inStock: true,
    isNew: true,
    nutritionFacts: {
      'Serving Size': '35g',
      'Calories': '140',
      'Protein': '24g',
      'Carbs': '6g',
      'Fat': '3g',
    },
    reviews: [],
    createdAt: '2025-01-01',
  },

  // ── Accessories ──────────────────────────────────────────────────────────────
  {
    id: 'prod-011',
    slug: 'fitkits-shaker-bottle-pro',
    name: 'FitKits Pro Shaker Bottle',
    brand: 'FitKits',
    category: 'accessories',
    shortDescription: 'BPA-free 700ml shaker with leak-proof lid and mixing ball.',
    description: 'The FitKits Pro Shaker Bottle is built for athletes who demand performance from every piece of equipment. Made from BPA-free Tritan plastic, it features a leak-proof screw cap, a stainless steel mixing ball for lump-free protein shakes, and a wide mouth for easy cleaning. Dishwasher safe.',
    images: [
      '/images/products/fitkits-shaker-bottle-pro.png',
    ],
    price: 499,
    originalPrice: 699,
    rating: 4.6,
    reviewCount: 1534,
    variants: [
      { id: 'v1', label: 'Black', priceModifier: 0, inStock: true },
      { id: 'v2', label: 'Red', priceModifier: 0, inStock: true },
      { id: 'v3', label: 'White', priceModifier: 0, inStock: false },
    ],
    tags: ['shaker', 'bpa free', 'gym essentials'],
    inStock: true,
    isBestSeller: true,
    isFeatured: true,
    reviews: [
      { id: 'r1', author: 'Manish G.', rating: 5, comment: 'No leaks, mixes perfectly. Best shaker I\'ve owned.', date: '2025-05-10' },
      { id: 'r2', author: 'Tanya R.', rating: 4, comment: 'Great quality but the lid can be tricky to open after a workout.', date: '2025-04-22' },
    ],
    createdAt: '2024-04-01',
  },
  {
    id: 'prod-012',
    slug: 'fitkits-gym-gloves',
    name: 'FitKits Gym Training Gloves',
    brand: 'FitKits',
    category: 'accessories',
    shortDescription: 'Anti-slip padded gloves for heavy lifts. Full wrist support.',
    description: 'FitKits Gym Training Gloves protect your palms during heavy lifting while providing full wrist support with the integrated wrist wrap. The anti-slip grip pattern and breathable mesh backing keep your hands comfortable and dry throughout your workout.',
    images: [
      '/images/products/fitkits-gym-gloves.png',
    ],
    price: 699,
    originalPrice: 899,
    rating: 4.4,
    reviewCount: 876,
    variants: [
      { id: 'v1', label: 'Small', priceModifier: 0, inStock: true },
      { id: 'v2', label: 'Medium', priceModifier: 0, inStock: true },
      { id: 'v3', label: 'Large', priceModifier: 0, inStock: true },
      { id: 'v4', label: 'XL', priceModifier: 0, inStock: false },
    ],
    tags: ['gym gloves', 'wrist support', 'anti-slip'],
    inStock: true,
    reviews: [],
    createdAt: '2024-05-15',
  },
  {
    id: 'prod-013',
    slug: 'resistance-bands-set',
    name: 'Resistance Bands Set (5 Pack)',
    brand: 'FitKits',
    category: 'accessories',
    shortDescription: '5 resistance levels from 10–50 lbs. Perfect for home or travel.',
    description: 'The FitKits Resistance Bands Set includes 5 latex bands with resistance levels ranging from 10 to 50 lbs. Use them for warm-ups, stretching, strength training, physical therapy, or on-the-go workouts. Includes a carry bag for easy storage.',
    images: [
      '/images/products/resistance-bands-set.png',
    ],
    price: 899,
    rating: 4.5,
    reviewCount: 654,
    tags: ['resistance bands', 'home workout', 'travel gym'],
    inStock: true,
    isNew: true,
    reviews: [],
    createdAt: '2025-03-01',
  },
  {
    id: 'prod-014',
    slug: 'fitkits-insulated-water-bottle',
    name: 'FitKits Insulated Steel Bottle',
    brand: 'FitKits',
    category: 'accessories',
    shortDescription: 'Double-wall vacuum insulation. Keeps cold 24h, hot 12h.',
    description: 'The FitKits Insulated Steel Bottle is crafted from 18/8 food-grade stainless steel with double-wall vacuum insulation. It keeps your drinks cold for up to 24 hours and hot for up to 12 hours. Wide mouth design, BPA-free, and sweat-free exterior.',
    images: [
      '/images/products/fitkits-insulated-steel-bottle.png',
    ],
    price: 999,
    originalPrice: 1299,
    rating: 4.7,
    reviewCount: 1102,
    variants: [
      { id: 'v1', label: '500ml – Black', priceModifier: 0, inStock: true },
      { id: 'v2', label: '750ml – Black', priceModifier: 200, inStock: true },
      { id: 'v3', label: '500ml – Red', priceModifier: 0, inStock: true },
      { id: 'v4', label: '750ml – Red', priceModifier: 200, inStock: false },
    ],
    tags: ['insulated bottle', 'stainless steel', 'hydration'],
    inStock: true,
    isFeatured: true,
    reviews: [
      { id: 'r1', author: 'Pooja V.', rating: 5, comment: 'Keeps water ice cold even after 2 hours at the gym!', date: '2025-04-30' },
    ],
    createdAt: '2024-08-01',
  },

  // ── Merchandise ─────────────────────────────────────────────────────────────
  {
    id: 'prod-015',
    slug: 'fitkits-performance-tshirt',
    name: 'FitKits Performance T-Shirt',
    brand: 'FitKits',
    category: 'merchandise',
    shortDescription: 'Moisture-wicking athletic fit tee. Breathable polyester blend.',
    description: 'The FitKits Performance T-Shirt is made from a lightweight polyester-spandex blend engineered for peak performance. The moisture-wicking fabric pulls sweat away from your skin, while the athletic fit allows full range of motion. Available in multiple colors with the iconic FitKits logo.',
    images: [
      '/images/products/fitkits-performance-t-shirt.png',
    ],
    price: 799,
    originalPrice: 999,
    rating: 4.5,
    reviewCount: 423,
    variants: [
      { id: 'v1', label: 'S – Black', priceModifier: 0, inStock: true },
      { id: 'v2', label: 'M – Black', priceModifier: 0, inStock: true },
      { id: 'v3', label: 'L – Black', priceModifier: 0, inStock: true },
      { id: 'v4', label: 'XL – Black', priceModifier: 0, inStock: false },
    ],
    tags: ['t-shirt', 'athletic wear', 'moisture wicking'],
    inStock: true,
    isBestSeller: true,
    reviews: [],
    createdAt: '2024-06-15',
  },
  {
    id: 'prod-016',
    slug: 'fitkits-gym-bag',
    name: 'FitKits Pro Gym Duffel Bag',
    brand: 'FitKits',
    category: 'merchandise',
    shortDescription: '45L capacity duffel with wet compartment and shoe pocket.',
    description: 'The FitKits Pro Gym Duffel Bag is your ultimate gym companion. With 45L of capacity, a separate wet/dry compartment for sweaty gear, a ventilated shoe pocket, multiple interior pockets for organization, and padded shoulder straps — it has everything you need for a complete workout session.',
    images: [
      '/images/products/fitkits-gym-bag.png',
    ],
    price: 1999,
    originalPrice: 2499,
    rating: 4.6,
    reviewCount: 287,
    variants: [
      { id: 'v1', label: 'Black', priceModifier: 0, inStock: true },
      { id: 'v2', label: 'Navy Blue', priceModifier: 0, inStock: true },
    ],
    tags: ['gym bag', 'duffel', 'travel'],
    inStock: true,
    isFeatured: true,
    reviews: [
      { id: 'r1', author: 'Arjun S.', rating: 5, comment: 'Fits everything I need for the gym. The wet compartment is a game changer.', date: '2025-03-28' },
    ],
    createdAt: '2024-07-20',
  },
  {
    id: 'prod-017',
    slug: 'fitkits-compression-shorts',
    name: 'FitKits Compression Shorts',
    brand: 'FitKits',
    category: 'merchandise',
    shortDescription: 'High-compression support for quads and hamstrings. Anti-chafe.',
    description: 'FitKits Compression Shorts are designed to reduce muscle fatigue and support faster recovery. The high-compression fabric supports your quads, hamstrings, and glutes during high-intensity activities. Anti-chafe flat-lock seams and a 4-way stretch fabric provide maximum comfort.',
    images: [
      '/images/products/fitkits-compression-shorts.png',
    ],
    price: 1199,
    rating: 4.3,
    reviewCount: 198,
    variants: [
      { id: 'v1', label: 'S', priceModifier: 0, inStock: true },
      { id: 'v2', label: 'M', priceModifier: 0, inStock: true },
      { id: 'v3', label: 'L', priceModifier: 0, inStock: true },
    ],
    tags: ['compression', 'shorts', 'recovery'],
    inStock: true,
    isNew: true,
    reviews: [],
    createdAt: '2025-02-15',
  },
  {
    id: 'prod-018',
    slug: 'fitkits-yoga-mat',
    name: 'FitKits Premium Yoga Mat',
    brand: 'FitKits',
    category: 'merchandise',
    shortDescription: '6mm thick non-slip TPE mat. Perfect for yoga, pilates, and stretching.',
    description: 'The FitKits Premium Yoga Mat is crafted from eco-friendly TPE (Thermoplastic Elastomer) for a non-toxic, non-slip surface. At 6mm thick, it provides excellent joint cushioning for yoga, pilates, and stretching. Includes a carry strap for easy transport.',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
    ],
    price: 1499,
    originalPrice: 1799,
    rating: 4.7,
    reviewCount: 534,
    variants: [
      { id: 'v1', label: 'Purple', priceModifier: 0, inStock: true },
      { id: 'v2', label: 'Black', priceModifier: 0, inStock: true },
      { id: 'v3', label: 'Teal', priceModifier: 0, inStock: false },
    ],
    tags: ['yoga mat', 'tpe', 'eco-friendly'],
    inStock: true,
    reviews: [
      { id: 'r1', author: 'Nisha M.', rating: 5, comment: 'Perfect thickness and great grip. No slipping during hot yoga.', date: '2025-04-12' },
    ],
    createdAt: '2024-09-01',
  },
  {
    id: 'prod-019',
    slug: 'muscleblaze-mb-vite-multivitamin',
    name: 'MB Vite Daily Multivitamin',
    brand: 'MuscleBlaze',
    category: 'merchandise',
    shortDescription: '60 tablets. 25 essential vitamins & minerals for daily wellness.',
    description: 'MuscleBlaze MB Vite is a comprehensive multivitamin and mineral supplement designed for active individuals. Each tablet delivers 25 essential vitamins and minerals including Vitamin D3, B12, Zinc, and Magnesium to support immunity, energy production, and overall health.',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
    ],
    price: 599,
    originalPrice: 799,
    rating: 4.4,
    reviewCount: 712,
    tags: ['multivitamin', 'vitamins', 'wellness'],
    inStock: true,
    nutritionFacts: {
      'Vitamin C': '80mg',
      'Vitamin D3': '400 IU',
      'Vitamin B12': '2.2mcg',
      'Zinc': '10mg',
      'Magnesium': '375mg',
    },
    reviews: [],
    createdAt: '2024-11-01',
  },
  {
    id: 'prod-020',
    slug: 'on-pro-bcaa-powder',
    name: 'Pro BCAA Powder',
    brand: 'Optimum Nutrition',
    category: 'protein-shake',
    shortDescription: '8g BCAAs in a 2:1:1 ratio. Supports muscle recovery and endurance.',
    description: 'Optimum Nutrition Pro BCAA delivers 8g of BCAAs in the optimal 2:1:1 ratio (leucine:isoleucine:valine) along with 5g of glutamine per serving. Sip it during training to reduce muscle breakdown and accelerate post-workout recovery. Zero fat, zero sugar, and available in refreshing fruit flavors.',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800',
    ],
    price: 2099,
    originalPrice: 2499,
    rating: 4.6,
    reviewCount: 445,
    variants: [
      { id: 'v1', label: '390g (26 srvgs)', priceModifier: 0, inStock: true },
      { id: 'v2', label: '780g (52 srvgs)', priceModifier: 1600, inStock: true },
    ],
    tags: ['bcaa', 'recovery', 'intra-workout'],
    inStock: true,
    isFeatured: true,
    nutritionFacts: {
      'Serving Size': '15g',
      'BCAAs': '8g',
      'L-Leucine': '4g',
      'L-Isoleucine': '2g',
      'L-Valine': '2g',
      'L-Glutamine': '5g',
    },
    reviews: [
      { id: 'r1', author: 'Sunita K.', rating: 5, comment: 'Noticeable reduction in muscle soreness. Great fruit punch flavor!', date: '2025-03-08' },
    ],
    createdAt: '2024-07-10',
  },
];

// ── Query helpers ──────────────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function filterProducts(params: FilterParams): Product[] {
  let result = [...products];

  if (params.categories && params.categories.length > 0) {
    result = result.filter((p) => params.categories!.includes(p.category));
  }

  if (params.minPrice !== undefined) {
    result = result.filter((p) => p.price >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= params.maxPrice!);
  }

  if (params.minRating !== undefined) {
    result = result.filter((p) => p.rating >= params.minRating!);
  }

  if (params.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  switch (params.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'featured':
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return result;
}

export function getCategoryCounts(): Record<ProductCategory, number> {
  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return counts as Record<ProductCategory, number>;
}
