/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  Grid3X3, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Wifi,
  BatteryMedium
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(0.85);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowRight' || e.key === 'Enter') && currentPage === 1) {
        goToPage(2);
      } else if ((e.key === 'ArrowLeft' || e.key === 'Backspace') && currentPage === 2) {
        goToPage(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Adjust scale automatically on initial load based on viewport height
  useEffect(() => {
    const updateScale = () => {
      const vh = window.innerHeight;
      if (vh < 700) {
        setScale(0.65);
      } else if (vh < 920) {
        setScale(0.78);
      } else if (vh < 1100) {
        setScale(0.88);
      } else {
        setScale(1);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const goToPage = (page: 1 | 2) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  // Slide transition variants matching iOS native page navigation
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -320 : 320,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 text-neutral-900 flex flex-col items-center justify-between p-3 sm:p-6 select-none font-sans wireframe-dots">
      {/* Top Wireframe Workbench Bar */}
      <header className="w-full max-w-5xl bg-white border-2 border-black rounded-lg p-3 sm:px-6 sm:py-3.5 mb-4 shadow-[3px_3px_0px_0px_#000] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border-2 border-black flex items-center justify-center bg-neutral-50 shadow-[2px_2px_0px_0px_#000]">
            <Smartphone className="w-4 h-4 text-black stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight uppercase">iPhone 15 Wireframe</span>
              <span className="text-[11px] font-mono border border-black px-1.5 py-0.2 rounded bg-neutral-100">
                393 × 852 pt
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-mono">
              Stato: <span className="font-semibold text-black">Pagina {currentPage} di 2</span>
            </p>
          </div>
        </div>

        {/* Workbench Toolbar */}
        <div className="flex items-center gap-2 text-xs">
          {/* Grid Toggle */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Mostra/Nascondi griglia wireframe sullo schermo"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-black rounded transition-all active:translate-x-0.5 active:translate-y-0.5 ${
              showGrid 
                ? 'bg-black text-white shadow-[2px_2px_0px_0px_#888]' 
                : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">Griglia</span>
          </button>

          {/* Scale controls */}
          <div className="flex items-center border-2 border-black rounded bg-white shadow-[2px_2px_0px_0px_#000] overflow-hidden">
            <button
              onClick={() => setScale(s => Math.max(0.55, Number((s - 0.1).toFixed(2))))}
              className="px-2 py-1.5 hover:bg-neutral-100 border-r border-black"
              title="Riduci zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2.5 py-1 text-[11px] font-mono min-w-[50px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(s => Math.min(1.1, Number((s + 0.1).toFixed(2))))}
              className="px-2 py-1.5 hover:bg-neutral-100 border-l border-black"
              title="Aumenta zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setScale(0.85)}
            className="p-1.5 border-2 border-black rounded bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 active:translate-x-0.5 active:translate-y-0.5"
            title="Reimposta scala predefinita"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Viewport Workspace: Centers the iPhone 15 */}
      <main className="flex-1 w-full flex items-center justify-center overflow-auto py-2">
        <div 
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'center center',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="relative select-none"
        >
          {/* Hardware Physical Buttons (Left & Right) */}
          {/* Left: Action Button + Volume Up + Volume Down */}
          <div className="absolute -left-[5px] top-[115px] w-[5px] h-[28px] bg-neutral-900 border-y border-l border-black rounded-l-sm" />
          <div className="absolute -left-[5px] top-[160px] w-[5px] h-[50px] bg-neutral-900 border-y border-l border-black rounded-l-sm" />
          <div className="absolute -left-[5px] top-[225px] w-[5px] h-[50px] bg-neutral-900 border-y border-l border-black rounded-l-sm" />

          {/* Right: Side / Power Button */}
          <div className="absolute -right-[5px] top-[180px] w-[5px] h-[75px] bg-neutral-900 border-y border-r border-black rounded-r-sm" />

          {/* iPhone 15 Outer Chassis Frame */}
          <div className="w-[393px] h-[852px] bg-white rounded-[54px] border-[10px] border-black shadow-[8px_8px_0px_0px_#000] relative overflow-hidden flex flex-col">
            
            {/* Screen Inner Bezel Border */}
            <div className="absolute inset-0 rounded-[44px] pointer-events-none border-2 border-black z-40" />

            {/* Top Status Bar & Dynamic Island Area */}
            <div className="relative z-30 pt-3 px-7 pb-2 flex items-center justify-between bg-white border-b border-black/10 select-none">
              {/* Time */}
              <span className="text-[14px] font-bold tracking-tight font-mono text-black">
                9:41
              </span>

              {/* Dynamic Island (iPhone 15) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[122px] h-[34px] bg-black rounded-full flex items-center justify-between px-3.5 shadow-sm">
                {/* Front Camera Lens Wireframe Indicator */}
                <div className="w-3 h-3 rounded-full border border-neutral-700 bg-neutral-950 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-neutral-800" />
                </div>
                {/* TrueDepth Sensor */}
                <div className="w-2.5 h-2.5 rounded-full border border-neutral-800 bg-neutral-900" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-black">
                {/* Cellular Signal Wireframe */}
                <div className="flex items-end gap-[1.5px] h-3">
                  <span className="w-[2.5px] h-1.5 bg-black rounded-[0.5px]" />
                  <span className="w-[2.5px] h-2 bg-black rounded-[0.5px]" />
                  <span className="w-[2.5px] h-2.5 bg-black rounded-[0.5px]" />
                  <span className="w-[2.5px] h-3 bg-black rounded-[0.5px]" />
                </div>
                {/* Wifi Icon */}
                <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                {/* Battery Icon */}
                <div className="flex items-center">
                  <div className="w-5 h-2.5 rounded-[3px] border border-black p-[1px] flex items-center">
                    <div className="w-3 h-full bg-black rounded-[1px]" />
                  </div>
                  <div className="w-[1.5px] h-1 bg-black rounded-r-[1px]" />
                </div>
              </div>
            </div>

            {/* Screen Content: Two Pages with Wireframe Aesthetic */}
            <div className={`relative flex-1 w-full overflow-hidden bg-white ${showGrid ? 'wireframe-grid' : ''}`}>
              
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {currentPage === 1 ? (
                  /* =================================================== */
                  /* PAGINA 1: Con dentro SOLO un bottone "avanti"       */
                  /* =================================================== */
                  <motion.div
                    key="pagina-1"
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 320, damping: 32 },
                      opacity: { duration: 0.15 }
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                  >
                    {/* Only the button: "avanti" as requested */}
                    <button
                      onClick={() => goToPage(2)}
                      className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 min-h-[52px] bg-white text-black font-semibold text-lg tracking-wide border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_#000] hover:bg-neutral-50 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer"
                      aria-label="Vai a Pagina 2"
                    >
                      <span>avanti</span>
                      <ArrowRight className="w-5 h-5 text-black stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ) : (
                  /* =================================================== */
                  /* PAGINA 2: Con dentro SOLO un bottone "indietro"     */
                  /* =================================================== */
                  <motion.div
                    key="pagina-2"
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 320, damping: 32 },
                      opacity: { duration: 0.15 }
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                  >
                    {/* Only the button: "indietro" as requested */}
                    <button
                      onClick={() => goToPage(1)}
                      className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 min-h-[52px] bg-white text-black font-semibold text-lg tracking-wide border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_#000] hover:bg-neutral-50 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer"
                      aria-label="Torna a Pagina 1"
                    >
                      <ArrowLeft className="w-5 h-5 text-black stroke-[2.5] group-hover:-translate-x-1 transition-transform" />
                      <span>indietro</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom iOS Home Indicator Area */}
            <div className="relative z-30 pt-2 pb-2 bg-white flex items-center justify-center">
              {/* iOS Home Indicator Bar */}
              <div className="w-36 h-[4.5px] bg-black rounded-full" />
            </div>

          </div>
        </div>
      </main>

      {/* Footer Wireframe Specs & Shortcuts info */}
      <footer className="w-full max-w-5xl text-center text-xs text-neutral-600 font-mono mt-2 py-2 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full border border-black bg-white" />
          <span>Wireframe B&amp;W Minimalista • Solo bottoni di navigazione</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-neutral-500">
          <span>Navigazione rapida tastiera: <kbd className="px-1.5 py-0.5 border border-black rounded bg-white text-black font-semibold">←</kbd> / <kbd className="px-1.5 py-0.5 border border-black rounded bg-white text-black font-semibold">→</kbd></span>
        </div>
      </footer>
    </div>
  );
}
