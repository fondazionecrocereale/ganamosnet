/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MessageSquare, Shield, HelpCircle, User, Star, Wallet, Home, Gamepad, Award, ChevronUp } from "lucide-react";
import PaymentCarousel from "./components/PaymentCarousel";
import LiveWithdrawals from "./components/LiveWithdrawals";
import CommentsSection from "./components/CommentsSection";
import SlotsGrid from "./components/SlotsGrid";
import { trackPixelEvent } from "./utils/pixel";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track landing page ViewContent on mount
  useEffect(() => {
    trackPixelEvent("ViewContent");
  }, []);

  // Monitor screen scroll to add sticky glass styling to top bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsAppConcierge = (gameTitle?: string, walletName?: string, shouldTrackContact = false) => {
    if (shouldTrackContact) {
      trackPixelEvent("Contact");
    }
    
    // Core message as requested: "hola quiero un usuario"
    let messageText = "hola quiero un usuario";
    if (gameTitle) {
      messageText += ` para jugar ${gameTitle}`;
    }
    if (walletName) {
      messageText += ` con ${walletName}`;
    }
    
    const encodedMessage = encodeURIComponent(messageText);
    const link = `https://wa.me/5492236837099?text=${encodedMessage}`;
    
    let opened = false;
    try {
      const newWin = window.open(link, "_blank", "noopener,noreferrer");
      if (newWin && !newWin.closed && typeof newWin.closed !== "undefined") {
        opened = true;
      }
    } catch (e) {
      opened = false;
    }

    if (!opened) {
      // Introduce a 250ms delay so that the Facebook Pixel has enough time to securely
      // transmit the 'Contact' request over the network before the window reloads or navigates.
      setTimeout(() => {
        window.location.href = link;
      }, 250);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-brand-green selection:text-black pb-20 md:pb-0">
      


      {/* Hero Section Container */}
      <section className="relative min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden pt-24" id="inicio-seccion">
        {/* Background bokeh overlay */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Midnight Casino Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.38] transition-opacity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyQqsRG-bUCjhq2xmKNB6UI3orEJqwlUC5LjsqIIcdGmYuXnCVTt2HkbloG2dI0U2Aibj_dZkJSqauHRclfqCULGf9X0BwMfhENzTF4wyNNxy3Z_1vGiGHIRNk9q-lE0A2PFi7hcj0EJQY2RR2ZJNyKljlUpDiKuCaXev6rN9ce2UElSTLv3Me7rzS-Kk1PXuF4WU-Ji7VpsScayoStTj6fxR5QmOUtmKioIV_NWs3ASM26sXXCp-A74QeJAvIGLfsd3_rKV-MkA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-transparent to-transparent" />
        </div>

        {/* Hero Interactive Elements */}
        <div className="relative z-10 text-center px-6 md:px-8 max-w-4xl pt-10">
          <div className="inline-block bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full mb-6">
            <span className="text-brand-green font-headline text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              GANAMOS.net
            </span>
          </div>
          
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            LA SUERTE TE <span className="text-brand-green">ESPERA</span>
          </h1>
          
          <p className="font-sans text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Depósitos instantáneos, retiros rápidos y la mejor atención personalizada. Tu casino de confianza disponible las 24 horas.
          </p>

          <div id="whatsapp-action-btn" className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={() => openWhatsAppConcierge(undefined, undefined, true)}
              className="group relative inline-flex items-center justify-center gap-3 bg-brand-green text-bg-deep font-headline font-black text-xl md:text-2xl px-8 py-5 md:px-12 md:py-6 rounded-2xl shadow-[0_0_35px_rgba(0,228,118,0.4)] hover:shadow-[0_0_55px_rgba(0,228,118,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <MessageSquare className="w-6 h-6 md:w-8 md:h-8 fill-current text-bg-deep shrink-0 animate-bounce" />
              <span>HABLAR POR WHATSAPP</span>
              <div className="absolute inset-0 rounded-2xl border-2 border-white/25 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
            <p className="text-gray-400 text-xs md:text-sm font-sans italic mt-2">
              🎰 Cargá fichas con tu billetera virtual en segundos.
            </p>
          </div>
        </div>
      </section>

      {/* Main Structural Bento Grid Area */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-16 relative z-20 -mt-16 md:-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Left area: Payment & Slot Grid */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Payment Systems Carousel */}
            <PaymentCarousel
              onSelectWallet={(walletName) => openWhatsAppConcierge(undefined, walletName)}
              onCargarAhora={() => openWhatsAppConcierge()}
            />

            {/* Slots Bento List */}
            <SlotsGrid
              onPlayGame={(gameTitle) => openWhatsAppConcierge(gameTitle)}
              onCargarSaldo={() => openWhatsAppConcierge()}
            />

          </div>

          {/* Right Area: Dynamic Sidebar Activity Feed */}
          <aside className="lg:col-span-1 space-y-8" id="testimonios-seccion">
            
            {/* Real-time withdrawals list */}
            <LiveWithdrawals />

            {/* Social review comments with direct addition form */}
            <CommentsSection />

            {/* Security Guarantee Badge panel */}
            <div className="p-5 bg-gradient-to-br from-bg-dark/60 to-bg-deep/80 rounded-3xl border border-white/5 space-y-3.5">
              <div className="flex gap-3 items-start">
                <HelpCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-headline text-xs font-bold text-white uppercase tracking-wider">Atención VIP</h5>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
                    Soporte directo uno a uno. Sin bots tediosos, resolvemos tus dudas de inmediato con calidez y eficacia.
                  </p>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </section>

      {/* Compact Interactive FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-12 border-t border-white/5" id="contacto-seccion">
        <h3 className="font-headline text-center text-xl md:text-2xl font-bold text-white tracking-wide mb-8">
          Preguntas Frecuentes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <strong className="text-white font-headline block mb-1">¿Cuánto demoran los retiros?</strong>
            <span className="text-gray-400 leading-relaxed block">
              Nuestro compromiso de calidad garantiza que recibas tus ganancias en tu billetera virtual (Mercado Pago, Cuenta DNI, Banco) en un máximo de 5 a 10 minutos una vez solicitado al concierge.
            </span>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <strong className="text-white font-headline block mb-1">¿Hay un monto mínimo de carga?</strong>
            <span className="text-gray-400 leading-relaxed block">
              El mínimo de carga de fichas es de solo $1.000 ARS. Podés cargar utilizando cualquiera de nuestras billeteras electrónicas disponibles 24hs.
            </span>
          </div>
        </div>
      </section>

      {/* Warning Sticky Footer Bar */}
      <footer className="relative w-full border-t border-white/10 bg-bg-deep pt-12 pb-24 md:pb-12 mt-12">
        <div className="flex flex-col items-center gap-6 px-6 md:px-8 max-w-7xl mx-auto text-center">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center p-1">
              <span className="text-brand-green text-xs font-black">G</span>
            </div>
            <span className="font-headline text-lg font-black tracking-widest text-[#fff]">
              GANAMOS<span className="text-brand-green">.net</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-headline font-semibold">
            <button onClick={() => alert("GANAMOS.net utiliza algoritmos RNG certificados.")} className="hover:text-brand-gold transition-colors cursor-pointer">Seguridad de Juego</button>
            <button onClick={() => alert("Prohibido el acceso a menores de 18 años.")} className="hover:text-brand-gold transition-colors cursor-pointer">Política de Edad</button>
            <button onClick={() => openWhatsAppConcierge(undefined, undefined, true)} className="hover:text-brand-gold transition-colors cursor-pointer">Soporte Concierge</button>
          </div>

          {/* Strict Responsible Gaming Warning Sign board */}
          <div className="flex items-start md:items-center gap-3 py-4 px-6 border border-red-500/20 bg-red-500/5 rounded-xl max-w-2xl">
            <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5 md:mt-0" />
            <p className="text-red-400 font-headline font-bold text-[10px] md:text-xs text-left leading-snug">
              SOLO PARA MAYORES DE 18 AÑOS. EL JUEGO COMPULSIVO ES PERJUDICIAL PARA LA SALUD. JUGÁ CON RESPONSABILIDAD.
            </p>
          </div>

          <p className="text-[11px] text-gray-500 mt-2 font-mono">
            © 2026 GANAMOS.net. Todos los derechos reservados. Play Responsibly.
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          title="Subir"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </footer>

      {/* Mobile Sticky Navigation Floating Bar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-bg-deep/95 backdrop-blur-md border-t border-white/5 z-40 flex items-center justify-around h-16 px-4 pb-1">
        <a href="#inicio-seccion" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-green transition-all" aria-label="Inicio">
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-bold">Inicio</span>
        </a>
        <a href="#slots-seccion" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-green transition-all" aria-label="Slots">
          <Gamepad className="w-5 h-5" />
          <span className="text-[9px] font-semibold">Slots</span>
        </a>
        
        {/* Giant active quick-play support button */}
        <button
          onClick={() => openWhatsAppConcierge(undefined, undefined, true)}
          className="bg-brand-green text-bg-deep w-14 h-14 rounded-full flex items-center justify-center -translate-y-5 shadow-lg shadow-brand-green/30 border-4 border-bg-dark active:scale-95 transition-transform cursor-pointer"
          aria-label="Atención por Whatsapp"
        >
          <MessageSquare className="w-6 h-6 fill-current text-bg-deep" />
        </button>

        <a href="#pago-seccion" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-green transition-all" aria-label="Cargas">
          <Wallet className="w-5 h-5" />
          <span className="text-[9px] font-semibold">Cargar</span>
        </a>
        <a href="#testimonios-seccion" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-green transition-all" aria-label="Opiniones">
          <Award className="w-5 h-5" />
          <span className="text-[9px] font-semibold">Opiniones</span>
        </a>
      </nav>

    </div>
  );
}
