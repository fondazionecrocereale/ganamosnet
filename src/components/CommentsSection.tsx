import React, { useState } from "react";
import { ShieldCheck, Star, CornerDownRight, MessageSquare, Send } from "lucide-react";
import { ClientComment } from "../types";

const INITIAL_COMMENTS: ClientComment[] = [
  {
    id: "com-1",
    username: "@Santi_99",
    text: "Los pagos son instantáneos, excelente servicio.",
    rating: 5,
    timeAgo: "Hace 1 hora"
  },
  {
    id: "com-2",
    username: "@Valen_P",
    text: "La mejor atención por WhatsApp que recibí.",
    rating: 5,
    timeAgo: "Hace 3 horas"
  },
  {
    id: "com-3",
    username: "@Nico_Russo",
    text: "Cargué por Mercado Pago y a los 5 minutos ya estaba jugando. Muy recomendable.",
    rating: 5,
    timeAgo: "Hace 5 horas"
  }
];

export default function CommentsSection() {
  const [comments, setComments] = useState<ClientComment[]>(INITIAL_COMMENTS);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !text.trim()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    let cleanUser = username.trim();
    if (!cleanUser.startsWith("@")) {
      cleanUser = "@" + cleanUser;
    }

    const newComment: ClientComment = {
      id: "user-" + Date.now().toString(),
      username: cleanUser,
      text: text.trim(),
      rating: rating,
      timeAgo: "¡Recién!"
    };

    setComments([newComment, ...comments]);
    setUsername("");
    setText("");
    setRating(5);
    setError("");
    setSuccess(true);
    setShowForm(false);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="rounded-3xl p-6 border border-white/10 bg-bg-dark/40 backdrop-blur-xl relative">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-brand-green w-4 h-4 shrink-0" />
          <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider">
            Comentarios
          </h4>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setSuccess(false);
          }}
          className="text-xs text-brand-green hover:text-brand-green-hover font-bold hover:underline bg-white/5 px-2.5 py-1 rounded-full cursor-pointer border border-brand-green/20"
        >
          {showForm ? "Cancelar" : "Opinar"}
        </button>
      </div>

      {success && (
        <div className="p-3 mb-4 rounded-xl bg-brand-green/10 border border-brand-green/20 text-center text-xs text-brand-green font-headline font-bold animate-pulse">
          ¡Gracias! Tu opinión se ha publicado.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3">
          <p className="text-xs text-gray-300 font-headline font-semibold">Tus comentarios nos importan:</p>
          <div>
            <label htmlFor="usuario" className="block text-[10px] text-gray-400 font-headline uppercase mb-1">Tu usuario o nombre</label>
            <input
              id="usuario"
              type="text"
              placeholder="Ej: Santi_99"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-green"
              maxLength={25}
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-[10px] text-gray-400 font-headline uppercase mb-1">Calificación</label>
            <div className="flex gap-1" id="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= rating ? "text-brand-gold fill-brand-gold" : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="opinion" className="block text-[10px] text-gray-400 font-headline uppercase mb-1">Tu opinión</label>
            <textarea
              id="opinion"
              placeholder="¿Qué opinas del servicio o de los juegos?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-green h-16 resize-none"
              maxLength={120}
            />
          </div>
          
          {error && <div className="text-[10px] text-red-400 font-semibold">{error}</div>}

          <button
            type="submit"
            className="w-full bg-brand-green text-bg-deep font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-brand-green-hover transition-colors cursor-pointer"
          >
            <Send className="w-3 h-3" /> Publicar opinión
          </button>
        </form>
      )}

      <div className="space-y-3 max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
        {comments.map((comment) => (
          <div key={comment.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 relative group transition-colors hover:bg-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-xs font-bold font-headline">{comment.username}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-2.5 h-2.5 ${
                        s <= comment.rating ? "text-brand-gold fill-brand-gold" : "text-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-body-narrow">{comment.timeAgo}</span>
            </div>
            <p className="text-xs text-gray-300 italic font-body-narrow leading-relaxed">
              "{comment.text}"
            </p>
            <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-brand-green bg-brand-green/10 px-1 py-0.5 rounded flex items-center gap-0.5 uppercase tracking-wider font-bold">
                <ShieldCheck className="w-2.5 h-2.5" /> Verificado
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
