// SPORTIFY Comprehensive Product Database
// Realistic pricing in INR (₹), high-resolution sports equipment imagery, specs, reviews, and variants

const PRODUCTS_DATA = [
  {
    id: "spt-fb-01",
    name: "AerowStrike Pro Match Football",
    category: "football",
    categoryName: "Football",
    brand: "Sportify Pro",
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    rating: 4.9,
    reviewCount: 238,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Bestseller",
    isFlashSale: true,
    isTrending: true,
    isNew: false,
    stock: 18,
    sizes: ["Size 4 (Youth)", "Size 5 (Official Pro)"],
    colors: ["Electric Green / Black", "Solar Orange / White", "Pure White / Cyan"],
    description: "Engineered for elite tournament gameplay, the AerowStrike Pro features FIFA Quality Pro certification. Crafted with high-grade micro-textured PU outer casing, thermal bonding seams for zero water absorption, and a reinforced butyl bladder for explosive rebound and consistent trajectory in all weather conditions.",
    specs: {
      "Material": "Thermal-Bonded PU Micro-Fiber",
      "Bladder": "Reinforced Butyl with Air-Lock",
      "Standard": "FIFA Quality Pro Certified",
      "Weight": "420 - 440 grams",
      "Circumference": "68.5 - 69.5 cm",
      "Usage": "Professional Match & Tournament"
    },
    reviews: [
      { author: "Karan Sharma", rating: 5, date: "2 days ago", comment: "Incredible grip and flight consistency. Played three 90-minute tournament games in rain with zero water weight gain!" },
      { author: "Vikram Menon", rating: 5, date: "1 week ago", comment: "Feels exactly like match balls used in top tier leagues. The textured surface gives insane curve on free kicks." }
    ]
  },
  {
    id: "spt-ck-01",
    name: "TitanStroke English Willow Grade 1+ Bat",
    category: "cricket",
    categoryName: "Cricket",
    brand: "TitanForce",
    price: 18499,
    originalPrice: 28999,
    discount: 36,
    rating: 5.0,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Pro Choice",
    isFlashSale: false,
    isTrending: true,
    isNew: true,
    stock: 7,
    sizes: ["Short Handle (SH)", "Long Handle (LH)", "Harrow"],
    colors: ["Electric Lime Grip", "Matte Carbon Grip", "Sportify Orange Grip"],
    description: "Handcrafted from top 1% Grade 1+ unbleached English Willow, hand-selected for straight grains (8-12 grains) and feather-light pickup. Features a massive 40mm thick edge profile and an expansive mid-to-low sweet spot engineered specifically for aggressive power hitting and stroke play.",
    specs: {
      "Willow Type": "Hand-Picked Grade 1+ English Willow",
      "Grains": "9-12 Straight Natural Grains",
      "Edge Profile": "39 - 41 mm massive power edges",
      "Weight": "1160 - 1190 grams",
      "Handle": "12-Piece Sarawak Cane Round Handle",
      "Knocking": "Pre-knocked (Machine hammered 10,000 times)"
    },
    reviews: [
      { author: "Rohit R.", rating: 5, date: "3 days ago", comment: "Ping is unreal! Clean sound off the meat of the bat and picked up like a feather. Worth every rupee." },
      { author: "Aditya Roy", rating: 5, date: "2 weeks ago", comment: "Scored my maiden century in corporate league with this beast. Exceptional balance." }
    ]
  },
  {
    id: "spt-ck-02",
    name: "Vortex Red Leather Match Cricket Balls (Box of 4)",
    category: "cricket",
    categoryName: "Cricket",
    brand: "TitanForce",
    price: 2899,
    originalPrice: 4200,
    discount: 31,
    rating: 4.8,
    reviewCount: 96,
    image: "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Match Grade",
    isFlashSale: false,
    isTrending: false,
    isNew: false,
    stock: 25,
    sizes: ["Senior 156g (Standard)", "Youth 142g"],
    colors: ["Classic Test Red", "T20 White", "Day-Night Pink"],
    description: "Hand-stitched with 85-90 stitches using heavy duty waxed linen thread. Premium alum tanned leather with Portuguese cork and pure wool core ensures shape retention through 80+ overs of fierce bowling and seam retention.",
    specs: {
      "Leather": "Grade A Alum-Tanned Cowhide",
      "Core": "5-Layer Compressed Portuguese Cork & Wool",
      "Seam": "80+ Hand Waxed Linen Stitches",
      "Waterproofing": "Hydrophobic Shell Treatment",
      "Quantity": "Box of 4 Official Match Balls"
    },
    reviews: [
      { author: "Devendra P.", rating: 5, date: "5 days ago", comment: "Outstanding seam uprightness and consistent bounce. Held shine for nearly 40 overs." }
    ]
  },
  {
    id: "spt-ck-03",
    name: "ArmourFlex Pro Batting Gloves",
    category: "cricket",
    categoryName: "Cricket",
    brand: "TitanForce",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    rating: 4.7,
    reviewCount: 84,
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "High Impact",
    isFlashSale: true,
    isTrending: false,
    isNew: false,
    stock: 14,
    sizes: ["Men's Standard (RH)", "Men's Standard (LH)", "Youth (RH)"],
    colors: ["White / Neon Green", "Triple Black / Orange"],
    description: "Multi-flex sausage finger design armed with high-density EVA foam and reinforced fiber-shield inserts on bottom hand lead fingers. Premium Pittards sheep leather palm provides supple bat feel and sweat absorption.",
    specs: {
      "Palm": "Premium English Pittards Sheep Leather",
      "Protection": "High Density Plastopeer + Fiber Inserts",
      "Thumb": "Two-piece angled thumb protection",
      "Ventilation": "Airflow 3D mesh side gussets"
    },
    reviews: [
      { author: "Siddharth K.", rating: 5, date: "1 week ago", comment: "Took a 140kmph blow straight on the glove thumb, didn't feel a sting. Protection is top notch." }
    ]
  },
  {
    id: "spt-fb-02",
    name: "Vapor-Dri Pro Athletic Match Football Jersey",
    category: "football",
    categoryName: "Football",
    brand: "Sportify Pro",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.8,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Breathable",
    isFlashSale: false,
    isTrending: true,
    isNew: true,
    stock: 35,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Electric Emerald / Obsidian", "Solar Flare Orange", "Stealth Black / Volt"],
    description: "Designed for intense athletic output, Sportify Vapor-Dri yarn actively channels sweat away from your skin for rapid evaporation. Raglan sleeve cut provides boundless rotational range for sprint sprints, cuts, and strikes.",
    specs: {
      "Fabric": "100% Recycled Poly Dri-Weave (140 GSM)",
      "Fit": "Tailored Athletic Slim Fit",
      "Tech": "Anti-Odor Microbial Ion Shield",
      "Care": "Machine Wash Cold, Quick Dry"
    },
    reviews: [
      { author: "Aniket M.", rating: 5, date: "3 days ago", comment: "Light as a feather. Remains dry even during sweaty afternoon turf matches." }
    ]
  },
  {
    id: "spt-bb-01",
    name: "GripMax Indoor/Outdoor Official Basketball",
    category: "basketball",
    categoryName: "Basketball",
    brand: "Apex",
    price: 1999,
    originalPrice: 3299,
    discount: 39,
    rating: 4.9,
    reviewCount: 165,
    image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Official Size 7",
    isFlashSale: true,
    isTrending: true,
    isNew: false,
    stock: 22,
    sizes: ["Size 7 (Official Men)", "Size 6 (Official Women/Youth)"],
    colors: ["Classic Amber / Black Channels", "Matte Black / Electric Green"],
    description: "Deep channel pebble composite leather ensures tacky fingertip control regardless of moisture or concrete court dust. Symmetrical 100% nylon winding provides balanced true bounce off the backboard and floor.",
    specs: {
      "Surface": "Deep Channel Composite Moisture-Absorbing Leather",
      "Carcass": "100% Multi-Ply Nylon Windings",
      "Bladder": "Butyl Core Air Retention Chamber",
      "Court Type": "Indoor Hardwood & Outdoor Street Court"
    },
    reviews: [
      { author: "Pranav J.", rating: 5, date: "4 days ago", comment: "Tack is unmatched. Doesn't slip even with sweaty palms during crunch time." }
    ]
  },
  {
    id: "spt-tn-01",
    name: "CarbonStrike Graphite Pro Tennis Racket",
    category: "tennis",
    categoryName: "Tennis",
    brand: "AeroStrike",
    price: 9499,
    originalPrice: 14999,
    discount: 37,
    rating: 4.9,
    reviewCount: 118,
    image: "https://images.unsplash.com/photo-1617083934555-563d4107293b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617083934555-563d4107293b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Tour Series",
    isFlashSale: false,
    isTrending: true,
    isNew: true,
    stock: 9,
    sizes: ["Grip 2 (4 1/4 in)", "Grip 3 (4 3/8 in)", "Grip 4 (4 1/2 in)"],
    colors: ["Obsidian / Volt Lime", "Matte Carbon / Lava Orange"],
    description: "Built for explosive baseline power and pin-point spin control. Features high-modulus braided carbon fiber frame matrix infused with vibration-dampening gel in the handle for buttery sweet-spot response and zero arm fatigue.",
    specs: {
      "Head Size": "100 sq inches (645 sq cm)",
      "Unstrung Weight": "300g (+/- 5g)",
      "String Pattern": "16 x 19 Spin Matrix",
      "Balance": "320 mm (Head Light)",
      "Beam Width": "23-26 mm Tapered Beam"
    },
    reviews: [
      { author: "Sanaya D.", rating: 5, date: "6 days ago", comment: "Upgraded from an entry level stick and my topspin depth improved instantly. Great shock dampening." }
    ]
  },
  {
    id: "spt-bm-01",
    name: "AeroForce Nanocarbon Badminton Racket (Strung)",
    category: "badminton",
    categoryName: "Badminton",
    brand: "AeroStrike",
    price: 3699,
    originalPrice: 5999,
    discount: 38,
    rating: 4.8,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521537634581-0dced2fedc42?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "High Tension",
    isFlashSale: true,
    isTrending: true,
    isNew: false,
    stock: 19,
    sizes: ["3U (85-89g) G4", "4U (80-84g) G5"],
    colors: ["Neon Green / Cyber Black", "Solar Orange / Chrome"],
    description: "Head-heavy aerodynamic frame geometry designed for devastating smashes and lightning-quick net intercepts. Crafted with Ultra-High Modulus Japanese Carbon Graphite capable of withstanding string tensions up to 30 lbs.",
    specs: {
      "Frame Material": "High-Modulus 40T Japanese Carbon Graphite",
      "Weight / Grip": "4U (82g +/- 2g) - G5 Grip",
      "Max Tension": "Up to 30 lbs (Pre-strung at 26 lbs)",
      "Balance Point": "298 mm (Head Heavy Attack Profile)",
      "Shaft": "Slim 6.8mm Extra Flexible Nanotube Shaft"
    },
    reviews: [
      { author: "Tarun V.", rating: 5, date: "1 week ago", comment: "The smash power is electrifying! Crisp acoustic pop sound when smashing down the line." }
    ]
  },
  {
    id: "spt-sh-01",
    name: "Velocity Nitro Pro Athletic Running & Turf Shoes",
    category: "shoes",
    categoryName: "Sports Shoes",
    brand: "Sportify Pro",
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    rating: 4.9,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Bestseller",
    isFlashSale: true,
    isTrending: true,
    isNew: false,
    stock: 16,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Racer Red / Flash Black", "Electric Volt Green", "Triple Stealth Grey"],
    description: "Packed with dual-density nitrogen-infused supercritical foam midsole providing 82% energy return on every sprint and step. Multi-directional carbon-rubber outsole lugs deliver razor-sharp traction across turf, track, and asphalt.",
    specs: {
      "Upper": "Engineered Breathable Jacquard Monomesh",
      "Midsole": "NitroPulse High Energy Infused EVA Foam",
      "Outsole": "Pumagrip Multi-Surface Carbon Rubber",
      "Drop": "8mm Heel-to-Toe Offset",
      "Weight": "235 grams (Single Shoe, UK 8)"
    },
    reviews: [
      { author: "Deepak S.", rating: 5, date: "2 days ago", comment: "Ran a half marathon straight out of the box with zero blisters. Phenomenal bounce and arch support." },
      { author: "Harshil N.", rating: 5, date: "5 days ago", comment: "Great for both gym sessions and cricket turf training. Traction is phenomenal." }
    ]
  },
  {
    id: "spt-gm-01",
    name: "IronHex Rubber Encased Dumbbell Pair (10kg Each)",
    category: "fitness",
    categoryName: "Fitness & Gym",
    brand: "Vortex",
    price: 3899,
    originalPrice: 5999,
    discount: 35,
    rating: 4.8,
    reviewCount: 147,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Commercial Grade",
    isFlashSale: false,
    isTrending: true,
    isNew: false,
    stock: 20,
    sizes: ["Pair of 5 kg (10kg total)", "Pair of 10 kg (20kg total)", "Pair of 15 kg (30kg total)"],
    colors: ["Matte Black Rubber / Chrome Knurl"],
    description: "High-grade virgin rubber encasement dampens impact noise and shields flooring from heavy drops. Solid steel knurled ergonomic handles offer non-slip grip even through heavy compound pressing and sweaty rows.",
    specs: {
      "Core Material": "Solid Cast Iron One-Piece Welded Head",
      "Coating": "Odorless Virgin Natural Rubber Coated",
      "Handle": "Precision Diamond Knurled Ergonomic Chrome",
      "Anti-Roll": "Hexagonal 6-Sided Design Prevents Rolling"
    },
    reviews: [
      { author: "Amit Trivedi", rating: 5, date: "1 week ago", comment: "Zero bad rubber smell! Knurling feels great in the palm without shredding calluses." }
    ]
  },
  {
    id: "spt-gm-02",
    name: "Apex Elite Resistance Bands Set (5-Level Stackable)",
    category: "fitness",
    categoryName: "Fitness & Gym",
    brand: "Apex",
    price: 1199,
    originalPrice: 2299,
    discount: 48,
    rating: 4.7,
    reviewCount: 275,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Best Value",
    isFlashSale: true,
    isTrending: false,
    isNew: false,
    stock: 40,
    sizes: ["Full 150 lbs Resistance Kit"],
    colors: ["Color Coded (10lb, 20lb, 30lb, 40lb, 50lb)"],
    description: "100% Malaysian natural latex tubes reinforced with anti-snap nylon webbing interior. Includes heavy-duty padded foam handles, steel carabiners, ankle straps, door anchor, and compact waterproof carry bag.",
    specs: {
      "Material": "100% Malaysian Natural Dipped Latex",
      "Total Resistance": "150 lbs (68 kg) Stackable Range",
      "Inclusions": "5 Bands, 2 Handles, 2 Ankle Straps, 1 Door Anchor, 1 Pouch",
      "Warranty": "2 Years Snap-Proof Warranty"
    },
    reviews: [
      { author: "Manoj B.", rating: 5, date: "3 days ago", comment: "Super portable gym in a bag. Perfect when traveling for matches." }
    ]
  },
  {
    id: "spt-bg-01",
    name: "Endurance Pro 55L Sports Kit & Duffle Bag",
    category: "accessories",
    categoryName: "Sports Bags",
    brand: "Sportify Pro",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.9,
    reviewCount: 153,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Waterproof Base",
    isFlashSale: false,
    isTrending: true,
    isNew: true,
    stock: 28,
    sizes: ["55 Liters (Large Kit)", "40 Liters (Medium Gym)"],
    colors: ["Stealth Black / Lime Accents", "Charcoal Grey / Orange Glow"],
    description: "Engineered for elite athletes carrying extensive kit. Separate ventilated shoe tunnel, wet towel compartment, padded racket/bat sleeve, and abrasion-resistant water-repellent ballistic 900D Cordura nylon.",
    specs: {
      "Capacity": "55 Liters Multi-Compartment Storage",
      "Material": "900D Ballistic Water-Repellent Cordura Nylon",
      "Base": "Reinforced PU Tarpaulin Waterproof Floor",
      "Straps": "Dual Convertible Shoulder & Backpack Straps",
      "Shoe Tunnel": "Ventilated Gusset Holds up to UK 12 Shoes"
    },
    reviews: [
      { author: "Kunal D.", rating: 5, date: "4 days ago", comment: "Fits my full football kit, 2 pairs of cleats, shin guards and clothes with room to spare." }
    ]
  },
  {
    id: "spt-bt-01",
    name: "HydroSport 1000ml Insulated Stainless Steel Flask",
    category: "accessories",
    categoryName: "Water Bottles",
    brand: "Sportify Pro",
    price: 999,
    originalPrice: 1799,
    discount: 44,
    rating: 4.8,
    reviewCount: 380,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "24h Cold",
    isFlashSale: true,
    isTrending: true,
    isNew: false,
    stock: 50,
    sizes: ["1000 ml (34 oz)", "750 ml (25 oz)"],
    colors: ["Matte Pitch Black", "Electric Lime Green", "Sunset Blaze Orange", "Glacier White"],
    description: "Double-wall vacuum insulation keeps electrolyte drinks icy cold for 24 hours or hot for 12 hours. Equipped with leak-proof flip chug sport lid, easy-carry silicone loop, and sweat-free powder coat exterior.",
    specs: {
      "Material": "Pro-Grade 18/8 Double Wall Stainless Steel",
      "Insulation": "TempShield Vacuum Thermal Lock",
      "Volume": "1000 ml (1 Liter)",
      "Lid": "Leak-Proof Chug Spout with Carry Handle",
      "Safety": "100% BPA Free & Phthalate Free"
    },
    reviews: [
      { author: "Sneha R.", rating: 5, date: "1 day ago", comment: "Still had ice cubes inside after a 6-hour outdoor training session in 38°C heat! Game changer." }
    ]
  },
  {
    id: "spt-sh-02",
    name: "AeroSprint Spikes & Turf Cricket Shoes",
    category: "shoes",
    categoryName: "Sports Shoes",
    brand: "TitanForce",
    price: 3799,
    originalPrice: 5499,
    discount: 31,
    rating: 4.8,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Turf & Grass",
    isFlashSale: false,
    isTrending: false,
    isNew: true,
    stock: 15,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Cloud White / Lime Green", "Black / Orange"],
    description: "Reinforced toe protection against fast bowling yorkers. Dual-density spike chassis with removable steel studs and replacement rubber studs for synthetic turf flexibility.",
    specs: {
      "Studs": "Hybrid (11 Removable Steel Spikes + Rubber Studs)",
      "Toe Guard": "Rubberized Thermo-Shield Bumper",
      "Ankle Collar": "Memory Foam Ergonomic Padded Cuff",
      "Sole": "Ultra-Stiff Propulsion Shank"
    },
    reviews: [
      { author: "Naveen G.", rating: 5, date: "3 weeks ago", comment: "Great landing cushion for fast bowlers. Shin splints are gone." }
    ]
  },
  {
    id: "spt-bm-02",
    name: "Tournament Goose Feather Shuttlecocks (Tube of 12)",
    category: "badminton",
    categoryName: "Badminton",
    brand: "AeroStrike",
    price: 1699,
    originalPrice: 2499,
    discount: 32,
    rating: 4.9,
    reviewCount: 204,
    image: "https://images.unsplash.com/photo-1521537634581-0dced2fedc42?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521537634581-0dced2fedc42?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "BWF Grade",
    isFlashSale: false,
    isTrending: true,
    isNew: false,
    stock: 30,
    sizes: ["Speed 77 (Standard Indoor)", "Speed 78 (Cooler Climates)"],
    colors: ["Natural White"],
    description: "Premium Grade 1 goose feathers with precision 100% natural cork base. Tested for stable trajectory and durability across high-tempo rally exchanges.",
    specs: {
      "Feather": "Selected Grade 1 White Goose Feathers",
      "Cork Base": "Solid 2-Tier Natural Portuguese Cork",
      "Flight": "A+ Accurate Flight Path Standard",
      "Quantity": "12 Shuttles per Sealed Aluminum Tube"
    },
    reviews: [
      { author: "Mayank T.", rating: 5, date: "2 days ago", comment: "Lasts easily 2 full competitive games without feather breakage. Super consistent." }
    ]
  },
  {
    id: "spt-tn-02",
    name: "ProChampionship Pressurized Tennis Balls (Can of 3)",
    category: "tennis",
    categoryName: "Tennis",
    brand: "AeroStrike",
    price: 549,
    originalPrice: 899,
    discount: 39,
    rating: 4.7,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "ITF Approved",
    isFlashSale: false,
    isTrending: false,
    isNew: false,
    stock: 45,
    sizes: ["Can of 3 Balls", "Pack of 4 Cans (12 Balls)"],
    colors: ["Optic High-Visibility Yellow"],
    description: "Extra duty woven felt delivers consistent bounce and durability on hard courts. Pressurized core maintains championship responsiveness across hours of play.",
    specs: {
      "Approval": "International Tennis Federation (ITF) Approved",
      "Felt": "High-Density Smart-Woven Fluo Wool Felt",
      "Core": "Natural Rubber Compound Core",
      "Court": "All-Court & Hard Court"
    },
    reviews: [
      { author: "Alok N.", rating: 5, date: "1 week ago", comment: "Maintains true bounce and doesn't fluff up excessively." }
    ]
  }
];

const CATEGORIES_DATA = [
  { id: "all", name: "All Sports", count: PRODUCTS_DATA.length, icon: "trophy" },
  { id: "football", name: "Football", count: 2, icon: "soccer", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80" },
  { id: "cricket", name: "Cricket", count: 3, icon: "cricket", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80" },
  { id: "basketball", name: "Basketball", count: 1, icon: "basketball", image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=600&q=80" },
  { id: "badminton", name: "Badminton", count: 2, icon: "badminton", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80" },
  { id: "tennis", name: "Tennis", count: 2, icon: "tennis", image: "https://images.unsplash.com/photo-1617083934555-563d4107293b?auto=format&fit=crop&w=600&q=80" },
  { id: "fitness", name: "Fitness & Gym", count: 2, icon: "dumbbell", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80" },
  { id: "shoes", name: "Sports Shoes", count: 2, icon: "shoe", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id: "accessories", name: "Accessories & Bags", count: 2, icon: "bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" }
];
