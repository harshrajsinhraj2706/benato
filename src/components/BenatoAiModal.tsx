import React, { useState } from 'react';
import { Product, CartItem } from '../types';

interface BenatoAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const BenatoAiModal: React.FC<BenatoAiModalProps> = ({
  isOpen,
  onClose,
  cartItems = [],
  onAddToCart
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; action?: { label: string; query: string } }>>([
    {
      sender: 'ai',
      text: "Namaste! I'm your Benato Farm Sommelier. I can assist you with seasonal harvest availability, cold-chain science, and custom recipes for whatever is currently in your basket. What are you cooking today?"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "What's in peak ripeness this week?",
    "Pairing ideas for Heirloom Kumato Tomatoes",
    "How does the Sub-4°C Cold Van preserve nutrients?",
    "Suggest a 15-min dinner with my current basket"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Our Doddaballapura and Konkan partners harvested dawn crops at 04:30 AM. Everything in our catalogue stays strictly under 4°C to preserve natural volatile aromatics and crisp cellular water tension!";
      const lower = text.toLowerCase();

      if (lower.includes('tomato') || lower.includes('kumato')) {
        reply = "Kumato Tomatoes are rich in anthocyanins and have an exceptional 6.2° Brix sugar rating. For optimal flavor, slice them paper-thin, season with sea salt, and tear fresh holy basil leaves over them. Store them on your counter at room temperature — never put whole heirloom tomatoes in a household fridge, as temperatures below 10°C inactivate flavor enzymes!";
      } else if (lower.includes('mango') || lower.includes('alphonso')) {
        reply = "The Ratnagiri Alphonso Hapus in our hub is GI Tagged (#MAH-108) from Kelshi Bay. They are ripened naturally in rice-hay chambers without carbide chemicals. They have a fragrant floral musk and rich saffron pulp. Best paired with A2 Gir cow curd or fresh cream!";
      } else if (lower.includes('dinner') || lower.includes('recipe') || lower.includes('basket')) {
        const itemNames = cartItems.map((c) => c.product.name).join(', ');
        if (cartItems.length > 0) {
          reply = `With your current basket (${itemNames}), I suggest a Rustic Warm Harvest Salad: Toss flash-sautéed greens with warm A2 butter, halved heirloom tomatoes, and cracked black peppercorns. Takes only 12 minutes!`;
        } else {
          reply = "I recommend our classic 15-minute Farm Carpaccio: Grab our Heirloom Kumato Tomatoes, Hydroponic Sweet Basil, and Malnad Cultured Table Butter for an effortless gourmet appetizer!";
        }
      } else if (lower.includes('cold') || lower.includes('4°c') || lower.includes('van')) {
        reply = "Benato's sub-4°C cold chain operates through active refrigeration from the farm gate packing shed to insulated electric vans. Unlike ambient couriers that cause produce to sweat and lose moisture, our cold chain slows down respiration rates by 80%, giving you crispness identical to produce freshly plucked off the vine!";
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 900);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full h-[580px] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 border border-surface-container">
        {/* Header */}
        <div className="bg-primary-container text-on-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-surface-bright font-bold">Benato Farm Sommelier</h3>
              <p className="text-[11px] text-secondary-fixed flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                AI Culinary &amp; Cold-Chain Specialist
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-lowest/15 hover:bg-surface-container-lowest/30 flex items-center justify-center text-surface-bright"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-container-low/30">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-body-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-br-none'
                    : 'bg-surface-container-lowest text-on-surface shadow-xs rounded-bl-none border border-surface-container'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-surface-container-lowest text-secondary w-20 shadow-xs border border-surface-container">
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-surface-container text-on-surface hover:bg-secondary-container hover:text-on-secondary-container text-[11px] whitespace-nowrap transition-colors shrink-0 font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          className="p-3 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask about farm origins, pairing, or ripeness..."
            className="flex-1 bg-surface-container-low px-4 py-2.5 rounded-full text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-primary text-on-primary hover:bg-primary-container flex items-center justify-center transition-colors shrink-0 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
