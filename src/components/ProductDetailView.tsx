import React, { useState } from 'react';
import { Product, CartItem } from '../types';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, packId?: string, packName?: string, unitPrice?: number, ripeness?: string) => void;
  onInstantBuy: (product: Product, quantity: number, packId?: string, packName?: string, unitPrice?: number, ripeness?: string) => void;
  onOpenAiAssistant: (presetPrompt?: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onAddToCart,
  onInstantBuy,
  onOpenAiAssistant
}) => {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [selectedRipeness, setSelectedRipeness] = useState('Ready to Eat Today');
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const packs = product.packOptions || [
    { id: 'pack-default', name: 'Standard Pack', weight: product.weight, price: product.price, originalPrice: product.originalPrice }
  ];

  const currentPack = packs[selectedPackIndex] || packs[0];
  const unitPrice = currentPack.price;
  const originalPrice = currentPack.originalPrice;
  const totalPrice = unitPrice * quantity;

  const galleryImages = product.gallery || [
    product.image,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKQgRQBq-MOhdzHHLVo1J8xd5RINRYHR_nH2cB5Q-GxX4wzlnmoqflFYQxL8rKkRlKsiU7-QS_SYHe6g6TDanGcTA7Xvf7kfDGDohLRldvkYRd_LyG3Erao_r7mW0D3aw0HqTpBiU4-ONGlkG5zoJvotG8VBYRbVfdxwjTgvjtNzgmhtgn1YDtG-WXRnlAgxgEZh6x2FIoAjQ40WiUjZf79IubHfrTg777Fmr1tQnoWtVHW7MV9-RV',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDT1PEJjiaZD9ABjlMrQ9KQvCQ2DVPjn6ANT5hxsgVTFQAKg34RIAwkF8VJkpENlf-GNVl7PELCy2terE13eaN00NO_2ryIyu6oyYe_TFk7B9QqBqpGN6Coxm5AJB5eDZwtlC24QJpu5oc3rdwSgPjjXmyGklmZ8g3W6SUiwF0XwwMCXQLaI8Qq0J9CKthEMSygGaSkSdasz0SslRHu1D-_UEcCnXTMYxFOyPpwFH4UAqUk9wAv9jj4',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBHmGyoMQkusqxRQNJ03krdZ89SNgcUlxjHX6b3aDjt_1odmo7EUb5IgyfQ4OplpO2fU1HgRBtlzRJVLeeX-KQwwR6Uf7EA4I9XTBmCm41r-2g_9mufIPr_dPi6EZPqMlwex1z1N1Hx7vGUugPXtLnQQ7M3OCsv9g0eSqKGG52NSIhIo-ABg9efpGzqdKfITjC4kUA13tShMI4kkLJwoI-iiYsemG8euIEm4JBqocWdzLawZJ1yaDoC'
  ];

  const handleAddToCart = () => {
    setAddedToast(true);
    onAddToCart(
      product,
      quantity,
      currentPack.id,
      currentPack.name,
      currentPack.price,
      selectedRipeness
    );
    setTimeout(() => {
      setAddedToast(false);
    }, 2000);
  };

  const handleAddBundle = () => {
    // Add current mango pack + curd + honey
    handleAddToCart();
    alert("Bundle added: Fresh Alphonso Mangoes + A2 Vedic Curd + Western Ghats Raw Honey saved ₹125!");
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* 1. Organic Wave Canopy Accent */}
      <div className="relative w-full bg-primary-container text-primary-fixed overflow-hidden -mt-4 pb-12 pt-8">
        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary-fixed-dim/90 mb-4 flex-wrap">
            <button onClick={onBack} className="hover:text-surface-bright transition-colors">
              Home
            </button>
            <span className="material-symbols-outlined text-[13px] opacity-60">chevron_right</span>
            <button onClick={onBack} className="hover:text-surface-bright transition-colors">
              Fresh Produce
            </button>
            <span className="material-symbols-outlined text-[13px] opacity-60">chevron_right</span>
            <span className="text-surface-bright font-bold truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Wave Highlight Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-xs border-b border-primary/40">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                {product.badge || 'GI TAG #MAH-108'}
              </span>
              <span className="px-space-sm py-0.5 rounded-full bg-primary text-secondary-fixed font-label-sm text-label-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">verified_user</span>
                100% Zero-Carbide Hay Ripened
              </span>
              <span className="px-space-sm py-0.5 rounded-full bg-surface-container-highest/20 text-surface-bright font-label-sm text-label-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                Harvested 22 Hrs Ago • Chilled Dispatch
              </span>
            </div>
            <div className="flex items-center gap-space-md font-label-sm text-label-sm text-primary-fixed-dim">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
                Limited Harvest (Only 14 Boxes Left for Today)
              </span>
            </div>
          </div>
        </div>

        {/* Organic SVG Wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none translate-y-1">
          <svg className="w-full h-10 md:h-16 text-surface" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 84" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32 C320,80 680,10 1020,45 C1240,68 1380,24 1440,30 L1440,84 L0,84 Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* 2. Primary Detail Canvas */}
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin py-space-lg w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Gallery & Proof */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            {/* Main Showcase Frame */}
            <div className="relative bg-surface-container-lowest rounded-3xl p-space-md shadow-sm overflow-hidden group">
              {/* Floating Tags */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm shadow-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">eco</span>
                  Certified Biodynamic
                </span>
                <span className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                  Brix {product.brix || 21.4}° Ultra-Sweet
                </span>
              </div>

              <div className="absolute top-6 right-6 z-10">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface shadow-sm hover:scale-105 transition-all flex items-center justify-center"
                  aria-label="Toggle favorite"
                >
                  <span 
                    className={`material-symbols-outlined text-[20px] ${isFavorite ? 'text-error' : 'text-outline'}`}
                    style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>

              {/* Main Image */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-surface-container-low to-surface-container flex items-center justify-center">
                <img
                  src={galleryImages[activeImgIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Micro Story Ribbon */}
              <div className="mt-space-md p-space-sm rounded-2xl bg-surface-container-low flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-secondary">workspace_premium</span>
                  <span>100% Tree-Ripened in natural rice straw; strictly zero chemical ethrel or calcium carbide.</span>
                </div>
                <a href="#lab-report" className="text-secondary font-bold hover:underline shrink-0 ml-2">
                  Lab Certificate →
                </a>
              </div>
            </div>

            {/* Thumbnail Carousel Strip */}
            <div className="grid grid-cols-4 gap-space-sm">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`rounded-2xl overflow-hidden aspect-square bg-surface-container-lowest p-1 shadow-sm transition-all hover:opacity-90 ${
                    activeImgIndex === idx ? 'ring-2 ring-secondary' : 'opacity-70'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>

            {/* Sensory Notes Card */}
            <div className="p-space-md rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-primary flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-secondary">psychiatry</span>
                  Sommelier Sensory Evaluation
                </span>
                <span className="font-label-sm text-label-sm text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full font-bold">
                  Grade A1 Select
                </span>
              </div>
              <div className="grid grid-cols-3 gap-space-sm pt-2">
                <div className="p-3 rounded-2xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                    Aroma Intensity
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {product.sensoryNotes?.aroma || 'Intense Floral'}
                  </span>
                  <span className="font-body-sm text-[11px] text-outline">
                    {product.sensoryNotes?.aromaSub || 'Raw honey & citrus note'}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                    Pulp Texture
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {product.sensoryNotes?.texture || 'Silky Velvet'}
                  </span>
                  <span className="font-body-sm text-[11px] text-outline">
                    {product.sensoryNotes?.textureSub || '0% Fiber stringiness'}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                    Seed Ratio
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {product.sensoryNotes?.seedRatio || 'Thin Flat'}
                  </span>
                  <span className="font-body-sm text-[11px] text-outline">
                    {product.sensoryNotes?.seedRatioSub || '82% Edible Pulp volume'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial & Selection Module */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md">
              {/* Belt badge and SKU */}
              <div className="flex items-center justify-between">
                <span className="text-secondary font-label-md text-label-md uppercase tracking-wider flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  Authentic Devgad-Ratnagiri Belt
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-space-xs py-0.5 rounded-md">
                  SKU: {product.id.toUpperCase()}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="font-headline-xl text-headline-xl text-primary font-bold leading-tight">
                  {product.name}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  {product.subtitle}
                </p>
              </div>

              {/* Reviews & ETA */}
              <div className="flex items-center gap-space-md py-space-xs border-y border-surface-container">
                <div className="flex items-center gap-1 bg-secondary-fixed/40 px-3 py-1 rounded-full text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[18px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="font-label-md text-label-md font-bold">{product.rating}</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  {product.reviewsCount} Verified Harvest Reviews
                </span>
                <span className="text-outline text-[12px]">•</span>
                <span className="font-body-sm text-body-sm text-secondary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  Arriving in 20 Mins
                </span>
              </div>

              {/* Pricing Tier Block */}
              <div className="flex items-baseline gap-space-md flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="font-display-hero text-headline-xl text-primary font-extrabold">
                    ₹{unitPrice}
                  </span>
                  {originalPrice > unitPrice && (
                    <span className="font-headline-sm text-headline-sm text-outline line-through">
                      ₹{originalPrice}
                    </span>
                  )}
                </div>
                <span className="px-space-xs py-1 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold uppercase">
                  {Math.round(((originalPrice - unitPrice) / originalPrice) * 100)}% OFF FIELD PRICE
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant ml-auto">
                  (All inclusive of taxes)
                </span>
              </div>

              {/* Pack Size Option Selectors */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-primary font-bold">
                    Select Pack Curated Size
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    100% Weight Calibrated
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-space-sm">
                  {packs.map((pack, idx) => {
                    const isSelected = selectedPackIndex === idx;
                    return (
                      <button
                        key={pack.id}
                        onClick={() => setSelectedPackIndex(idx)}
                        className={`p-3 rounded-2xl text-left transition-all ${
                          isSelected
                            ? 'ring-2 ring-primary bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <span className="font-label-md text-label-md block font-bold">{pack.name}</span>
                        <span className={`font-body-sm text-[12px] block ${isSelected ? 'opacity-80' : 'text-on-surface-variant'}`}>
                          {pack.weight}
                        </span>
                        <span className={`font-label-sm text-label-sm mt-1 block font-semibold ${isSelected ? 'text-secondary-fixed' : 'text-secondary'}`}>
                          ₹{pack.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ripeness Maturity Selector */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-primary font-bold">
                  Intended Eating Schedule (Ripeness Curation)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {[
                    {
                      label: 'Ready to Eat Today',
                      sub: 'Golden amber, sweet fragrant aroma'
                    },
                    {
                      label: 'Ripens in 2-3 Days',
                      sub: 'Slight greenish hue, store at room temp'
                    }
                  ].map((option) => (
                    <label
                      key={option.label}
                      className={`flex items-center gap-space-sm p-3 rounded-2xl cursor-pointer border transition-colors ${
                        selectedRipeness === option.label
                          ? 'border-secondary bg-surface-container-low ring-1 ring-secondary'
                          : 'border-transparent bg-surface-container-low hover:bg-surface-container'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ripeness"
                        value={option.label}
                        checked={selectedRipeness === option.label}
                        onChange={() => setSelectedRipeness(option.label)}
                        className="w-4 h-4 accent-secondary"
                      />
                      <div>
                        <span className="font-label-md text-label-md text-on-surface block font-bold">
                          {option.label}
                        </span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant block">
                          {option.sub}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Call to Action */}
              <div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
                {/* Stepper */}
                <div className="flex items-center justify-between bg-surface-container-low rounded-full px-3 py-2 w-full sm:w-36">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center font-bold text-lg"
                  >
                    −
                  </button>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold px-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center font-bold text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Primary Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex-1 flex items-center justify-center gap-2 py-3.5 px-space-md rounded-full font-label-lg text-label-lg font-bold shadow-md transition-all active:scale-95 ${
                    addedToast
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-primary-container text-on-primary hover:bg-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {addedToast ? 'check_circle' : 'shopping_bag'}
                  </span>
                  <span>
                    {addedToast ? 'Added to Cold Basket!' : `Add to Basket • ₹${totalPrice}`}
                  </span>
                </button>
              </div>

              {/* 1-Click Buy */}
              <button
                onClick={() => onInstantBuy(product, quantity, currentPack.id, currentPack.name, currentPack.price, selectedRipeness)}
                className="w-full py-3 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">flash_on</span>
                Instant 1-Click Cold-Chain Delivery
              </button>

              {/* Delivery Guarantee */}
              <div className="grid grid-cols-2 gap-space-xs pt-2 font-body-sm text-[12px] text-on-surface-variant">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[16px]">ac_unit</span>
                  <span>4°C Temperature Controlled Van</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[16px]">published_with_changes</span>
                  <span>Instant Taste Guarantee</span>
                </div>
              </div>
            </div>

            {/* Micro-Hub Dispatch Note */}
            <div className="p-space-md rounded-3xl bg-secondary-container/30 flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-secondary-container block font-bold">
                    Dispatching from Indiranagar Micro-Hub
                  </span>
                  <span className="font-body-sm text-body-sm text-on-secondary-fixed-variant">
                    Nearest courier rider ready • 1.8 km from your kitchen
                  </span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-3 py-1 rounded-full font-bold shadow-sm">
                ~18 mins
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Farm Provenance & Traceability Bento Section */}
      <div className="w-full bg-surface-container-low py-space-xl my-space-md">
        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="text-secondary font-label-md text-label-md font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">nest_eco_leaf</span>
                Radical Transparency Ledger
              </span>
              <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
                The Soil &amp; Orchard Behind Your Fruit
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Traceable directly to the exact Konkan shoreline terrace slope where this specific lot was hand-plucked at sunrise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
            {/* Farmer Heritage Card */}
            <div className="md:col-span-7 bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md mb-6">
                <div className="flex items-center gap-space-md">
                  <img
                    className="w-16 h-16 rounded-full object-cover shadow-sm"
                    alt={product.farmerProfile?.name || 'Farmer Vitthal Rao'}
                    src={product.farmerProfile?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6iVQxeRpHDn481pSeOa20IxWIjUHV6tS8KbPdSkZrUyABUSbQuXloRwwAdHpzAjZJUCBlAuE4bhRCfV_LgPyDTo1QrgJi518yD8ok9lrKcXB0LSpbO3C9bdC-5suWw79OrM7HJUNkNn63oKJ21qKo0NKjB4e-f008TD91CdeIN7DRa4jDoh1HoV_xJvyoZNtYRYESX9_3mXIrjxl8_X3ZBymI4WbcHq2Y0iHVoatAVcOHEIQjCaYi'}
                  />
                  <div>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold block">
                      {product.farmerProfile?.name || 'Vitthal Rao Savant & Family'}
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary block font-medium">
                      {product.farmerProfile?.role || '3rd Gen Mango Guardians'} • {product.origin || 'Kelshi Bay, Ratnagiri'}
                    </span>
                  </div>
                </div>
                <span className="px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                  {product.farmerProfile?.experience || '34-Year Organic Soil'}
                </span>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                {product.farmerProfile?.quote ||
                  '“Our trees sit on laterite rock terraces that slope downward into the Arabian Sea. The salty coastal fog combined with virgin red soil gives Alphonso mangoes their distinctive saffron saturation and deep musky sweetness that chemical greenhouses can never replicate.”'}
              </p>

              <div className="grid grid-cols-3 gap-space-sm border-t border-surface-container pt-4">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Harvest Timestamp</span>
                  <span className="font-label-md text-label-md text-primary font-bold block mt-0.5">
                    {product.harvestTime || 'Yesterday, 06:15 AM'}
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Plucking Method</span>
                  <span className="font-label-md text-label-md text-primary font-bold block mt-0.5">
                    {product.farmerProfile?.method || 'Cushioned Pole Shears'}
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Orchard Elevation</span>
                  <span className="font-label-md text-label-md text-primary font-bold block mt-0.5">
                    {product.farmerProfile?.elevation || '85m Above Sea Level'}
                  </span>
                </div>
              </div>
            </div>

            {/* Lab Assay & Brix Gauge */}
            <div className="md:col-span-5 bg-primary-container text-on-primary rounded-3xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden" id="lab-report">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-primary-fixed font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">biotech</span>
                  Independent Lab Assay #L-994
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                  PASSED
                </span>
              </div>

              {/* Brix Visual Progress */}
              <div className="my-space-md p-space-md rounded-2xl bg-primary/60 flex flex-col gap-space-xs">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-primary-fixed-dim">Brix Sugar Concentration Gauge</span>
                  <span className="font-bold text-secondary-fixed text-[14px]">
                    {product.brix || 21.4}° Bx (Superlative)
                  </span>
                </div>
                <div className="w-full h-3 bg-surface-container-highest/20 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-gradient-to-r from-secondary-fixed to-secondary-container rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-primary-fixed-dim">
                  <span>Standard Market: 14°</span>
                  <span>Premium Table: 18°</span>
                  <span className="font-bold text-surface-bright">Benato Lot: {product.brix || 21.4}°</span>
                </div>
              </div>

              <div className="space-y-2 font-body-sm text-[13px] text-on-primary-container mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed">check_circle</span>
                  <span><strong>0.00 ppm:</strong> Zero Ethylene gas or Calcium carbide detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed">check_circle</span>
                  <span><strong>NPOP / USDA Certified:</strong> Full pesticide screen clear (242 chemicals)</span>
                </div>
              </div>

              <button 
                onClick={() => alert("Downloading certified mass spectrometry certificate (PDF)...")}
                className="w-full py-2.5 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Download Full Spectrometry PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI Chef Pairing Assistant */}
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin py-space-lg w-full">
        <div className="bg-gradient-to-r from-surface-container-low via-secondary-container/20 to-surface-container-low rounded-3xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary text-secondary-fixed flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[26px]">smart_toy</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    Benato AI Culinary Pairing
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[10px] font-bold">
                    Chef GPT-4o
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Recommended recipe based on today&apos;s Brix sugar profile: <strong>Alphonso &amp; Cardamom Shrikhand Bowl</strong>
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenAiAssistant('Pair fresh mangoes with breakfast ideas')}
              className="px-space-md py-2 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm hover:bg-surface-container-high transition-colors"
            >
              Ask Benato AI for More Pairings
            </button>
          </div>

          {/* Interactive AI Prompt Chips */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 text-on-surface no-scrollbar">
            <span className="font-label-sm text-label-sm text-outline whitespace-nowrap">Suggested prompts:</span>
            <button
              onClick={() => onOpenAiAssistant('Provide a recipe for spicy Thai mango salsa')}
              className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors whitespace-nowrap shadow-sm"
            >
              🥭 Make a spicy Thai mango salsa
            </button>
            <button
              onClick={() => onOpenAiAssistant('How to make dairy-free mango coconut kulfi')}
              className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors whitespace-nowrap shadow-sm"
            >
              🍦 Dairy-free mango coconut kulfi
            </button>
            <button
              onClick={() => onOpenAiAssistant('Fresh mint and aam panna detox drink recipe')}
              className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors whitespace-nowrap shadow-sm"
            >
              🌿 Fresh mint &amp; aam panna detox
            </button>
          </div>
        </div>
      </div>

      {/* 5. Frequently Bought Together Bundle */}
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin py-space-md w-full">
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                Kitchen Synergy
              </span>
              <h3 className="font-headline-lg text-headline-lg text-primary font-bold">
                Frequently Bought Together
              </h3>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Save ₹125 with this 3-item summer breakfast bundle
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-space-md shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
              {/* Bundle Items Grid */}
              <div className="md:col-span-8 grid grid-cols-3 gap-space-sm items-center">
                {/* Mangoes */}
                <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-surface-container-low relative">
                  <img
                    className="w-16 h-16 object-cover rounded-xl mb-1"
                    alt="Ratnagiri Alphonso Mango"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5I3xyTB05ntw-_b2n9qJLFdBfobIou_mTImh5kTBMc1E0Sc8jsGo-fhGFrrl3ji39CIVSgTdsrgQQkNbyDA-5AkEGIlmkbm3sq2XOdhOMj90z1R49KsPSnC55lTsXyLIJv8e1FU8Mstx5ogtEkAK2XCJIDzZaYSqwTItloBJzWgUvv5skgJnu6l4N5H2RucR-uhLJjcuqM30xrm_1fu33wsx3fm7M8dh544WtzFV_cgw8sAyTg0Ft"
                  />
                  <span className="font-label-sm text-label-sm text-primary font-bold line-clamp-1">
                    Ratnagiri Alphonso (6 pcs)
                  </span>
                  <span className="font-body-sm text-[12px] text-secondary font-bold mt-0.5">₹699</span>
                </div>

                {/* Curd */}
                <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-surface-container-low relative">
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 font-bold text-outline text-lg hidden md:block">+</span>
                  <img
                    className="w-16 h-16 object-cover rounded-xl mb-1"
                    alt="A2 Curd"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqdhCoDfld9x4wjr-oXqydE5Z4rlToOklVckD8zqJZLcM98JWuPqF5tcHI69OLUTYzqyMnmXpzwe7bsAziKoMzrNW1rlqXRYe2ok_JgqNP4Frsav1I9cGhnAaXEmlZnoZbXReBoT0ozrL6V_xwP8sOsRO2YJjSlAhLUXnBeFOGwOY_jxCc3Kd-_6GJ9YpHZjPfof5OoaSyjjtzVxOu9XAJvETDKRBvEZjE2G1TaL9N7rlc8wWqBlNg"
                  />
                  <span className="font-label-sm text-label-sm text-primary font-bold line-clamp-1">
                    A2 Vedic Gir Cow Curd
                  </span>
                  <span className="font-body-sm text-[12px] text-secondary font-bold mt-0.5">₹120</span>
                </div>

                {/* Honey */}
                <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-surface-container-low relative">
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 font-bold text-outline text-lg hidden md:block">+</span>
                  <img
                    className="w-16 h-16 object-cover rounded-xl mb-1"
                    alt="Raw Honey"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ6gAITxXehwn7nd97w3KjvxjOPLR6rjlDRbykYVi94OlFFbvNUbn7q7ksUT02xc80zf-Gb9TAivltSAtGF5MtqLIhOADYyHCaZDHzYM7agFOsZDDS37tD-h8LWIW-S9KB3Wjlb42eznt5I4i0m70QrHZpnKgPeHShiyTVaslBu3MdAm3nhXaR6Jk5qbIfOIOmQLjL6_Wv44D6Vx2BtP93ob7ZTUUSl3FG477EmYoZgyHanB9KSYQj"
                  />
                  <span className="font-label-sm text-label-sm text-primary font-bold line-clamp-1">
                    Western Ghats Raw Honey
                  </span>
                  <span className="font-body-sm text-[12px] text-secondary font-bold mt-0.5">₹260</span>
                </div>
              </div>

              {/* Action Box */}
              <div className="md:col-span-4 flex flex-col justify-center p-space-md rounded-2xl bg-surface-container-low text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">₹954</span>
                  <span className="font-body-sm text-body-sm text-outline line-through">₹1,079</span>
                </div>
                <span className="font-body-sm text-[12px] text-secondary font-semibold block mb-3">
                  Save 12% on complete Aamrakhand Breakfast bundle
                </span>
                <button
                  onClick={handleAddBundle}
                  className="w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-sm"
                >
                  Add All 3 to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Customer Reviews & Community Logs */}
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin py-space-xl w-full">
        <div className="flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm border-b border-surface-container pb-space-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">
                  Unfiltered Customer Harvest Logs
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                  4.9 / 5.0
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Real unedited photos from kitchens across Bengaluru, Pune, and Hyderabad.
              </p>
            </div>
            <button
              onClick={() => setReviewModalOpen(true)}
              className="px-space-md py-2.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-variant transition-colors"
            >
              Write a Harvest Review
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Review 1 */}
            <div className="p-space-md rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      alt="Priya Nair"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCad-SaWU1nEHYfc-ILmARk2QE7fOh8_ssteBH1QEJdRyyYvIZD_Xa2zC0XWL9mUzcnN1NiCivKLVsTlrO2awsAUTLAQNAx5xgUPp__x0EvfVFgNYqx3DxeHa-gdwsfurgbStIuYZUU9KpCt9g03EJTglrjKeNxNNxQTlcCGsRD_4ciEc3fHMJcLdEuNi0a_G19HrTH6NgVAIQrgR3KdcklHqdioByPYwUpS6gdjcca5KySRBgEAaw8"
                    />
                    <div>
                      <span className="font-label-md text-label-md text-primary font-bold block">Priya Nair</span>
                      <span className="font-body-sm text-[11px] text-outline">Koramangala 4th Block • 2 hours ago</span>
                    </div>
                  </div>
                  <div className="flex text-secondary text-[14px]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  “The fragrance hit me the second I opened the straw packaging! No chemical smell whatsoever. Pure saffron richness, thin seed, and zero fiber. Ordering another 12-pack for my parents.”
                </p>
                <img
                  className="w-full h-36 object-cover rounded-2xl mt-1"
                  alt="Review photo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAj4n4OZgL1eNrtIn0qYU3TPufyeyZfW4MYoXhuCaGCcixMolSrIIS2vkwok4VFWNx0Pl6PI82SHbCT3mnTGbNcnmU9KfRYTw2zRX-HqSM2v_SBQCFY3ngF9HRzjGUs6BjYcXilfQ3NUC5e8A1ur3hFmdNC-Yu-m1apeK3nwg_BtE0oSfFsav9-DLDTzH5t-hsAn3vLk4EzbOLEPDCrNJYLMDyB65eFd0vbo0nexAVnW10HbmBmbF-"
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-body-sm text-[12px] text-outline">
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verified Order
                </span>
                <span>Helpful (42)</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-space-md rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      alt="Rohan Deshmukh"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_MFPvL8U2lskpjB7xciltFQElz6VOSRJXx-SAFwCvbUtk9seHC047Lpm5UwGTbBmIc37Cqw8mKJu7sxjq370zpB44IFHL9mQxrqbsAPxU0hWwY7H9oMbvmAhdyof986sp70cJBrt3DZxhiG9FE6DO_WAScfPnCjfP20nS6BhevQMPxD0E326mSB3Tq55Nynba-G9HYATmlhlKSIRKa4IpuO2mbYvW5fCISSkvI67QPPz0wDC102nm"
                    />
                    <div>
                      <span className="font-label-md text-label-md text-primary font-bold block">Rohan Deshmukh</span>
                      <span className="font-body-sm text-[11px] text-outline">Bandra West • Yesterday</span>
                    </div>
                  </div>
                  <div className="flex text-secondary text-[14px]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  “Being from Maharashtra, I am extremely picky about Alphonso authenticity. These are 100% genuine Kelshi bay fruits. The sweetness has that distinct floral note you only get from unhurried natural tree ripening.”
                </p>
                <img
                  className="w-full h-36 object-cover rounded-2xl mt-1"
                  alt="Review photo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxtKpbe04sMqXlerjBuhsdl3o4a5jTGWMrq_P9XWeNrSgjDw7zymdJ5uc8JJ8BGoG3MUieb7oJ9QnVdbKPWl8TR-ULlGEudsvaUcMh6P9HGKsC15iTz4LJDc6s26ux2tvXdD-fT3QQx5_IkAK3PATtGfOPkgromRbia3Am5EF0ZH4qIjcOkzOAZRK_Rx1le_dldVMTNCF_1uWw1U2ljJiMJKUmdhw5KLIbVeXaVF1Vy8RleGVqSLl-"
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-body-sm text-[12px] text-outline">
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verified Order
                </span>
                <span>Helpful (38)</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-space-md rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      alt="Dr. Ananya Sen"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4MatZ-9JUk7CaC4H0w_-7MU6lKqC3bbges5Dy5EcXgZyOJLRF2S8QmVrtuYtV7f6Mp8h38jbLHVaFucleVoNX42-PU2aazXKtdSdH1J2BWi6CHvgiydHnWUDZBx2wwyAaT9YZ-o5c5--14cCN34sVoVvUHEO28-ZavD7j8V9mjGrfdJI969pm1ln3QexA1fvNnXRMK9xSU1oqSPfvdgdpAE0DXS8AkIhVcTj89BSzbD6NsgrxbyUG"
                    />
                    <div>
                      <span className="font-label-md text-label-md text-primary font-bold block">Dr. Ananya Sen</span>
                      <span className="font-body-sm text-[11px] text-outline">Indiranagar • 2 days ago</span>
                    </div>
                  </div>
                  <div className="flex text-secondary text-[14px]">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                    <span className="material-symbols-outlined text-[16px]">star_half</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  “Arrived within 22 minutes via cold bag. Cold chain makes a huge difference; the fruit hadn&apos;t overheated or fermented inside transit. Perfect consistency for our morning smoothie bowls.”
                </p>
                <img
                  className="w-full h-36 object-cover rounded-2xl mt-1"
                  alt="Review photo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC5XjMbPXNR5fNbez1VGMQPkIUgtt0u8iFMKZU_Akh0MWgSurGCAnv3bMDoin32k04KjSgT4tt1bJv2cyaLctp2Sner_LCNstNP7Pi4kdAoKmmlsFGX9BeDRM_uTu_tod5TUeg1PcPuW4nmq14gkDgMA8s7egg2VokVG83nM6_sJLh0ONn8gf12CWK_fKVwLZpeqPmuCbc1j0vCxC_xgFMfUd85l0G8yfEx0MHXx5D8ELfBGtJNQEr"
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-body-sm text-[12px] text-outline">
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verified Order
                </span>
                <span>Helpful (19)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick-Action Bar for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
        <div className="bg-surface-container-lowest/95 backdrop-blur-md p-3 rounded-full shadow-2xl flex items-center justify-between gap-space-sm border border-outline-variant/40">
          <div className="flex flex-col pl-3">
            <span className="font-label-sm text-[11px] text-on-surface-variant">
              Selected {currentPack.name}
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold leading-none">
              ₹{totalPrice}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-on-primary py-2.5 px-space-md rounded-full font-label-md text-label-md font-bold flex items-center gap-1 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Add • 20 Mins</span>
          </button>
        </div>
      </div>

      {/* Write Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h3 className="font-headline-sm text-primary font-bold">Write a Harvest Review</h3>
              <button 
                onClick={() => setReviewModalOpen(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-5xl">check_circle</span>
                <h4 className="font-headline-sm text-primary font-bold">Thank you for sharing!</h4>
                <p className="font-body-sm text-on-surface-variant">
                  Your review has been verified and published to the community harvest log.
                </p>
                <button
                  onClick={() => {
                    setReviewSubmitted(false);
                    setReviewModalOpen(false);
                  }}
                  className="mt-4 px-6 py-2 rounded-full bg-primary text-on-primary font-label-md font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setReviewSubmitted(true);
                }}
                className="flex flex-col gap-4 mt-4"
              >
                <div>
                  <label className="font-label-sm text-on-surface-variant block mb-1 uppercase">Rating</label>
                  <div className="flex items-center gap-1 text-secondary">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button type="button" key={s} className="material-symbols-outlined text-2xl hover:scale-110 transition-transform">
                        star
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-label-sm text-on-surface-variant block mb-1 uppercase">Your Experience</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the aroma, texture, freshness, and cold-chain condition upon arrival..."
                    className="w-full bg-surface-container-low rounded-xl p-3 font-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-4 py-2 rounded-full text-on-surface-variant font-label-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-md font-bold shadow-md hover:bg-primary-container transition-colors"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
