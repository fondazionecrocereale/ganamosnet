import { useState } from "react";
import { ArrowRight, Sparkles, Play, Info, RotateCcw, HelpCircle, Star, Coins } from "lucide-react";
import { SlotGame } from "../types";
import { trackPixelEvent } from "../utils/pixel";

interface SlotsGridProps {
  onPlayGame: (gameTitle: string) => void;
  onCargarSaldo?: () => void;
}

export const GAMES: SlotGame[] = [
  {
    id: "jokers",
    title: "Joker's Jewels",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYjbnEFERU_JCga5-pLVrxa5IzgtWSmceAQYIWRYUHqSXzmMR8LkMwXLrTlk36-0iU80hc1isfr48mQlEVwopyyX9qHxmow43RTSL6rUURyv0PZCljinhxddww8zv-no0jJCXY4L6FmKEbCKAp2_ZGVpIcBbGN39Qn-4eE6T_RYEYfbPGUqLjWCe9zgQ1aSgddNic244DeCJ0AitZigRzusNG3844_7psMViXGDx8txq4vzJgTmnq1WJOxD3FAPcgo6w_nvaJPRQ",
    isFeatured: true,
    rtp: "96.50%",
    volatility: "Alta",
    maxWin: "x5,000",
    description: "Un juego clásico y sofisticado que reinterpreta las tradicionales máquinas tragamonedas con el icónico bufón elegante como protagonista en un entorno lujoso y de alta tensión.",
    category: "Slots"
  },
  {
    id: "buffalo",
    title: "Buffalo Gold",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuChkFYNpiPZCkUtZhCDGoSgyZZ4wSAG94zpHfmhSo7fHRNnm5wVNtQj8KYS8uaaTKzLADpmwHVOn5yjHXbs3aTh-Fx3FICrZdPGGEak3g8koqqdLmlRRMz2Fu1hvv1eVcHxRhg11tp1d-PK3IQp2jhtqBCpKtUktwkth5HNhQ1S_QimfIhHURAxAL2OqsK6Kg8L-UWZYZ2hSa0_u-gy_hQxNDLS9023GQkz9FiY8WgjAcuOUuvKFa4sf3RTrd6HbjTzYPJsBYH5_w",
    rtp: "96.01%",
    volatility: "Alta",
    maxWin: "x8,100",
    description: "Recorre las llanuras en busca del búfalo de oro. Un sistema dinámico de multiplicadores salvajes te espera con multiplicadores de jackpot espectaculares.",
    category: "Slots"
  },
  {
    id: "luckysevens",
    title: "Lucky Sevens",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyN03Nt7EyC00NmDx7Ufltsy1zAkYKzVcDsWn7YePDHpIhKRG7kStX8X174m4pJ_TExC6xqHv8rX-_SES1ZLIG871fBxd84sCVWan7D2JWzz3z0tM2vgvJkwk7mIj3CY7QSZuiqMMPFegbH4aUAlfhtSWzMJiFcgfIwSNpoUGAMZ2LcpoehCBVqAZVBh_OsxBKKYPgUILgttN1yb_IOEUAE3E6MBDSEH2EMHpcCrRUQfT9jInnDQ67_3BC74svCOplnuIL1Hm7ZQ",
    rtp: "95.80%",
    volatility: "Media",
    maxWin: "x2,500",
    description: "Siente el tacto clásico de las fichas de casino reales en un entorno retro futurista guiado por neón violeta y oro de alta gama.",
    category: "Slots"
  },
  {
    id: "roulette",
    title: "Roulette Pro",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkBlV3b8xbn_92n2JxRUGOutK4SqwxPOQ9Vi3nwjWDeKECHrcMG0HkhNDL9bYT9drrIowp74PhkcXifq9GXYuxK3Po51xPUApV2gydGna36_YB-y6g9AEddZaQNhDK38_eTdsVAk10I49d98AU_DahZYiQNMrl5QqOBjz4XUAoE3S_5vCPbHiXcqX7ruZARq5Fwx83OU7lu9FyTTNwmZj65rA1RN_zLh0zH75UL9bynXel4RHGLw30IES0iR1daQRO5kGysJXhfA",
    rtp: "97.30%",
    volatility: "Media",
    maxWin: "x35 (Pleno)",
    description: "La auténtica ruleta premium europea con madera noble pulida, latón de primera calidad y física ultra realista. Ideal para aplicar tus mejores estrategias de juego.",
    category: "Ruleta"
  },
  {
    id: "poker",
    title: "High Stakes Poker",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo-4cYtx2CiaZNZxZHjiUKH8F21w0qaKRZCm_s9nuY6XhlpQTFy2dg26VLKNERnRbHGSxbpJ6b2BiiT6IApKod4vHASWbAWGAW1Mofm0eiCMOdd--rGdA6WFMcnDfA9ouj4LAOA1_ba7cQax_LrQVe-VqDsDNCMPg0d6lDoPxZ7h-mp7pcIepK9Fh40zPwLAXcrx5Bdc6kB38L9AF7hqe-u7YTd5lDccvFgdICSaIzdnOl31KDkQGnP3fE8d4PchRM-DXqaB8JUw",
    rtp: "98.90%",
    volatility: "Baja",
    maxWin: "x1,000",
    description: "La mesa de cartas más exclusiva. Pon a prueba tus habilidades de farol en un ambiente moderno y pulido de apuestas altas diseñado para verdaderos competidores destacados.",
    category: "Cartas"
  },
];

const SLOT_REEL_SYMBOLS = ["🍒", "👑", "💎", "🎰", "🔔", "🌟", "🍇", "🍋"];

export default function SlotsGrid({ onPlayGame, onCargarSaldo }: SlotsGridProps) {
  const [selectedGame, setSelectedGame] = useState<SlotGame | null>(null);
  
  // Interactive mini-game demo states
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState<string[]>(["🎰", "💎", "🎰"]);
  const [demoBalance, setDemoBalance] = useState(1000); // simulated tokens
  const [demoPrize, setDemoPrize] = useState<string | null>(null);
  const [showDemoApp, setShowDemoApp] = useState(false);

  const startDemoGame = (game: SlotGame) => {
    setSelectedGame(game);
    setShowDemoApp(false);
    setDemoPrize(null);
  };

  const handleDemoSpin = () => {
    if (isSpinning || demoBalance < 50) return;
    setIsSpinning(true);
    setDemoPrize(null);
    setDemoBalance((prev) => prev - 50);

    // Simulated staggered spin intervals
    let spinsLeft = 10;
    const interval = setInterval(() => {
      setReels([
        SLOT_REEL_SYMBOLS[Math.floor(Math.random() * SLOT_REEL_SYMBOLS.length)],
        SLOT_REEL_SYMBOLS[Math.floor(Math.random() * SLOT_REEL_SYMBOLS.length)],
        SLOT_REEL_SYMBOLS[Math.floor(Math.random() * SLOT_REEL_SYMBOLS.length)],
      ]);
      spinsLeft--;

      if (spinsLeft <= 0) {
        clearInterval(interval);
        
        // Resolve outcome final symbols
        const finalReels = [
          SLOT_REEL_SYMBOLS[Math.floor(Math.random() * SLOT_REEL_SYMBOLS.length)],
          SLOT_REEL_SYMBOLS[Math.floor(Math.random() * SLOT_REEL_SYMBOLS.length)],
          SLOT_REEL_SYMBOLS[Math.floor(Math.random() * SLOT_REEL_SYMBOLS.length)],
        ];

        // Ensure high demo hit rate so users enjoy
        if (Math.random() < 0.4) {
          const matchSym = SLOT_REEL_SYMBOLS[Math.floor(Math.random() * 4)]; // Cherry, crown, diamond, slot
          finalReels[0] = matchSym;
          finalReels[1] = matchSym;
          finalReels[2] = matchSym;
        }

        setReels(finalReels);
        setIsSpinning(false);

        // Check payouts of final reels
        const [r1, r2, r3] = finalReels;
        if (r1 === r2 && r2 === r3) {
          let multiplier = 5;
          if (r1 === "🎰") multiplier = 50;
          else if (r1 === "💎") multiplier = 25;
          else if (r1 === "👑") multiplier = 15;
          else if (r1 === "🍒") multiplier = 10;

          const prizeAmount = 50 * multiplier;
          setDemoBalance((b) => b + prizeAmount);
          setDemoPrize(`¡TRIPLE COINCIDENCIA! Ganaste $${prizeAmount} fichas demo (x${multiplier}) 🎉`);
        } else if (r1 === r2 || r2 === r3 || r1 === r3) {
          const prizeAmount = 75;
          setDemoBalance((b) => b + prizeAmount);
          setDemoPrize(`¡Doble coincidencia! Ganaste $${prizeAmount} fichas demo 🌟`);
        } else {
          setDemoPrize("No hubo coincidencia esta vez. ¡Probá de nuevo!");
        }
      }
    }, 100);
  };

  return (
    <div id="slots-seccion">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white leading-none">
            Slots <span className="text-brand-gold">Populares</span>
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Los juegos autorizados con mayor tasa de devolución (RTP) del mercado internacional.
          </p>
        </div>
        <button
          onClick={() => {
            if (onCargarSaldo) {
              onCargarSaldo();
            } else {
              const el = document.getElementById("pago-seccion");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="text-brand-green font-headline font-bold text-sm tracking-wide flex items-center gap-1.5 hover:underline bg-brand-green/10 border border-brand-green/20 px-4 py-2 rounded-full cursor-pointer active:scale-95 transition-all"
        >
          Cargar Saldo <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bento Grid slots layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* BIG Feature Slot - Joker's Jewels */}
        {GAMES.filter(g => g.isFeatured).map((game) => (
          <div
            key={game.id}
            className="sm:col-span-2 sm:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer obsidian-card hover:border-brand-green/40 transition-all duration-500 min-h-[350px] shadow-lg shadow-black/40"
          >
            <img
              alt={game.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
              src={game.imageUrl}
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/45 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/70 via-transparent to-transparent z-10" />

            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-red-400 font-headline font-bold text-[10px] uppercase tracking-widest jackpot-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
                HOT NOW
              </div>
              
              <h3 className="font-headline text-3xl md:text-5xl font-black text-white mb-2 leading-none">
                {game.title}
              </h3>
              
              <p className="text-gray-300 text-xs font-body-narrow max-w-md line-clamp-2 md:line-clamp-3 mb-6">
                {game.description}
              </p>

              <div className="flex flex-wrap gap-4 items-center mb-5 w-full border-t border-white/5 pt-4">
                <div className="text-left">
                  <span className="block text-[9px] text-gray-400 uppercase font-headline">RTP Garantizado</span>
                  <strong className="text-white text-sm font-semibold">{game.rtp}</strong>
                </div>
                <div className="text-left border-l border-white/10 pl-4">
                  <span className="block text-[9px] text-gray-400 uppercase font-headline">Volatilidad</span>
                  <strong className="text-brand-gold text-sm font-semibold">{game.volatility}</strong>
                </div>
                <div className="text-left border-l border-white/10 pl-4">
                  <span className="block text-[9px] text-gray-400 uppercase font-headline">Premio Máximo</span>
                  <strong className="text-brand-green text-sm font-black">{game.maxWin}</strong>
                </div>
              </div>

              <div className="flex gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => startDemoGame(game)}
                  className="flex-1 sm:flex-none bg-brand-green text-bg-deep hover:bg-brand-green-hover font-headline font-black text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,228,118,0.3)] hover:scale-[1.03] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-bg-deep" /> PROBAR DEMO
                </button>
                <button
                  type="button"
                  onClick={() => onPlayGame(game.title)}
                  className="flex-1 sm:flex-none bg-white/5 border border-white/15 text-white font-headline font-bold text-xs px-4 py-3 rounded-xl transition-all hover:bg-white/10 hover:border-white/30 flex items-center justify-center gap-1 cursor-pointer"
                >
                  CONCIERGE VIP
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Regular list items */}
        {GAMES.filter(g => !g.isFeatured).map((game) => (
          <div
            key={game.id}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-bg-deep border border-white/10 shadow-lg hover:border-brand-green/30 hover:shadow-brand-green/5 transition-all duration-300 flex flex-col justify-end"
          >
            <img
              alt={game.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.75]"
              src={game.imageUrl}
            />
            {/* Card gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

            <div className="p-4 z-20 relative flex flex-col items-start w-full">
              <span className="text-[9px] text-brand-gold font-headline font-bold uppercase bg-brand-gold/10 px-1.5 py-0.5 rounded border border-brand-gold/10 mb-1">
                {game.category}
              </span>
              <h4 className="font-headline text-lg font-bold text-white tracking-wide leading-tight group-hover:text-brand-green duration-200">
                {game.title}
              </h4>
              <p className="text-[10px] text-gray-400 font-body-narrow mt-0.5">
                RTP: {game.rtp} • {game.volatility}
              </p>
              
              <div className="mt-3.5 flex gap-1.5 w-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <button
                  type="button"
                  onClick={() => startDemoGame(game)}
                  className="flex-1 bg-white text-bg-deep font-headline font-bold text-[10px] py-1.5 rounded-lg text-center hover:bg-gray-100 transition-colors uppercase shrink-0"
                >
                  Spin Demo
                </button>
                <button
                  type="button"
                  onClick={() => onPlayGame(game.title)}
                  className="p-1 px-1.5 bg-brand-green text-bg-deep font-bold rounded-lg text-xs hover:bg-brand-green-hover text-center transition-colors shrink-0"
                  title="Jugar por WhatsApp"
                >
                  Concierge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quick Spin Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl rounded-2xl border border-brand-gold/20 bg-bg-dark text-white shadow-2xl p-6 md:p-8 animate-scale-up overflow-hidden">
            
            {/* Decorator light panels */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold via-brand-green to-brand-purple" />
            
            <button
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-xl font-bold font-mono px-1">×</span>
            </button>

            {/* Game Card Header Info */}
            <div className="flex gap-4 items-start mb-6">
              <img
                src={selectedGame.imageUrl}
                alt={selectedGame.title}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <div>
                <span className="text-[10px] text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/15 font-bold uppercase font-headline">
                  Prueba de Demostración
                </span>
                <h3 className="font-headline text-2xl font-black text-white mt-1">
                  {selectedGame.title}
                </h3>
                <p className="text-xs text-gray-400 leading-snug font-body-narrow mt-0.5 line-clamp-2">
                  {selectedGame.description}
                </p>
              </div>
            </div>

            {/* Interactive Trial Engine Container */}
            <div className="bg-bg-deep/80 border border-white/10 p-5 rounded-2xl text-center mb-6 relative">
              <div className="absolute -top-3 right-4 bg-brand-green/10 border border-brand-green/20 text-brand-green px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-headline flex items-center gap-1">
                <Coins className="w-3 h-3" /> FICHAS DEMO
              </div>

              {/* Reels Area */}
              <div className="flex items-center justify-center gap-3 md:gap-4 my-5">
                {reels.map((symbol, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-20 md:w-20 md:h-24 rounded-xl border flex items-center justify-center text-4xl md:text-5xl select-none shadow-inner transition-transform duration-100 ${
                      isSpinning ? "animate-pulse scale-95 border-brand-purple bg-brand-purple/5" : "border-white/15 bg-white/5"
                    }`}
                  >
                    {symbol}
                  </div>
                ))}
              </div>

              {/* Demo Stats feedback */}
              <div className="flex justify-between items-center bg-black/40 px-4 py-2 rounded-xl text-xs font-headline font-semibold text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span>Tu saldo de prueba:</span>
                  <strong className="text-brand-green font-mono text-sm">${demoBalance.toLocaleString("es-AR")}</strong>
                </div>
                {demoBalance < 50 && (
                  <button
                    onClick={() => setDemoBalance(1500)}
                    className="text-[10px] text-brand-gold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Recargar saldo gratis
                  </button>
                )}
                <span>Costo: 50 fichas</span>
              </div>

              {/* Spin Prize Notification alerts */}
              {demoPrize && (
                <div className={`mt-3 p-2.5 rounded-xl text-xs text-center font-headline font-bold transition-all duration-300 ${
                  demoPrize.includes("coincidencia") ? "bg-brand-gold/10 border border-brand-gold/20 text-brand-gold animate-bounce" : "bg-white/5 text-gray-400"
                }`}>
                  {demoPrize}
                </div>
              )}

              {/* Demo Action Play triggers */}
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  disabled={isSpinning || demoBalance < 50}
                  onClick={handleDemoSpin}
                  className="flex-1 bg-gradient-to-r from-brand-gold to-[#ffd13a] text-black font-headline font-bold text-sm py-3 rounded-xl transition-all shadow-[0_0_12px_rgba(255,225,109,0.2)] hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer uppercase flex items-center justify-center gap-1"
                >
                  {isSpinning ? "GIRANDO..." : "GIRAR TRAGAMONEDAS PRUEBA"}
                </button>
              </div>
            </div>

            {/* Direct Real VIP WhatsApp conversion point */}
            <div className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-300 font-headline font-semibold block">
                  ¿Te quedaste con ganas de ganar en serio?
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5 font-body-narrow">
                  Hablale al premier concierge, carga saldo y jugá al {selectedGame.title} original con pagos instantáneos garantizados.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onPlayGame(selectedGame.title);
                  setSelectedGame(null);
                }}
                className="w-full sm:w-auto bg-brand-green text-bg-deep font-headline font-black text-xs px-4 py-2.5 rounded-lg text-center shadow-lg hover:bg-brand-green-hover whitespace-nowrap transition-colors cursor-pointer"
              >
                JUGAR DE VERDAD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
