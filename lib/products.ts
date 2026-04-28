export type Variant = {
  id: string;
  label: string;
  ml: number;
  price_paise: number;
  compare_at_paise?: number;
  stock_count: number;
  sku: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  family: 'woody' | 'oriental' | 'floral' | 'smoky';
  description: string;
  story: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  highlights: string[];
  longevity: string;
  sillage: string;
  images: string[];
  category: 'eau-de-parfum';
  is_active: boolean;
  is_featured: boolean;
  rating: number;
  rating_count: number;
  variants: Variant[];
};

export const PRODUCTS: Product[] = [
  {
    id: 'p_velour_or',
    slug: 'velour-or',
    name: 'Velour Or',
    tagline: 'Tobacco, oud, sun-warmed wood.',
    family: 'woody',
    description:
      'A slow-burning woody composition built around aged Assam oud, sweet pipe-tobacco absolute, and Mysore sandalwood. The kind of fragrance that smells like an old library at dusk — burnished, certain, unhurried.',
    story:
      'Velour Or began as a private commission for a Bombay tailor who wanted "the smell of the inside of his father\'s coat." We chased it for nine months — oud from Hojai, tobacco from Cuba, a thread of saffron from Kashmir.',
    notes: {
      top: ['Saffron', 'Pink pepper', 'Bergamot'],
      heart: ['Pipe tobacco absolute', 'Damask rose', 'Cinnamon bark'],
      base: ['Aged Assam oud', 'Mysore sandalwood', 'Tonka', 'Amber'],
    },
    highlights: [
      'Slow-blended for six weeks before bottling',
      '22% perfume concentration — true eau de parfum',
      'Hand-numbered glass, brushed-brass fitment',
    ],
    longevity: '10–12 hours',
    sillage: 'Moderate to strong',
    images: ['/images/velour-or.jpg', '/images/velour-or-square.jpg'],
    category: 'eau-de-parfum',
    is_active: true,
    is_featured: true,
    rating: 4.9,
    rating_count: 184,
    variants: [
      { id: 'v_velour_or_8', label: 'Discovery 8 ml', ml: 8, price_paise: 89000, stock_count: 240, sku: 'SS-VO-008' },
      { id: 'v_velour_or_50', label: '50 ml', ml: 50, price_paise: 420000, compare_at_paise: 480000, stock_count: 86, sku: 'SS-VO-050' },
      { id: 'v_velour_or_100', label: '100 ml', ml: 100, price_paise: 680000, compare_at_paise: 780000, stock_count: 42, sku: 'SS-VO-100' },
    ],
  },
  {
    id: 'p_nuit_noire',
    slug: 'nuit-noire',
    name: 'Nuit Noire',
    tagline: 'Smoked leather, vetiver, black cardamom.',
    family: 'smoky',
    description:
      'A cool-burning smoky leather, sharpened with green Haitian vetiver and the dry crack of black cardamom. Worn at night, it reads like wet stone after rain; in the day it softens to suede and ash.',
    story:
      'We blended Nuit Noire to wear with kohl. A friend — a director — wanted something that "smelled like the wings of a theatre after the lights go down." Birch tar, vetiver, and a quiet vanilla pulled from Madagascar pods.',
    notes: {
      top: ['Black cardamom', 'Bay laurel', 'Bitter orange'],
      heart: ['Smoked leather', 'Iris root', 'Davana'],
      base: ['Haitian vetiver', 'Birch tar', 'Smoked vanilla', 'Patchouli'],
    },
    highlights: [
      'Birch tar distilled in small batches in the Western Ghats',
      'Vegan, IFRA-compliant, no artificial colourants',
      'Hand-numbered glass, matte-black anodised cap',
    ],
    longevity: '9–11 hours',
    sillage: 'Strong',
    images: ['/images/nuit-noire.jpg', '/images/nuit-noire-square.jpg'],
    category: 'eau-de-parfum',
    is_active: true,
    is_featured: true,
    rating: 4.8,
    rating_count: 142,
    variants: [
      { id: 'v_nuit_noire_8', label: 'Discovery 8 ml', ml: 8, price_paise: 89000, stock_count: 220, sku: 'SS-NN-008' },
      { id: 'v_nuit_noire_50', label: '50 ml', ml: 50, price_paise: 420000, compare_at_paise: 480000, stock_count: 64, sku: 'SS-NN-050' },
      { id: 'v_nuit_noire_100', label: '100 ml', ml: 100, price_paise: 680000, compare_at_paise: 780000, stock_count: 30, sku: 'SS-NN-100' },
    ],
  },
  {
    id: 'p_rose_velours',
    slug: 'rose-velours',
    name: 'Rose Velours',
    tagline: 'Damask rose on silk, white musk.',
    family: 'floral',
    description:
      'A soft, modern rose. Damask absolute from the Kannauj fields layered with cool peony, a thread of pink pepper, and a long, milky drydown of silk amber and cashmeran.',
    story:
      'Built around an absolute we lifted from a single farmer in Kannauj — 15,000 petals to the gram. We wanted a rose that didn\'t apologise: not a bouquet, not a garden. A length of silk on a hot afternoon.',
    notes: {
      top: ['Pink pepper', 'Lychee', 'Aldehydes'],
      heart: ['Damask rose absolute', 'Peony', 'Magnolia'],
      base: ['Cashmeran', 'White musk', 'Silk amber', 'Sandalwood'],
    },
    highlights: [
      'Single-origin Kannauj rose absolute',
      'Soft, skin-close projection — wears close, lasts long',
      'Hand-numbered glass, brushed-gold fitment',
    ],
    longevity: '8–10 hours',
    sillage: 'Soft to moderate',
    images: ['/images/rose-velours.jpg', '/images/rose-velours-square.jpg'],
    category: 'eau-de-parfum',
    is_active: true,
    is_featured: true,
    rating: 4.9,
    rating_count: 211,
    variants: [
      { id: 'v_rose_velours_8', label: 'Discovery 8 ml', ml: 8, price_paise: 89000, stock_count: 260, sku: 'SS-RV-008' },
      { id: 'v_rose_velours_50', label: '50 ml', ml: 50, price_paise: 420000, compare_at_paise: 480000, stock_count: 92, sku: 'SS-RV-050' },
      { id: 'v_rose_velours_100', label: '100 ml', ml: 100, price_paise: 680000, compare_at_paise: 780000, stock_count: 36, sku: 'SS-RV-100' },
    ],
  },
  {
    id: 'p_soleil_dore',
    slug: 'soleil-dore',
    name: 'Soleil Doré',
    tagline: 'Saffron, jasmine sambac, honeyed oud.',
    family: 'oriental',
    description:
      'A sun-soaked oriental — Kashmiri saffron, jasmine sambac picked at dawn, and a slow honeyed oud accord. Warm, gilded, the smell of sunlight pressed into glass.',
    story:
      'Soleil Doré is the most-requested fragrance from our private clients. A modern oriental that doesn\'t lean on overdosed vanilla — it leans on saffron, on real jasmine, on a 14-year-old Hojai oud aged in cedar.',
    notes: {
      top: ['Kashmiri saffron', 'Bergamot', 'Mandarin'],
      heart: ['Jasmine sambac', 'Damask rose', 'Orange blossom'],
      base: ['Honeyed oud', 'Amber', 'Benzoin', 'Tonka'],
    },
    highlights: [
      '14-year aged Hojai oud, used at trace concentration',
      'Real jasmine sambac absolute — not a synthetic recreation',
      'Hand-numbered glass, polished-brass fitment',
    ],
    longevity: '10–12 hours',
    sillage: 'Strong',
    images: ['/images/soleil-dore.jpg', '/images/soleil-dore-square.jpg'],
    category: 'eau-de-parfum',
    is_active: true,
    is_featured: true,
    rating: 5.0,
    rating_count: 167,
    variants: [
      { id: 'v_soleil_dore_8', label: 'Discovery 8 ml', ml: 8, price_paise: 89000, stock_count: 200, sku: 'SS-SD-008' },
      { id: 'v_soleil_dore_50', label: '50 ml', ml: 50, price_paise: 420000, compare_at_paise: 480000, stock_count: 70, sku: 'SS-SD-050' },
      { id: 'v_soleil_dore_100', label: '100 ml', ml: 100, price_paise: 680000, compare_at_paise: 780000, stock_count: 24, sku: 'SS-SD-100' },
    ],
  },
];

export function getActiveProducts() {
  return PRODUCTS.filter((p) => p.is_active);
}
export function getFeaturedProducts(n = 4) {
  return PRODUCTS.filter((p) => p.is_active && p.is_featured).slice(0, n);
}
export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug && p.is_active);
}
export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
export function getRelatedProducts(slug: string, n = 3) {
  return PRODUCTS.filter((p) => p.slug !== slug && p.is_active).slice(0, n);
}
export function getMinVariantPaise(p: Product): number {
  return Math.min(...p.variants.map((v) => v.price_paise));
}
export function getVariant(productId: string, variantId: string) {
  const p = getProductById(productId);
  if (!p) return undefined;
  return p.variants.find((v) => v.id === variantId);
}
export function formatINR(paise: number) {
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees);
}
