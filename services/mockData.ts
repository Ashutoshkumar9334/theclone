

import { Product } from '../types';

export const CATEGORIES = [
  'Luggage & Bag Textile',
  'Printed Textile',
  'Home Furnishing Textile',
  'Medical Textile',
  'Automobile Textile',
  'Bags Textile',
  'PVC Vinyl Flooring',
  'Stock Clearance',
  'Calendar & Diary',
  'Sewing Machine'
];

export type MegaMenuContent = 
  | { type: 'banner'; image: string; title: string; subtitle?: string; link?: string; description?: string[] }
  | { type: 'links'; sections: { title: string; items: string[] }[] };

// detailed structure for Mega Menu matching video
export const MEGA_MENU_DATA: Record<string, MegaMenuContent> = {
  'Luggage & Bag Textile': {
    type: 'banner',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop',
    title: 'VERSATILE\nFABRICS',
    subtitle: 'For Fashion, Home & Industrial',
    description: [
        'Digital Printed Fabrics, Narrow Woven Fabrics',
        'Belts & Elastics for garments & sportswear',
        'Non-Woven & Printed Carpets, PVC Films',
        'Medical & Geo Textiles for specialized applications'
    ]
  },
  'Tents & Tarpaulins Textile': {
    type: 'banner',
    image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1000&auto=format&fit=crop',
    title: 'RUGGED\nFABRICS',
    subtitle: 'For Outdoor & Heavy-Duty Applications',
    description: [
        'Tents, Tarpaulins & Non-Woven Materials',
        'Geo Textile Membranes for construction',
        'Durable Synthetic Fabrics for multiple industries'
    ]
  },
  'Industrial Textile': {
    type: 'links',
    sections: [
      { 
        title: 'Outer Fabric', 
        items: ['PVC Coated Fabric', 'PU Coated Fabric', 'Oxford Fabric', 'Canvas Fabric', 'Ripstop Fabric', 'Cord Fabric', 'Hypalon Fabric'] 
      },
      { 
        title: 'Inner Fabric', 
        items: ['Pocket Fabric', 'Taffeta', 'Polyester Fabric (170D, 190D)', 'Satin Lining', 'Astar Cloth', 'Air Mesh Fabric (Light, Medium, Heavy)'] 
      },
      { 
        title: 'Narrow Woven Fabric', 
        items: ['PP/Tape Newar', 'Printed Newar', 'Printed Ribbon', 'Lanyard'] 
      },
      { 
        title: 'Accessories & Components', 
        items: ['Buckles', 'Sliders', 'Zippers', 'Hooks', 'D Rings'] 
      }
    ]
  }
};

export const DEAL_PRODUCT: Product = {
  id: 'deal-1',
  name: 'Python Ambosured Rexine Cloth - 1.7mm Thick Pista Green Snakeskin Pattern PVC',
  price: 5400.00 / 83, // Converted to USD for internal logic, displayed as INR
  category: 'Special',
  image: 'https://images.unsplash.com/photo-1550953831-e38053642b5b?q=80&w=800&auto=format&fit=crop', // Snakeskin texture
  description: 'Premium heavy duty rexine.',
  material: 'PVC',
  inStock: true
};

export const DEAL_PRODUCTS: Product[] = [
  DEAL_PRODUCT,
  {
    id: 'deal-2',
    name: 'Premium Velvet Upholstery Fabric | Royal Blue - Limited Edition',
    price: 6200.00 / 83,
    category: 'Special',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop',
    description: 'Exclusive deal on velvet.',
    material: 'Velvet',
    inStock: true
  },
  {
    id: 'deal-3',
    name: 'Heavy Duty Canvas Roll - Weather Resistant',
    price: 3800.00 / 83,
    category: 'Special',
    image: 'https://images.unsplash.com/photo-1596614486518-84224523306d?q=80&w=600&auto=format&fit=crop',
    description: 'Best price for canvas.',
    material: 'Canvas',
    inStock: true
  }
];

export const LATEST_PRODUCTS: Product[] = [
  {
    id: 'lp-1',
    name: 'Custom Order Puller',
    price: 400.00 / 83,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=600&auto=format&fit=crop', // Zipper/Puller visual
    description: 'Custom design',
    material: 'Metal',
    inStock: false,
    brand: 'Custom Design'
  },
  {
    id: 'lp-2',
    name: 'PVC Stiffener Strip | 4 mm',
    price: 37.00 / 83,
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1621251957588-4444a95447b9?q=80&w=600&auto=format&fit=crop', // Industrial strip/material
    description: 'Stiffener strip',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'lp-3',
    name: 'Custom Order Zipper',
    price: 773.00 / 83,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=600&auto=format&fit=crop', // Zipper detail
    description: 'Custom zipper',
    material: 'Nylon',
    inStock: false,
    brand: 'Custom Design'
  },
  {
    id: 'lp-4',
    name: 'Insulation Aluminium Foil',
    price: 4250.00 / 83,
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1619623223068-d05542f7c08d?q=80&w=600&auto=format&fit=crop', // Foil texture
    description: 'Insulation foil',
    material: 'Aluminium',
    inStock: true
  },
  {
    id: 'lp-5',
    name: 'Polyester Fabric Red width 60"',
    price: 6500.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1612459864228-569655822312?q=80&w=600&auto=format&fit=crop', // Red fabric
    description: 'Red polyester',
    material: 'Polyester',
    inStock: true
  },
  {
    id: 'lp-6',
    name: 'PVC Coated Fabric Dark Yellow',
    price: 4500.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1626202269986-905c192c7304?q=80&w=600&auto=format&fit=crop', // Yellow fabric
    description: 'Coated fabric',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'lp-7',
    name: 'Polyester Fabric with PU Coating',
    price: 4600.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=600&auto=format&fit=crop', // Golden/Yellow fabric
    description: 'Polyester',
    material: 'Polyester',
    inStock: true
  },
   {
    id: 'lp-8',
    name: 'Heavy Duty Canvas Roll',
    price: 3200.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1596614486518-84224523306d?q=80&w=600&auto=format&fit=crop', // Canvas roll
    description: 'Heavy Canvas',
    material: 'Canvas',
    inStock: true
  }
];

export const NEW_ARRIVALS: Product[] = [
  {
    id: 'na-1',
    name: 'Printed Heavy Twill Bonded | 180 Gsm | Abstract Black & White',
    price: 7150.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=600&auto=format&fit=crop', // Black/White Pattern
    description: 'High quality bonded twill.',
    material: 'Twill',
    inStock: true,
    rating: 5,
    reviews: 1
  },
  {
    id: 'na-2',
    name: 'Heavy Twill Bonded | 290 Gsm | Lab Print Scientific Pattern',
    price: 7366.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=600&auto=format&fit=crop', // Science/Abstract Pattern
    description: 'Lab print design.',
    material: 'Twill',
    rating: 5,
    reviews: 1,
    inStock: true
  },
  {
    id: 'na-3',
    name: 'Printed Heavy Twill Bonded Fabric | 260 Gsm | Unicorn Kids Pattern',
    price: 7750.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1534643960519-11ad79bc19df?q=80&w=600&auto=format&fit=crop', // Kids Pattern
    description: 'Cute unicorn print.',
    material: 'Twill',
    inStock: true
  },
  {
    id: 'na-4',
    name: 'URI Rexine Fabric - 85mm | 54" Width | Textured Brown Leather Finish',
    price: 4901.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=600&auto=format&fit=crop', // Textured Brown
    description: 'Durable rexine.',
    material: 'Rexine',
    inStock: true
  },
  {
    id: 'na-5',
    name: 'PU Coated Fabric | 1000- Series | Royal Blue',
    price: 6930.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop', // Blue Velvet
    description: 'Soft touch velvet.',
    material: 'Velvet',
    inStock: true,
    rating: 5,
    reviews: 1,
    discount: 10
  },
  {
    id: 'na-6',
    name: 'Silver Foil Fabric',
    price: 4321.80 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1619623223068-d05542f7c08d?q=80&w=600&auto=format&fit=crop', // Foil
    description: 'Shiny silver foil.',
    material: 'Foil',
    inStock: true
  },
  {
    id: 'na-7',
    name: 'Bajra Tricot | Synthetic Leather',
    price: 78000.00 / 83, 
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1550953831-e38053642b5b?q=80&w=800&auto=format&fit=crop', // Texture
    description: 'High quality synthetic leather.',
    material: 'Synthetic Leather',
    inStock: true
  },
  {
    id: 'na-8',
    name: 'Heavy Twill Bonded | 180 Gsm | Rose Black',
    price: 7366.00 / 83,
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=600&auto=format&fit=crop', // Similar to lp-2
    description: 'Lab print design.',
    material: 'Twill',
    inStock: true
  }
];

export const CALENDAR_PRODUCTS: Product[] = [
  {
    id: 'cl-1',
    name: 'Diary Cover | ME-101 | Crocodile Texture Grey',
    price: 2800.00 / 83,
    category: 'Calendar & Diary',
    image: 'https://images.unsplash.com/photo-1549103062-83b7f2f451f0?q=80&w=600&auto=format&fit=crop',
    description: 'Premium crocodile texture for diaries.',
    material: 'Rexine',
    inStock: true
  },
  {
    id: 'cl-2',
    name: 'Diary Cover | ME-102 | Geometric Grid Teal',
    price: 2800.00 / 83,
    category: 'Calendar & Diary',
    image: 'https://images.unsplash.com/photo-1599694467268-68740b20140d?q=80&w=600&auto=format&fit=crop',
    description: 'Modern geometric grid pattern.',
    material: 'Rexine',
    inStock: true
  },
  {
    id: 'cl-3',
    name: 'Diary Cover | ME-903 | Royal Purple Smooth',
    price: 2800.00 / 83,
    category: 'Calendar & Diary',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    description: 'Smooth royal purple finish.',
    material: 'Synthetic',
    inStock: true
  },
  {
    id: 'cl-4',
    name: 'Diary Cover | ME-904 | Sky Blue Leather Grain',
    price: 2800.00 / 83,
    category: 'Calendar & Diary',
    image: 'https://images.unsplash.com/photo-1558051815-0b1b933758a0?q=80&w=600&auto=format&fit=crop',
    description: 'Classic leather grain in sky blue.',
    material: 'Leatherette',
    inStock: true
  },
  {
    id: 'cl-5',
    name: 'Diary Cover | ME-905 | Metallic Rose Gold',
    price: 2800.00 / 83,
    category: 'Calendar & Diary',
    image: 'https://images.unsplash.com/photo-1616486029423-aaa478965c96?q=80&w=600&auto=format&fit=crop',
    description: 'Shimmering rose gold finish.',
    material: 'PU Coated',
    inStock: true
  },
  {
    id: 'cl-6',
    name: 'Diary Cover | ME-106 | 3D Prism Pattern Blue',
    price: 2800.00 / 83,
    category: 'Calendar & Diary',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
    description: 'Eye-catching 3D prism effect.',
    material: 'Embossed PVC',
    inStock: true
  }
];

export const BAGS_TEXTILE_PRODUCTS: Product[] = [
  {
    id: 'bt-1',
    name: 'Silver Foil Fabric',
    price: 4321.80 / 83,
    category: 'Bags Textile',
    image: 'https://images.unsplash.com/photo-1619623223068-d05542f7c08d?q=80&w=600&auto=format&fit=crop',
    description: 'Shiny silver foil fabric for bags.',
    material: 'Foil',
    inStock: true
  },
  {
    id: 'bt-2',
    name: 'Khadi | Navy Blue Denim Finish',
    price: 6000.00 / 83,
    category: 'Bags Textile',
    image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=600&auto=format&fit=crop',
    description: 'Durable navy blue khadi fabric.',
    material: 'Cotton Blend',
    inStock: true
  },
  {
    id: 'bt-3',
    name: 'Printed Heavy Twill | Floral Design',
    price: 6649.50 / 83,
    category: 'Bags Textile',
    image: 'https://images.unsplash.com/photo-1572584683823-3b603d1eb3f1?q=80&w=600&auto=format&fit=crop',
    description: 'Heavy twill with beautiful floral print.',
    material: 'Twill',
    inStock: false
  },
  {
    id: 'bt-4',
    name: 'Custom Order Zipper',
    price: 773.00 / 83,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=600&auto=format&fit=crop',
    description: 'Custom designed zippers for bags.',
    material: 'Nylon',
    brand: 'Custom Design',
    inStock: false
  },
  {
    id: 'bt-5',
    name: 'PP Nonwoven Fabric | Pink Texture',
    price: 2822.40 / 83,
    category: 'Bags Textile',
    image: 'https://images.unsplash.com/photo-1596468138927-4481061413a1?q=80&w=600&auto=format&fit=crop',
    description: 'Eco-friendly PP nonwoven fabric in pink.',
    material: 'Polypropylene',
    inStock: false
  },
  {
    id: 'bt-6',
    name: 'Custom Order Puller',
    price: 400.00 / 83,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=600&auto=format&fit=crop',
    description: 'Custom designed zip pullers.',
    material: 'Metal',
    brand: 'Custom Design',
    inStock: false
  }
];

export const STOCK_CLEARANCE_PRODUCTS: Product[] = [
  {
    id: 'sc-1',
    name: 'Printed Pvc | Unicorn Pattern Dark Blue',
    price: 4000.00 / 83,
    category: 'Stock Clearance',
    image: 'https://images.unsplash.com/photo-1603511116260-12c1de3021f1?q=80&w=600&auto=format&fit=crop', // Dark blue pattern
    description: 'Printed PVC with unicorn pattern.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'sc-2',
    name: 'Printed Pvc | Unicorn Pattern Rainbow',
    price: 1680.00 / 83,
    category: 'Stock Clearance',
    image: 'https://images.unsplash.com/photo-1534643960519-11ad79bc19df?q=80&w=600&auto=format&fit=crop', // Pattern
    description: 'Rainbow unicorn design.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'sc-3',
    name: 'Printed Pvc | Elephant Pink',
    price: 4000.00 / 83,
    category: 'Stock Clearance',
    image: 'https://images.unsplash.com/photo-1502325091726-2591602970a2?q=80&w=600&auto=format&fit=crop', // Pink Pattern
    description: 'Cute elephant print on pink.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'sc-4',
    name: 'Micro Satin Bonded | Cow Print',
    price: 7000.00 / 83,
    category: 'Stock Clearance',
    image: 'https://images.unsplash.com/photo-1533035339999-5606df801844?q=80&w=600&auto=format&fit=crop', // Cow print
    description: 'Trendy cow print pattern.',
    material: 'Micro Satin',
    inStock: true
  },
  {
    id: 'sc-5',
    name: 'Printed Pvc | Unicorn Sky Blue',
    price: 2360.00 / 83,
    category: 'Stock Clearance',
    image: 'https://images.unsplash.com/photo-1558051815-0b1b933758a0?q=80&w=600&auto=format&fit=crop', // Sky blue
    description: 'Sky blue unicorn print.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'sc-6',
    name: 'Printed Pvc | Unicorn Neon Black',
    price: 3320.00 / 83,
    category: 'Stock Clearance',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop', // Dark Pattern
    description: 'Neon unicorn print on black.',
    material: 'PVC',
    inStock: true
  }
];

export const AUTOMOBILE_TEXTILES_PRODUCTS: Product[] = [
  {
    id: 'at-1',
    name: 'Maruti Check Single Side | Black',
    price: 4250.00 / 83,
    category: 'Automobile Textile',
    image: 'https://images.unsplash.com/photo-1589315340656-7c603b5cb0f9?q=80&w=600&auto=format&fit=crop', 
    description: 'Durable check pattern for automobile interiors.',
    material: 'PVC',
    inStock: false
  },
  {
    id: 'at-2',
    name: 'Gypsy Hood | Mango',
    price: 4000.00 / 83,
    category: 'Automobile Textile',
    image: 'https://images.unsplash.com/photo-1612459864228-569655822312?q=80&w=600&auto=format&fit=crop', 
    description: 'High quality hood material in mango color.',
    material: 'Canvas',
    inStock: true
  },
  {
    id: 'at-3',
    name: 'R-8 Tricot | 1.5mm | Dark Grey',
    price: 5400.00 / 83,
    category: 'Automobile Textile',
    image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=600&auto=format&fit=crop', 
    description: 'R-8 Tricot fabric with 1.5mm thickness.',
    material: 'Tricot',
    inStock: true
  },
  {
    id: 'at-4',
    name: 'Satin Loopknit | 0.80MM | Purple',
    price: 5000.00 / 83,
    category: 'Automobile Textile',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop', 
    description: 'Premium satin loopknit fabric.',
    material: 'Satin',
    inStock: true
  },
  {
    id: 'at-5',
    name: 'E-87 | 1.00MM | Black Leather Finish',
    price: 4400.00 / 83,
    category: 'Automobile Textile',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop', 
    description: 'E-87 standard automobile leather finish.',
    material: 'Synthetic Leather',
    inStock: true
  },
  {
    id: 'at-6',
    name: 'Crocodile Tricot | 1.20MM | Brown',
    price: 5640.00 / 83,
    category: 'Automobile Textile',
    image: 'https://images.unsplash.com/photo-1549103062-83b7f2f451f0?q=80&w=600&auto=format&fit=crop', 
    description: 'Luxurious crocodile pattern tricot.',
    material: 'Tricot',
    inStock: true
  }
];

export const MEDICAL_TEXTILE_PRODUCTS: Product[] = [
  {
    id: 'mt-1',
    name: 'Leather Cloth For Medical Mattress',
    price: 5250.00 / 83,
    category: 'Medical Textile',
    image: 'https://images.unsplash.com/photo-1517260739337-6799d2fb9ae3?q=80&w=600&auto=format&fit=crop',
    description: 'Durable leather cloth ideal for medical mattresses.',
    material: 'PVC Leather',
    inStock: true
  },
  {
    id: 'mt-2',
    name: 'American Flock',
    price: 99.75 / 83,
    category: 'Medical Textile',
    image: 'https://images.unsplash.com/photo-1503923307521-8285513d8029?q=80&w=600&auto=format&fit=crop',
    description: 'Soft touch American flock fabric.',
    material: 'Flock',
    inStock: true
  },
  {
    id: 'mt-3',
    name: 'WOW',
    price: 73.50 / 83,
    category: 'Medical Textile',
    image: 'https://images.unsplash.com/photo-1599837937746-b30f30504746?q=80&w=600&auto=format&fit=crop',
    description: 'Premium WOW fabric for versatile use.',
    material: 'Synthetic',
    inStock: true
  },
  {
    id: 'mt-4',
    name: 'Leather Cloth For Medical Mattress',
    price: 5250.00 / 83,
    category: 'Medical Textile',
    image: 'https://images.unsplash.com/photo-1517260739337-6799d2fb9ae3?q=80&w=600&auto=format&fit=crop',
    description: 'Durable leather cloth ideal for medical mattresses.',
    material: 'PVC Leather',
    inStock: true
  },
  {
    id: 'mt-5',
    name: 'American Flock',
    price: 99.75 / 83,
    category: 'Medical Textile',
    image: 'https://images.unsplash.com/photo-1503923307521-8285513d8029?q=80&w=600&auto=format&fit=crop',
    description: 'Soft touch American flock fabric.',
    material: 'Flock',
    inStock: true
  },
  {
    id: 'mt-6',
    name: 'WOW',
    price: 73.50 / 83,
    category: 'Medical Textile',
    image: 'https://images.unsplash.com/photo-1599837937746-b30f30504746?q=80&w=600&auto=format&fit=crop',
    description: 'Premium WOW fabric for versatile use.',
    material: 'Synthetic',
    inStock: true
  }
];

export const HOME_FURNISHING_PRODUCTS: Product[] = [
  {
    id: 'hf-1',
    name: 'Printed Rexine | Wooden Texture Grey',
    price: 2109.45 / 83,
    category: 'Home Furnishing Textile',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    description: 'Premium wooden texture printed rexine.',
    material: 'Rexine',
    inStock: true
  },
  {
    id: 'hf-2',
    name: 'Printed Rexine | Floral Beige',
    price: 2109.45 / 83,
    category: 'Home Furnishing Textile',
    image: 'https://images.unsplash.com/photo-1548505295-a22687c4627d?q=80&w=600&auto=format&fit=crop',
    description: 'Floral pattern for home furnishing.',
    material: 'Rexine',
    inStock: true
  },
  {
    id: 'hf-3',
    name: 'Printed Rexine | Grey Abstract',
    price: 2109.45 / 83,
    category: 'Home Furnishing Textile',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop',
    description: 'Abstract grey printed rexine.',
    material: 'Rexine',
    inStock: true
  },
   {
    id: 'hf-4',
    name: 'Printed Rexine | Blue Lines',
    price: 2109.45 / 83,
    category: 'Home Furnishing Textile',
    image: 'https://images.unsplash.com/photo-1589315340656-7c603b5cb0f9?q=80&w=600&auto=format&fit=crop',
    description: 'Linear pattern blue rexine.',
    material: 'Rexine',
    inStock: true
  },
  {
    id: 'hf-5',
    name: 'Printed Rexine | Light Tile',
    price: 2109.45 / 83,
    category: 'Home Furnishing Textile',
    image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=600&auto=format&fit=crop',
    description: 'Light colored tile pattern.',
    material: 'Rexine',
    inStock: true
  },
  {
    id: 'hf-6',
    name: 'Printed Rexine | Dark Floral',
    price: 2109.45 / 83,
    category: 'Home Furnishing Textile',
    image: 'https://images.unsplash.com/photo-1628148877395-97c3dc096b70?q=80&w=600&auto=format&fit=crop',
    description: 'Dark floral print.',
    material: 'Rexine',
    inStock: true
  }
];

export const PRINTED_TEXTILE_PRODUCTS: Product[] = [
  {
    id: 'pt-1',
    name: 'SG FABRIC L Print',
    price: 7250.00 / 83,
    category: 'Printed Textile',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop',
    description: 'High quality SG Fabric with premium print.',
    material: 'Printed Fabric',
    inStock: true
  },
  {
    id: 'pt-2',
    name: 'Act Fabric | Printed Design Red',
    price: 10500.00 / 83,
    category: 'Printed Textile',
    image: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=600&auto=format&fit=crop',
    description: 'Premium Act Fabric with elegant red print.',
    material: 'Printed Fabric',
    inStock: true
  },
  {
    id: 'pt-3',
    name: 'AMOS PRINT | Heavy Duty Blue',
    price: 9500.00 / 83,
    category: 'Printed Textile',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop',
    description: 'Heavy duty Amos print fabric in blue.',
    material: 'Printed Fabric',
    inStock: true
  },
  {
    id: 'pt-4',
    name: 'Heavy Twill Bonded | Dino Pattern',
    price: 8839.20 / 83,
    category: 'Printed Textile',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    description: 'Fun dino pattern on heavy twill bonded fabric.',
    material: 'Twill',
    inStock: true
  },
  {
    id: 'pt-5',
    name: 'Heavy Twill Bonded | Monster Truck',
    price: 8839.20 / 83,
    category: 'Printed Textile',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    description: 'Exciting monster truck pattern.',
    material: 'Twill',
    inStock: true
  },
  {
    id: 'pt-6',
    name: 'Heavy Twill Bonded | Floral Blue',
    price: 4419.60 / 83,
    category: 'Printed Textile',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600&auto=format&fit=crop',
    description: 'Beautiful blue floral pattern.',
    material: 'Twill',
    inStock: true
  }
];

export const INDUSTRIAL_TEXTILE_PRODUCTS: Product[] = [
  {
    id: 'it-1',
    name: 'PVC Clear Film 0.40MM 1.83 MTR',
    price: 5360.46 / 83,
    category: 'Industrial Textile',
    image: 'https://images.unsplash.com/photo-1622325327299-d4c5c247477b?q=80&w=600&auto=format&fit=crop',
    description: 'High grade PVC clear film for industrial use.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'it-2',
    name: 'PVC Clear Film 0.10MM 1.37 MTR',
    price: 3291.30 / 83,
    category: 'Industrial Textile',
    image: 'https://images.unsplash.com/photo-1622325327299-d4c5c247477b?q=80&w=600&auto=format&fit=crop',
    description: 'Transparent PVC film, 0.10mm thickness.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'it-3',
    name: 'PVC Clear Film 0.12MM 1.37 MTR',
    price: 2809.16 / 83,
    category: 'Industrial Textile',
    image: 'https://images.unsplash.com/photo-1622325327299-d4c5c247477b?q=80&w=600&auto=format&fit=crop',
    description: 'Durable clear film, 0.12mm thickness.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'it-4',
    name: 'PVC Clear Film 0.15MM 1.37 MTR',
    price: 3162.69 / 83,
    category: 'Industrial Textile',
    image: 'https://images.unsplash.com/photo-1622325327299-d4c5c247477b?q=80&w=600&auto=format&fit=crop',
    description: 'Industrial grade 0.15mm clear film.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'it-5',
    name: 'PVC Clear Film 0.08MM 54"',
    price: 2979.12 / 83,
    category: 'Industrial Textile',
    image: 'https://images.unsplash.com/photo-1622325327299-d4c5c247477b?q=80&w=600&auto=format&fit=crop',
    description: 'Lightweight clear film, 0.08mm thickness.',
    material: 'PVC',
    inStock: true
  },
  {
    id: 'it-6',
    name: 'PVC Clear Film 0.40MM 1.22 MTR',
    price: 3548.42 / 83,
    category: 'Industrial Textile',
    image: 'https://images.unsplash.com/photo-1622325327299-d4c5c247477b?q=80&w=600&auto=format&fit=crop',
    description: 'Heavy duty clear film, 1.22m width.',
    material: 'PVC',
    inStock: true
  }
];

export const LUGGAGE_AND_BAG_TEXTILE_PRODUCTS: Product[] = [
  {
    id: 'lbt-1',
    name: 'Printed Heavy Twill Bonded | Cat Pattern Grey',
    price: 7150.00 / 83,
    category: 'Luggage & Bag Textile',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop', 
    description: 'Durable heavy twill with cute cat pattern.',
    material: 'Twill',
    inStock: true
  },
  {
    id: 'lbt-2',
    name: 'Printed Heavy Twill Bonded | Cow Print Black',
    price: 7150.00 / 83,
    category: 'Luggage & Bag Textile',
    image: 'https://images.unsplash.com/photo-1533035339999-5606df801844?q=80&w=600&auto=format&fit=crop',
    description: 'Classic cow print design.',
    material: 'Twill',
    inStock: true
  },
  {
    id: 'lbt-3',
    name: 'Printed Heavy Twill Bonded | Unicorns Grey',
    price: 7750.00 / 83,
    category: 'Luggage & Bag Textile',
    image: 'https://images.unsplash.com/photo-1534643960519-11ad79bc19df?q=80&w=600&auto=format&fit=crop',
    description: 'Magical unicorn pattern.',
    material: 'Twill',
    inStock: true
  },
  {
    id: 'lbt-4',
    name: 'Printed Heavy Twill Bonded | Hearts Abstract',
    price: 7150.00 / 83,
    category: 'Luggage & Bag Textile',
    image: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=600&auto=format&fit=crop',
    description: 'Abstract hearts design.',
    material: 'Twill',
    inStock: true
  },
  {
    id: 'lbt-5',
    name: 'Skateboard Astronaut Grey',
    price: 7250.00 / 83,
    category: 'Luggage & Bag Textile',
    image: 'https://images.unsplash.com/photo-1454789548728-85d2696cfbaf?q=80&w=600&auto=format&fit=crop',
    description: 'Cool astronaut skating pattern.',
    material: 'Canvas',
    inStock: true
  },
  {
    id: 'lbt-6',
    name: 'Astronaut Space Wonder Black',
    price: 7250.00 / 83,
    category: 'Luggage & Bag Textile',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop',
    description: 'Deep space astronaut theme.',
    material: 'Canvas',
    inStock: true
  }
];

export const PRODUCTS: Product[] = [
  ...LATEST_PRODUCTS,
  ...NEW_ARRIVALS,
  ...CALENDAR_PRODUCTS,
  ...BAGS_TEXTILE_PRODUCTS,
  ...STOCK_CLEARANCE_PRODUCTS,
  ...AUTOMOBILE_TEXTILES_PRODUCTS,
  ...MEDICAL_TEXTILE_PRODUCTS,
  ...HOME_FURNISHING_PRODUCTS,
  ...PRINTED_TEXTILE_PRODUCTS,
  ...INDUSTRIAL_TEXTILE_PRODUCTS,
  ...LUGGAGE_AND_BAG_TEXTILE_PRODUCTS,
  DEAL_PRODUCT
];
