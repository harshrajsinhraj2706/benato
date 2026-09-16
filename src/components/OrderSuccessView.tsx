import React from 'react';
import { Order, Product } from '../types';

interface OrderSuccessViewProps {
  order: Order;
  onTrackOrder: () => void;
  onShopMore: () => void;
  onOpenInvoice: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onCallDriver: () => void;
  onChatDriver: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  onTrackOrder,
  onShopMore,
  onOpenInvoice,
  onAddToCart,
  onCallDriver,
  onChatDriver
}) => {
  const tomorrowSuggestions = [
    {
      id: 'sug-avocado',
      name: 'Kodaikanal Hass Avocados',
      subtitle: 'Pack of 2 • Butter-soft',
      price: 140,
      originalPrice: 175,
      weight: 'Pack of 2',
      badge: 'Ripened',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCVEhw6JWAp4_jYsBYdMQIt6AJd4kai-PZhu6K4IrFvwBFIAjYMAoOcVw_HvTljGwHVnFvVtUoR-bwK8ij1XG5B6MTWyjQ-ImpdD5mVzgDWFLaKAcFWUpNxLJ-otZ1tW917ygwMo3501zBX_pxTE8Gu0XlbK3JDDsrGd2UqNPyG30_wNNZ6QTvgpSqdT4g8zJ9WAfWPKWhV3peQy4WmGYOcrSibnhMGhRQuAqJP7f9L80ifA0-X9rE',
      altText: 'Hass avocados',
      rating: 4.9,
      reviewsCount: 310,
      inStock: true,
      category: 'fruits' as const,
      farm: 'Kodaikanal Terrace Estates'
    },
    {
      id: 'sug-sourdough',
      name: 'Wild Yeast Sourdough Boule',
      subtitle: '450g • 36hr Ferment',
      price: 180,
      originalPrice: 220,
      weight: '450g',
      badge: 'Baked 4 AM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx49WV_pndMFNNm03MMIxla808Ilo9OvgU2Gt1cIKNCbk6EevA_qYYWIPNfHroBVbusQPmMmjsjGvVav6BCTzhL3kD0ShDCHE0SAL9siY_5YgYFRPnLccMNQzCMemjzeKj0G6EtIxeZl6g6gDgtYUFwq6yNxquv0PMdQvgJMn9_97ceKNjyKbWCg3TyHDvXt170f99Dni8Er8cTY0mWks1f6Yf0jxBJbeeLD_OIIcff6r1IOjMI58Z',
      altText: 'Artisanal sourdough boule',
      rating: 5.0,
      reviewsCount: 420,
      inStock: true,
      category: 'staples' as const,
      farm: 'Benato Bakehouse'
    },
    {
      id: 'sug-honey',
      name: 'Wild Mustard Flower Honey',
      subtitle: '300g • Coorg Highlands',
      price: 320,
      originalPrice: 380,
      weight: '300g',
      badge: 'Raw Unfiltered',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_qSBBEe-cTrIkIGEtg9Es2sAVVd36knSKgpcTpzfoZ9cX4_lYgJMvzxqWFsM-OZlOk6o6xSXe8r727ZWNBoqtTKDDdJ_CpHRExcGhR4IXObsp0mu26rwEdlKVfy2dukkTBXOUXRhViTpS6Cspb4tMpwG8od_kwAoYqP4fNnDt4m4OM6UTNxaZHqyr_OyXKElDDmRU9VzXHPQv7xElCxAKUiKfFrCJ_WF0Ey4zWfVIuzIGGEPaNce2',
      altText: 'Wild honey jar',
      rating: 4.9,
      reviewsCount: 190,
      inStock: true,
      category: 'staples' as const,
      farm: 'Coorg Tribal Collective'
    },
    {
      id: 'sug-eggs',
      name: 'Golden Yolk Free-Range Eggs',
      subtitle: 'Pack of 6 • Omega-3 Enriched',
      price: 95,
      originalPrice: 115,
      weight: 'Pack of 6',
      badge: 'Pasture Run',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4OI7aRO0Nt3j7n30RRArhV3Nu20so2BlYx5sPrMW0ENL6NNHejzICQAS7_vMoCAi3_KvzGnUSBcTkftXYZskwC8fMXMe9QpsHGXZcfWEUaBHAm-W7Gwirxs0xotjI0dKxilByiLH1oUvq4zvU2o9uj6tpjNu78dJnRsJsIH067Ae0THBhgu1WM5q18C4N3jznxsQ__ZErPojAHp1GgeDhvpcZdVUBKvduzNluv9yMMfEvx1zMnrC_',
      altText: 'Free range brown eggs',
      rating: 4.8,
      reviewsCount: 680,
      inStock: true,
      category: 'dairy' as const,
      farm: 'Mandya Open Run Coop'
    }
  ];

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* 1. Header Banner with animated success ring */}
      <div className="relative overflow-hidden bg-primary-container text-on-primary pt-space-lg pb-space-xl px-margin-sm md:px-margin shadow-md">
        <div className="absolute -right-16 -top-20 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 bottom-0 w-72 h-72 rounded-full bg-secondary-fixed/10 blur-2xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
          <div className="flex items-start gap-space-md">
            <div className="relative shrink-0 mt-1">
              <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-primary shadow-lg shadow-secondary/20">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <span className="absolute -inset-1.5 rounded-full border-2 border-secondary-fixed/40 animate-ping pointer-events-none"></span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-secondary-fixed font-label-sm text-label-sm font-bold">
                  Order Placed
                </span>
                <span className="text-primary-fixed-dim font-label-sm text-label-sm tracking-wide">
                  ID: #{order.id}
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-surface-bright tracking-tight font-bold">
                Harvest Confirmed &amp; Hand-Packed!
              </h1>
              <p className="font-body-md text-body-md text-primary-fixed-dim max-w-xl">
                Delivering via our <span className="text-secondary-fixed font-semibold">100% Zero-Carbon EV Cold-Chain Fleet</span> directly from the Indiranagar Micro-Hub.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs shrink-0">
            <button
              onClick={onTrackOrder}
              className="inline-flex items-center gap-space-xs bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed font-label-md text-label-md px-space-md py-space-sm rounded-full transition-all shadow-sm font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">location_searching</span>
              <span>Track Live Pod</span>
            </button>
            <button
              onClick={onOpenInvoice}
              className="inline-flex items-center gap-space-xs bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-surface-bright font-label-md text-label-md px-space-md py-space-sm rounded-full transition-all backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Invoice (PDF)</span>
            </button>
            <button
              onClick={onShopMore}
              className="inline-flex items-center gap-space-xs text-primary-fixed hover:text-surface-bright font-label-md text-label-md px-space-sm py-space-sm transition-colors"
            >
              <span>Shop More</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-6xl w-full mx-auto px-margin-sm md:px-margin -mt-6 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            {/* Dispatch Status Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-space-xs">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                    Fast Route Dispatch
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                    Arriving in ~{order.etaMinutes || 20} Minutes
                  </h2>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded-full text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[16px]">ac_unit</span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      Pod: {order.coldTemp} Stabilized
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs bg-secondary-fixed/20 px-space-sm py-1 rounded-full text-on-secondary-fixed-variant">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span className="font-label-sm text-label-sm font-bold">Live Stream</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Ribbon */}
              <div className="my-space-md">
                <div className="grid grid-cols-4 relative">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-surface-container-high -z-0">
                    <div className="h-full bg-secondary transition-all duration-700 w-2/3"></div>
                  </div>

                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow">
                      <span className="material-symbols-outlined text-[16px]">done</span>
                    </div>
                    <span className="mt-2 font-label-sm text-label-sm text-primary font-bold">Order Received</span>
                    <span className="font-body-sm text-body-sm text-outline text-[11px]">10:42 AM</span>
                  </div>

                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow">
                      <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                    </div>
                    <span className="mt-2 font-label-sm text-label-sm text-primary font-bold">Chilled &amp; Sealed</span>
                    <span className="font-body-sm text-body-sm text-outline text-[11px]">10:46 AM</span>
                  </div>

                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-primary font-bold flex items-center justify-center shadow ring-4 ring-surface-container-lowest">
                      <span className="material-symbols-outlined text-[18px]">electric_scooter</span>
                    </div>
                    <span className="mt-2 font-label-sm text-label-sm text-secondary font-bold">On The Move</span>
                    <span className="font-body-sm text-body-sm text-secondary text-[11px] font-medium">
                      In Transit (1.8 km)
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center relative z-10 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high text-outline flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">cottage</span>
                    </div>
                    <span className="mt-2 font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Kitchen Ready
                    </span>
                    <span className="font-body-sm text-body-sm text-outline text-[11px]">Est. 11:08 AM</span>
                  </div>
                </div>
              </div>

              {/* Delivery Map Snapshot */}
              <div 
                onClick={onTrackOrder}
                className="rounded-xl overflow-hidden mt-space-md shadow-inner bg-surface-container-low relative cursor-pointer group"
              >
                <div
                  className="w-full h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHYQbXtEn1DfZMPYkxp74PQNv-ChA7JSlblz8o6xGZtMS4Dn8hGbm4ZgkFUBJ066Ca5cG27TBSAVh2f7WqvNDWN4fZWgLU0Hkme8k1JU03EJmayAk20wCTTs9D8kemW4Sg9dfbTQY2f6-bMMzVrAG2AXw89iqP58DZ4BpmrFdnzQGVsxg5ej7V-a7A20SqVshScgwVnV-fTS4kceegOtFjAKY4geEtliBNpArYayIlgzv5EUff0jbJ')`
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
                <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md p-space-sm rounded-lg shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[20px]">near_me</span>
                    <div>
                      <p className="font-label-sm text-label-sm text-primary font-bold">
                        Current Point: 12th Main Road, HAL 2nd Stage
                      </p>
                      <p className="font-body-sm text-body-sm text-outline text-[11px]">
                        EV Fleet #BLR-ECO-4491 • 24 km/h eco-cruise
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-secondary text-on-secondary rounded-full font-label-sm font-bold shadow-xs">
                    View Live GPS →
                  </button>
                </div>
              </div>

              {/* Driver Card */}
              <div className="mt-space-md pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-low/70 p-space-md rounded-xl">
                <div className="flex items-center gap-space-sm">
                  <img
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                    alt="Ramesh Kumar"
                    src={order.rider.image}
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                        {order.rider.name}
                      </h3>
                      <span className="inline-flex items-center text-amber-600 font-label-sm text-label-sm font-bold bg-amber-50 px-1 rounded">
                        <span className="material-symbols-outlined text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>{' '}
                        {order.rider.rating}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Cold-Chain Specialist • {order.rider.deliveries}+ Zero-Spill Trips
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs w-full sm:w-auto justify-end">
                  <button
                    onClick={onChatDriver}
                    className="inline-flex items-center gap-1 bg-surface-container-lowest text-primary hover:bg-surface-container font-label-md text-label-md px-space-md py-space-xs rounded-full shadow-sm transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">chat</span>
                    <span>Instructions</span>
                  </button>
                  <button
                    onClick={onCallDriver}
                    className="inline-flex items-center gap-1 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md px-space-md py-space-xs rounded-full shadow-sm transition-colors font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>Call Pilot</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Harvest Basket Breakdown */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[22px]">eco</span>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold">
                    Harvest Basket Breakdown
                  </h3>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant font-bold">
                  {order.items.length} Items Selected
                </span>
              </div>

              <div className="space-y-space-sm divide-y divide-surface-container">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-space-xs pt-2">
                    <div className="flex items-center gap-space-md">
                      <img
                        className="w-14 h-14 rounded-lg object-cover bg-surface-container-low p-1 shrink-0"
                        alt={item.product.name}
                        src={item.product.image}
                      />
                      <div>
                        <h4 className="font-label-lg text-label-lg text-primary font-bold">
                          {item.product.name}
                        </h4>
                        <p className="font-body-sm text-body-sm text-outline">
                          {item.selectedPackName || item.product.weight} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-label-lg text-label-lg text-primary font-bold">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                      <p className="font-body-sm text-body-sm text-secondary text-[12px] font-semibold">
                        Cold Packed &lt; 4°C
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-space-md p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">recycling</span>
                  <p className="font-body-sm text-body-sm">
                    Packaged in <span className="font-semibold text-primary">Zero-Virgin Plastic</span> 100% Bagasse cornstarch containers. Hand back empty glass jars to Ramesh on arrival for ₹20 credits!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Earth Rewards */}
            <div className="bg-gradient-to-br from-primary-container to-primary text-on-primary rounded-xl p-space-lg shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-secondary-fixed/15 blur-xl"></div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  Earth Rewards
                </span>
                <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
                  workspace_premium
                </span>
              </div>
              <p className="font-headline-md text-headline-md text-surface-bright font-bold">
                +112 Benato Green Points
              </p>
              <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-1">
                Credited to your wallet. You helped divert 340g of supermarket plastic and supported 2 regenerative family farms.
              </p>
              <div className="mt-space-md pt-space-sm border-t border-primary-fixed-dim/20 flex items-center justify-between text-secondary-fixed font-label-sm text-label-sm font-bold">
                <span>Total Green Balance: 840 pts</span>
                <span className="underline cursor-pointer hover:text-surface-bright">Redeem Perks →</span>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Payment Summary
                </h3>
                <span className="px-2 py-0.5 rounded bg-secondary-fixed/30 text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">
                  Paid Successfully
                </span>
              </div>

              <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Farm Produce Subtotal</span>
                  <span className="text-on-surface font-medium">₹{order.itemTotal}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-secondary font-semibold">
                    <span>Harvest Promo Applied</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Cold-Chain Handling (Verified 4°C)</span>
                  <span className="text-secondary font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Bio-Degradable Packaging</span>
                  <span className="text-secondary font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>EV Clean Courier Express</span>
                  <span className="text-secondary font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>EV Rider Environmental Tip</span>
                  <span className="text-on-surface font-medium">₹{order.tip || 30}</span>
                </div>
              </div>

              <div className="pt-space-sm border-t border-surface-container-high flex justify-between items-baseline">
                <div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">Total Paid</span>
                  <p className="font-label-sm text-label-sm text-outline">Incl. GST and Green Invoicing</p>
                </div>
                <span className="font-headline-lg text-headline-lg text-primary font-bold">
                  ₹{order.total}
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-sm text-on-surface-variant text-[12px] font-body-sm">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  account_balance_wallet
                </span>
                <div>
                  <p className="font-semibold text-primary">{order.paymentMethod}</p>
                  <p className="text-outline">Ref: {order.paymentRef}</p>
                </div>
              </div>
            </div>

            {/* Destination Address */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs text-primary">
                <span className="material-symbols-outlined text-secondary text-[20px]">pin_drop</span>
                <h3 className="font-headline-sm text-headline-sm font-bold">Destination Address</h3>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface">
                <p className="font-bold text-primary">Ananya Sharma</p>
                <p className="text-on-surface-variant mt-0.5">{order.address.line1}</p>
                <p className="text-on-surface-variant">{order.address.line2}</p>
                <p className="text-on-surface-variant">{order.address.cityPin}</p>
                <p className="text-outline mt-1">Contact: {order.address.contact}</p>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs text-outline font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">doorbell</span>
                <p className="text-on-surface-variant text-[12px]">
                  <span className="font-bold text-primary">Drop-off Note:</span> {order.address.note}
                </p>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="p-space-md rounded-xl bg-surface-container text-on-surface flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span>
                <span className="font-label-md text-label-md font-semibold">Need help with this harvest?</span>
              </div>
              <button 
                onClick={onChatDriver}
                className="text-secondary hover:underline font-label-sm text-label-sm font-bold"
              >
                Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Suggested For Tomorrow Dawn */}
      <div className="max-w-6xl w-full mx-auto px-margin-sm md:px-margin mt-space-xl mb-space-lg">
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md gap-space-xs border-b border-surface-container mb-4">
            <div>
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                Suggested For Tomorrow Dawn
              </span>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Complete Your Morning Kitchen Routine
              </h3>
            </div>
            <button
              onClick={onShopMore}
              className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-1 font-bold"
            >
              <span>Explore Fresh Arrival Calendar</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter pt-space-xs">
            {tomorrowSuggestions.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-surface rounded-lg p-space-sm group transition-transform hover:-translate-y-1 shadow-xs"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-space-xs">
                  <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-label-md text-label-md text-primary font-bold line-clamp-1">
                  {item.name}
                </h4>
                <p className="font-body-sm text-body-sm text-outline">{item.subtitle}</p>
                <div className="flex items-center justify-between mt-space-sm pt-space-xs">
                  <span className="font-label-lg text-label-lg text-primary font-bold">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => onAddToCart(item as unknown as Product, 1)}
                    className="w-8 h-8 rounded-full bg-primary text-on-primary hover:bg-primary-container flex items-center justify-center transition-colors shadow-sm"
                    title="Add to basket"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
