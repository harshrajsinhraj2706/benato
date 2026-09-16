import React, { useState } from 'react';
import { CartItem, Order, Product } from '../types';
import { SAVED_LOCATIONS } from '../data/mockData';

interface CartCheckoutViewProps {
  cartItems: CartItem[];
  onUpdateCartQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onBackToShop: () => void;
  onPlaceOrder: (order: Order) => void;
}

export const CartCheckoutView: React.FC<CartCheckoutViewProps> = ({
  cartItems = [],
  onUpdateCartQty,
  onRemoveItem,
  onBackToShop,
  onPlaceOrder
}) => {
  const [selectedSlot, setSelectedSlot] = useState<'express' | 'evening' | 'morning'>('express');
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [ecoPackaging, setEcoPackaging] = useState(true);
  const [selectedTip, setSelectedTip] = useState<number>(30);
  const [customTip, setCustomTip] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponCode, setCouponCode] = useState('BENATO20');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const activeAddress = SAVED_LOCATIONS[selectedAddressIndex] || SAVED_LOCATIONS[0];
  const safeItems = Array.isArray(cartItems) ? cartItems : [];

  // Calculations
  const itemTotal = safeItems.reduce((acc, item) => acc + (item?.unitPrice || 0) * (item?.quantity || 0), 0);
  const discount = couponApplied && itemTotal >= 300 ? 150 : 0;
  const deliveryFee = itemTotal >= 299 ? 0 : 49;
  const insulationFee = ecoPackaging ? 15 : 0;
  const tipAmount = selectedTip === -1 ? Number(customTip) || 0 : selectedTip;
  const finalTotal = Math.max(0, itemTotal - discount + deliveryFee + insulationFee + tipAmount);
  const totalSaved = (itemTotal >= 299 ? 49 : 0) + discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'BENATO20') {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon. Try 'BENATO20' for ₹150 off!");
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: Order = {
        id: `BEN-${Math.floor(10000 + Math.random() * 90000)}`,
        date: 'Today, Just Now',
        status: 'confirmed',
        etaMinutes: selectedSlot === 'express' ? 20 : 60,
        coldTemp: '3.8°C',
        tamperSeal: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
        items: [...cartItems],
        itemTotal,
        discount,
        deliveryFee,
        insulationFee,
        tip: tipAmount,
        total: finalTotal,
        paymentMethod:
          paymentMode === 'upi'
            ? 'UPI Transfer (Google Pay)'
            : paymentMode === 'card'
            ? 'Credit Card'
            : paymentMode === 'netbanking'
            ? 'Net Banking'
            : 'Pay on Delivery (Doorstep UPI)',
        paymentRef: `UPI/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${new Date().getDate()}/${Math.floor(100000000 + Math.random() * 900000000)}`,
        deliverySlot:
          selectedSlot === 'express'
            ? 'Express Cold-Van (~20 Minutes)'
            : selectedSlot === 'evening'
            ? 'Scheduled Evening (6:00 PM - 8:00 PM)'
            : 'Sunrise Harvest (Tomorrow 6:30 AM - 8:00 AM)',
        rider: {
          name: 'Ramesh Kumar',
          rating: 4.98,
          deliveries: 2842,
          phone: '+91 98450 49102',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpz4UxgFQcnYpNVJNYzX76_P2UGNns8ph57Ex1etAW7WWpSTObJsMYkoLxgpgoKnjDrSUCk9bIizn_Le-bkVtQw7wmW4g3OK44stxyppL89GC8HAwk6AAvVohiij0flSUSr9J8WQMhkvEIMsF6_BgvSBryQBHWbmA00fm1azrdJxjcBOsHEi2v5Rj_gzWrE4SZWocGUVX4L8yuyZEiT-yhKdGa2cHkRE2vAkYf2lL9dLckiT6T0Plh',
          vehicle: 'Electric EV-45',
          speed: '24 km/h',
          battery: '88%'
        },
        address: {
          title: activeAddress.title,
          zone: activeAddress.corridor,
          line1: activeAddress.line1,
          line2: activeAddress.line2,
          cityPin: activeAddress.city,
          contact: '+91 98450 11920',
          note: 'Leave insulated harvest cooler outside door, ring bell once.'
        }
      };

      onPlaceOrder(newOrder);
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-margin-sm md:px-margin py-space-xl text-center flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-4xl">shopping_basket</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-primary font-bold">Your Harvest Basket is Empty</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1 mb-6">
          Fresh produce harvested this dawn is ready in the cold hubs. Explore heirloom greens, native fruits, and stoneground flours.
        </p>
        <button
          onClick={onBackToShop}
          className="px-8 py-3 rounded-full bg-primary text-on-primary font-label-md font-bold hover:bg-primary-container transition-colors shadow-md"
        >
          Explore Morning Harvest
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* 1. Header Banner & Stepper */}
      <div className="relative w-full bg-primary-container text-on-primary overflow-hidden pb-space-xl">
        <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full bg-secondary-fixed/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin pt-space-md">
          {/* Stepper Progress Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg">
            <div>
              <span className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container/20 text-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
                <span className="material-symbols-outlined text-[14px]">ac_unit</span>
                Precision Cold-Chain Logged
              </span>
              <p className="font-headline-lg text-headline-lg text-surface-bright tracking-tight font-bold">
                Express Farm Checkout
              </p>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center gap-space-sm bg-primary/60 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-sm">
              <div className="flex items-center gap-space-xs text-secondary-fixed">
                <span className="w-6 h-6 rounded-full bg-secondary-fixed text-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                  1
                </span>
                <span className="font-label-md text-label-md">Basket</span>
              </div>
              <span className="w-6 h-0.5 bg-secondary-fixed/40"></span>
              <div className="flex items-center gap-space-xs text-surface-bright">
                <span className="w-6 h-6 rounded-full bg-secondary text-surface-bright flex items-center justify-center font-label-sm text-label-sm font-bold ring-2 ring-secondary-fixed">
                  2
                </span>
                <span className="font-label-md text-label-md font-bold">Slot &amp; Address</span>
              </div>
              <span className="w-6 h-0.5 bg-surface-container-high/30"></span>
              <div className="flex items-center gap-space-xs text-on-primary-container">
                <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm text-label-sm font-bold">
                  3
                </span>
                <span className="font-label-md text-label-md">Pay</span>
              </div>
            </div>
          </div>

          {/* Free Delivery Milestone Bar */}
          <div className="w-full bg-primary/80 backdrop-blur rounded-xl p-space-md shadow-sm">
            <div className="flex items-center justify-between gap-space-sm mb-space-xs font-label-md text-label-md">
              <div className="flex items-center gap-space-xs text-secondary-fixed">
                <span className="material-symbols-outlined text-[20px]">electric_bolt</span>
                <span className="font-bold text-surface-bright">
                  {itemTotal >= 299 ? 'Unlocked Free 20-Min Cold-Van Delivery!' : `Add ₹${299 - itemTotal} more for FREE 20-Min Delivery!`}
                </span>
                <span className="text-secondary-fixed-dim text-body-sm">(Basket &gt; ₹299)</span>
              </div>
              <span className="text-surface-bright font-bold">
                {itemTotal >= 299 ? `₹${itemTotal} saved ₹49 on delivery` : `₹${itemTotal} of ₹299`}
              </span>
            </div>
            <div className="w-full h-2.5 bg-primary-container rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary-fixed-dim via-secondary-fixed to-secondary-container rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (itemTotal / 299) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider */}
        <div className="w-full overflow-hidden leading-none mt-space-md">
          <svg className="relative block w-full h-8 text-surface" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,0 C150,90 400,120 600,60 C800,0 1050,80 1200,30 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* 2. Main Checkout Workspace */}
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin py-space-xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Destination Address Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <div className="flex items-start justify-between gap-space-sm mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">home_pin</span>
                  </span>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Delivering to {activeAddress.title}
                    </p>
                    <p className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                      {activeAddress.corridor}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAddressModalOpen(true)}
                  className="px-space-md py-space-xs rounded-full bg-surface-container-low text-primary font-label-md text-label-md hover:bg-surface-container transition-colors"
                >
                  Change
                </button>
              </div>

              <div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-md">
                <span className="material-symbols-outlined text-outline mt-0.5">apartment</span>
                <div className="flex-1">
                  <p className="font-headline-sm text-body-md font-bold text-on-surface">
                    {activeAddress.line1}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {activeAddress.line2} • {activeAddress.city}
                  </p>
                  <p className="font-label-sm text-label-sm text-outline mt-space-xs">
                    Contact: +91 98450 11920 • Doorbell: Silent Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Speed & Slot Selection */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="w-8 h-8 rounded-full bg-primary-container text-secondary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">electric_moped</span>
                  </span>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Cold-Chain Dispatch Mode
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Active refrigerated temperature control at &lt; 4°C
                    </p>
                  </div>
                </div>
                <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  Thermal Vaulted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                {/* Express Slot */}
                <label
                  onClick={() => setSelectedSlot('express')}
                  className={`relative flex flex-col p-space-md rounded-xl cursor-pointer transition-all group ${
                    selectedSlot === 'express'
                      ? 'bg-surface-container-low ring-2 ring-secondary'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <input type="radio" name="slot" checked={selectedSlot === 'express'} readOnly className="sr-only" />
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="inline-flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-bold">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                      LIVE NOW
                    </span>
                    <span className={`material-symbols-outlined text-[20px] ${selectedSlot === 'express' ? 'text-secondary' : 'text-outline-variant'}`}>
                      {selectedSlot === 'express' ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <p className="font-headline-sm text-body-md font-bold text-on-surface">Express Cold-Van</p>
                  <p className="font-body-sm text-body-sm text-secondary font-semibold mt-space-xs">~20 Minutes</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Direct from Domlur Solar Hub</p>
                </label>

                {/* Evening Slot */}
                <label
                  onClick={() => setSelectedSlot('evening')}
                  className={`relative flex flex-col p-space-md rounded-xl cursor-pointer transition-all group ${
                    selectedSlot === 'evening'
                      ? 'bg-surface-container-low ring-2 ring-secondary'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <input type="radio" name="slot" checked={selectedSlot === 'evening'} readOnly className="sr-only" />
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="text-on-surface-variant font-label-sm text-label-sm">Today</span>
                    <span className={`material-symbols-outlined text-[20px] ${selectedSlot === 'evening' ? 'text-secondary' : 'text-outline-variant'}`}>
                      {selectedSlot === 'evening' ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <p className="font-headline-sm text-body-md font-bold text-on-surface">Scheduled Evening</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-semibold mt-space-xs">6:00 PM - 8:00 PM</p>
                  <p className="font-label-sm text-label-sm text-outline mt-1">After-work drop-off</p>
                </label>

                {/* Sunrise Slot */}
                <label
                  onClick={() => setSelectedSlot('morning')}
                  className={`relative flex flex-col p-space-md rounded-xl cursor-pointer transition-all group ${
                    selectedSlot === 'morning'
                      ? 'bg-surface-container-low ring-2 ring-secondary'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <input type="radio" name="slot" checked={selectedSlot === 'morning'} readOnly className="sr-only" />
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="text-secondary font-label-sm text-label-sm">Tomorrow</span>
                    <span className={`material-symbols-outlined text-[20px] ${selectedSlot === 'morning' ? 'text-secondary' : 'text-outline-variant'}`}>
                      {selectedSlot === 'morning' ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <p className="font-headline-sm text-body-md font-bold text-on-surface">Sunrise Harvest</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-semibold mt-space-xs">6:30 AM - 8:00 AM</p>
                  <p className="font-label-sm text-label-sm text-outline mt-1">Plucked at 4:00 AM</p>
                </label>
              </div>
            </div>

            {/* Basket Itemization */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Review Harvest Basket
                  </span>
                  <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <button
                  onClick={onBackToShop}
                  className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-0.5"
                >
                  <span>Add more produce</span>
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>

              <div className="flex flex-col gap-space-md">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-sm rounded-lg hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-space-md">
                      <img
                        className="w-16 h-16 rounded-lg object-cover shadow-sm shrink-0"
                        alt={item.product.name}
                        src={item.product.image}
                      />
                      <div>
                        <div className="flex items-center gap-space-xs flex-wrap">
                          {item.product.badge && (
                            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                              {item.product.badge}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-0.5 px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                            <span className="material-symbols-outlined text-[12px] text-secondary">ac_unit</span>
                            Insulated Vault
                          </span>
                        </div>
                        <p className="font-headline-sm text-body-md font-bold text-on-surface mt-1">
                          {item.product.name}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {item.selectedPackName || item.product.weight}
                          {item.selectedRipeness ? ` • ${item.selectedRipeness}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-space-lg">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-surface-container rounded-full px-2 py-1 gap-space-sm font-label-md text-label-md">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              onRemoveItem(item.product.id);
                            } else {
                              onUpdateCartQty(item.product.id, -1);
                            }
                          }}
                          className="w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span className="font-bold px-1 text-on-surface">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateCartQty(item.product.id, 1)}
                          className="w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <p className="font-headline-sm text-body-md font-bold text-on-surface">
                          ₹{item.unitPrice * item.quantity}
                        </p>
                        {item.product.originalPrice > item.unitPrice && (
                          <p className="font-label-sm text-label-sm text-outline line-through">
                            ₹{item.product.originalPrice * item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eco-Packaging & Partner Care */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              {/* Returnable Starch Cold Bags */}
              <div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[22px]">recycling</span>
                  <div>
                    <p className="font-headline-sm text-body-md font-bold text-on-surface">
                      Returnable Starch Cold Bags
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Leave your previous delivery bags at the doorstep for EV rider pickup.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={ecoPackaging}
                    onChange={(e) => setEcoPackaging(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>

              {/* Rider Tip */}
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-headline-sm text-body-md font-bold text-on-surface flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-secondary">volunteer_activism</span>
                    Tip your Electric Vehicle delivery partner
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">100% goes to driver</span>
                </div>
                <div className="grid grid-cols-4 gap-space-xs pt-space-xs">
                  {[20, 30, 50].map((tipVal) => (
                    <button
                      key={tipVal}
                      type="button"
                      onClick={() => setSelectedTip(tipVal)}
                      className={`py-space-xs px-space-sm rounded-full font-label-md text-label-md text-center transition-colors ${
                        selectedTip === tipVal
                          ? 'bg-secondary text-on-secondary shadow-sm font-bold'
                          : 'bg-surface-container text-on-surface hover:bg-secondary-container'
                      }`}
                    >
                      ₹{tipVal}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const amount = prompt('Enter custom tip in ₹ (e.g. 75):', '75');
                      if (amount && !isNaN(Number(amount))) {
                        setCustomTip(amount);
                        setSelectedTip(-1);
                      }
                    }}
                    className={`py-space-xs px-space-sm rounded-full font-label-md text-label-md text-center transition-colors ${
                      selectedTip === -1
                        ? 'bg-secondary text-on-secondary shadow-sm font-bold'
                        : 'bg-surface-container text-on-surface hover:bg-secondary-container'
                    }`}
                  >
                    {selectedTip === -1 && customTip ? `₹${customTip}` : 'Custom'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Coupon Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
              <label className="font-headline-sm text-body-md font-bold text-on-surface block mb-space-xs">
                Harvest Coupon Code
              </label>
              <form onSubmit={handleApplyCoupon} className="flex items-center gap-space-xs">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[20px]">
                    loyalty
                  </span>
                  <input
                    className="w-full bg-surface-container-low pl-10 pr-space-md py-space-xs rounded-full font-label-md text-label-md text-primary font-bold tracking-wide focus:outline-none"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                  />
                </div>
                <button
                  type="submit"
                  className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-colors ${
                    couponApplied
                      ? 'bg-primary-container text-secondary-fixed font-bold'
                      : 'bg-primary text-on-primary hover:bg-primary-container'
                  }`}
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </form>

              {couponApplied && (
                <div className="mt-space-sm p-space-xs px-space-sm rounded-lg bg-secondary-container/30 flex items-center justify-between text-secondary">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      ₹150 seasonal discount applied
                    </span>
                  </div>
                  <button 
                    onClick={() => setCouponApplied(false)}
                    className="material-symbols-outlined text-[16px] text-outline hover:text-on-surface"
                  >
                    close
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <p className="font-headline-sm text-headline-sm text-on-surface mb-space-md font-bold">
                Select Payment Mode
              </p>
              <div className="flex flex-col gap-space-xs">
                {/* Instant UPI */}
                <label
                  onClick={() => setPaymentMode('upi')}
                  className={`flex items-center justify-between p-space-md rounded-xl cursor-pointer transition-all ${
                    paymentMode === 'upi'
                      ? 'bg-surface-container-low ring-2 ring-secondary'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <input type="radio" name="pay" checked={paymentMode === 'upi'} readOnly className="sr-only" />
                    <div className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-space-xs">
                        <p className="font-headline-sm text-body-md font-bold text-on-surface">Instant UPI</p>
                        <span className="px-space-xs py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                          Faster
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Google Pay, PhonePe, Paytm, Cred
                      </p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-[22px] ${paymentMode === 'upi' ? 'text-secondary' : 'text-outline-variant'}`}>
                    {paymentMode === 'upi' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </label>

                {/* Cards */}
                <label
                  onClick={() => setPaymentMode('card')}
                  className={`flex items-center justify-between p-space-md rounded-xl cursor-pointer transition-all ${
                    paymentMode === 'card'
                      ? 'bg-surface-container-low ring-2 ring-secondary'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <input type="radio" name="pay" checked={paymentMode === 'card'} readOnly className="sr-only" />
                    <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface">
                      <span className="material-symbols-outlined text-[20px]">credit_card</span>
                    </div>
                    <div>
                      <p className="font-headline-sm text-body-md font-bold text-on-surface">Credit / Debit Cards</p>
                      <p className="font-body-sm text-body-sm text-outline">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-[22px] ${paymentMode === 'card' ? 'text-secondary' : 'text-outline-variant'}`}>
                    {paymentMode === 'card' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </label>

                {/* Net Banking */}
                <label
                  onClick={() => setPaymentMode('netbanking')}
                  className={`flex items-center justify-between p-space-md rounded-xl cursor-pointer transition-all ${
                    paymentMode === 'netbanking'
                      ? 'bg-surface-container-low ring-2 ring-secondary'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <input type="radio" name="pay" checked={paymentMode === 'netbanking'} readOnly className="sr-only" />
                    <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface">
                      <span className="material-symbols-outlined text-[20px]">account_balance</span>
                    </div>
                    <div>
                      <p className="font-headline-sm text-body-md font-bold text-on-surface">Net Banking</p>
                      <p className="font-body-sm text-body-sm text-outline">All Indian Scheduled Banks</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-[22px] ${paymentMode === 'netbanking' ? 'text-secondary' : 'text-outline-variant'}`}>
                    {paymentMode === 'netbanking' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </label>

                {/* Pay on Delivery */}
                <label
                  onClick={() => setPaymentMode('cod')}
                  className={`flex items-center justify-between p-space-md rounded-xl cursor-pointer transition-all ${
                    paymentMode === 'cod'
                      ? 'bg-surface-container-low ring-2 ring-secondary'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <input type="radio" name="pay" checked={paymentMode === 'cod'} readOnly className="sr-only" />
                    <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface">
                      <span className="material-symbols-outlined text-[20px]">payments</span>
                    </div>
                    <div>
                      <p className="font-headline-sm text-body-md font-bold text-on-surface">Pay on Delivery</p>
                      <p className="font-body-sm text-body-sm text-outline">UPI or Cash at doorstep</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-[22px] ${paymentMode === 'cod' ? 'text-secondary' : 'text-outline-variant'}`}>
                    {paymentMode === 'cod' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </label>
              </div>
            </div>

            {/* Bill Details Summary Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <p className="font-headline-sm text-headline-sm text-on-surface mb-space-md font-bold">
                Bill Breakdown
              </p>
              <div className="flex flex-col gap-space-xs font-body-sm text-body-sm pb-space-md">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Item Total ({cartItems.length} products)</span>
                  <span className="text-on-surface font-semibold">₹{itemTotal}</span>
                </div>

                {couponApplied && discount > 0 && (
                  <div className="flex items-center justify-between text-secondary">
                    <span className="flex items-center gap-1">
                      Harvest Promo ({couponCode})
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                    </span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span>Cold-Chain Express Delivery</span>
                    <span className="material-symbols-outlined text-[14px] text-outline" title="Refrigerated electric van transit">
                      info
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    {deliveryFee === 0 ? (
                      <>
                        <span className="line-through text-outline font-label-sm text-label-sm">₹49</span>
                        <span className="text-secondary font-bold font-label-sm text-label-sm">FREE</span>
                      </>
                    ) : (
                      <span className="text-primary font-semibold">₹49</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Returnable Cold-Vault Insulation</span>
                  <span className="text-on-surface font-semibold">₹{insulationFee}</span>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>EV Rider Environmental Tip</span>
                  <span className="text-on-surface font-semibold">₹{tipAmount}</span>
                </div>
              </div>

              {/* Total Due */}
              <div className="pt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg pb-space-lg rounded-b-xl">
                <div className="flex items-baseline justify-between mb-space-md">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Total Amount
                    </p>
                    <p className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                      ₹{finalTotal}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-0.5 px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                      Saved ₹{totalSaved} today
                    </span>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-space-lg rounded-full bg-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-space-sm hover:bg-primary shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined text-[22px] animate-spin">sync</span>
                      <span>Dispatching Cold Van...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ₹{finalTotal} • Place Order</span>
                      <span className="material-symbols-outlined text-[22px] text-secondary-fixed">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-space-lg pt-space-md text-outline font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                    256-Bit SSL Encrypted
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">spa</span>
                    100% Crisp Fresh Guarantee
                  </span>
                </div>
              </div>
            </div>

            {/* Zero-Spoilage Pledge */}
            <div className="p-space-md rounded-xl bg-gradient-to-br from-surface-container-low to-secondary-container/20 flex items-center gap-space-md shadow-xs">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 text-secondary">
                <span className="material-symbols-outlined text-[24px]">thermostat</span>
              </div>
              <div>
                <p className="font-headline-sm text-body-md font-bold text-on-surface">
                  The Benato Zero-Spoilage Pledge
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  If any item arrives outside strict temperature thresholds, receive an instant refund without return hassle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Selection Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-space-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h3 className="font-headline-sm text-primary font-bold">Select Delivery Address</h3>
              <button onClick={() => setAddressModalOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 my-4">
              {SAVED_LOCATIONS.map((loc, idx) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    setSelectedAddressIndex(idx);
                    setAddressModalOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                    selectedAddressIndex === idx
                      ? 'border-secondary bg-surface-container-low ring-1 ring-secondary'
                      : 'border-surface-container hover:bg-surface-container-low'
                  }`}
                >
                  <span className="material-symbols-outlined text-secondary mt-0.5">{loc.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-primary font-bold">{loc.title}</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                        {loc.corridor}
                      </span>
                    </div>
                    <p className="font-body-sm text-on-surface mt-0.5">{loc.line1}</p>
                    <p className="font-body-sm text-on-surface-variant text-[12px]">{loc.line2}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                alert("Add new address: Address forms with GPS corridor verification available in account settings!");
                setAddressModalOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-surface-container text-primary font-label-md font-bold hover:bg-secondary-container transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
              <span>Add New Address</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
