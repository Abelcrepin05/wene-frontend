import {
  Camera,
  Clapperboard,
  Disc3,
  Mic2,
  Music2,
  Sparkles,
  UtensilsCrossed,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { PortfolioProjet } from "@/lib/types";

const ICONES: Record<string, LucideIcon> = {
  Musicien: Music2,
  Chanteur: Mic2,
  DJ: Disc3,
  "Animateur / MC": Mic2,
  Photographe: Camera,
  Vidéaste: Video,
  Traiteur: UtensilsCrossed,
  Danseur: Sparkles,
};

const PALETTES = [
  ["#0d3b2c", "#258761"],
  ["#102a43", "#3a7fa8"],
  ["#5b2a48", "#bd718f"],
  ["#6b3516", "#d08b42"],
  ["#2b2360", "#7169b8"],
  ["#263238", "#62848a"],
];

export default function PortfolioVisual({
  projet,
  discipline,
  index = 0,
  className = "",
}: {
  projet: PortfolioProjet;
  discipline: string;
  index?: number;
  className?: string;
}) {
  const Icone = ICONES[discipline] ?? Clapperboard;
  const [from, to] = PALETTES[index % PALETTES.length];

  if (projet.image_url) {
    return (
      <div className={`relative overflow-hidden bg-cream-2 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={projet.image_url} alt={projet.titre} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}
      role="img"
      aria-label={`Visuel du projet ${projet.titre}`}
    >
      <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-white/20" aria-hidden />
      <div className="absolute -left-16 -bottom-20 h-64 w-64 rounded-full border border-white/10" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
      <svg className="absolute inset-0 h-full w-full text-white/10" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden>
        <path d={`M0 ${160 + index * 14} Q100 ${90 + index * 10} 200 ${170 - index * 8} T400 ${130 + index * 12}`} fill="none" stroke="currentColor" strokeWidth="2" />
        <path d={`M0 ${205 + index * 8} Q120 ${140 + index * 8} 230 ${200 - index * 6} T400 ${175 + index * 10}`} fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <Icone size={92} strokeWidth={0.8} className="absolute right-6 top-6 text-white/25" aria-hidden />
      <span className="absolute bottom-4 left-5 font-display text-3xl leading-none text-white/90">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-white/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {projet.categorie}
      </span>
    </div>
  );
}
