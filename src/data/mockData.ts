import { Product, Order, CartItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'mng-alph-06',
    name: 'Farm Fresh Ratnagiri Alphonso Mangoes (Hapus)',
    subtitle: 'Naturally ripened under Konkan coastal maritime breezes. Noted for intoxicating musk, saffron satin pulp, and rich buttery sweetness.',
    category: 'fruits',
    farm: 'Vitthal Rao Savant Orchard',
    price: 699,
    originalPrice: 950,
    discountPercentage: 26,
    weight: '6 pcs Box (~1.45 kg)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_0t_xukxfkG46zO4x9gg-8rg7xpWr2zqhiR_AWDAPAICiMBTW1Gi8Ih7qGItv4-aKSHkjmeb9iEQllFPuh58nWCSuEnXWh58YwGsPsDsaJ3PJuMlnrQg8sPGSe_zGQDdEsKtAeOFgqgxI5kCAbASIEX5AD6zi8U8kCIyVzm5nKRAQ7HTeveUfy0JFFeygaN6aU0MgCftOqo9ctpu-QTs2mjO6J97AK4Emm_CRKg_jLt3zYOSLXCm9',
    altText: 'Organic Ratnagiri Alphonso Mangoes in wicker basket',
    badge: 'GI TAG #MAH-108',
    badgeColor: 'secondary',
    rating: 4.9,
    reviewsCount: 1248,
    inStock: true,
    giTagged: true,
    organicCertified: true,
    coldChainTemp: '4.0°C',
    harvestTime: 'Yesterday, 06:15 AM',
    origin: 'Kelshi Bay, Ratnagiri, Maharashtra',
    brix: 21.4,
    sensoryNotes: {
      aroma: 'Intense Floral',
      aromaSub: 'Raw honey & citrus note',
      texture: 'Silky Velvet',
      textureSub: '0% Fiber stringiness',
      seedRatio: 'Thin Flat',
      seedRatioSub: '82% Edible Pulp volume'
    },
    packOptions: [
      { id: 'pack-6', name: '6 pcs Box', weight: '~1.45 kg gross', price: 699, originalPrice: 950 },
      { id: 'pack-12', name: '12 pcs Family', weight: '~2.90 kg gross', price: 1299, originalPrice: 1850 },
      { id: 'pack-1', name: '1 pc Taster', weight: 'Single select (~240g)', price: 125, originalPrice: 160 }
    ],
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_0t_xukxfkG46zO4x9gg-8rg7xpWr2zqhiR_AWDAPAICiMBTW1Gi8Ih7qGItv4-aKSHkjmeb9iEQllFPuh58nWCSuEnXWh58YwGsPsDsaJ3PJuMlnrQg8sPGSe_zGQDdEsKtAeOFgqgxI5kCAbASIEX5AD6zi8U8kCIyVzm5nKRAQ7HTeveUfy0JFFeygaN6aU0MgCftOqo9ctpu-QTs2mjO6J97AK4Emm_CRKg_jLt3zYOSLXCm9',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKQgRQBq-MOhdzHHLVo1J8xd5RINRYHR_nH2cB5Q-GxX4wzlnmoqflFYQxL8rKkRlKsiU7-QS_SYHe6g6TDanGcTA7Xvf7kfDGDohLRldvkYRd_LyG3Erao_r7mW0D3aw0HqTpBiU4-ONGlkG5zoJvotG8VBYRbVfdxwjTgvjtNzgmhtgn1YDtG-WXRnlAgxgEZh6x2FIoAjQ40WiUjZf79IubHfrTg777Fmr1tQnoWtVHW7MV9-RV',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDT1PEJjiaZD9ABjlMrQ9KQvCQ2DVPjn6ANT5hxsgVTFQAKg34RIAwkF8VJkpENlf-GNVl7PELCy2terE13eaN00NO_2ryIyu6oyYe_TFk7B9QqBqpGN6Coxm5AJB5eDZwtlC24QJpu5oc3rdwSgPjjXmyGklmZ8g3W6SUiwF0XwwMCXQLaI8Qq0J9CKthEMSygGaSkSdasz0SslRHu1D-_UEcCnXTMYxFOyPpwFH4UAqUk9wAv9jj4',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHmGyoMQkusqxRQNJ03krdZ89SNgcUlxjHX6b3aDjt_1odmo7EUb5IgyfQ4OplpO2fU1HgRBtlzRJVLeeX-KQwwR6Uf7EA4I9XTBmCm41r-2g_9mufIPr_dPi6EZPqMlwex1z1N1Hx7vGUugPXtLnQQ7M3OCsv9g0eSqKGG52NSIhIo-ABg9efpGzqdKfITjC4kUA13tShMI4kkLJwoI-iiYsemG8euIEm4JBqocWdzLawZJ1yaDoC'
    ],
    farmerProfile: {
      name: 'Vitthal Rao Savant & Family',
      role: '3rd Gen Mango Guardians',
      experience: '34-Year Organic Soil',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6iVQxeRpHDn481pSeOa20IxWIjUHV6tS8KbPdSkZrUyABUSbQuXloRwwAdHpzAjZJUCBlAuE4bhRCfV_LgPyDTo1QrgJi518yD8ok9lrKcXB0LSpbO3C9bdC-5suWw79OrM7HJUNkNn63oKJ21qKo0NKjB4e-f008TD91CdeIN7DRa4jDoh1HoV_xJvyoZNtYRYESX9_3mXIrjxl8_X3ZBymI4WbcHq2Y0iHVoatAVcOHEIQjCaYi',
      quote: 'Our trees sit on laterite rock terraces that slope downward into the Arabian Sea. The salty coastal fog combined with virgin red soil gives Alphonso mangoes their distinctive saffron saturation and deep musky sweetness that chemical greenhouses can never replicate.',
      elevation: '85m Above Sea Level',
      method: 'Cushioned Pole Shears'
    }
  },
  {
    id: 'prod-heirloom-tomatoes',
    name: 'Heirloom Vine Tomatoes',
    subtitle: 'Sweet, juicy, cluster-plucked with calyx stems intact. Chemical-free rich red seed cavities.',
    category: 'veggies',
    farm: 'Kolar Farm Coop',
    price: 42,
    originalPrice: 65,
    discountPercentage: 35,
    weight: '500g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwWQtOF9vh0IVJbxppAzqhQapKsCJtMXwEKesaaNyEAt_nPqYhtkZ1VW10dp-_YxeXwgf0QS49NLeBiV_-PWyfQUp9E0ZRIDfKTbkDFO-zrbBzOpiZHiy1mXud9C1tdeoqPBHxe3pvfC68oN-dRzabMmUjBAh-17RiGHtlV_6_vBjZfnImL-FWBiDauGCix52HJnAnlUwY93c9BX-xF4DpXeHKlqWKsvy4Q2ZoNxezXBtkVN3830Kh',
    altText: 'Glossy red heirloom vine tomatoes with calyx stems',
    badge: 'Organic',
    badgeColor: 'secondary',
    rating: 4.8,
    reviewsCount: 412,
    inStock: true,
    giTagged: false,
    organicCertified: true,
    coldChainTemp: '4.2°C'
  },
  {
    id: 'prod-bell-peppers',
    name: 'Trio Sweet Bell Peppers',
    subtitle: 'Crisp, sweet, thick-walled hydroponic peppers in red, yellow, and deep emerald.',
    category: 'veggies',
    farm: 'Green Valley Polyhouse',
    price: 78,
    originalPrice: 95,
    discountPercentage: 18,
    weight: '3 pcs (Yellow, Red, Green)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJVoLfMa-rsW_kl4tgLzl7CNTiSGjFLf6jZ_rLzJKlM5FdQe4djJ5PVRGXapAOs6Aievrt4IsPTaN36sYti52ANJbFr0Lf4sq20WKCY7VocOT_a8H6Frhn2GnjaVmv_xzcOZgjSi82HyEncGCG1EXuX7ou_zj5Gv6OgiFR6C5Qmw7ePLLfJ-7TkPcHyNbMKm1zrGH5GpAmcV7Ccvk7cfVSRV7sKbOOppsWngBhDdM8spxutPSr4CHW',
    altText: 'Trio bell peppers in studio lighting',
    badge: 'Hydroponic',
    badgeColor: 'primary',
    rating: 4.9,
    reviewsCount: 320,
    inStock: true
  },
  {
    id: 'prod-romaine-lime',
    name: 'Crisp Romaine & Lime',
    subtitle: 'Hydroponically nurtured butterhead and romaine crunch paired with aromatic juicy limes.',
    category: 'greens',
    farm: 'Mysore Hydro Orchards',
    price: 55,
    originalPrice: 70,
    discountPercentage: 21,
    weight: '250g Greens + 2 Limes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC7q4bElvjBgiRkqe3QB0iLca9pZwCkZU53CZAS6Gjhen7aQ35aPTiZEUarZYuWEOlZPqaL9pQw3j3QVy24uSnxme5fBptkTpEjQsfb64eYUUAlLXXu-IQfaItgeOlNqJz96bGm9fKmB90omaA17tKdEq4RdbeXNy5uTo5UhiuwTHMsKDmz9Sbx4eWoefVV0Uxpv0LszBbRQfAVx5kKoUlqIL_UXdpNipHGqwNzazAwasylG4UKvZV',
    altText: 'Crisp curly romaine lettuce leaves and lime',
    badge: 'Freshly Harvested',
    badgeColor: 'secondary',
    rating: 4.7,
    reviewsCount: 198,
    inStock: true
  },
  {
    id: 'prod-ruby-tomatoes',
    name: 'Sugar Ruby Cherry Tomatoes',
    subtitle: 'Zero acidity, burst-in-mouth sweetness with exceptional 9.2 Brix index.',
    category: 'veggies',
    farm: 'Hosur Valley Greens',
    price: 69,
    originalPrice: 89,
    discountPercentage: 22,
    weight: '250g Punnet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlwI8u0dJoJhqNvUJJDfJpHnTwA5FyskMG5SrdlsjTy3K4rFXfw7B6zGTUkcdl8Cy_lmyfVsY-zMKp_zRN3hnJmGDUv5fBQpKrXRcLwx-_b4pcNczJDPsPBxmtMHukv_pQBvTLSmCPi-KhRzvUWSsC7qYsqUCnPNJLdUJ7-NzguROja4cnSChJMIKrFXN_hEacUIE5xHZL7FQXtPLhRg1ID3IVUonyUmfJXN5n3fMLs9EHT24k_TaM',
    altText: 'Halved and whole ruby cherry tomatoes',
    badge: 'Sweet 9.2 Brix',
    badgeColor: 'tertiary',
    rating: 4.9,
    reviewsCount: 512,
    inStock: true
  },
  {
    id: 'prod-basil-pot',
    name: 'Living Genovese Basil Pot',
    subtitle: 'Delivered with roots and hydroponic peat intact. Lasts up to 14 days on kitchen windowsill.',
    category: 'greens',
    farm: 'Devanahalli Living Farms',
    price: 49,
    originalPrice: 65,
    discountPercentage: 25,
    weight: 'Live roots pot',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhBEZPoxtr2hubnt9z4Di3LUWJN56itJvEKgcW1JvrU8LRRSwh_xONgJoFA9s4nmVijkTpsvUUmkhcb5h3E83Wr-2mKZVHf3PiksGskjxgVpnwpU1gkGEI_uZMnRaSgG8Wt8KAzsQni9Km3GcYSt3kMBimLcSaxUOEj1gDIOLMUDo93T_cX0ELQ85ECpJuMQNyZpGqTG3QfLE71mZo6NiYvyaUuKKZGE7fRrZ8nOrNQs5rLDIlhZKc',
    altText: 'Fresh Italian Genovese basil bouquet with jute tie',
    badge: 'Hydro Pot',
    badgeColor: 'secondary',
    rating: 4.8,
    reviewsCount: 280,
    inStock: true
  },
  {
    id: 'prod-a2-ghee',
    name: 'Pure A2 Bilona Cultured Ghee',
    subtitle: 'Traditional bilona churning from curd of grassfed indigenous Gir cows in Malnad sanctuary.',
    category: 'dairy',
    farm: 'Malnad Dairy Sanctuary',
    price: 385,
    originalPrice: 450,
    discountPercentage: 14,
    weight: '350ml Glass Jar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImxaMPPP3fnn19681YGSKz1QNARoO2Q9IgIY7nPL1oEIZZwNlGYkp6NJO-JxxHx59VgMMxZm6ERmfmrpft3lPXqLPqxScCpzwfAFDikxhWmDNpnttJ8dipdY7FiLCS2n4FrFvipHO-wnFUkXpc3kkjOMy7TPRk2VRIeh7j97-ktjkNWz_HZ-g0AOUnlVW01y8XW6R0OogQYLiHpiiK88krIRP-QwKVgNjlVrspYuy3DANzQQOIS2K',
    altText: 'Golden yellow Vedic A2 cultured ghee in aesthetic glass jar',
    badge: 'Gir Cow Vedic',
    badgeColor: 'primary',
    rating: 5.0,
    reviewsCount: 890,
    inStock: true
  },
  {
    id: 'prod-sesame-oil',
    name: 'Raw Wood-Pressed Sesame Oil',
    subtitle: 'Cold wood-churned (Marachekku) first-crush oil from heritage black sesame seeds.',
    category: 'oils',
    farm: 'Kaveri Mill Collective',
    price: 195,
    originalPrice: 240,
    discountPercentage: 19,
    weight: '500ml Glass Bottle',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYZ8n2ukRRpzxwndIIYjgdmAdz6g-3sd5FO1gyuuGEinAz4MxE7anef3J2x6GpfFVftiLTL5m8Wfy0w2-huHULpOwrw9k3Or9s2QA7mhdO7lEgUrmOroamZEDPgQjhSIEvoP5BRMHpiA5AN5eqqCk55ijXxb1PGU2g5hkbBpBSuwgPClIl21PJY5_Lb2YfJQF5SORfTP3fH3k9dv9rVaxzEmHG1_sFCAA9IJziGZ_ARJpIWPC4lqRt',
    altText: 'Wood pressed sesame oil in amber bottle',
    badge: 'Wood Pressed',
    badgeColor: 'secondary',
    rating: 4.8,
    reviewsCount: 310,
    inStock: true
  },
  {
    id: 'prod-microgreens',
    name: 'Sunflower & Radish Sprouts',
    subtitle: 'Ultra concentrated phytonutrients harvested strictly on Day 10 at peak micro-vitality.',
    category: 'greens',
    farm: 'Urban Sprout Labs',
    price: 65,
    originalPrice: 80,
    discountPercentage: 19,
    weight: '100g Punnet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqHerUQyZDn4_zIrs-hd1P4VNNtBNPiLxr1lk3T6UfNz5Nm47AN-v0Hs3FQSuTMVxgQjJvaeVOJi_ZvZJrFOZArlpg9hmGFHcCA1CmsbEPHknL3s_3JY4FSp0FH2WPlHbgyHURhRWnczXyBMZJe5wvjiG7RAtuL6HdV_9ikiFOzxCKTR403LY-fAO8b7X5iNKxhs-BcH4cAFkvxuk1V7cG3QHWcpFx6_VyQhSV0R6r-wT82_PFFyIg',
    altText: 'Sunflower and radish microgreens in punnet',
    badge: '40x Nutrients',
    badgeColor: 'secondary',
    rating: 4.9,
    reviewsCount: 245,
    inStock: true
  },
  {
    id: 'prod-malai-paneer',
    name: 'Artisanal Malai Paneer',
    subtitle: 'Crafted fresh this dawn from whole A2 farm milk, dewy soft texture, vacuum sealed.',
    category: 'dairy',
    farm: 'Malnad Sanctuary Farms',
    price: 198,
    originalPrice: 220,
    discountPercentage: 10,
    weight: '2 Packs (200g each)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnVwuqApy00UDuRYMAEW9hZj9GJSmBsucymHwLuUdxINMUthr1a12ojqfuYTGa66lqMxjuGEJ13sjkRCke4CI4mnJFz4iTyjt-9J-D6OQwv1-CMpuEmPGvuvDF57gfC4LpNz6-S4MEC10ckdKsPTHuo2AmK-QsofLIMgEpWgRXKAtBR7JM8XR4QNCD-27RtZw5AJVrYH-jUIMAIK_gzqvAghg199dbP1wCTr3bqjkr2-tOAFviJ2gL',
    altText: 'Fresh organic cubed malai paneer on banana leaf',
    badge: 'Craft A2 Dairy',
    badgeColor: 'secondary',
    rating: 4.9,
    reviewsCount: 620,
    inStock: true
  },
  {
    id: 'prod-yelakki-bananas',
    name: 'Farm Fresh Yelakki Bananas',
    subtitle: 'Naturally sweet miniature cardamomy bananas picked from Mandya family groves.',
    category: 'fruits',
    farm: 'Mandya Cooperative',
    price: 79,
    originalPrice: 95,
    discountPercentage: 17,
    weight: '1 kg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf-SNqWq-jL7f1U7Pb1uk3GoCb9QjEeMUSIibkfQDET5lAzRs6uWVyk5iCnMlePLrLZS1AGogltsiV4R0hqF9JFTharn3g4E24rEh-fvTHqPkZ-QIjx9EKPUp2A7MXSI_GMVJAu5Uf3snYpkiEKYLOmilsst1xpgwHbpJNENUhjFVnczFwyeyYV_EH-FqHKlxJTOim6dU3WA9_d2X6Ceelg1b7GAF6RfOhW8NK7uUiL3HikgfXsWqo',
    altText: 'Cluster of fresh Yelakki bananas on ceramic dish',
    badge: 'Pesticide Free',
    badgeColor: 'secondary',
    rating: 4.8,
    reviewsCount: 390,
    inStock: true
  },
  {
    id: 'prod-wheat-atta',
    name: 'Sehore Sharbati Wheat Atta',
    subtitle: 'Stoneground cold-milled 100% whole grain chakki fresh flour from rainfed MP fields.',
    category: 'staples',
    farm: 'Sehore Organic Collective',
    price: 290,
    originalPrice: 340,
    discountPercentage: 15,
    weight: '5 kg unbleached sack',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1c3-dduqFegfYNRAW2i3vrDzF2W1EAus_xRtpQjEYk2TMQsIPeDCY6gqEmgOdJDng0wnJLqV3EJYu3sY71i-TAoAkpSqTRrkGrezwBgarE5waSD74J9rj-xAIKINUFQij5Jcqc99Xiicz8f4e_Z3jAe-ASYuyin7-_JgU_tQZo84yuI3Z8xPOtAVDaWBUEGHS-i3WoxYoUUMbCxLq3ESyZWy7TDCU1QaB0E09_kMeysw1CXkUkVwZ',
    altText: 'Stoneground wheat flour in kraft sack with wheat stalks',
    badge: 'Stoneground',
    badgeColor: 'secondary',
    rating: 4.9,
    reviewsCount: 710,
    inStock: true
  }
];

export const INITIAL_ORDER: Order = {
  id: 'BEN-88492',
  date: 'Today, 11:42 AM',
  status: 'in_transit',
  etaMinutes: 14,
  coldTemp: '3.8°C',
  tamperSeal: 'TK-9921',
  itemTotal: 428,
  discount: 0,
  deliveryFee: 0,
  insulationFee: 0,
  tip: 30,
  total: 428,
  paymentMethod: 'UPI AutoPay (Google Pay)',
  paymentRef: 'UPI/20241022/948291048',
  deliverySlot: 'Express Cold-Van (~20 Mins)',
  rider: {
    name: 'Ramesh Kumar',
    rating: 4.98,
    deliveries: 2840,
    phone: '+91 98450 49102',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpz4UxgFQcnYpNVJNYzX76_P2UGNns8ph57Ex1etAW7WWpSTObJsMYkoLxgpgoKnjDrSUCk9bIizn_Le-bkVtQw7wmW4g3OK44stxyppL89GC8HAwk6AAvVohiij0flSUSr9J8WQMhkvEIMsF6_BgvSBryQBHWbmA00fm1azrdJxjcBOsHEi2v5Rj_gzWrE4SZWocGUVX4L8yuyZEiT-yhKdGa2cHkRE2vAkYf2lL9dLckiT6T0Plh',
    vehicle: 'Electric EV-45',
    speed: '24 km/h',
    battery: '88%'
  },
  address: {
    title: 'Home (Default)',
    zone: 'Indiranagar Zone 4A',
    line1: 'Flat 402, Green Glen Terraces',
    line2: '12th Main Road, HAL 2nd Stage, Indiranagar',
    cityPin: 'Bengaluru • 560038',
    contact: '+91 98450 11920',
    note: 'Ring bell once, leave in insulated Benato thermal cooler box outside 4B.'
  },
  items: [
    {
      product: INITIAL_PRODUCTS[1], // Heirloom Tomatoes
      quantity: 1,
      unitPrice: 120
    },
    {
      product: INITIAL_PRODUCTS[5], // Basil
      quantity: 1,
      unitPrice: 65
    },
    {
      product: INITIAL_PRODUCTS[6], // Butter/Ghee
      quantity: 1,
      unitPrice: 185
    },
    {
      product: {
        id: 'prod-cucumbers',
        name: 'Crisp Persian Snacking Cucumbers',
        subtitle: '500g • HYDROPONIC GREENHOUSE',
        category: 'veggies',
        farm: 'Doddaballapura Polyhouse',
        price: 58,
        originalPrice: 75,
        weight: '500g',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOmuYWa7-SQm3QORCOMJFYYXhwNFuidrf7xfJ_JZnIds-ChYCifgvDqR1_og3t7dk-MgTCotJoeAJIBs1Eaeh6M5JUE7Vn_ApgBwco_GPkuoKO9QBhFV2z_cBrn9MjEfqMYhNl7UXwAYyl1bFUQUqyPbwQjl1eEo8VFed24SCkmD1mYKGyacXzCGhf-zr4pNyIfGgpW1mwS4NAHqNQWLRlrrIr_L-hnBoKLtvkdA5eEMdKuYkAxtk1',
        altText: 'Persian seedless snack cucumbers',
        rating: 4.8,
        reviewsCount: 140,
        inStock: true
      },
      quantity: 1,
      unitPrice: 58
    }
  ]
};

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    product: INITIAL_PRODUCTS[0], // Mangoes
    quantity: 1,
    selectedPackId: 'pack-6',
    selectedPackName: '6 pcs Box',
    unitPrice: 650,
    selectedRipeness: 'Ready to Eat Today'
  },
  {
    product: INITIAL_PRODUCTS[9], // Malai Paneer
    quantity: 2,
    unitPrice: 99
  },
  {
    product: INITIAL_PRODUCTS[10], // Bananas
    quantity: 1,
    unitPrice: 79
  },
  {
    product: INITIAL_PRODUCTS[11], // Wheat Atta
    quantity: 1,
    unitPrice: 290
  }
];

export const PAST_ORDERS = [
  {
    id: '#BEN-87910',
    date: 'Delivered Oct 14',
    coldTemp: '4.2°C',
    itemsSummary: '4 items • Country Carrots, A2 Cow Milk (1L), Sourdough Batard, Native Methi Leaves',
    amount: '₹485',
    paymentMode: 'Paid via UPI (Google Pay)'
  },
  {
    id: '#BEN-86401',
    date: 'Delivered Oct 09',
    coldTemp: '3.8°C',
    itemsSummary: '8 items • Heirloom Tomato Crate, French Beans, Wildflower Honey, Buffalo Curd',
    amount: '₹920',
    paymentMode: 'Paid via UPI (PhonePe)'
  },
  {
    id: '#BEN-85122',
    date: 'Delivered Oct 04',
    coldTemp: '4.0°C',
    itemsSummary: '3 items • Hydroponic Butterhead Lettuce, Sweet Basil, Pressed Almond Butter',
    amount: '₹340',
    paymentMode: 'Paid via Benato Harvest Credits'
  }
];

export const SAVED_LOCATIONS = [
  {
    id: 'loc-home',
    title: 'Home (Default)',
    corridor: '14 min corridor',
    line1: 'Flat 402, Green Glen Terraces',
    line2: '12th Main Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru • 560038',
    verified: true,
    icon: 'home'
  },
  {
    id: 'loc-office',
    title: 'Studio / Office',
    corridor: '18 min corridor',
    line1: 'Benato Design Lab, 3rd Floor',
    line2: '80 Feet Road, Koramangala 4th Block',
    city: 'Bengaluru • 560034',
    verified: true,
    icon: 'apartment'
  },
  {
    id: 'loc-parents',
    title: 'Parents Residence',
    corridor: '20 min corridor',
    line1: 'Bungalow 14, 5th Cross',
    line2: 'Malleswaram West, Near Circle Park',
    city: 'Bengaluru • 560003',
    verified: true,
    icon: 'family_restroom'
  }
];

export const SMART_RESTOCK_SUGGESTIONS = [
  {
    id: 'restock-1',
    title: 'A2 Malnad Curd (500g)',
    subtitle: 'Depletes in ~1 day • ₹95',
    price: 95,
    icon: 'water_drop',
    item: {
      id: 'prod-a2-curd-restock',
      name: 'A2 Malnad Curd (500g)',
      subtitle: 'Fresh thick set grassfed curd in claypot packaging',
      category: 'dairy',
      farm: 'Malnad Dairy Sanctuary',
      price: 95,
      originalPrice: 110,
      weight: '500g',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOJ0qTfghYW3ep3ZZZ8zlGrvl7Wza7rYGwqEEYi5WAInl7cM5Gyo6ixr-6vmGZNYK9SFpsFRglPgmxj85jP4n9fMUB7RKEdpWDGG-mxk03_lAmmjGfN1gmn3kPZInH2opc7Qo5f70r577kjQe9YXUeOrB-FCJQ86BgOe3XzXB9oIHj3-0dUqblYsyBBtN38wbjKi8RKME4HagYToVuxQVNMTHM_Oqtb4jjNUyA1fDasrZXPi81khaj',
      altText: 'A2 Malnad Curd',
      rating: 4.9,
      reviewsCount: 310,
      inStock: true
    } as Product
  },
  {
    id: 'restock-2',
    title: 'Baby Spinach (200g)',
    subtitle: 'Hydroponic Batch • ₹48',
    price: 48,
    icon: 'nutrition',
    item: {
      id: 'prod-baby-spinach-restock',
      name: 'Hydroponic Baby Spinach (200g)',
      subtitle: 'Tender baby spinach leaves, pesticide-zero washed',
      category: 'greens',
      farm: 'Mysore Polyhouse',
      price: 48,
      originalPrice: 60,
      weight: '200g',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnVLooSnTV2Oi11rkw0qrIm4BPDqmwdfcAUmsIwRHs8p-JFbjZtFuv-fDgLGhymzbIHRqOBxybkLii8wlQ8Mskq8s_JRpWVmQwiDuJCGQOf3nWWYINt_PH3gCb_1bkE_uzzSWJk7n6mTIdNSPF1WNNGHiDWdYu2bp__7-2518U9KM5Eh5FXuK_gz2RF1_Esas3ZId2STc_tVrztz0x6kGryT22GPc03zs_sK5UfCd3gQ3eZ9g1jdG5',
      altText: 'Baby Spinach',
      rating: 4.8,
      reviewsCount: 220,
      inStock: true
    } as Product
  },
  {
    id: 'restock-3',
    title: 'Free-Range Brown Eggs (6)',
    subtitle: 'Fresh Farm Laid • ₹88',
    price: 88,
    icon: 'egg',
    item: {
      id: 'prod-brown-eggs-restock',
      name: 'Free-Range Brown Country Eggs (6)',
      subtitle: 'Pasture-raised golden yolks with high Omega-3',
      category: 'dairy',
      farm: 'Mandya Open Run Coop',
      price: 88,
      originalPrice: 105,
      weight: 'Pack of 6',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4OI7aRO0Nt3j7n30RRArhV3Nu20so2BlYx5sPrMW0ENL6NNHejzICQAS7_vMoCAi3_KvzGnUSBcTkftXYZskwC8fMXMe9QpsHGXZcfWEUaBHAm-W7Gwirxs0xotjI0dKxilByiLH1oUvq4zvU2o9uj6tpjNu78dJnRsJsIH067Ae0THBhgu1WM5q18C4N3jznxsQ__ZErPojAHp1GgeDhvpcZdVUBKvduzNluv9yMMfEvx1zMnrC_',
      altText: 'Free Range Eggs',
      rating: 4.9,
      reviewsCount: 540,
      inStock: true
    } as Product
  }
];
