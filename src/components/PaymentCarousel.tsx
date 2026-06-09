import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { WalletMethod } from "../types";
import { trackPixelEvent } from "../utils/pixel";

interface PaymentCarouselProps {
  onSelectWallet?: (walletName: string) => void;
  selectedWallet?: string;
  onCargarAhora?: () => void;
}

export const WALLETS: WalletMethod[] = [
  {
    id: "mp",
    name: "Mercado Pago",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/Mercado_Pago.svg",
  },
  {
    id: "brubank",
    name: "Brubank",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Brubank_logo.png",
  },
  {
    id: "naranjax",
    name: "Naranja X",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Naranja_X.png",
  },
  {
    id: "galicia",
    name: "Banco Galicia",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Banco_galicia_logo.png",
  },
  {
    id: "santander",
    name: "Santander",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Santander_Argentina_Logo.png",
  },
  {
    id: "uala",
    name: "Ualá",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Uala.png",
  },
  {
    id: "cuentadni",
    name: "Cuenta DNI",
    logoUrl: "https://images.seeklogo.com/logo-png/44/1/cuenta-dni-banco-provincia-logo-png_seeklogo-444642.png",
  },
];

export default function PaymentCarousel({ onSelectWallet, selectedWallet, onCargarAhora }: PaymentCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleWalletClick = (wallet: WalletMethod) => {
    setActiveInfo(wallet.id === activeInfo ? null : wallet.id);
    if (onSelectWallet) {
      onSelectWallet(wallet.name);
    }
  };

  return (
    <div className="obsidian-card p-6 md:p-8 rounded-3xl glow-purple relative overflow-hidden" id="pago-seccion">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-white tracking-wide">
            Métodos de Pago
          </h3>
          <p className="text-on-surface-variant text-sm mt-1">
            Cargá fichas instantáneamente con tu billetera virtual preferida.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior método de pago"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-green/30 transition-all active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Siguiente método de pago"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-green/30 transition-all active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Sliding row of logos */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto py-2 px-1 scroll-smooth snap-x custom-scrollbar snap-mandatory select-none"
      >
        {WALLETS.map((wallet) => {
          const isSelected = selectedWallet === wallet.name;
          const isOpen = activeInfo === wallet.id;
          return (
            <div
              key={wallet.id}
              onClick={() => handleWalletClick(wallet)}
              className={`snap-start flex-shrink-0 w-[140px] md:w-[160px] aspect-square rounded-2xl border flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 relative ${
                isSelected
                  ? "bg-brand-green/10 border-brand-green shadow-[0_0_15px_rgba(0,228,118,0.2)] scale-105"
                  : "bg-surface-container-low/80 border-white/10 hover:bg-surface-container-high hover:border-white/20 hover:scale-[1.02]"
              }`}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-xl p-2.5 relative border border-white/5 placeholder-box transition-colors duration-200">
                <img
                  alt={wallet.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter brightness-95"
                  src={wallet.logoUrl}
                  onError={(e) => {
                    // Fallback to text initials if image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span className="text-white text-xs font-headline font-semibold mt-3 text-center line-clamp-1">
                {wallet.name}
              </span>

              {/* Status or checkmark */}
              {isSelected ? (
                <CheckCircle2 className="w-5 h-5 text-brand-green absolute top-2 right-2" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-emerald-500/60 absolute top-2 right-2 animate-pulse" />
              )}

              {/* Instant support details indicator */}
              <span className="text-[10px] text-gray-500 font-body-narrow mt-1">
                Activo • 24hs
              </span>
            </div>
          );
        })}
      </div>

      {/* Action alert box explaining that registrations & plays happen via WhatsApp */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-brand-green/5 border border-brand-green/15 rounded-xl gap-4">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-headline font-bold text-white block">
              ¿Cómo cargar saldo y retirar ganancias?
            </span>
            <span className="text-xs text-on-surface-variant block mt-0.5">
              Enviá un WhatsApp informando qué billetera utilizás (p. ej. Mercado Pago). El cajero te pasará los datos al instante. Retiros en un máximo de 10 minutos.
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            if (onCargarAhora) {
              onCargarAhora();
            } else {
              const el = document.getElementById("whatsapp-action-btn");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="text-xs font-bold text-brand-green hover:text-brand-green-hover transition-colors shrink-0 flex items-center gap-1 cursor-pointer hover:underline"
        >
          Cargar ahora &rarr;
        </button>
      </div>
    </div>
  );
}
