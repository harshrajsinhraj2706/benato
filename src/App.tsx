/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_CART_ITEMS, INITIAL_ORDER } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ShopView } from './components/ShopView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartCheckoutView } from './components/CartCheckoutView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { LiveTrackingView } from './components/LiveTrackingView';
import { InvoiceModal } from './components/InvoiceModal';
import { DriverModals } from './components/DriverModals';
import { BenatoAiModal } from './components/BenatoAiModal';

export default function App() {
  const [activeView, setActiveView] = useState<'shop' | 'product-detail' | 'cart' | 'order-success' | 'tracking'>('shop');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [currentOrder, setCurrentOrder] = useState<Order>(INITIAL_ORDER);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    packName?: string,
    ripeness?: string
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedPackName === packName &&
          item.selectedRipeness === ripeness
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedPackName: packName || product.weight,
            selectedRipeness: ripeness,
            unitPrice: product.price
          }
        ];
      }
    });

    showToast(`Added ${quantity} × ${product.name} to harvest basket!`);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from basket');
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setCurrentOrder(newOrder);
    setCartItems([]);
    setActiveView('order-success');
    showToast('Harvest order confirmed! Dispatching cold-chain EV.');
  };

  const safeCart = Array.isArray(cartItems) ? cartItems : [];
  const cartTotalItems = safeCart.reduce((acc, item) => acc + (item?.quantity || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* 1. Global Navigation Header */}
      <Header
        cartItems={safeCart}
        cartCount={cartTotalItems}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
      />

      {/* 2. Main Viewport Switcher */}
      <main className="flex-1 w-full flex flex-col">
        {activeView === 'shop' && (
          <ShopView
            products={products}
            cartItems={cartItems}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {activeView === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBackToShop={() => setActiveView('shop')}
            onSelectRelatedProduct={handleSelectProduct}
            cartCount={cartTotalItems}
            onOpenCart={() => setActiveView('cart')}
          />
        )}

        {activeView === 'cart' && (
          <CartCheckoutView
            cartItems={cartItems}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveItem}
            onBackToShop={() => setActiveView('shop')}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {activeView === 'order-success' && (
          <OrderSuccessView
            order={currentOrder}
            onTrackOrder={() => setActiveView('tracking')}
            onShopMore={() => setActiveView('shop')}
            onOpenInvoice={() => setIsInvoiceOpen(true)}
            onAddToCart={handleAddToCart}
            onCallDriver={() => setIsCallOpen(true)}
            onChatDriver={() => setIsChatOpen(true)}
          />
        )}

        {activeView === 'tracking' && (
          <LiveTrackingView
            order={currentOrder}
            onCallDriver={() => setIsCallOpen(true)}
            onChatDriver={() => setIsChatOpen(true)}
            onOpenInvoice={() => setIsInvoiceOpen(true)}
            onBackToShop={() => setActiveView('shop')}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer onNavigate={(view) => setActiveView(view)} />

      {/* 4. Floating Action / Mini Cart Floating Pill on mobile/desktop when items in basket */}
      {activeView === 'shop' && cartTotalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-5">
          <button
            onClick={() => setActiveView('cart')}
            className="flex items-center gap-space-sm bg-primary text-on-primary px-space-lg py-space-sm rounded-full shadow-2xl hover:bg-primary-container transition-all border border-secondary-fixed/30 group"
          >
            <div className="relative">
              <span className="material-symbols-outlined text-[24px] text-secondary-fixed">
                shopping_basket
              </span>
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-secondary-fixed text-primary font-label-sm text-[11px] font-bold flex items-center justify-center">
                {cartTotalItems}
              </span>
            </div>
            <div className="text-left">
              <span className="block font-label-md text-label-md font-bold text-surface-bright leading-none">
                View Harvest Basket
              </span>
              <span className="text-[11px] text-secondary-fixed-dim font-medium">
                {cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0) >= 299
                  ? 'Free 20-Min Delivery Unlocked'
                  : 'Fast Cold-Van Dispatch'}
              </span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-secondary-fixed group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      )}

      {/* 5. Modals & Dialogs */}
      <InvoiceModal
        order={currentOrder}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />

      <DriverModals
        order={currentOrder}
        isCallOpen={isCallOpen}
        isChatOpen={isChatOpen}
        onCloseCall={() => setIsCallOpen(false)}
        onCloseChat={() => setIsChatOpen(false)}
      />

      <BenatoAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        cartItems={safeCart}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-primary text-on-primary px-space-md py-space-xs rounded-full shadow-xl flex items-center gap-space-xs border border-secondary-fixed/40">
            <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
              check_circle
            </span>
            <span className="font-label-md text-label-md font-medium text-surface-bright">
              {toastMessage}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

