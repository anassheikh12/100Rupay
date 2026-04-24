"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, MapPin, Check, Camera, Search } from "lucide-react";

interface ReportingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportingModal = ({ isOpen, onClose }: ReportingModalProps) => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleUpload = () => {
    setIsScanning(true);
    // Simulate AI Scanning for judging "wow" factor
    setTimeout(() => {
      setIsScanning(false);
      setIsVerified(true);
      setTimeout(() => setStep(2), 1000);
    }, 3000);
  };

  const steps = [
    { title: "Evidence", icon: Camera },
    { title: "Location", icon: MapPin },
    { title: "Review", icon: Check },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-xl bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-bottom border-border flex items-center justify-between">
          <div className="flex gap-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-rajdhani text-[10px] font-bold transition-colors ${
                    step >= i + 1
                      ? "bg-lime-neon text-black"
                      : "bg-border text-zinc-500"
                  }`}
                >
                  {step > i + 1 ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span
                  className={`font-rajdhani text-xs font-bold tracking-widest uppercase ${
                    step === i + 1 ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {s.title}
                </span>
                {i < steps.length - 1 && (
                  <div className="w-8 h-[1px] bg-border mx-2" />
                )}
              </div>
            ))}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h3 className="font-rajdhani font-bold text-2xl text-white">
                    Upload Visual Evidence
                  </h3>
                  <p className="text-zinc-500 font-medium text-sm">
                    Our AI models will analyze the problem for verification.
                  </p>
                </div>

                <div
                  className={`relative aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
                    isScanning
                      ? "border-lime-neon shadow-[0_0_20px_rgba(50,205,50,0.1)] bg-lime-neon/5"
                      : "border-border hover:border-zinc-700 bg-surface-light"
                  }`}
                  onClick={!isScanning && !isVerified ? handleUpload : undefined}
                >
                  {isScanning ? (
                    <>
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <motion.div
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-1 bg-lime-neon shadow-[0_0_15px_#32CD32] z-10"
                        />
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(50,205,50,0.1),transparent)] flex items-center justify-center">
                           <Search className="w-12 h-12 text-lime-neon animate-pulse" />
                        </div>
                      </div>
                      <span className="font-rajdhani font-bold text-sm text-lime-neon animate-pulse">
                        AI MODEL VERIFYING CONTENT...
                      </span>
                    </>
                  ) : isVerified ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-lime-neon rounded-full flex items-center justify-center">
                        <Check className="w-8 h-8 text-black" />
                      </div>
                      <span className="font-rajdhani font-bold text-sm text-lime-neon uppercase tracking-widest">
                        AI Verification Successful
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <p className="font-rajdhani font-bold text-white uppercase tracking-widest text-sm">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-zinc-600 text-xs mt-1">
                          PNG, JPG (MAX. 5MB)
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h3 className="font-rajdhani font-bold text-2xl text-white">
                    Pinpoint Location
                  </h3>
                  <p className="text-zinc-500 font-medium text-sm">
                    Where is this civic issue occurring?
                  </p>
                </div>

                <div className="space-y-4">
                   <div className="relative">
                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                     <input 
                      className="w-full bg-surface-light border border-border rounded-xl px-12 py-4 font-rajdhani text-white outline-none focus:border-lime-neon transition-colors"
                      placeholder="Street, Area, City..."
                     />
                   </div>
                   <div className="h-48 bg-surface-light border border-border rounded-xl flex items-center justify-center text-zinc-600 font-rajdhani font-bold text-xs">
                      [ INTERACTIVE MAP PLACEHOLDER ]
                   </div>
                </div>

                <button 
                  onClick={() => setStep(3)}
                  className="w-full py-4 bg-lime-neon text-black font-rajdhani font-bold rounded-xl hover:scale-[1.02] transition-transform"
                >
                  CONTINUE
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center space-y-8"
              >
                <div className="w-20 h-20 bg-lime-neon/20 border border-lime-neon/30 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10 text-lime-neon" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-rajdhani font-bold text-3xl text-white">Ready for Note</h3>
                  <p className="text-zinc-500 font-medium max-w-sm mx-auto">
                    Your report has been verified. Once submitted, it will be open for 100 Rupay contributions.
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-lime-neon text-black font-rajdhani font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(50,205,50,0.2)]"
                >
                  SUBMIT REPORT
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
