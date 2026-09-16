import React from 'react';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-3xl max-w-2xl w-full p-space-lg md:p-space-xl shadow-2xl relative my-8 animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-container text-outline hover:text-on-surface flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Invoice Header */}
        <div className="flex items-start justify-between pb-space-md border-b border-surface-container pr-10">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[22px]">eco</span>
            </div>
            <div>
              <h2 className="font-headline-md text-primary font-bold tracking-tight">BENATO ORGANICS</h2>
              <p className="font-label-sm text-label-sm text-secondary font-semibold">
                Direct Farm-to-Kitchen Cold Chain • GSTIN: 29AABCB1234F1Z8
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
              TAX INVOICE
            </span>
            <p className="font-headline-sm text-body-md font-bold text-primary mt-1">#{order.id}</p>
            <p className="font-body-sm text-outline text-[12px]">{order.date}</p>
          </div>
        </div>

        {/* Billed To & Cold-Chain Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md py-space-md border-b border-surface-container font-body-sm text-body-sm">
          <div>
            <h4 className="font-label-sm text-label-sm text-outline uppercase font-bold mb-1">
              Billed &amp; Delivered To:
            </h4>
            <p className="font-bold text-primary">{order.address.title}</p>
            <p className="text-on-surface-variant">{order.address.line1}</p>
            <p className="text-on-surface-variant">{order.address.line2}</p>
            <p className="text-on-surface-variant">{order.address.cityPin}</p>
            <p className="text-outline text-[12px] mt-1">{order.address.contact}</p>
          </div>
          <div>
            <h4 className="font-label-sm text-label-sm text-outline uppercase font-bold mb-1">
              Dispatch Verification:
            </h4>
            <p className="text-on-surface-variant">
              <span className="font-semibold text-primary">Micro-Hub:</span> Indiranagar Solar Pod #04
            </p>
            <p className="text-on-surface-variant">
              <span className="font-semibold text-primary">Logistics:</span> 100% Zero-Carbon EV Fleet
            </p>
            <p className="text-on-surface-variant">
              <span className="font-semibold text-primary">Tamper Seal:</span> #{order.tamperSeal}
            </p>
            <p className="text-on-surface-variant">
              <span className="font-semibold text-primary">Cold Chamber Temp:</span> {order.coldTemp}
            </p>
            <p className="text-on-surface-variant">
              <span className="font-semibold text-primary">Payment:</span> {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-space-md border-b border-surface-container overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container-high text-outline text-[12px] uppercase">
                <th className="pb-2 font-semibold">Item &amp; Provenance</th>
                <th className="pb-2 font-semibold text-center">Unit Pack</th>
                <th className="pb-2 font-semibold text-center">Qty</th>
                <th className="pb-2 font-semibold text-right">Price</th>
                <th className="pb-2 font-semibold text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {order.items.map((item, idx) => (
                <tr key={idx} className="py-2">
                  <td className="py-2.5">
                    <p className="font-semibold text-primary">{item.product.name}</p>
                    <p className="text-outline text-[11px]">{item.product.farm}</p>
                  </td>
                  <td className="py-2.5 text-center text-on-surface-variant">
                    {item.selectedPackName || item.product.weight}
                  </td>
                  <td className="py-2.5 text-center font-bold text-primary">{item.quantity}</td>
                  <td className="py-2.5 text-right text-on-surface-variant">₹{item.unitPrice}</td>
                  <td className="py-2.5 text-right font-semibold text-primary">
                    ₹{item.unitPrice * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Totals */}
        <div className="py-space-md flex flex-col items-end font-body-sm text-body-sm gap-1">
          <div className="flex justify-between w-64 text-on-surface-variant">
            <span>Subtotal:</span>
            <span className="font-medium text-primary">₹{order.itemTotal}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between w-64 text-secondary font-semibold">
              <span>Harvest Discount:</span>
              <span>-₹{order.discount}</span>
            </div>
          )}
          <div className="flex justify-between w-64 text-on-surface-variant">
            <span>Cold-Chain Express Delivery:</span>
            <span className="text-secondary font-bold">FREE</span>
          </div>
          <div className="flex justify-between w-64 text-on-surface-variant">
            <span>Compostable Packing:</span>
            <span className="font-medium text-primary">₹{order.insulationFee || 0}</span>
          </div>
          <div className="flex justify-between w-64 text-on-surface-variant">
            <span>Courier Partner Tip:</span>
            <span className="font-medium text-primary">₹{order.tip || 30}</span>
          </div>
          <div className="flex justify-between w-64 pt-2 border-t border-surface-container text-headline-sm font-bold text-primary mt-1">
            <span>Total Paid:</span>
            <span className="text-secondary">₹{order.total}</span>
          </div>
          <p className="text-outline text-[11px] mt-1">All statutory agricultural cess &amp; GST included.</p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-space-md border-t border-surface-container">
          <span className="text-outline text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
            Cryptographically sealed harvest timestamp
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-surface-container text-primary font-label-md font-bold hover:bg-surface-container-high transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-md font-bold hover:bg-primary-container transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
