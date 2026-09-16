import React, { useState } from 'react';
import { ActiveView, CartItem } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView?: (view: ActiveView, category?: string) => void;
  onNavigate?: (view: ActiveView, category?: string) => void;
  cartItems?: CartItem[];
  cartCount?: number;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSearchChange?: (query: string) => void;
  onOpenAiAssistant?: () => void;
  selectedCategory?: string;
  setSelectedCategory?: (cat: string) => void;
  onSelectCategory?: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onNavigate,
  cartItems = [],
  cartCount,
  searchQuery = '',
  setSearchQuery,
  onSearchChange,
  onOpenAiAssistant = () => {},
  selectedCategory = 'all',
  setSelectedCategory,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Bengaluru Central');

  const safeCart = Array.isArray(cartItems) ? cartItems : [];
  const totalItemsCount =
    cartCount !== undefined
      ? cartCount
      : safeCart.reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const totalCartAmount = safeCart.reduce(
    (acc, item) => acc + (item?.unitPrice || 0) * (item?.quantity || 0),
    0
  );

  const locations = [
    'Bengaluru Central (Indiranagar, Koramangala)',
    'Bengaluru South (Jayanagar, JP Nagar)',
    'Bengaluru North (Malleswaram, Hebbal)',
    'Bengaluru East (Whitefield, Bellandur)'
  ];

  const handleNavClick = (view: ActiveView, category?: string) => {
    if (onNavigate) {
      onNavigate(view, category);
    } else if (setActiveView) {
      setActiveView(view, category);
    }
    if (category) {
      if (onSelectCategory) {
        onSelectCategory(category);
      } else if (setSelectedCategory) {
        setSelectedCategory(category);
      }
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQueryChange = (val: string) => {
    if (onSearchChange) {
      onSearchChange(val);
    } else if (setSearchQuery) {
      setSearchQuery(val);
    }
  };


  return (
    <header className="fixed top-0 w-full z-50 shadow-[0_4px_20px_rgba(20,61,43,0.06)]" id="main-header">
      {/* Top green announcement strip */}
      <div className="w-full bg-primary-container text-primary-fixed py-space-xs px-margin-sm md:px-margin">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-label-sm text-label-sm tracking-wide">
          <div className="flex items-center gap-space-sm mx-auto sm:mx-0">
            <span className="material-symbols-outlined text-[15px] text-secondary-fixed">bolt</span>
            <span className="truncate">
              Delivering Fresh Harvest to your kitchen within 20 Minutes • Free Cold-Chain Delivery on orders above ₹299
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-space-lg text-primary-fixed-dim shrink-0">
            <span className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              100% Certified Organic
            </span>
            <button 
              onClick={() => setActiveView('account')}
              className="flex items-center gap-space-xs hover:text-surface-bright transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">support_agent</span>
              Farm Helpdesk
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="h-20 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container/60">
        <div className="max-w-7xl mx-auto h-full px-margin-sm md:px-margin flex items-center justify-between gap-space-md">
          {/* Logo and Location */}
          <div className="flex items-center gap-space-md shrink-0">
            <button 
              onClick={() => handleNavClick('shop', 'all')}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed shadow-sm">
                <span className="material-symbols-outlined text-[20px]">eco</span>
              </div>
              <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold lowercase">
                benato
              </span>
            </button>

            {/* Location selector */}
            <div className="relative">
              <button 
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="hidden sm:flex items-center gap-space-xs ml-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container transition-colors"
                title="Select delivery neighborhood"
              >
                <span className="material-symbols-outlined text-[14px] text-secondary">location_on</span>
                <span className="max-w-[120px] truncate">{currentLocation}</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>

              {locationDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-72 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <p className="px-3 py-1 text-[11px] font-bold text-outline uppercase tracking-wider">
                    20-Min Cold-Van Hubs
                  </p>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setCurrentLocation(loc.split(' (')[0]);
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-body-sm transition-colors flex items-center justify-between ${
                        currentLocation === loc.split(' (')[0]
                          ? 'bg-secondary-container text-on-secondary-container font-bold'
                          : 'hover:bg-surface-container-low text-on-surface'
                      }`}
                    >
                      <span className="truncate">{loc}</span>
                      {currentLocation === loc.split(' (')[0] && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-space-sm items-center relative">
            <div className="w-full flex items-center bg-surface-container-low rounded-full px-space-md py-space-xs gap-space-sm focus-within:ring-2 focus-within:ring-secondary/30 transition-all">
              <span className="material-symbols-outlined text-outline text-[18px]">search</span>
              <input
                className="w-full bg-transparent border-0 focus:outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline"
                placeholder="Search heirloom tomatoes, farm curd, greens..."
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  handleQueryChange(e.target.value);
                  if (activeView !== 'shop') handleNavClick('shop');
                }}
              />
              {searchQuery ? (
                <button 
                  onClick={() => handleQueryChange('')}
                  className="text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              ) : (
                <kbd className="hidden lg:inline-block px-space-xs py-0.5 rounded bg-surface-container-high text-outline text-[10px] font-label-sm">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-label-md text-label-md">
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeView === 'shop' && selectedCategory === 'all'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              Fresh Produce
            </button>
            <button
              onClick={() => handleNavClick('shop', 'dairy')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeView === 'shop' && selectedCategory === 'dairy'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              Dairy &amp; Eggs
            </button>
            <button
              onClick={() => handleNavClick('shop', 'veggies')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeView === 'shop' && selectedCategory === 'veggies'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              Farm Direct
            </button>
            <button
              onClick={() => handleNavClick('shop', 'fruits')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeView === 'shop' && selectedCategory === 'fruits'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              Organics
            </button>
            <button
              onClick={() => handleNavClick('tracking')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                activeView === 'tracking'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Live Tracking
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="px-3 py-1.5 rounded-full text-secondary font-bold flex items-center gap-1 hover:bg-secondary-fixed/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              Benato AI
            </button>
          </nav>

          {/* Actions: Cart, Profile & Mobile Menu */}
          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            {/* Cart Button */}
            <button
              onClick={() => handleNavClick('cart')}
              className={`flex items-center gap-space-xs px-space-md py-2 rounded-full font-label-md text-label-md shadow-[0_4px_16px_rgba(20,61,43,0.15)] transition-all ${
                activeView === 'cart'
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
              id="header-cart-btn"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span className="inline">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} • ₹{totalCartAmount}
              </span>
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => handleNavClick('account')}
              className={`relative rounded-full ring-2 transition-all ${
                activeView === 'account' ? 'ring-secondary' : 'ring-transparent hover:ring-secondary/50'
              }`}
              title="View Account Dashboard"
            >
              <img
                alt="Profile of Ananya Sharma"
                className="w-9 h-9 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1X1LHXf3EkN6Arin3Vki03Wnwa1enpxjvtaDk81adVfRc0ubyRQSg6BAOjK0AKJVRB96uHYVOkRMpKoOfcUiv3lWvmoJOK6bYy_-GpxOo39Jf67rVtFAe7rtqejIq9TFk6qh4Nhavq0RC4b9ZuDgHHDpT_MOyS7TXNIlbwKSVzpAd-O3TwnASG5xVfpijpN-VkhiZzoyII_4sHGT0_Eta_aCoDOkKRsdfQLtym2VWFn1lSOvRpiTu6NMPE"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary-fixed rounded-full border-2 border-white"></span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-surface-container text-primary"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container shadow-xl p-space-md flex flex-col gap-2">
          {/* Mobile search */}
          <div className="w-full flex items-center bg-surface-container-low rounded-full px-space-md py-2 gap-space-sm mb-2">
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <input
              className="w-full bg-transparent border-0 focus:outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline"
              placeholder="Search produce..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                handleQueryChange(e.target.value);
                if (activeView !== 'shop') handleNavClick('shop');
              }}
            />
          </div>

          <button
            onClick={() => handleNavClick('shop', 'all')}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-label-md ${
              activeView === 'shop' && selectedCategory === 'all'
                ? 'bg-primary text-on-primary font-bold'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Fresh Produce &amp; Catalog
          </button>
          <button
            onClick={() => handleNavClick('tracking')}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-label-md flex items-center justify-between ${
              activeView === 'tracking'
                ? 'bg-primary text-on-primary font-bold'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span>Live Order Tracking</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold">Active</span>
          </button>
          <button
            onClick={() => handleNavClick('account')}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-label-md ${
              activeView === 'account'
                ? 'bg-primary text-on-primary font-bold'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            User Account &amp; Past Orders
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAiAssistant();
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl font-label-md text-secondary font-bold flex items-center gap-2 bg-secondary-container/30"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Benato AI Kitchen Assistant</span>
          </button>
        </div>
      )}
    </header>
  );
};
