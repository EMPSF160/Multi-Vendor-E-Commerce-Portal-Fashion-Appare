// AURA LUXE — Multi-Vendor Luxury Fashion Data Store (FARFETCH inspired)

export const INITIAL_VENDORS = [
  {
    id: "v-paris",
    name: "Atelier Montaigne",
    city: "Paris",
    country: "France",
    rating: 4.9,
    reviewsCount: 342,
    commissionRate: 15,
    status: "Active",
    joinedDate: "2023-04-12",
    logo: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80",
    banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    bio: "Iconic Avenue Montaigne boutique curating Parisian Haute Couture, bespoke tailoring, and ultra-rare runway pieces.",
    productsCount: 48,
    totalSales: 248600,
    payoutBalance: 42150,
    shippingSLA: "1-3 Business Days via DHL Express",
    badge: "Master Boutique"
  },
  {
    id: "v-milan",
    name: "Maison De Luxe",
    city: "Milan",
    country: "Italy",
    rating: 4.85,
    reviewsCount: 289,
    commissionRate: 12,
    status: "Active",
    joinedDate: "2023-06-18",
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    banner: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    bio: "Via Montenapoleone heritage partner showcasing premier Italian leather craftsmanship, tailored suits, and silk drape dresses.",
    productsCount: 36,
    totalSales: 189400,
    payoutBalance: 29800,
    shippingSLA: "2-4 Business Days via FedEx Luxury",
    badge: "Verified Partner"
  },
  {
    id: "v-tokyo",
    name: "Ginza High Fashion",
    city: "Tokyo",
    country: "Japan",
    rating: 4.95,
    reviewsCount: 412,
    commissionRate: 14,
    status: "Active",
    joinedDate: "2023-09-01",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    banner: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    bio: "Avant-garde Tokyo boutique specializing in luxury structural tailoring, experimental streetwear, and precision accessories.",
    productsCount: 42,
    totalSales: 312000,
    payoutBalance: 51200,
    shippingSLA: "2-3 Business Days via Japan Post Luxury Express",
    badge: "Premier Curator"
  },
  {
    id: "v-london",
    name: "Savile Row Bespoke",
    city: "London",
    country: "United Kingdom",
    rating: 4.88,
    reviewsCount: 215,
    commissionRate: 16,
    status: "Active",
    joinedDate: "2024-01-10",
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    bio: "Centuries of British artisanal heritage, handcrafted double-breasted blazers, cashmere overcoats, and gentleman's footwear.",
    productsCount: 29,
    totalSales: 142800,
    payoutBalance: 22400,
    shippingSLA: "2-4 Business Days via Royal Mail International Tracked",
    badge: "Heritage Tailor"
  },
  {
    id: "v-nyc",
    name: "Fifth Avenue Luxe",
    city: "New York",
    country: "United States",
    rating: 4.78,
    reviewsCount: 174,
    commissionRate: 15,
    status: "Pending Verification",
    joinedDate: "2024-03-15",
    logo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    banner: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    bio: "Manhattan luxury showroom featuring contemporary American designer apparel, red carpet gowns, and statement bags.",
    productsCount: 18,
    totalSales: 64200,
    payoutBalance: 9800,
    shippingSLA: "1-2 Business Days via UPS Next Day Air",
    badge: "Rising Boutique"
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-001",
    title: "Double-Breasted Wool-Cashmere Trench Coat",
    brand: "Saint Laurent",
    vendorId: "v-paris",
    vendorName: "Atelier Montaigne",
    vendorCity: "Paris",
    category: "Women",
    subcategory: "Coats & Outerwear",
    price: 3450,
    originalPrice: 4100,
    discount: 16,
    sku: "SL-TC-2026-BLK",
    inStock: true,
    featured: true,
    trending: true,
    tag: "Runway SS26",
    rating: 4.9,
    reviewsCount: 48,
    description: "Tailored in Italy from an exquisite blend of virgin wool and Mongolian cashmere. Features sharp structured shoulders, horn-effect double-breasted buttons, a storm flap, and a belted waist cinch for an iconic Parisian silhouette.",
    highlights: [
      "90% Virgin Wool, 10% Cashmere; Lining: 100% Cupro Silk",
      "Signature epaulettes and storm shield",
      "Dry clean only by luxury garment specialist",
      "Made in Italy / Shipped directly from Paris boutique",
      "Authenticity certificate included with NFC chip"
    ],
    sizes: ["FR 34", "FR 36", "FR 38", "FR 40", "FR 42"],
    stockPerSize: { "FR 34": 3, "FR 36": 2, "FR 38": 5, "FR 40": 4, "FR 42": 1 },
    colors: [
      { name: "Obsidian Noir", hex: "#111111" },
      { name: "Camel Heritage", hex: "#c49a6c" },
      { name: "Ivory Silk", hex: "#f5f3eb" }
    ],
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Eleanor Vance",
        rating: 5,
        date: "2026-02-18",
        verified: true,
        title: "Breathtaking craftsmanship",
        comment: "The drape and weight of the cashmere wool blend are unmatched. Delivered from Atelier Montaigne in Paris within 48 hours to London in museum-grade garment box."
      },
      {
        id: "rev-2",
        author: "Camille Dupont",
        rating: 5,
        date: "2026-01-24",
        verified: true,
        title: "True investment piece",
        comment: "Fits true to French sizing. The structured shoulders give that unmistakable Saint Laurent aesthetic."
      }
    ]
  },
  {
    id: "prod-002",
    title: "Silk Charmeuse Backless Evening Gown",
    brand: "Jacquemus",
    vendorId: "v-paris",
    vendorName: "Atelier Montaigne",
    vendorCity: "Paris",
    category: "Women",
    subcategory: "Dresses",
    price: 1890,
    originalPrice: 2200,
    discount: 14,
    sku: "JACQ-DR-902",
    inStock: true,
    featured: true,
    trending: true,
    tag: "Exclusive",
    rating: 4.85,
    reviewsCount: 32,
    description: "Flowing 100% pure silk charmeuse evening gown with a sculptural draped cowl neck and an alluring low back secured with fine gold-tone chain links. Fluid silhouette that glides with effortless poise.",
    highlights: [
      "100% Pure Mulberry Silk Charmeuse",
      "Delicate 24k gold-plated micro-hardware",
      "Floor-sweeping length with subtle side slit",
      "Made in France"
    ],
    sizes: ["FR 34", "FR 36", "FR 38", "FR 40"],
    stockPerSize: { "FR 34": 2, "FR 36": 4, "FR 38": 2, "FR 40": 1 },
    colors: [
      { name: "Champagne Gold", hex: "#e6c280" },
      { name: "Emerald Glaze", hex: "#164e3b" },
      { name: "Midnight Black", hex: "#0f0f10" }
    ],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Aria Sterling",
        rating: 5,
        date: "2026-03-02",
        verified: true,
        title: "Sensational for black-tie gala",
        comment: "The silk quality has that incandescent pearlescent sheen. Received countless compliments."
      }
    ]
  },
  {
    id: "prod-003",
    title: "Deconstructed Wool Flannel Blazer",
    brand: "Maison Margiela",
    vendorId: "v-tokyo",
    vendorName: "Ginza High Fashion",
    vendorCity: "Tokyo",
    category: "Men",
    subcategory: "Jackets & Tailoring",
    price: 2650,
    originalPrice: 2950,
    discount: 10,
    sku: "MM-BLZ-TK-04",
    inStock: true,
    featured: true,
    trending: true,
    tag: "Boutique Pick",
    rating: 4.92,
    reviewsCount: 29,
    description: "A masterclass in modern deconstruction. Tailored with exposed basting stitches, raw edges, and raw linen canvas undercollar. Cut in a boxy modern silhouette with the four white stitches on the back neck.",
    highlights: [
      "100% Super 140s Wool Flannel",
      "Basting stitch contrast embroidery",
      "Horn button front closure",
      "Made in Italy / Sourced from Ginza flagship"
    ],
    sizes: ["IT 46", "IT 48", "IT 50", "IT 52"],
    stockPerSize: { "IT 46": 3, "IT 48": 5, "IT 50": 3, "IT 52": 2 },
    colors: [
      { name: "Charcoal Melange", hex: "#333333" },
      { name: "Oatmeal Grey", hex: "#9e9a91" }
    ],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Kaito Takahashi",
        rating: 5,
        date: "2026-02-10",
        verified: true,
        title: "Art in tailoring",
        comment: "Ginza High Fashion packed this meticulously. The structural balance of this jacket is peerless."
      }
    ]
  },
  {
    id: "prod-004",
    title: "Intrecciato Leather Cassette Crossbody Bag",
    brand: "Bottega Veneta",
    vendorId: "v-milan",
    vendorName: "Maison De Luxe",
    vendorCity: "Milan",
    category: "Bags",
    subcategory: "Crossbody Bags",
    price: 3200,
    originalPrice: 3500,
    discount: 8,
    sku: "BV-BAG-CS-01",
    inStock: true,
    featured: true,
    trending: true,
    tag: "Iconic",
    rating: 4.96,
    reviewsCount: 76,
    description: "Hand-woven using Bottega Veneta’s signature maxi Intrecciato technique in ultra-supple Italian lambskin nappa. Features an unlined interior with a zip pocket and adjustable leather shoulder strap.",
    highlights: [
      "100% Italian Nappa Lambskin",
      "Maxi Intrecciato hand-woven construction",
      "Magnetic flap closure with triangular buckle",
      "Made in Veneto, Italy"
    ],
    sizes: ["One Size"],
    stockPerSize: { "One Size": 8 },
    colors: [
      { name: "Parakeet Green", hex: "#009a44" },
      { name: "Bottega Fondant Brown", hex: "#3b2219" },
      { name: "Chalk White", hex: "#eae6df" }
    ],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Isabella Rossi",
        rating: 5,
        date: "2026-01-14",
        verified: true,
        title: "The softest leather imaginable",
        comment: "Arrived directly from Maison De Luxe in Milan. The leather fragrance and buttery hand-feel are unbelievable."
      }
    ]
  },
  {
    id: "prod-005",
    title: "Sculptural Leather Slingback Pumps (90mm)",
    brand: "Prada",
    vendorId: "v-milan",
    vendorName: "Maison De Luxe",
    vendorCity: "Milan",
    category: "Shoes",
    subcategory: "Heels & Pumps",
    price: 1150,
    originalPrice: 1250,
    discount: 8,
    sku: "PRD-SH-SL-90",
    inStock: true,
    featured: true,
    trending: false,
    tag: "Trending",
    rating: 4.8,
    reviewsCount: 41,
    description: "Brushed spazzolato leather pumps featuring Prada’s iconic enamelled metal triangle logo on the pointed vamp. Set on an architectural comma heel with an elasticated slingback strap.",
    highlights: [
      "100% Spazzolato Calfskin Leather",
      "Architectural 90mm lacquer heel",
      "Enamelled metal triangle plaque",
      "Leather sole with metal logo lettering"
    ],
    sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40"],
    stockPerSize: { "EU 36": 2, "EU 37": 4, "EU 38": 6, "EU 39": 3, "EU 40": 1 },
    colors: [
      { name: "Nero Gloss", hex: "#0d0d0d" },
      { name: "Scarlet Lacquer", hex: "#a11d27" },
      { name: "Bianco Optical", hex: "#ffffff" }
    ],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Genevieve Moreau",
        rating: 5,
        date: "2026-02-28",
        verified: true,
        title: "Chic and surprisingly comfortable",
        comment: "The comma heel provides great arch support while looking incredibly sharp."
      }
    ]
  },
  {
    id: "prod-006",
    title: "Double-Breasted Super 180s Cashmere Suit",
    brand: "Savile Row Bespoke",
    vendorId: "v-london",
    vendorName: "Savile Row Bespoke",
    vendorCity: "London",
    category: "Men",
    subcategory: "Suits & Tailoring",
    price: 4800,
    originalPrice: 5600,
    discount: 14,
    sku: "SR-SUIT-180-NVY",
    inStock: true,
    featured: true,
    trending: true,
    tag: "Artisanal",
    rating: 4.98,
    reviewsCount: 19,
    description: "Crafted exclusively from Holland & Sherry Super 180s Cashmere-Worsted wool. Full-canvas hand-stitched construction, wide peak lapels, roped shoulders, and side adjusters on flat-front trousers.",
    highlights: [
      "Full canvas construction with real horsehair chest piece",
      "Super 180s Cashmere-Worsted Wool blend",
      "Mother-of-pearl buttons with hand-sewn buttonholes",
      "Handcrafted in Mayfair, London"
    ],
    sizes: ["UK 38R", "UK 40R", "UK 42R", "UK 44R"],
    stockPerSize: { "UK 38R": 1, "UK 40R": 2, "UK 42R": 2, "UK 44R": 1 },
    colors: [
      { name: "Midnight Navy", hex: "#131a29" },
      { name: "Oxford Charcoal", hex: "#2b2d30" }
    ],
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Lord Charles Kensington",
        rating: 5,
        date: "2026-03-01",
        verified: true,
        title: "Supreme British Sartorial Standards",
        comment: "The roped shoulder and canvassing contour to the body flawlessly. Savile Row at its finest."
      }
    ]
  },
  {
    id: "prod-007",
    title: "18k White Gold & Diamond Tennis Bracelet",
    brand: "Cartier Vintage / Paris Vault",
    vendorId: "v-paris",
    vendorName: "Atelier Montaigne",
    vendorCity: "Paris",
    category: "Jewelry",
    subcategory: "Bracelets",
    price: 8500,
    originalPrice: 9800,
    discount: 13,
    sku: "JWL-TB-18K-DIA",
    inStock: true,
    featured: true,
    trending: true,
    tag: "High Jewelry",
    rating: 5.0,
    reviewsCount: 15,
    description: "Exquisite 5.40 carat total weight round brilliant cut diamonds set in solid 18k white gold four-prong basket settings. Includes safety clasp and international gemological authentication certificate.",
    highlights: [
      "5.40 ct VVS1 Clarity, E-Color Natural Diamonds",
      "18k Solid White Gold (750 hallmark)",
      "Double-locking safety clasp mechanism",
      "GIA Certified & Appraised"
    ],
    sizes: ["16 cm", "17 cm", "18 cm"],
    stockPerSize: { "16 cm": 2, "17 cm": 2, "18 cm": 1 },
    colors: [
      { name: "18k White Gold", hex: "#e0e0e0" },
      { name: "18k Yellow Gold", hex: "#dfb15b" },
      { name: "18k Rose Gold", hex: "#e7a188" }
    ],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1611591475155-4286fa7c2e7f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-8",
        author: "Victoria Sterling",
        rating: 5,
        date: "2026-02-14",
        verified: true,
        title: "Pure radiance and security",
        comment: "Shipped with insured armored courier from Paris. The fire and brilliance of each stone are astonishing."
      }
    ]
  },
  {
    id: "prod-008",
    title: "Oversized Leather Biker Jacket with Silver Hardware",
    brand: "Balenciaga",
    vendorId: "v-tokyo",
    vendorName: "Ginza High Fashion",
    vendorCity: "Tokyo",
    category: "Women",
    subcategory: "Leather Jackets",
    price: 3850,
    originalPrice: 4400,
    discount: 12,
    sku: "BAL-BK-2026-BLK",
    inStock: true,
    featured: false,
    trending: true,
    tag: "Street Couture",
    rating: 4.88,
    reviewsCount: 38,
    description: "Heavyweight vintage-distressed calfskin leather biker jacket with exaggerated drop shoulders, asymmetrical heavy-gauge silver metal zippers, quilted satin lining, and an oversized buckled belt.",
    highlights: [
      "100% Hand-Treated Distressed Calfskin",
      "Heavyweight brushed palladium hardware",
      "Oversized slouch silhouette",
      "Sourced from Tokyo runway archives"
    ],
    sizes: ["FR 36", "FR 38", "FR 40"],
    stockPerSize: { "FR 36": 2, "FR 38": 3, "FR 40": 1 },
    colors: [
      { name: "Aged Pitch Black", hex: "#1a1a1a" },
      { name: "Cognac Washed", hex: "#633c1d" }
    ],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-9",
        author: "Mila Kunis-Vane",
        rating: 5,
        date: "2026-01-30",
        verified: true,
        title: "The holy grail leather jacket",
        comment: "Heavy, authentic leather with that perfect oversized slouch. An absolute staple."
      }
    ]
  },
  {
    id: "prod-009",
    title: "Lug-Sole Brushed Leather Chelsea Boots",
    brand: "Prada",
    vendorId: "v-milan",
    vendorName: "Maison De Luxe",
    vendorCity: "Milan",
    category: "Shoes",
    subcategory: "Boots",
    price: 1350,
    originalPrice: 1500,
    discount: 10,
    sku: "PRD-BT-LUG-09",
    inStock: true,
    featured: false,
    trending: true,
    tag: "Best Seller",
    rating: 4.9,
    reviewsCount: 54,
    description: "Chunky Monolith rubber lug sole paired with sleek brushed leather uppers. Features elasticated side gussets and pull tabs stamped with the Prada Milano logo in silver.",
    highlights: [
      "100% Brushed Spazzolato Calfskin",
      "55mm lightweight expanded rubber sole",
      "Goodyear-welted construction",
      "Made in Italy"
    ],
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
    stockPerSize: { "EU 40": 2, "EU 41": 4, "EU 42": 6, "EU 43": 5, "EU 44": 3, "EU 45": 1 },
    colors: [
      { name: "Glossy Black", hex: "#0a0a0a" },
      { name: "Espresso Brown", hex: "#2b1e16" }
    ],
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-10",
        author: "Julian Thorne",
        rating: 5,
        date: "2026-02-05",
        verified: true,
        title: "Imposing yet lightweight",
        comment: "The lug sole looks rugged but walks like a feather. Beautiful leather polish."
      }
    ]
  },
  {
    id: "prod-010",
    title: "Puzzle Edge Leather Shoulder Bag",
    brand: "Loewe",
    vendorId: "v-paris",
    vendorName: "Atelier Montaigne",
    vendorCity: "Paris",
    category: "Bags",
    subcategory: "Shoulder Bags",
    price: 3600,
    originalPrice: 3950,
    discount: 9,
    sku: "LOE-PUZ-EDG-01",
    inStock: true,
    featured: true,
    trending: false,
    tag: "Signature",
    rating: 4.95,
    reviewsCount: 63,
    description: "The first bag designed by Jonathan Anderson for Loewe. Cuboid shape and distinctive geometric cutting technique with hand-painted overlapping edges and an embossed Anagram logo.",
    highlights: [
      "Classic calfskin with herringbone cotton canvas lining",
      "Can be worn in five distinct ways: shoulder, crossbody, top-handle, clutch, or flat",
      "Removable and adjustable shoulder strap",
      "Handcrafted in Madrid, Spain"
    ],
    sizes: ["Small", "Medium"],
    stockPerSize: { "Small": 4, "Medium": 3 },
    colors: [
      { name: "Tan Calfskin", hex: "#a06d43" },
      { name: "Warm Desert Sand", hex: "#d8be9f" },
      { name: "Black Noir", hex: "#111111" }
    ],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-11",
        author: "Clara Beauchamp",
        rating: 5,
        date: "2026-03-03",
        verified: true,
        title: "Artistic engineering",
        comment: "The geometric panels fold into a flat pouch for luxury travel. An architectural marvel."
      }
    ]
  },
  {
    id: "prod-011",
    title: "Silk Jacquard Dragon Kimono Robe",
    brand: "Ginza Bespoke",
    vendorId: "v-tokyo",
    vendorName: "Ginza High Fashion",
    vendorCity: "Tokyo",
    category: "Women",
    subcategory: "Loungewear & Robes",
    price: 1650,
    originalPrice: 1900,
    discount: 13,
    sku: "GNZ-KM-SILK-01",
    inStock: true,
    featured: false,
    trending: true,
    tag: "Artisanal",
    rating: 4.89,
    reviewsCount: 22,
    description: "Woven in Kyoto from heavy-drape silk jacquard featuring mythical dragon and cloud motifs with gold metallic threads. Belted with a wide silk sash and lined in contrast crimson crepe.",
    highlights: [
      "100% Kyoto Silk Jacquard with Lurex threads",
      "Full contrast interior lining in crimson silk",
      "Deep traditional kimono sleeves",
      "Handmade in Kyoto, Japan"
    ],
    sizes: ["One Size Fits Most"],
    stockPerSize: { "One Size Fits Most": 5 },
    colors: [
      { name: "Imperial Gold & Black", hex: "#29241b" },
      { name: "Ruby Sunset", hex: "#7a1a24" }
    ],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-12",
        author: "Naomi Sterling",
        rating: 5,
        date: "2026-02-12",
        verified: true,
        title: "Sublime silk drape",
        comment: "The gold threads shimmer delicately in low light. Luxurious lounging at its best."
      }
    ]
  },
  {
    id: "prod-012",
    title: "Titanium Aviator Sunglasses with Polarized Gold Lens",
    brand: "Tom Ford Eyewear",
    vendorId: "v-milan",
    vendorName: "Maison De Luxe",
    vendorCity: "Milan",
    category: "Accessories",
    subcategory: "Eyewear",
    price: 680,
    originalPrice: 750,
    discount: 9,
    sku: "TF-SUN-AV-01",
    inStock: true,
    featured: false,
    trending: false,
    tag: "Essential",
    rating: 4.79,
    reviewsCount: 37,
    description: "Ultra-lightweight Japanese beta-titanium double-bridge aviator frames with 24k gold mirrored Zeiss polarized lenses and discreet T-logo temples.",
    highlights: [
      "100% Japanese Beta-Titanium construction",
      "Carl Zeiss 100% UVA/UVB Polarized lenses",
      "Hypoallergenic titanium nose pads",
      "Hand-assembled in Italy"
    ],
    sizes: ["Standard (58-14-145)"],
    stockPerSize: { "Standard (58-14-145)": 10 },
    colors: [
      { name: "Rose Gold / Mirror", hex: "#cca38a" },
      { name: "Polished Gunmetal", hex: "#525252" },
      { name: "Yellow Gold", hex: "#e5be6b" }
    ],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85"
    ],
    reviews: [
      {
        id: "rev-13",
        author: "Marcus Aurelius B.",
        rating: 5,
        date: "2026-01-20",
        verified: true,
        title: "Weightless luxury",
        comment: "You barely feel them on your face. Incredible clarity through the Zeiss lenses."
      }
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Collections", icon: "Sparkles", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80", count: 12 },
  { id: "Women", name: "Women's Couture", icon: "Crown", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=500&q=80", count: 5 },
  { id: "Men", name: "Men's Sartorial", icon: "Shirt", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80", count: 3 },
  { id: "Bags", name: "Designer Bags", icon: "ShoppingBag", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80", count: 2 },
  { id: "Shoes", name: "Luxury Footwear", icon: "Footprints", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80", count: 2 },
  { id: "Jewelry", name: "Fine Jewelry", icon: "Gem", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80", count: 1 },
  { id: "Accessories", name: "Accessories", icon: "Glasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80", count: 1 }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-98421",
    date: "2026-03-01",
    customer: {
      name: "Sophia Laurent",
      email: "sophia.laurent@luxury-client.com",
      phone: "+33 6 42 19 88 10",
      tier: "FARFETCH Private Client (Gold VIP)"
    },
    items: [
      {
        productId: "prod-001",
        title: "Double-Breasted Wool-Cashmere Trench Coat",
        brand: "Saint Laurent",
        vendorId: "v-paris",
        vendorName: "Atelier Montaigne",
        price: 3450,
        quantity: 1,
        size: "FR 38",
        color: "Obsidian Noir",
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-004",
        title: "Intrecciato Leather Cassette Crossbody Bag",
        brand: "Bottega Veneta",
        vendorId: "v-milan",
        vendorName: "Maison De Luxe",
        price: 3200,
        quantity: 1,
        size: "One Size",
        color: "Parakeet Green",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80"
      }
    ],
    shippingAddress: {
      street: "14 Rue du Faubourg Saint-Honoré",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75008",
      country: "France"
    },
    shippingMethod: "DHL Express Luxury Air (Guaranteed Next Day)",
    subtotal: 6650,
    discount: 665,
    shippingFee: 0,
    taxesAndDuties: 395,
    total: 6380,
    paymentMethod: "Visa Signature •••• 8842",
    paymentStatus: "Paid",
    status: "In Transit",
    trackingNumber: "DHL-EXP-99281742-FR",
    timeline: [
      { status: "Order Placed", date: "2026-03-01 10:14 AM", completed: true, note: "Order verified & funds secured in escrow" },
      { status: "Boutique Dispatched", date: "2026-03-01 03:30 PM", completed: true, note: "Hand-packaged with white-glove security at Atelier Montaigne" },
      { status: "Customs & Hub Departure", date: "2026-03-02 08:45 AM", completed: true, note: "Cleared Paris Charles de Gaulle Air Cargo Hub" },
      { status: "Out for Delivery", date: "2026-03-03 09:00 AM", completed: false, note: "Assigned to dedicated luxury concierge courier" },
      { status: "Delivered", date: "Expected Tomorrow", completed: false, note: "Signature required upon receipt" }
    ]
  },
  {
    id: "ORD-97640",
    date: "2026-02-24",
    customer: {
      name: "Sophia Laurent",
      email: "sophia.laurent@luxury-client.com",
      phone: "+33 6 42 19 88 10",
      tier: "FARFETCH Private Client (Gold VIP)"
    },
    items: [
      {
        productId: "prod-005",
        title: "Sculptural Leather Slingback Pumps (90mm)",
        brand: "Prada",
        vendorId: "v-milan",
        vendorName: "Maison De Luxe",
        price: 1150,
        quantity: 1,
        size: "EU 38",
        color: "Nero Gloss",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=300&q=80"
      }
    ],
    shippingAddress: {
      street: "14 Rue du Faubourg Saint-Honoré",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75008",
      country: "France"
    },
    shippingMethod: "FedEx Luxury International",
    subtotal: 1150,
    discount: 115,
    shippingFee: 0,
    taxesAndDuties: 85,
    total: 1120,
    paymentMethod: "Apple Pay (Mastercard)",
    paymentStatus: "Paid",
    status: "Delivered",
    trackingNumber: "FDX-LUX-4412093-IT",
    timeline: [
      { status: "Order Placed", date: "2026-02-24 11:20 AM", completed: true, note: "Payment authorized" },
      { status: "Boutique Dispatched", date: "2026-02-24 04:00 PM", completed: true, note: "Dispatched from Milan Via Montenapoleone" },
      { status: "Customs & Hub Departure", date: "2026-02-25 09:30 AM", completed: true, note: "In Transit across EU corridor" },
      { status: "Out for Delivery", date: "2026-02-26 08:15 AM", completed: true, note: "Courier en route" },
      { status: "Delivered", date: "2026-02-26 01:40 PM", completed: true, note: "Signed by Client: S. Laurent" }
    ]
  },
  {
    id: "ORD-96518",
    date: "2026-02-15",
    customer: {
      name: "Marcus Aurelius B.",
      email: "marcus.a@vance-capital.com",
      phone: "+1 212 555 0192",
      tier: "FARFETCH Platinum Elite"
    },
    items: [
      {
        productId: "prod-006",
        title: "Double-Breasted Super 180s Cashmere Suit",
        brand: "Savile Row Bespoke",
        vendorId: "v-london",
        vendorName: "Savile Row Bespoke",
        price: 4800,
        quantity: 1,
        size: "UK 42R",
        color: "Midnight Navy",
        image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=300&q=80"
      }
    ],
    shippingAddress: {
      street: "740 Park Avenue, Penthouse B",
      city: "New York",
      state: "NY",
      postalCode: "10021",
      country: "United States"
    },
    shippingMethod: "White Glove Transatlantic Courier",
    subtotal: 4800,
    discount: 0,
    shippingFee: 120,
    taxesAndDuties: 380,
    total: 5300,
    paymentMethod: "Amex Centurion Black •••• 1001",
    paymentStatus: "Paid",
    status: "Delivered",
    trackingNumber: "WG-TRANS-771890-UK",
    timeline: [
      { status: "Order Placed", date: "2026-02-15 02:00 PM", completed: true, note: "Bespoke tailoring verified" },
      { status: "Boutique Dispatched", date: "2026-02-16 11:00 AM", completed: true, note: "Departed Savile Row Mayfair" },
      { status: "Customs Clearance", date: "2026-02-17 07:00 AM", completed: true, note: "Cleared JFK International" },
      { status: "Delivered", date: "2026-02-17 04:30 PM", completed: true, note: "Delivered to Residence Concierge" }
    ]
  }
];

export const USERS = [
  {
    id: "usr-customer",
    name: "Sophia Laurent",
    email: "sophia.laurent@luxury-client.com",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    tier: "FARFETCH Private Client (Gold VIP)",
    phone: "+33 6 42 19 88 10",
    address: {
      street: "14 Rue du Faubourg Saint-Honoré",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75008",
      country: "France"
    },
    savedCards: [
      { id: "c1", type: "Visa", number: "•••• •••• •••• 8842", expiry: "09/29", isDefault: true },
      { id: "c2", type: "Mastercard", number: "•••• •••• •••• 3019", expiry: "12/28", isDefault: false }
    ],
    wishlist: ["prod-002", "prod-007", "prod-010"]
  },
  {
    id: "usr-vendor",
    name: "Jean-Paul Gautier",
    email: "manager@atelier-montaigne.paris",
    role: "vendor",
    vendorId: "v-paris",
    vendorName: "Atelier Montaigne",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    boutiqueTitle: "Head of Global Retail Operations",
    permissions: ["manage_products", "view_orders", "ship_orders", "view_earnings", "export_reports", "edit_store_profile"]
  },
  {
    id: "usr-admin",
    name: "Alexander Vance",
    email: "alexander.vance@auraluxe.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    position: "Chief Executive & Global Platform Administrator",
    permissions: ["all_access", "manage_vendors", "moderate_products", "global_orders", "analytics_export", "rbac_access_control", "system_settings"]
  }
];

export const RBAC_ROLES = [
  {
    role: "Super Admin",
    description: "Unrestricted platform authority, vendor approval, financial auditing, RBAC controls, and global settings.",
    userCount: 3,
    permissions: [
      { name: "Platform Oversight & GMV Dashboard", granted: true },
      { name: "Approve / Suspend Vendor Boutiques", granted: true },
      { name: "Product Moderation & Featured Toggles", granted: true },
      { name: "Financial Audits & Escrow Payouts", granted: true },
      { name: "Global Orders Oversight & Cancellations", granted: true },
      { name: "RBAC Role & Access Control Matrix", granted: true },
      { name: "Global System Settings & Currency Rates", granted: true }
    ]
  },
  {
    role: "Vendor / Boutique Partner",
    description: "Manage private boutique catalog, fulfill customer orders, track sales commission, request payouts, and export store reports.",
    userCount: 18,
    permissions: [
      { name: "Manage Store Inventory & Add/Edit Products", granted: true },
      { name: "View Boutique Orders & Update Tracking", granted: true },
      { name: "Access Boutique Sales & Earnings Analytics", granted: true },
      { name: "Request Banking Payouts & Export Ledgers", granted: true },
      { name: "Edit Boutique Profile & Shipping SLA", granted: true },
      { name: "RBAC Role & Access Control Matrix", granted: false },
      { name: "Global System Settings & Currency Rates", granted: false }
    ]
  },
  {
    role: "Customer / VIP Client",
    description: "Browse curated collections, manage shopping cart, secure checkout, live order tracking, manage wishlist and addresses.",
    userCount: 1420,
    permissions: [
      { name: "Browse Products & Search Catalog", granted: true },
      { name: "Manage Wishlist & Shopping Cart", granted: true },
      { name: "Place Orders & Pay via Multiple Gateways", granted: true },
      { name: "Track Live Shipment Milestones", granted: true },
      { name: "Write Verified Product Reviews", granted: true },
      { name: "Access Vendor Dashboard", granted: false },
      { name: "Access Admin Dashboard", granted: false }
    ]
  }
];

export const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1, name: "US Dollar (USD)" },
  EUR: { symbol: "€", rate: 0.92, name: "Euro (EUR)" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound (GBP)" },
  INR: { symbol: "₹", rate: 86.8, name: "Indian Rupee (INR)" }
};

export const COUPONS = {
  "LUXURY2026": { discountPercent: 15, minOrder: 500, label: "15% Spring Couture Exclusive" },
  "FARFETCH10": { discountPercent: 10, minOrder: 300, label: "10% Global Fashion Welcome" },
  "VIPFIRST": { discountPercent: 20, minOrder: 1000, label: "20% Private Client VIP Tier" },
  "FREESHIP": { discountPercent: 0, freeShipping: true, label: "Complimentary Global Express Courier" }
};
