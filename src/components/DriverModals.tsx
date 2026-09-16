import React, { useState } from 'react';
import { Order } from '../types';

interface DriverModalsProps {
  order: Order;
  isCallOpen: boolean;
  isChatOpen: boolean;
  onCloseCall: () => void;
  onCloseChat: () => void;
}

export const DriverModals: React.FC<DriverModalsProps> = ({
  order,
  isCallOpen,
  isChatOpen,
  onCloseCall,
  onCloseChat
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'driver'; text: string; time: string }>>([
    {
      sender: 'driver',
      text: "Namaste! I'm on my EV approaching 12th Main Road. Cold box is safely sealed at 3.8°C.",
      time: '10:48 AM'
    },
    {
      sender: 'user',
      text: 'Thanks Ramesh! Please leave it in the insulated box outside 402 if nobody answers.',
      time: '10:50 AM'
    },
    {
      sender: 'driver',
      text: 'Understood! I will ring the bell once and take a photo of the contactless drop.',
      time: '10:51 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [callStatus, setCallStatus] = useState<'ringing' | 'connected' | 'ended'>('connected');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Simulate driver automated reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'driver',
          text: 'Got it! I am 3 minutes away from your gate.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <>
      {/* Call Modal */}
      {isCallOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-primary-container text-on-primary rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative animate-in zoom-in-95">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <img
                src={order.rider.image}
                alt={order.rider.name}
                className="w-full h-full rounded-full object-cover ring-4 ring-secondary-fixed shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-secondary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">call</span>
              </span>
            </div>

            <h3 className="font-headline-md text-headline-md text-surface-bright font-bold">
              {order.rider.name}
            </h3>
            <p className="font-body-sm text-body-sm text-secondary-fixed-dim">
              Cold-Chain Courier Pilot • {order.rider.phone}
            </p>

            <div className="my-6 py-3 px-4 rounded-2xl bg-primary/60 border border-surface-container-high/20 inline-block">
              <span className="inline-flex items-center gap-2 text-secondary-fixed font-label-md font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-ping"></span>
                {callStatus === 'connected' ? 'Secure In-App Call • 00:24' : 'Connecting to Pilot...'}
              </span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setCallStatus('ended');
                  setTimeout(onCloseCall, 400);
                }}
                className="w-14 h-14 rounded-full bg-error text-on-error flex items-center justify-center hover:opacity-90 transition-all shadow-lg active:scale-95"
              >
                <span className="material-symbols-outlined text-[28px]">call_end</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full h-[540px] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={order.rider.image}
                  alt={order.rider.name}
                  className="w-10 h-10 rounded-full object-cover border border-secondary-fixed"
                />
                <div>
                  <h4 className="font-label-md font-bold text-surface-bright">{order.rider.name}</h4>
                  <p className="text-[11px] text-secondary-fixed flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                    Online • On EV-45 (1.4 km away)
                  </p>
                </div>
              </div>
              <button onClick={onCloseChat} className="text-surface-bright/80 hover:text-surface-bright">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-container-low/40">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                      m.sender === 'user'
                        ? 'bg-primary text-on-primary rounded-br-none'
                        : 'bg-surface-container-lowest text-on-surface shadow-xs rounded-bl-none border border-surface-container'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-outline mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message delivery pilot..."
                className="flex-1 bg-surface-container-low px-4 py-2 rounded-full text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
