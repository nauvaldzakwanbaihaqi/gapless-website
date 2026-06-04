"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, CreditCard, Wallet, QrCode, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>("qris");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const paymentMethods = [
    { id: "qris", name: "QRIS", icon: <QrCode className="w-5 h-5" />, sub: "All E-Wallets" },
    { id: "dana", name: "DANA / GoPay", icon: <Wallet className="w-5 h-5" />, sub: "Instant Pay" },
    { id: "va", name: "Virtual Account", icon: <CreditCard className="w-5 h-5" />, sub: "Bank Transfer" },
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      localStorage.setItem("userTier", "pro");
      router.push("/roadmap");
    }, 1500);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-primary/10">
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-20 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        
        {/* Breadcrumb / Back Link */}
        <div className="w-full max-w-2xl mb-8">
            <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors text-sm font-black uppercase tracking-widest"
            >
                <ArrowLeft className="w-4 h-4" /> Kembali ke Pricing
            </button>
        </div>

        <div className="w-full max-w-2xl">
            <div className="relative group">
                {/* Glow Effect (Softened for Light Mode) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-[48px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                
                <div className="relative bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[40px] p-10 md:p-14 space-y-12">
                    
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-brand-primary">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Checkout</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-gray-900">Selesaikan <br/><span className="text-brand-primary">Pembayaranmu</span>.</h1>
                    </div>

                    {/* Order Summary Section */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gray-300 uppercase tracking-widest">Order Summary</h3>
                        <div className="space-y-4 p-8 rounded-3xl bg-gray-50 border border-gray-100">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-bold">Student Pro Tier Activation</span>
                                <span className="font-black text-gray-900">Rp 69.000</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="text-gray-400 uppercase tracking-widest font-black">Dynamic Service Fee</span>
                                <span className="text-brand-primary font-black italic">FREE (Demo)</span>
                            </div>
                            <div className="h-px bg-gray-200 my-2" />
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black text-gray-900">Total Pembayaran</span>
                                <span className="text-4xl font-black text-brand-primary tracking-tighter">Rp 69.000</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods Grid */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gray-300 uppercase tracking-widest">Metode Pembayaran</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`relative p-6 rounded-3xl border transition-all duration-300 text-left flex flex-col gap-4 group/method
                                        ${selectedMethod === method.id 
                                            ? "bg-brand-primary/5 border-brand-primary shadow-lg shadow-brand-primary/5" 
                                            : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${selectedMethod === method.id ? "bg-brand-primary text-white" : "bg-gray-100 text-gray-400 group-hover/method:text-gray-900"}`}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <p className={`text-xs font-black transition-colors ${selectedMethod === method.id ? "text-gray-900" : "text-gray-400 group-hover/method:text-gray-600"}`}>{method.name}</p>
                                        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{method.sub}</p>
                                    </div>
                                    {selectedMethod === method.id && (
                                        <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center">
                                            <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6">
                        <Button 
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={`w-full h-20 rounded-[32px] text-xl font-black transition-all relative overflow-hidden group/btn border-none
                                ${isProcessing 
                                    ? "bg-gray-100 text-gray-300" 
                                    : "bg-brand-primary hover:bg-brand-primary/90 text-white shadow-2xl shadow-brand-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                                }`}
                        >
                            {isProcessing ? (
                                <div className="flex flex-col items-center gap-1">
                                    <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Verifying transaction...</span>
                                </div>
                            ) : (
                                <span className="flex items-center gap-3">
                                    Konfirmasi Pembayaran <Check className="w-7 h-7" />
                                </span>
                            )}
                        </Button>
                        <p className="text-center text-[10px] text-gray-300 font-black uppercase tracking-widest mt-8">Secure 256-bit SSL Encrypted Payment</p>
                    </div>

                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
