import React, { useState, useEffect } from 'react';
import { Order } from '../types';

interface LiveTrackingViewProps {
  order: Order;
  onCallDriver: () => void;
  onChatDriver: () => void;
  onOpenInvoice: () => void;
  onBackToShop: () => void;
}

export const LiveTrackingView: React.FC<LiveTrackingViewProps> = ({
  order,
  onCallDriver,
  onChatDriver,
  onOpenInvoice,
  onBackToShop
}) => {
  const [minutes, setMinutes] = useState(14);
  const [selectedRecipe, setSelectedRecipe] = useState<{
    title: string;
    time: string;
    type: string;
    instructions: string[];
  } | null>(null);
  const [deliveryNote, setDeliveryNote] = useState(
    'Ring bell once, leave in insulated Benato thermal cooler box outside 4B.'
  );
  const [editNoteModal, setEditNoteModal] = useState(false);
  const [tempNote, setTempNote] = useState(deliveryNote);

  // Live countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes((prev) => (prev > 3 ? prev - 1 : 3));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const recipes = [
    {
      title: 'Charred Heirloom Carpaccio',
      time: '12 Mins • Easy',
      type: 'Quick Plate',
      desc: 'Thin sliced chilled tomatoes with sea salt, torn fresh basil, and crushed peppercorns.',
      instructions: [
        'Slice the cold Heirloom Tomatoes into paper-thin 2mm rounds using a serrated blade.',
        'Arrange radially over a chilled ceramic platter.',
        'Scatter hand-torn Genovese Basil leaves over the pulp.',
        'Drizzle 1 tbsp cold-pressed oil, flaky sea salt, and coarse cracked black peppercorns.',
        'Serve immediately to enjoy the crisp cellar chill.'
      ]
    },
    {
      title: 'Rustic Basil Butter Toast',
      time: '15 Mins • Warm',
      type: 'Comfort Snack',
      desc: 'Sourdough crisp browned in A2 cultured butter with flash-wilted basil leaves.',
      instructions: [
        'Melt 1 generous tablespoon of A2 Cultured Table Butter in a warm iron skillet.',
        'Toast thick-cut country bread until deep golden amber on both sides.',
        'Drop fresh basil leaves directly into the foaming residual butter for 10 seconds.',
        'Spoon the fragrant melted herbal butter over the bread and dust with smoked salt.'
      ]
    },
    {
      title: 'Room-Temp Ripening Guidelines',
      time: 'Storage Wisdom',
      type: 'Produce Care',
      desc: 'Never chill heritage tomatoes post-delivery; keep at ambient kitchen room for peak aromatics.',
      instructions: [
        'Refrigerating heirloom tomatoes below 10°C permanently arrests aroma enzyme activity.',
        'Keep stems facing downward on a cool wooden shelf out of direct sunlight.',
        'Wash only right before slicing to prevent moisture entrapment around the calyx stem.',
        'Enjoy within 3 to 4 days for optimal juice tension.'
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* 1. Live Ambient Notification Strip */}
      <section className="w-full bg-surface-container-low py-space-sm px-margin-sm md:px-margin border-b border-surface-container/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                Arriving in <span className="text-secondary font-bold">{minutes}</span> Mins
              </span>
              <span className="hidden sm:inline font-body-sm text-body-sm text-on-surface-variant">
                • Live Cold-Chain Verified Delivery
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px] text-secondary">ac_unit</span>
              <span>
                Pod Sensor Active: <strong className="text-primary font-bold">{order.coldTemp || '3.8°C'}</strong>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px]">verified_user</span>
              <span>Seal #{order.tamperSeal || 'TK-9921'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hero Header Banner */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-primary-container via-primary-container to-primary text-on-primary pt-space-lg pb-space-xl">
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none text-surface">
          <svg className="w-full h-8 md:h-14 block" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 80">
            <path d="M0,32 C320,72 520,10 720,42 C940,74 1180,18 1440,50 L1440,80 L0,80 Z" fill="currentColor"></path>
          </svg>
        </div>

        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin relative z-0 flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md pb-space-sm">
          <div className="flex flex-col gap-space-xs max-w-xl">
            <div className="flex items-center gap-space-xs text-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">electric_moped</span>
              <span>Indiranagar Micro-Hub → Customer Doorstep</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-surface-bright tracking-tight font-bold">
              Active Cold-Chain Dispatch
            </h1>
            <p className="font-body-md text-body-md text-on-primary-container">
              Harvested this morning at Doddaballapura Eco-Farm. Sealed in cryogenic climate pods at 3.8°C for crisp garden freshness.
            </p>
          </div>

          <div className="flex items-center gap-space-sm bg-primary/60 backdrop-blur-md rounded-2xl p-space-sm shadow-sm">
            <div className="text-right">
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Order Reference</div>
              <div className="font-headline-sm text-headline-sm text-surface-bright tracking-tight font-bold">
                #{order.id}-BLR
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Two-Column Master Control Surface */}
      <section className="max-w-7xl mx-auto w-full px-margin-sm md:px-margin -mt-4 relative z-20 pb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column (7 cols): Map & Telemetry & Driver */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Map & Telemetry Frame */}
            <div className="w-full bg-surface-container-lowest rounded-3xl overflow-hidden shadow-md">
              {/* Telemetry Bar */}
              <div className="bg-surface-container-low px-space-md py-space-sm flex flex-wrap items-center justify-between gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[18px]">near_me</span>
                  <span className="font-label-md text-label-md text-primary font-bold">
                    Ramesh is 1.4 km away
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">100% Electric EV-45</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Battery: <strong className="text-secondary font-bold">88%</strong>
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Speed: <strong className="text-primary font-bold">24 km/h</strong>
                  </span>
                </div>
              </div>

              {/* Interactive Live Map Canvas */}
              <div className="relative w-full h-[400px] md:h-[460px] bg-surface-container overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSzVhiU960bYKitJ-bkjMLlyKouMFbnMTUJ5nLliIAOG65WTgUODKGMyGpPmrwk0VfNIzO1Y0Bysg9CGDQbeVIBwQauRTsYqYcpGKT41LU-LjQGNw7VLPLVSS3JmiyonbDLHZ9NJqt04C1q_KdPCAEmzIsy124tLtU8aiDh0cngHHDKzNZQ9-Py385kqUSyfO7o8nVyZ23kMLOVt9j1GS-VIP0AFlGBoYNhDoj8xp3MM-Z8KWjqdXP')`
                  }}
                ></div>

                {/* SVG Route Overlay with glow */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 700 460">
                  <path
                    className="text-secondary-fixed-dim"
                    d="M 120 360 C 200 320, 240 240, 360 210 S 520 180, 560 110"
                    opacity="0.8"
                    stroke="currentColor"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                    strokeWidth="8"
                  ></path>
                  <path
                    className="text-secondary"
                    d="M 120 360 C 200 320, 240 240, 360 210 S 520 180, 560 110"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                  ></path>
                </svg>

                {/* Origin Marker: Indiranagar Hub */}
                <div className="absolute bottom-16 left-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="px-space-xs py-0.5 rounded-full bg-primary text-surface-bright font-label-sm text-label-sm shadow-md mb-1 whitespace-nowrap font-bold">
                    Cold Hub #04
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-container text-secondary-fixed flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-[16px]">warehouse</span>
                  </div>
                </div>

                {/* Live Courier EV Pulse Marker */}
                <div className="absolute top-[200px] left-[350px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <div className="px-space-sm py-space-xs rounded-xl bg-primary text-on-primary shadow-xl mb-2 flex items-center gap-space-xs animate-bounce">
                    <span className="material-symbols-outlined text-secondary-fixed text-[14px]">bolt</span>
                    <span className="font-label-sm text-label-sm whitespace-nowrap font-bold">
                      Ramesh is 1.4 km away
                    </span>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-secondary opacity-40"></span>
                    <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xl">
                      <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
                    </div>
                  </div>
                </div>

                {/* Destination Marker: Doorstep */}
                <div className="absolute top-20 right-28 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="px-space-xs py-0.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-md mb-1 whitespace-nowrap font-bold">
                    Your Doorstep
                  </div>
                  <div className="w-9 h-9 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-[18px]">home</span>
                  </div>
                </div>

                {/* Floating Pod Telemetry Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-space-sm shadow-lg flex flex-wrap items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">thermostat</span>
                    </div>
                    <div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">Cold-Vault Chamber</div>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">3.8°C</span>
                        <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                          Optimal Chill
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div className="hidden sm:flex flex-col items-end">
                    <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Last 30 min stability</div>
                    <svg className="w-32 h-6 overflow-visible" fill="none" viewBox="0 0 120 24">
                      <path
                        className="text-secondary"
                        d="M0,14 Q20,12 40,15 T80,13 T120,14"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                      ></path>
                      <circle className="text-secondary fill-current" cx="120" cy="14" r="3"></circle>
                    </svg>
                  </div>

                  <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-xl">
                    <span className="material-symbols-outlined text-outline text-[16px]">qr_code_2</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Tamper Seal: <strong className="text-primary font-bold">#{order.tamperSeal || 'TK-9921'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Driver Ribbon */}
              <div className="p-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md bg-surface-container-lowest">
                <div className="flex items-center gap-space-md">
                  <div className="relative">
                    <img
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                      alt={order.rider.name}
                      src={order.rider.image}
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px]">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-xs">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        {order.rider.name}
                      </span>
                      <span className="px-space-xs py-0.5 rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-bold">
                        ★ {order.rider.rating}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Trained Cold-Chain Courier • {order.rider.deliveries}+ fresh drops
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs w-full md:w-auto">
                  <button
                    onClick={onCallDriver}
                    className="flex-1 md:flex-none flex items-center justify-center gap-space-xs bg-primary text-on-primary px-space-md py-space-xs rounded-full font-label-md text-label-md hover:bg-primary-container transition-all shadow-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span>Call Ramesh</span>
                  </button>
                  <button
                    onClick={onChatDriver}
                    className="flex-1 md:flex-none flex items-center justify-center gap-space-xs bg-surface-container-low text-primary px-space-md py-space-xs rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-all font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Chat</span>
                  </button>
                </div>
              </div>

              {/* Delivery Note */}
              <div className="bg-surface-container-low/70 px-space-md py-space-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border-t border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px]">door_front</span>
                  <div>
                    <div className="font-label-md text-label-md text-primary font-bold">
                      Delivery Instructions: Contactless Doorstep
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      {deliveryNote}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTempNote(deliveryNote);
                    setEditNoteModal(true);
                  }}
                  className="text-secondary font-label-sm text-label-sm hover:underline shrink-0 font-bold"
                >
                  Edit Note
                </button>
              </div>
            </div>

            {/* Harvest Assistant Culinary Suggestions */}
            <div className="w-full bg-gradient-to-br from-surface-container-low via-surface-container-low to-secondary-container/20 rounded-3xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[22px]">auto_awesome</span>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                    Benato Harvest Assistant • While You Wait
                  </h2>
                </div>
                <span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  Curated For This Basket
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Based on your Heirloom Kumato Tomatoes, Hydroponic Basil, and Malnad Butter, our chef algorithm curated 3 quick 15-minute ideas:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                {recipes.map((recipe, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-container-lowest rounded-2xl p-space-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wide font-bold">
                        {recipe.time}
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary text-[15px] leading-tight font-bold">
                        {recipe.title}
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] line-clamp-2">
                        {recipe.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="mt-space-sm flex items-center justify-between text-secondary font-label-sm text-label-sm pt-space-xs font-bold hover:underline"
                    >
                      <span>{recipe.type === 'Produce Care' ? 'Read Notes' : 'View Recipe'}</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Milestones & Basket Summary */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Timeline Card */}
            <div className="w-full bg-surface-container-lowest rounded-3xl p-space-lg shadow-md">
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Precision Progress
                  </span>
                  <h2 className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
                    Order Milestones
                  </h2>
                </div>
                <span className="px-space-sm py-space-xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  Stage 3 of 4
                </span>
              </div>

              {/* Vertical Timeline Track */}
              <div className="relative pl-6 space-y-space-md">
                <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-surface-container-highest"></div>
                <div className="absolute left-2.5 top-3 h-[68%] w-0.5 bg-secondary"></div>

                {/* Milestone 1 */}
                <div className="relative flex items-start gap-space-sm">
                  <div className="absolute -left-6 mt-1 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-md text-label-md text-primary font-bold">
                        Harvest Order Placed
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">04:08 PM</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Allocated to Doddaballapura Eco-Farm &amp; Indiranagar Solar Pod.
                    </p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="relative flex items-start gap-space-sm">
                  <div className="absolute -left-6 mt-1 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-md text-label-md text-primary font-bold">
                        Cold-Chain Insulated Packing
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">04:12 PM</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Quality verified, placed in compostable plant-starch trays &amp; sealed.
                    </p>
                  </div>
                </div>

                {/* Milestone 3: Active In Transit */}
                <div className="relative flex items-start gap-space-sm">
                  <div className="absolute -left-6 mt-1 w-5 h-5 rounded-full bg-surface-container-lowest ring-4 ring-secondary text-secondary flex items-center justify-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  </div>
                  <div className="flex-1 bg-surface-container-low p-space-sm rounded-2xl">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-md text-label-md text-secondary font-bold flex items-center gap-1">
                        <span>Express Cold EV In Transit</span>
                        <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span>
                      </h3>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">04:18 PM</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Departed Indiranagar Micro-Hub. Ramesh navigating 100ft Road corridor.
                    </p>
                  </div>
                </div>

                {/* Milestone 4: Pending Doorstep */}
                <div className="relative flex items-start gap-space-sm opacity-60">
                  <div className="absolute -left-6 mt-1 w-5 h-5 rounded-full bg-surface-container-high text-outline flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-md text-label-md text-on-surface font-bold">
                        Estimated Doorstep Drop
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">04:32 PM</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Digital signature &amp; fresh produce seal verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-Time Basket Recap Card */}
            <div className="w-full bg-surface-container-lowest rounded-3xl p-space-lg shadow-md flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Current Consignment
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                    Basket Summary ({order.items.length} Items)
                  </h2>
                </div>
                <button
                  onClick={onOpenInvoice}
                  className="font-label-sm text-label-sm text-secondary hover:underline font-bold"
                >
                  Download Invoice
                </button>
              </div>

              {/* Items */}
              <div className="space-y-space-xs divide-y divide-surface-container">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-space-sm py-2">
                    <div className="flex items-center gap-space-sm">
                      <img
                        className="w-12 h-12 rounded-xl object-cover bg-surface-container-low shrink-0"
                        alt={item.product.name}
                        src={item.product.image}
                      />
                      <div>
                        <h4 className="font-label-md text-label-md text-primary leading-tight font-bold">
                          {item.product.name}
                        </h4>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {item.selectedPackName || item.product.weight} • {item.product.farm.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-sm text-headline-sm text-primary text-[15px] font-bold">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="bg-surface-container-low rounded-2xl p-space-md space-y-space-xs">
                <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Harvest Subtotal</span>
                  <span className="text-primary font-medium">₹{order.itemTotal}</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Active Cold-Chain Handling (Insulated Pod)</span>
                  <span className="text-secondary font-bold">FREE</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Compostable Thermal Pouch Deposit</span>
                  <span className="text-primary font-medium">₹0 (Reclaimed upon return)</span>
                </div>
                <div className="pt-space-xs flex items-center justify-between font-headline-sm text-headline-sm text-primary font-bold">
                  <span>Paid via UPI AutoPay</span>
                  <span className="text-secondary font-bold">₹{order.total}</span>
                </div>
              </div>

              {/* Return & Reclaim Box Reminder */}
              <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-secondary-container/40 text-on-secondary-container">
                <span className="material-symbols-outlined text-[20px] text-secondary">recycling</span>
                <span className="font-body-sm text-body-sm leading-snug">
                  Hand back the Benato Thermal Insulated Cooler Box to Ramesh on arrival to receive ₹15 Benato Soil Credits.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div>
                <span className="font-label-sm text-secondary font-bold uppercase">{selectedRecipe.time}</span>
                <h3 className="font-headline-md text-primary font-bold">{selectedRecipe.title}</h3>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-body-md text-on-surface-variant my-4">{selectedRecipe.desc}</p>

            <h4 className="font-label-md text-primary font-bold uppercase mb-2">Step-by-Step Method</h4>
            <ol className="list-decimal pl-5 space-y-2 font-body-sm text-on-surface">
              {selectedRecipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-6 w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md font-bold"
            >
              Got it, Chef!
            </button>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {editNoteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-space-lg shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h3 className="font-headline-sm text-primary font-bold">Edit Delivery Instructions</h3>
              <button onClick={() => setEditNoteModal(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <textarea
              rows={3}
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              className="w-full bg-surface-container-low rounded-xl p-3 font-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/50 my-4"
            ></textarea>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setEditNoteModal(false)}
                className="px-4 py-2 rounded-full text-on-surface-variant font-label-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDeliveryNote(tempNote);
                  setEditNoteModal(false);
                }}
                className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-md font-bold"
              >
                Save Instructions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
