import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';

interface ShopViewProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateCartQty: (productId: string, delta: number) => void;
  onSelectProduct: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  onOpenAiAssistant: (presetPrompt?: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  cartItems,
  onAddToCart,
  onUpdateCartQty,
  onSelectProduct,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onOpenAiAssistant
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(750);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([
    'gi-tagged',
    'hydroponic'
  ]);
  const [sortBy, setSortBy] = useState<string>('freshness');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev => 
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Filter products based on search, category, price, rating
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSub = product.subtitle.toLowerCase().includes(query);
        const matchesFarm = product.farm.toLowerCase().includes(query);
        if (!matchesName && !matchesSub && !matchesFarm) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default freshness order
    });
  }, [products, searchQuery, selectedCategory, maxPrice, minRating, sortBy]);

  const categories = [
    { id: 'all', label: 'All Harvest (148)', icon: 'potted_plant' },
    { id: 'veggies', label: 'Vine Veggies', icon: 'nutrition' },
    { id: 'greens', label: 'Greens & Herbs', icon: 'grass' },
    { id: 'fruits', label: 'Orchard Fruits', icon: 'eco' },
    { id: 'dairy', label: 'Artisanal Dairy', icon: 'water_drop' },
    { id: 'oils', label: 'Cold-Pressed Oils', icon: 'opacity' },
    { id: 'staples', label: 'Organic Staples', icon: 'grain' }
  ];

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* 1. Organic Top Wave Banner Section */}
      <section className="relative bg-primary-container text-on-primary overflow-hidden pt-space-lg pb-space-xl">
        <div className="absolute -right-20 -bottom-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 -top-12 w-64 h-64 rounded-full bg-primary-fixed/10 blur-2xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Left Copy & Badges */}
            <div className="lg:col-span-7 flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs w-fit px-space-sm py-0.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed text-label-sm font-label-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">nest_eco_leaf</span>
                <span>Direct Harvest Dispatch • Cycle 06:00 AM</span>
              </div>
              
              <h1 className="font-headline-xl text-headline-xl text-surface-bright tracking-tight font-bold">
                Farm Fresh Groceries &amp; Pantry Staples
              </h1>
              
              <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
                Harvested daily from regenerative estates, lab-screened for 120+ pesticides, and preserved via solar cold-chain to reach your kitchen doorstep within 20 minutes.
              </p>

              {/* Metric Badges */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-sm">
                <div className="flex items-center gap-space-xs bg-primary/60 px-space-md py-space-xs rounded-full">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">verified_user</span>
                  <span className="font-label-sm text-label-sm text-surface-bright">Zero Chemical Residue</span>
                </div>
                <div className="flex items-center gap-space-xs bg-primary/60 px-space-md py-space-xs rounded-full">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">speed</span>
                  <span className="font-label-sm text-label-sm text-surface-bright">Sub-20 Min Cold Delivery</span>
                </div>
                <div className="flex items-center gap-space-xs bg-primary/60 px-space-md py-space-xs rounded-full">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">agriculture</span>
                  <span className="font-label-sm text-label-sm text-surface-bright">42 Partner Orchards</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image in Circular Vessel */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/50 p-2 shadow-2xl">
                <img
                  className="w-full h-full object-cover rounded-full shadow-inner"
                  alt="Organic studio basket with ripe produce"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4m7ZrWm_0RU4sAhm1Gv2Bu_WlXVZauBCWqU0IQY_vR34ucDNjklko_lATqxHGV6yNeylijpfrptm5FBqs5ztKvEzawTDLNGgiHudHJQiVfj7NNx9n2y00alVf1e1IoTlQ4BuuPm64PjebXd1eELZopOjR7qPI5zPnv_Do1flnSpgG2C1jVaUY7wSD3-4ZZVUUPmjwMTLljMDT7onhR7or_rD2_uZAWhRIEb3m3NEF7MrG08cU-uX4"
                />
                <div className="absolute -bottom-2 -left-2 sm:-left-4 bg-surface-container-lowest text-primary px-space-md py-space-xs rounded-2xl shadow-xl flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">local_florist</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant leading-none">Morning Pick</p>
                    <p className="font-headline-sm text-headline-sm font-bold text-primary">100% Native Heirloom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider */}
        <div className="w-full overflow-hidden leading-none mt-space-lg text-surface">
          <svg className="relative block w-full h-10 lg:h-14" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* 2. Horizontal Filter Ribbon */}
      <section className="max-w-7xl mx-auto w-full px-margin-sm md:px-margin -mt-2 mb-space-md relative z-20">
        <div className="flex items-center gap-space-xs overflow-x-auto py-space-xs no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 flex items-center gap-space-xs px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all shadow-sm ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className={`material-symbols-outlined text-[16px] ${isActive ? '' : 'text-secondary'}`}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Main Catalog Grid Area with Left Filter Sidebar */}
      <section className="max-w-7xl mx-auto w-full px-margin-sm md:px-margin py-space-sm mb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-space-md">
            {/* Benato AI Smart Curator Card */}
            <div className="rounded-2xl p-space-md bg-gradient-to-br from-surface-container-low via-secondary-container/20 to-primary-fixed/30 shadow-sm flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs text-secondary">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                <span className="font-label-md text-label-md font-bold uppercase tracking-wider">Benato Harvest AI</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Need lunch inspiration? Let our harvest intelligence craft a basket for your meal prep.
              </p>
              <div className="flex flex-wrap gap-space-xs mt-space-xs">
                <button 
                  onClick={() => onOpenAiAssistant('Curate a High Protein Greens basket with meal ideas')}
                  className="text-left font-label-sm text-label-sm bg-surface-container-lowest px-space-sm py-1 rounded-full text-primary hover:bg-secondary-fixed transition-colors shadow-xs"
                >
                  ✦ High Protein Greens
                </button>
                <button 
                  onClick={() => onOpenAiAssistant('Curate a Low Carb Salad Box for lunch today')}
                  className="text-left font-label-sm text-label-sm bg-surface-container-lowest px-space-sm py-1 rounded-full text-primary hover:bg-secondary-fixed transition-colors shadow-xs"
                >
                  ✦ Low Carb Salad Box
                </button>
                <button 
                  onClick={() => onOpenAiAssistant('Recommend a gut health breakfast basket with probiotic dairy')}
                  className="text-left font-label-sm text-label-sm bg-surface-container-lowest px-space-sm py-1 rounded-full text-primary hover:bg-secondary-fixed transition-colors shadow-xs"
                >
                  ✦ Gut Health Daily
                </button>
              </div>
            </div>

            {/* Filter Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Filter Harvest</h3>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setMaxPrice(1000);
                    setMinRating(3.5);
                    setSelectedCerts(['gi-tagged', 'hydroponic']);
                  }}
                  className="font-label-sm text-label-sm text-secondary hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Category Hierarchy */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Produce Hierarchy
                </span>
                <div className="flex flex-col gap-space-xs mt-space-xs">
                  {[
                    { id: 'veggies', name: 'Heirloom Vegetables', count: 54 },
                    { id: 'greens', name: 'Microgreens & Herb Pots', count: 28 },
                    { id: 'fruits', name: 'Sun-Ripened Fruits', count: 32 },
                    { id: 'dairy', name: 'Country Dairy & Paneer', count: 16 },
                    { id: 'staples', name: 'Stoneground Flours', count: 18 }
                  ].map((cat) => (
                    <label 
                      key={cat.id} 
                      className="flex items-center justify-between cursor-pointer py-1 text-on-surface hover:text-secondary"
                    >
                      <span className="flex items-center gap-space-xs font-body-sm text-body-sm">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat.id || selectedCategory === 'all'}
                          onChange={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
                          className="w-4 h-4 rounded accent-primary"
                        />
                        <span>{cat.name}</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">{cat.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Max Price
                  </span>
                  <span className="font-label-md text-label-md font-bold text-primary">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="1000"
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-secondary bg-surface-container-high h-2 rounded-lg cursor-pointer"
                />
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline">
                  <span>₹40</span>
                  <span>₹1,000+</span>
                </div>
              </div>

              {/* Soil & Farm Certifications */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Certifications
                </span>
                <div className="flex flex-col gap-space-xs mt-space-xs">
                  {[
                    { id: 'gi-tagged', label: 'GI-Tagged Origin' },
                    { id: 'hydroponic', label: 'Hydroponic Pesticide-Free' },
                    { id: 'regenerative', label: '100% Regenerative Soil' },
                    { id: 'vedic-a2', label: 'A2 Vedic Certified' }
                  ].map((cert) => (
                    <label 
                      key={cert.id} 
                      className="flex items-center gap-space-xs cursor-pointer py-1 font-body-sm text-body-sm text-on-surface"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCerts.includes(cert.id)}
                        onChange={() => toggleCert(cert.id)}
                        className="w-4 h-4 rounded accent-primary"
                      />
                      <span>{cert.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Minimum Rating
                </span>
                <div className="flex items-center gap-space-xs mt-space-xs">
                  {[3.5, 4.0, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex-1 py-1.5 rounded-lg font-label-sm text-label-sm text-center transition-colors ${
                        minRating === rating
                          ? 'bg-primary text-on-primary font-bold shadow-sm'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {rating}★{rating < 4.8 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Farm Dispatch Time */}
              <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[24px]">schedule</span>
                <div>
                  <p className="font-label-sm text-label-sm font-bold text-primary">Harvested 3h Ago</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                    Direct from Kolar &amp; Doddaballapur
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9 flex flex-col gap-space-md">
            {/* Results Header & Sort Controls */}
            <div className="bg-surface-container-lowest rounded-2xl px-space-md py-space-sm shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-primary">
                  Fresh Harvest Catalog
                </span>
                <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                  {filteredProducts.length} In Stock
                </span>
              </div>
              <div className="flex items-center gap-space-md self-end sm:self-auto">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm text-outline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-label-md text-label-md text-primary font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="freshness">Freshly Harvested (Earliest)</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Customer Loved • 4.8+</option>
                  </select>
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-surface-container rounded-lg p-0.5">
                  <button className="p-1 rounded bg-surface-container-lowest text-primary shadow-xs" title="Grid View">
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                  <button className="p-1 rounded text-outline hover:text-on-surface" title="List View">
                    <span className="material-symbols-outlined text-[18px]">view_agenda</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4-Column Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-outline text-5xl mb-2">search_off</span>
                <h3 className="font-headline-sm text-primary font-bold">No produce matches your filters</h3>
                <p className="font-body-sm text-on-surface-variant max-w-sm mt-1">
                  Try adjusting the maximum price or clear your search to explore today&apos;s morning harvest lot.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setMaxPrice(1000);
                  }}
                  className="mt-4 px-space-md py-2 rounded-full bg-primary text-on-primary font-label-md font-bold"
                >
                  View All Produce
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {filteredProducts.map((product) => {
                  const qty = getCartQuantity(product.id);
                  const isFav = !!favorites[product.id];

                  return (
                    <article
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="bg-surface-container-lowest rounded-2xl p-space-sm shadow-sm hover:shadow-md transition-all flex flex-col group relative cursor-pointer"
                    >
                      {/* Product Image Box */}
                      <div className="relative w-full aspect-square bg-surface-container-low rounded-xl overflow-hidden mb-space-sm flex items-center justify-center p-2">
                        <img
                          src={product.image}
                          alt={product.altText || product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {product.badge && (
                          <span className={`absolute top-2 left-2 px-space-xs py-0.5 rounded-full font-label-sm text-label-sm ${
                            product.badgeColor === 'tertiary'
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                              : product.badgeColor === 'primary'
                              ? 'bg-primary-fixed text-on-primary-fixed'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}>
                            {product.badge}
                          </span>
                        )}
                        <button
                          onClick={(e) => toggleFavorite(e, product.id)}
                          className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs flex items-center justify-center transition-colors ${
                            isFav ? 'text-error' : 'text-outline hover:text-error'
                          }`}
                          aria-label="Save to favorites"
                        >
                          <span 
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            favorite
                          </span>
                        </button>
                      </div>

                      {/* Info & Pricing */}
                      <div className="flex flex-col flex-1 justify-between gap-space-xs">
                        <div>
                          <span className="font-label-sm text-label-sm text-secondary font-semibold block">
                            {product.farm}
                          </span>
                          <h4 className="font-headline-sm text-headline-sm text-primary font-bold line-clamp-1 group-hover:text-secondary transition-colors">
                            {product.name}
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                            {product.weight} • {product.category}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-space-xs mt-auto">
                          <div className="flex items-baseline gap-space-xs">
                            <span className="font-headline-sm text-headline-sm font-bold text-primary">
                              ₹{product.price}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="font-label-sm text-label-sm text-outline line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Add / Stepper Button */}
                          {qty > 0 ? (
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center bg-surface-container-high rounded-full px-2 py-0.5 text-primary"
                            >
                              <button
                                onClick={() => onUpdateCartQty(product.id, -1)}
                                className="w-5 h-5 flex items-center justify-center text-label-sm font-bold hover:text-secondary"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="px-2 font-label-sm text-label-sm font-bold">{qty}</span>
                              <button
                                onClick={() => onUpdateCartQty(product.id, 1)}
                                className="w-5 h-5 flex items-center justify-center text-label-sm font-bold hover:text-secondary"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product, 1);
                              }}
                              className="px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-xs hover:bg-secondary transition-all flex items-center gap-0.5"
                            >
                              <span>Add</span>
                              <span className="material-symbols-outlined text-[14px]">add</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination & Load More */}
            <div className="mt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md py-space-sm border-t border-surface-container pt-4">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Displaying <span className="font-bold text-primary">{Math.min(filteredProducts.length, 8)}</span> of{' '}
                <span className="font-bold text-primary">{filteredProducts.length}</span> items in today&apos;s harvest lot
              </p>
              <div className="flex items-center gap-space-xs">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="w-9 h-9 rounded-full bg-surface-container text-outline flex items-center justify-center hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button 
                  onClick={() => setCurrentPage(1)}
                  className={`w-9 h-9 rounded-full font-label-md text-label-md flex items-center justify-center ${
                    currentPage === 1 ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  1
                </button>
                <button 
                  onClick={() => setCurrentPage(2)}
                  className={`w-9 h-9 rounded-full font-label-md text-label-md flex items-center justify-center ${
                    currentPage === 2 ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  2
                </button>
                <button 
                  onClick={() => setCurrentPage(3)}
                  className={`w-9 h-9 rounded-full font-label-md text-label-md flex items-center justify-center ${
                    currentPage === 3 ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  3
                </button>
                <button 
                  onClick={() => setCurrentPage(4)}
                  className={`w-9 h-9 rounded-full font-label-md text-label-md flex items-center justify-center ${
                    currentPage === 4 ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  4
                </button>
                <button 
                  onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
                  className="w-9 h-9 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* 4. Cold-Chain Delivery Assurance Ribbon */}
      <section className="w-full bg-surface-container-low py-space-lg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
            <div className="flex items-center gap-space-sm bg-surface-container-lowest/70 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-[24px]">thermostat</span>
              </div>
              <div>
                <h5 className="font-headline-sm text-headline-sm font-bold text-primary">4°C Cold-Chain</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Preserves cell crispness from farm to bowl</p>
              </div>
            </div>

            <div className="flex items-center gap-space-sm bg-surface-container-lowest/70 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <div>
                <h5 className="font-headline-sm text-headline-sm font-bold text-primary">20 Min Transit</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Dispatched instantly from nearest solar hub</p>
              </div>
            </div>

            <div className="flex items-center gap-space-sm bg-surface-container-lowest/70 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-[24px]">science</span>
              </div>
              <div>
                <h5 className="font-headline-sm text-headline-sm font-bold text-primary">Daily Lab Tests</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Verified residue-free via GC-MS mass spec</p>
              </div>
            </div>

            <div className="flex items-center gap-space-sm bg-surface-container-lowest/70 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-[24px]">replay</span>
              </div>
              <div>
                <h5 className="font-headline-sm text-headline-sm font-bold text-primary">Zero Hassle Returns</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Not delighted? Instant replacement credit</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
