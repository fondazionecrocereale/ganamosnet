import { useState, useEffect } from "react";
import { Play, Pause, TrendingUp, Sparkles, Trophy } from "lucide-react";
import { Withdrawal } from "../types";

const INITIAL_WITHDRAWALS: Withdrawal[] = [
  {
    id: "init-1",
    username: "Josefina R.",
    amount: 15000,
    method: "Mercado Pago",
    timestamp: "¡Recién!",
    isWin: false,
  },
  {
    id: "init-2",
    username: "Marcos G.",
    amount: 42300,
    method: "Joker's Jewels",
    timestamp: "Hace 2 min",
    isWin: true,
    game: "Joker's Jewels",
  },
  {
    id: "init-3",
    username: "Lucía M.",
    amount: 8500,
    method: "Cuenta DNI",
    timestamp: "Hace 5 min",
    isWin: false,
  },
];

const MOCK_NAMES = [
  "Sofía G.", "Diego M.", "Valentina P.", "Bautista S.", "Julieta V.",
  "Mateo F.", "Camila D.", "Tomás O.", "Enzo B.", "Martina S.", "Santi_99"
];

const MOCK_AMOUNTS = [
  5000, 12000, 25000, 50000, 8500, 95000, 3500, 150000, 42000, 18000
];

const MOCK_METHODS = ["Mercado Pago", "Cuenta DNI", "Brubank", "Ualá"];
const MOCK_GAMES = ["Joker's Jewels", "Buffalo Gold", "Lucky Sevens", "Roulette Pro", "High Stakes"];

export default function LiveWithdrawals() {
  const [items, setItems] = useState<Withdrawal[]>(INITIAL_WITHDRAWALS);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Create new randomized activity item
      const isWinActivity = Math.random() < 0.40; // 40% chance it's a Slot win, 60% chance it's a withdrawal
      const username = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
      const amount = MOCK_AMOUNTS[Math.floor(Math.random() * MOCK_AMOUNTS.length)];
      const id = "sim-" + Date.now();

      let newItem: Withdrawal;

      if (isWinActivity) {
        const game = MOCK_GAMES[Math.floor(Math.random() * MOCK_GAMES.length)];
        newItem = {
          id,
          username,
          amount,
          method: game,
          timestamp: "¡Recién!",
          isWin: true,
          game,
        };
      } else {
        const method = MOCK_METHODS[Math.floor(Math.random() * MOCK_METHODS.length)];
        newItem = {
          id,
          username,
          amount,
          method,
          timestamp: "¡Recién!",
          isWin: false,
        };
      }

      setItems((prev) => {
        // Create copies on state updates with timestamps updated
        const updatedPrev = prev.map((item, idx) => {
          let updatedTime = item.timestamp;
          if (item.timestamp === "¡Recién!") {
            updatedTime = "Hace 1 min";
          } else if (item.timestamp.startsWith("Hace 1 min")) {
            updatedTime = "Hace 3 min";
          } else if (item.timestamp.startsWith("Hace 3 min")) {
            updatedTime = "Hace 6 min";
          } else if (item.timestamp.startsWith("Hace 5 min")) {
            updatedTime = "Hace 10 min";
          } else if (item.timestamp.startsWith("Hace 2 min")) {
            updatedTime = "Hace 5 min";
          }
          return { ...item, timestamp: updatedTime };
        });

        return [newItem, ...updatedPrev].slice(0, 5);
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="rounded-3xl p-6 border border-brand-green/20 bg-bg-dark/80 backdrop-blur-xl glow-green relative">
      {/* Background neon effect */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-brand-green/5 blur-2xl rounded-full" />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green"></span>
          </span>
          <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider">
            Retiros en Vivo
          </h4>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-md bg-white/5 hover:bg-white/10"
          title={isPaused ? "Reanudar transmisión" : "Pausar transmisión"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
        </button>
      </div>

      <div className="space-y-3.5 h-[340px] overflow-y-auto custom-scrollbar pr-1">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border backdrop-blur-md transition-all duration-500 hover:border-brand-green/30 group ${
                item.isWin
                  ? "bg-brand-gold/5 border-brand-gold/15"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-2.5 items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      item.isWin
                        ? "bg-brand-gold/10 text-brand-gold"
                        : "bg-brand-green/10 text-brand-green"
                    }`}
                  >
                    {item.isWin ? (
                      <Trophy className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-white font-medium">
                      <span className="text-gray-200 font-bold">{item.username}</span>{" "}
                      {item.isWin ? "ganó" : "retiró"}{" "}
                      <span
                        className={`font-black tracking-wide ${
                          item.isWin ? "text-brand-gold font-body-narrow" : "text-brand-green font-body-narrow"
                        }`}
                      >
                        ${item.amount.toLocaleString("es-AR")}
                      </span>
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {item.isWin ? `en ${item.game}` : `vía ${item.method}`}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-brand-green/80 font-bold shrink-0 whitespace-nowrap bg-brand-green/5 px-1.5 py-0.5 rounded border border-brand-green/10">
                  {item.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust stats badge */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-body-narrow">
        <div className="flex items-center gap-1 shadow-sm">
          <TrendingUp className="w-3 h-3 text-brand-green" />
          <span>Concierge promedio: <strong className="text-white">90 seg</strong></span>
        </div>
        <div className="text-right">
          <span>Éxito de pago: <strong className="text-brand-green">99.9%</strong></span>
        </div>
      </div>
    </div>
  );
}
