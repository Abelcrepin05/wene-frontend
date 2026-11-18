import {
  Camera,
  Clapperboard,
  Disc3,
  Drama,
  Mic2,
  Music2,
  Palette,
  PenLine,
  Scissors,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Video,
  Volume2,
  type LucideIcon,
} from "lucide-react";

type Visuel = { icone: LucideIcon; from: string; to: string };

const VISUELS: Record<string, Visuel> = {
  Musicien: { icone: Music2, from: "#0f4b39", to: "#1c8060" },
  Chanteur: { icone: Mic2, from: "#5b2a48", to: "#b4637d" },
  DJ: { icone: Disc3, from: "#102a43", to: "#2f6f9e" },
  Humoriste: { icone: Drama, from: "#7a3b12", to: "#d28a35" },
  Danseur: { icone: Sparkles, from: "#3d1f5d", to: "#8a5bb5" },
  Comédien: { icone: Drama, from: "#5c2323", to: "#b4584b" },
  "Animateur / MC": { icone: Mic2, from: "#12503f", to: "#4b9571" },
  Photographe: { icone: Camera, from: "#263238", to: "#5f7d83" },
  Vidéaste: { icone: Video, from: "#2b2360", to: "#6b63ae" },
  "Maquilleur / coiffeur": { icone: Scissors, from: "#6a2e46", to: "#c47793" },
  "Couturier / styliste": { icone: Scissors, from: "#5f3d18", to: "#b3874c" },
  "Peintre / plasticien": { icone: Palette, from: "#1f4f5b", to: "#4e9ca6" },
  Conteur: { icone: PenLine, from: "#3f3120", to: "#9a7950" },
  "Poète / slameur": { icone: PenLine, from: "#2d3b2a", to: "#719365" },
  Magicien: { icone: Sparkles, from: "#31215c", to: "#7a63bb" },
  Modèle: { icone: Sparkles, from: "#632f3f", to: "#ba7181" },
  "Technicien son & lumière": { icone: Volume2, from: "#152a38", to: "#3b7284" },
  "Régisseur / organisateur": { icone: ShieldCheck, from: "#123f33", to: "#3f8265" },
  Traiteur: { icone: UtensilsCrossed, from: "#6b3516", to: "#c98143" },
  "Sécurité événementielle": { icone: ShieldCheck, from: "#1c2b33", to: "#4c6874" },
};

const PAR_DEFAUT: Visuel = { icone: Clapperboard, from: "#123f33", to: "#3f8265" };

export default function TalentVisual({
  discipline,
  nom,
  photoUrl,
  className = "",
}: {
  discipline: string;
  nom: string;
  photoUrl?: string | null;
  className?: string;
}) {
  const visuel = VISUELS[discipline] ?? PAR_DEFAUT;
  const Icone = visuel.icone;

  if (photoUrl) {
    return (
      <div className={`relative overflow-hidden bg-cream-2 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoUrl} alt={`Portrait de ${nom}`} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(145deg, ${visuel.from}, ${visuel.to})` }}
      aria-label={`Illustration ${discipline}`}
      role="img"
    >
      <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border border-white/20" aria-hidden />
      <div className="absolute -right-2 -top-8 h-36 w-36 rounded-full border border-white/10" aria-hidden />
      <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-white/10 blur-xl" aria-hidden />
      <svg className="absolute inset-x-0 bottom-0 h-2/3 w-full text-white/10" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
        <path d="M0 140 C70 90 120 180 200 120 C280 60 330 150 400 95 L400 200 L0 200 Z" fill="currentColor" />
        <path d="M0 170 C80 120 140 200 220 150 C300 100 350 175 400 140 L400 200 L0 200 Z" fill="currentColor" opacity=".6" />
      </svg>
      <Icone size={104} strokeWidth={0.8} className="absolute right-5 top-5 text-white/20" aria-hidden />
      <span className="absolute bottom-4 left-5 font-display text-5xl leading-none text-white/90">
        {nom.charAt(0)}
      </span>
      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm" aria-hidden>
        <Icone size={15} strokeWidth={2} />
      </span>
    </div>
  );
}
