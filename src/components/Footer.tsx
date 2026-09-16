import React, { useState } from 'react';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-primary-container text-on-primary mt-space-xl relative overflow-hidden" id="main-footer">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter mb-space-xl">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-lg text-headline-lg tracking-tight font-bold lowercase text-primary-fixed">
                benato
              </span>
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                Farm Verified
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-primary-container max-w-sm">
              Pioneering direct cold-chain organic produce delivery from certified regenerative family farms directly to metropolitan tables within 20 minutes.
            </p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <span className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-primary text-secondary-fixed font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">eco</span>
                100% Compostable Packaging
              </span>
              <span className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-primary text-primary-fixed font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">solar_power</span>
                Solar Cold Hubs
              </span>
            </div>
          </div>

          {/* Harvest Aisles */}
          <div>
            <h4 className="font-headline-sm text-headline-sm text-surface-bright mb-space-md">Harvest Aisles</h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'greens')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Native Heirloom Greens
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'dairy')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  A2 Grassfed Milks &amp; Curd
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'staples')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Stoneground Flours &amp; Pulses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'greens')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Hydroponic Microgreens
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'fruits')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Valley Harvest Baskets
                </button>
              </li>
            </ul>
          </div>

          {/* Our Roots */}
          <div>
            <h4 className="font-headline-sm text-headline-sm text-surface-bright mb-space-md">Our Roots</h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              <li>
                <a href="#roots" className="hover:text-surface-bright transition-colors">
                  Regenerative Soil Pledge
                </a>
              </li>
              <li>
                <a href="#roots" className="hover:text-surface-bright transition-colors">
                  Partner Farmer Cooperative
                </a>
              </li>
              <li>
                <a href="#roots" className="hover:text-surface-bright transition-colors">
                  Zero Plastic Mandate
                </a>
              </li>
              <li>
                <a href="#roots" className="hover:text-surface-bright transition-colors">
                  Careers at Benato
                </a>
              </li>
              <li>
                <a href="#roots" className="hover:text-surface-bright transition-colors">
                  Press &amp; Farm Logs
                </a>
              </li>
            </ul>
          </div>

          {/* Morning Digest Newsletter */}
          <div>
            <h4 className="font-headline-sm text-headline-sm text-surface-bright mb-space-md">Morning Digest</h4>
            <p className="font-body-sm text-body-sm text-on-primary-container mb-space-sm">
              Weekly field dispatches, seasonal availability calendars, and chef recipes.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-space-xs">
              <div className="flex items-center bg-primary rounded-full px-space-md py-space-xs border border-primary-fixed/20 focus-within:border-secondary-fixed">
                <input
                  className="w-full bg-transparent border-0 font-body-sm text-body-sm text-on-primary placeholder:text-outline focus:outline-none"
                  placeholder="Your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="material-symbols-outlined text-secondary-fixed text-[20px] hover:translate-x-0.5 transition-transform"
                  aria-label="Submit email"
                >
                  arrow_forward
                </button>
              </div>
              {subscribed ? (
                <span className="font-label-sm text-label-sm text-secondary-fixed font-bold">
                  ✓ Subscribed! You will receive Tuesday dawn dispatches.
                </span>
              ) : (
                <span className="font-label-sm text-label-sm text-on-primary-container">
                  Restock notifications every Tuesday dawn.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-space-md border-t border-primary/40 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-primary-container">
          <p>© 2024 Benato Organic Technologies Inc. Rooted in Bengaluru • Pune • Hyderabad.</p>
          <div className="flex flex-wrap items-center gap-space-md sm:gap-space-lg">
            <a className="hover:text-surface-bright transition-colors" href="#">Privacy Charter</a>
            <a className="hover:text-surface-bright transition-colors" href="#">Cold-Chain Terms</a>
            <span className="hover:text-surface-bright transition-colors text-primary-fixed-dim">
              Organic Certification ID #ORG-9281
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
