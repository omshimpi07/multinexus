import type {
  Business,
  Product,
  Service,
  Order,
  Booking,
  Review,
  Category,
} from "@/types";

// -------- Categories --------
export const categories: Category[] = [
  { id: "c1", name: "Beauty & Grooming", slug: "beauty", icon: "Scissors", description: "Salons, spas, pet grooming.", businessCount: 2 },
  { id: "c2", name: "Food & Bakery", slug: "food", icon: "Cookie", description: "Artisan bakeries and food makers.", businessCount: 1 },
  { id: "c3", name: "Fitness & Wellness", slug: "fitness", icon: "Dumbbell", description: "Gyms, trainers, wellness studios.", businessCount: 1 },
  { id: "c4", name: "Education", slug: "education", icon: "GraduationCap", description: "Private tutors and coaches.", businessCount: 1 },
  { id: "c5", name: "Home Services", slug: "home", icon: "Wrench", description: "Electricians, plumbers, cleaning.", businessCount: 2 },
  { id: "c6", name: "Healthcare", slug: "health", icon: "Stethoscope", description: "Clinics and health practitioners.", businessCount: 1 },
  { id: "c7", name: "Photography", slug: "photography", icon: "Camera", description: "Studios and photographers.", businessCount: 1 },
  { id: "c8", name: "Automotive", slug: "auto", icon: "Car", description: "Auto repair and detailing.", businessCount: 1 },
  { id: "c9", name: "Handmade & Crafts", slug: "crafts", icon: "Palette", description: "Handmade goods and craft stores.", businessCount: 1 },
];

// -------- Businesses --------
const gradients = [
  "linear-gradient(135deg,#1e3a8a,#3b82f6)",
  "linear-gradient(135deg,#065f46,#10b981)",
  "linear-gradient(135deg,#7c2d12,#f59e0b)",
  "linear-gradient(135deg,#831843,#ec4899)",
  "linear-gradient(135deg,#1e293b,#64748b)",
  "linear-gradient(135deg,#4c1d95,#8b5cf6)",
  "linear-gradient(135deg,#134e4a,#14b8a6)",
  "linear-gradient(135deg,#7f1d1d,#ef4444)",
  "linear-gradient(135deg,#052e16,#22c55e)",
  "linear-gradient(135deg,#1e1b4b,#6366f1)",
];

const HOURS = [
  { day: "Mon", open: "09:00", close: "18:00" },
  { day: "Tue", open: "09:00", close: "18:00" },
  { day: "Wed", open: "09:00", close: "18:00" },
  { day: "Thu", open: "09:00", close: "20:00" },
  { day: "Fri", open: "09:00", close: "20:00" },
  { day: "Sat", open: "10:00", close: "17:00" },
  { day: "Sun", open: "", close: "", closed: true },
];

export const businesses: Business[] = [
  { id: "biz_bloom_bakery", slug: "bloom-bakery", name: "Bloom Bakery", categoryId: "c2", category: "Food & Bakery", tagline: "Sourdough, croissants, and slow-fermented magic", description: "A neighborhood micro-bakery baking small batches of sourdough, laminated pastries, and seasonal cakes from local grain.", rating: 4.9, reviewCount: 312, location: "218 Cedar Ave", city: "Portland, OR", hours: HOURS, isOpen: true, phone: "(503) 555-0142", email: "hello@bloombakery.com", logo: "🥐", coverGradient: gradients[2], status: "active", featured: true, ownerId: "u_business", createdAt: "2024-04-12" },
  { id: "biz_luxe_salon", slug: "luxe-hair-studio", name: "Luxe Hair Studio", categoryId: "c1", category: "Beauty & Grooming", tagline: "Precision cuts. Editorial color.", description: "A modern salon specializing in balayage, precision cuts, and color correction. Book with one of our senior stylists.", rating: 4.8, reviewCount: 428, location: "44 Market St", city: "San Francisco, CA", hours: HOURS, isOpen: true, phone: "(415) 555-0198", email: "book@luxehair.com", logo: "✂️", coverGradient: gradients[3], status: "active", featured: true, ownerId: "u2", createdAt: "2023-11-02" },
  { id: "biz_pawfect", slug: "pawfect-grooming", name: "Pawfect Pet Grooming", categoryId: "c1", category: "Beauty & Grooming", tagline: "Where tails wag and coats shine", description: "Certified groomers for every breed. Full-service baths, cuts, nail trims, and de-shed treatments.", rating: 4.7, reviewCount: 186, location: "1201 Elm Rd", city: "Austin, TX", hours: HOURS, isOpen: true, phone: "(512) 555-0117", email: "hi@pawfect.com", logo: "🐾", coverGradient: gradients[1], status: "active", ownerId: "u3", createdAt: "2024-02-18" },
  { id: "biz_apex_fitness", slug: "apex-fitness", name: "Apex Fitness Club", categoryId: "c3", category: "Fitness & Wellness", tagline: "Train like it matters.", description: "Boutique strength and conditioning gym with certified coaches, small-group classes, and personal training.", rating: 4.9, reviewCount: 521, location: "88 Wharf Blvd", city: "Seattle, WA", hours: HOURS, isOpen: true, phone: "(206) 555-0134", email: "hey@apexfit.com", logo: "🏋️", coverGradient: gradients[0], status: "active", featured: true, ownerId: "u4", createdAt: "2023-08-01" },
  { id: "biz_stellar_photo", slug: "stellar-studio", name: "Stellar Photo Studio", categoryId: "c7", category: "Photography", tagline: "Portraits with intention", description: "Editorial and family portrait studio with natural light and expert retouching.", rating: 4.8, reviewCount: 143, location: "9 Bay St", city: "Brooklyn, NY", hours: HOURS, isOpen: false, phone: "(718) 555-0189", email: "shoot@stellar.com", logo: "📸", coverGradient: gradients[5], status: "active", ownerId: "u5", createdAt: "2024-01-22" },
  { id: "biz_summit_tutors", slug: "summit-tutors", name: "Summit Tutoring", categoryId: "c4", category: "Education", tagline: "1:1 tutoring that clicks", description: "K-12 and college-prep tutoring across math, science, and writing. In-person and online.", rating: 4.9, reviewCount: 267, location: "22 Oak Way", city: "Boston, MA", hours: HOURS, isOpen: true, phone: "(617) 555-0166", email: "learn@summittutors.com", logo: "🎓", coverGradient: gradients[9], status: "active", ownerId: "u6", createdAt: "2024-03-15" },
  { id: "biz_bright_electric", slug: "bright-electric", name: "Bright Electric Co.", categoryId: "c5", category: "Home Services", tagline: "Licensed. Insured. On time.", description: "Residential and light commercial electrical services. Panel upgrades, EV chargers, lighting.", rating: 4.7, reviewCount: 194, location: "540 Pine St", city: "Denver, CO", hours: HOURS, isOpen: true, phone: "(720) 555-0155", email: "book@brightelec.com", logo: "⚡", coverGradient: gradients[6], status: "active", ownerId: "u7", createdAt: "2023-06-30" },
  { id: "biz_meridian_clinic", slug: "meridian-clinic", name: "Meridian Health Clinic", categoryId: "c6", category: "Healthcare", tagline: "Primary care done well", description: "Same-day appointments, telemedicine, and preventive care with a friendly team.", rating: 4.8, reviewCount: 89, location: "7 Beacon Pl", city: "Chicago, IL", hours: HOURS, isOpen: true, phone: "(312) 555-0111", email: "care@meridian.com", logo: "🩺", coverGradient: gradients[7], status: "pending", ownerId: "u8", createdAt: "2025-01-05" },
  { id: "biz_shine_auto", slug: "shine-auto", name: "Shine Auto Care", categoryId: "c8", category: "Automotive", tagline: "Full-service auto repair", description: "ASE-certified mechanics. Diagnostics, brakes, oil changes, and detailing.", rating: 4.6, reviewCount: 231, location: "800 Fleet Ave", city: "Phoenix, AZ", hours: HOURS, isOpen: true, phone: "(602) 555-0129", email: "svc@shineauto.com", logo: "🔧", coverGradient: gradients[4], status: "active", ownerId: "u9", createdAt: "2023-10-12" },
  { id: "biz_maker_row", slug: "maker-row", name: "Maker Row Studio", categoryId: "c9", category: "Handmade & Crafts", tagline: "Small-batch homewares", description: "Hand-thrown ceramics, textiles, and stationery from independent makers.", rating: 4.8, reviewCount: 158, location: "312 Mill St", city: "Nashville, TN", hours: HOURS, isOpen: true, phone: "(615) 555-0173", email: "shop@makerrow.com", logo: "🎨", coverGradient: gradients[8], status: "active", featured: true, ownerId: "u10", createdAt: "2024-05-20" },
];

// -------- Products --------
const P = (
  id: string,
  businessId: string,
  name: string,
  price: number,
  image: string,
  category: string,
  stock = 24,
  rating = 4.7,
  reviewCount = 42,
  trending = false,
  compareAtPrice?: number,
): Product => {
  const biz = businesses.find((b) => b.id === businessId)!;
  return {
    id,
    businessId,
    businessName: biz.name,
    name,
    slug: id,
    description: `${name} — carefully crafted by ${biz.name}. Made with quality materials and attention to detail.`,
    price,
    compareAtPrice,
    stock,
    category,
    rating,
    reviewCount,
    image,
    trending,
  };
};

export const products: Product[] = [
  // Bloom Bakery
  P("p_sourdough", "biz_bloom_bakery", "Country Sourdough Loaf", 9, "🍞", "Bread", 18, 4.9, 128, true),
  P("p_croissant", "biz_bloom_bakery", "Butter Croissant (4-pack)", 14, "🥐", "Pastry", 32, 4.8, 96, true),
  P("p_babka", "biz_bloom_bakery", "Chocolate Babka", 18, "🍫", "Pastry", 12, 4.9, 74),
  P("p_baguette", "biz_bloom_bakery", "Rustic Baguette", 6, "🥖", "Bread", 40, 4.7, 51),
  P("p_seasonal_tart", "biz_bloom_bakery", "Seasonal Fruit Tart", 22, "🍓", "Cake", 8, 4.8, 33),
  // Luxe Hair Studio (retail products)
  P("p_shampoo", "biz_luxe_salon", "Restorative Shampoo 250ml", 28, "🧴", "Haircare", 44, 4.7, 82),
  P("p_hair_oil", "biz_luxe_salon", "Argan Hair Oil", 42, "💧", "Haircare", 22, 4.8, 61, true),
  P("p_brush", "biz_luxe_salon", "Boar Bristle Brush", 34, "🪮", "Tools", 30, 4.6, 44),
  // Pawfect
  P("p_shampoo_dog", "biz_pawfect", "Oatmeal Dog Shampoo", 18, "🐕", "Grooming", 55, 4.7, 38),
  P("p_brush_pet", "biz_pawfect", "De-shedding Brush", 24, "🧹", "Grooming", 40, 4.6, 27),
  // Apex Fitness
  P("p_shaker", "biz_apex_fitness", "Apex Shaker Bottle", 16, "🥤", "Gear", 100, 4.5, 55),
  P("p_tee", "biz_apex_fitness", "Apex Training Tee", 32, "👕", "Apparel", 60, 4.6, 71),
  P("p_bands", "biz_apex_fitness", "Resistance Band Set", 45, "🎗️", "Gear", 38, 4.7, 44, false, 60),
  // Stellar Photo
  P("p_print_a3", "biz_stellar_photo", "Fine-Art Print A3", 65, "🖼️", "Prints", 25, 4.9, 22),
  // Summit Tutors
  P("p_workbook", "biz_summit_tutors", "SAT Math Workbook", 24, "📘", "Books", 80, 4.8, 63, true),
  P("p_flashcards", "biz_summit_tutors", "Vocabulary Flashcards", 12, "🗂️", "Books", 120, 4.6, 41),
  // Bright Electric
  P("p_ev_kit", "biz_bright_electric", "EV Charger Install Kit", 240, "🔌", "Kits", 10, 4.7, 18),
  P("p_smart_switch", "biz_bright_electric", "Smart Wall Switch", 45, "💡", "Hardware", 60, 4.6, 34),
  // Shine Auto
  P("p_wash_kit", "biz_shine_auto", "Ceramic Wash Kit", 55, "🧽", "Detailing", 26, 4.7, 40),
  P("p_wax", "biz_shine_auto", "Premium Carnauba Wax", 38, "🧴", "Detailing", 44, 4.5, 29),
  // Maker Row
  P("p_mug", "biz_maker_row", "Hand-Thrown Mug", 34, "☕", "Ceramics", 30, 4.9, 88, true),
  P("p_bowl", "biz_maker_row", "Speckled Serving Bowl", 62, "🥣", "Ceramics", 14, 4.8, 42),
  P("p_towel", "biz_maker_row", "Linen Tea Towel", 22, "🧺", "Textiles", 50, 4.7, 33),
  P("p_notebook", "biz_maker_row", "Hand-bound Notebook", 28, "📓", "Stationery", 45, 4.8, 27),
  P("p_candle", "biz_maker_row", "Cedar & Vetiver Candle", 36, "🕯️", "Home", 38, 4.7, 55, true),
  P("p_vase", "biz_maker_row", "Stone Vase", 78, "🏺", "Ceramics", 9, 4.9, 21),
  P("p_apron", "biz_bloom_bakery", "Baker's Linen Apron", 42, "🥻", "Merch", 28, 4.6, 19),
  P("p_gift_card", "biz_luxe_salon", "Salon Gift Card $100", 100, "🎁", "Gift", 999, 5.0, 12),
  P("p_bandana", "biz_pawfect", "Pet Bandana", 12, "🎀", "Accessories", 60, 4.6, 24),
  P("p_leash", "biz_pawfect", "Rope Leash", 22, "🦴", "Accessories", 35, 4.7, 18),
  P("p_pre_workout", "biz_apex_fitness", "Pre-Workout Blend", 44, "⚡", "Supplements", 70, 4.5, 82),
  P("p_yoga_mat", "biz_apex_fitness", "Grip Yoga Mat", 58, "🧘", "Gear", 25, 4.7, 37, false, 72),
];

// -------- Services --------
const S = (
  id: string,
  businessId: string,
  name: string,
  price: number,
  duration: number,
  category: string,
  icon: string,
  rating = 4.8,
  reviewCount = 60,
  popular = false,
): Service => {
  const biz = businesses.find((b) => b.id === businessId)!;
  return {
    id,
    businessId,
    businessName: biz.name,
    name,
    slug: id,
    description: `${name} — professional service delivered by ${biz.name}. Booking is quick and flexible.`,
    price,
    durationMin: duration,
    category,
    rating,
    reviewCount,
    icon,
    popular,
  };
};

export const services: Service[] = [
  S("s_haircut", "biz_luxe_salon", "Precision Haircut", 85, 60, "Hair", "Scissors", 4.9, 240, true),
  S("s_balayage", "biz_luxe_salon", "Balayage Color", 220, 180, "Hair", "Palette", 4.9, 132, true),
  S("s_blowout", "biz_luxe_salon", "Blow-Dry Style", 55, 45, "Hair", "Wind", 4.8, 97),
  S("s_bath_dog", "biz_pawfect", "Full-Service Dog Bath", 65, 60, "Pet", "Droplets", 4.8, 88, true),
  S("s_groom_dog", "biz_pawfect", "Breed Cut & Groom", 95, 90, "Pet", "Scissors", 4.7, 62),
  S("s_pt_session", "biz_apex_fitness", "Personal Training (1hr)", 90, 60, "Fitness", "Dumbbell", 4.9, 210, true),
  S("s_smallgroup", "biz_apex_fitness", "Small-Group Class", 30, 45, "Fitness", "Users", 4.8, 176),
  S("s_family_photo", "biz_stellar_photo", "Family Portrait Session", 320, 90, "Photo", "Camera", 4.9, 71, true),
  S("s_headshot", "biz_stellar_photo", "Executive Headshot", 180, 45, "Photo", "User", 4.8, 54),
  S("s_math_tutor", "biz_summit_tutors", "1-Hour Math Tutoring", 65, 60, "Tutoring", "Calculator", 4.9, 148, true),
  S("s_essay_coach", "biz_summit_tutors", "Essay Coaching", 75, 60, "Tutoring", "PenLine", 4.8, 92),
  S("s_ev_install", "biz_bright_electric", "EV Charger Installation", 480, 240, "Electrical", "Zap", 4.8, 46),
  S("s_panel_upgrade", "biz_bright_electric", "Panel Inspection", 120, 60, "Electrical", "Gauge", 4.7, 38),
  S("s_checkup", "biz_meridian_clinic", "Wellness Check-Up", 140, 45, "Health", "Stethoscope", 4.8, 32),
  S("s_oilchange", "biz_shine_auto", "Full-Service Oil Change", 75, 45, "Auto", "Wrench", 4.7, 118, true),
  S("s_detail", "biz_shine_auto", "Premium Auto Detailing", 220, 180, "Auto", "Sparkles", 4.8, 84),
  S("s_cake_consult", "biz_bloom_bakery", "Custom Cake Consultation", 35, 30, "Bakery", "Cake", 4.9, 41),
  S("s_pottery_class", "biz_maker_row", "Pottery Wheel Class", 85, 120, "Craft", "Palette", 4.9, 66, true),
  S("s_hair_treatment", "biz_luxe_salon", "Bond-Repair Treatment", 65, 45, "Hair", "Sparkles", 4.8, 58),
  S("s_puppy_intro", "biz_pawfect", "Puppy First Groom", 55, 45, "Pet", "Heart", 4.9, 34),
];

// -------- Orders --------
const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

export const orders: Order[] = Array.from({ length: 24 }, (_, i) => {
  const p = products[i % products.length];
  const p2 = products[(i + 3) % products.length];
  const qty = 1 + (i % 3);
  const items = [
    { productId: p.id, name: p.name, price: p.price, quantity: qty, image: p.image },
    ...(i % 3 === 0 ? [{ productId: p2.id, name: p2.name, price: p2.price, quantity: 1, image: p2.image }] : []),
  ];
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 8;
  const statuses: Order["status"][] = ["placed", "confirmed", "processing", "shipped", "completed", "cancelled"];
  return {
    id: `ORD-${(1000 + i).toString()}`,
    customerId: "u_customer",
    customerName: ["Alex Morgan", "Priya Shah", "Marcus Lee", "Elena Rossi", "Diego Vargas"][i % 5],
    businessId: p.businessId,
    businessName: p.businessName,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    status: statuses[i % statuses.length],
    createdAt: daysAgo(i * 2 + 1),
    shippingAddress: "1234 Example St, Portland, OR 97201",
  };
});

// -------- Bookings --------
const inDays = (n: number) => new Date(Date.now() + n * 86_400_000).toISOString();

export const bookings: Booking[] = Array.from({ length: 20 }, (_, i) => {
  const s = services[i % services.length];
  const statuses: Booking["status"][] = ["upcoming", "confirmed", "completed", "cancelled", "no-show"];
  const isFuture = i < 8;
  return {
    id: `BK-${(2000 + i).toString()}`,
    customerId: "u_customer",
    customerName: ["Alex Morgan", "Priya Shah", "Marcus Lee", "Elena Rossi", "Diego Vargas"][i % 5],
    businessId: s.businessId,
    businessName: s.businessName,
    serviceId: s.id,
    serviceName: s.name,
    date: isFuture ? inDays(i + 1) : daysAgo(i * 3),
    durationMin: s.durationMin,
    price: s.price,
    status: isFuture ? (["upcoming", "confirmed"] as const)[i % 2] : statuses[(i + 2) % statuses.length],
    notes: i % 4 === 0 ? "First-time client, prefers afternoon." : undefined,
  };
});

// -------- Reviews --------
const REVIEW_TEXTS = [
  "Absolutely fantastic experience. Will definitely be back.",
  "Great service, friendly staff, and the quality was top-notch.",
  "Booked online and everything was seamless. Highly recommend.",
  "Not what I expected — took a bit longer than promised but the result was good.",
  "Blown away by the attention to detail. Best I've found in the city.",
  "Solid work at a fair price. Would use again.",
  "The team went above and beyond. Real professionals.",
  "Good value overall. A few small things to improve but nothing major.",
];
const REVIEW_NAMES = ["Alex Morgan", "Priya Shah", "Marcus Lee", "Elena Rossi", "Diego Vargas", "Sam Cohen", "Yui Tanaka", "Ruth Anders"];

export const reviews: Review[] = Array.from({ length: 30 }, (_, i) => {
  const biz = businesses[i % businesses.length];
  const rating = [5, 5, 5, 4, 4, 5, 3, 5][i % 8];
  return {
    id: `rv_${i + 1}`,
    customerId: `u_cust_${i}`,
    customerName: REVIEW_NAMES[i % REVIEW_NAMES.length],
    businessId: biz.id,
    businessName: biz.name,
    targetType: "business",
    targetId: biz.id,
    rating,
    title: rating >= 5 ? "Highly recommend" : rating === 4 ? "Really good" : "It was okay",
    body: REVIEW_TEXTS[i % REVIEW_TEXTS.length],
    createdAt: daysAgo(i * 3 + 2),
    reply: i % 5 === 0 ? { body: "Thank you so much — we appreciate you!", createdAt: daysAgo(i * 3 + 1) } : undefined,
    status: i === 27 ? "flagged" : i === 28 ? "pending" : "published",
  };
});

// -------- Analytics --------
export const analytics = {
  revenue: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i, 1).toLocaleString("en", { month: "short" }),
    revenue: 12_000 + Math.round(Math.sin(i / 2) * 3000) + i * 800,
    orders: 40 + Math.round(Math.cos(i / 2) * 8) + i * 3,
  })),
  bookings: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i, 1).toLocaleString("en", { month: "short" }),
    bookings: 22 + Math.round(Math.sin(i / 1.5) * 6) + i * 2,
  })),
  categoryShare: categories.slice(0, 6).map((c, i) => ({ name: c.name, value: 8 + i * 3 })),
  growth: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i, 1).toLocaleString("en", { month: "short" }),
    customers: 120 + i * 24 + Math.round(Math.sin(i) * 10),
  })),
};

export const platformStats = {
  businesses: businesses.length,
  customers: 12_480,
  orders: 38_912,
  bookings: 14_207,
};

// Featured helpers
export const featuredBusinesses = businesses.filter((b) => b.featured);
export const trendingProducts = products.filter((p) => p.trending);
export const popularServices = services.filter((s) => s.popular);
