import Link from "next/link";
import { ArrowUpRight, BadgeCheck, CalendarCheck, Music2, Sparkles } from "lucide-react";
import TalentVisual from "@/components/TalentVisual";
import { formatFcfa } from "@/lib/format";
import type { Talent } from "@/lib/types";

export default function HeroArt({ talent }: { talent: Talent }) {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[540px] lg:h-[470px]">
      <div className="absolute inset-0 rounded-[2.5rem] bg-forest shadow-[0_40px_90px_-45px_rgba(13,59,44,0.9)]" aria-hidden />
      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]" aria-hidden>
        <svg viewBox="0 0 540 470" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <radialGradient id="halo" cx="50%" cy="32%" r="60%">
              <stop offset="0%" stopColor="#f2bf3f" stopOpacity=".3" />
              <stop offset="100%" stopColor="#f2bf3f" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe9a8" stopOpacity=".28" />
              <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="540" height="470" fill="url(#halo)" />
          <path d="M150 0 L40 400 L200 400 Z" fill="url(#beam)" />
          <path d="M390 0 L500 400 L340 400 Z" fill="url(#beam)" />
          <circle cx="270" cy="185" r="150" fill="none" stroke="#fff" strokeOpacity=".09" />
          <circle cx="270" cy="185" r="112" fill="none" stroke="#fff" strokeOpacity=".07" />
          <path d="M0 370 Q135 320 270 370 T540 370 L540 470 L0 470 Z" fill="#072c20" fillOpacity=".55" />
          <g fill="#ffe9a8" fillOpacity=".5">
            <circle cx="62" cy="82" r="2" /><circle cx="468" cy="118" r="2.5" /><circle cx="410" cy="58" r="1.8" />
            <circle cx="110" cy="210" r="1.6" /><circle cx="486" cy="300" r="2" /><circle cx="70" cy="320" r="1.5" />
          </g>
        </svg>
      </div>

      <Music2 size={58} strokeWidth={1} className="absolute left-7 top-12 text-gold/30" aria-hidden />
      <Sparkles size={34} strokeWidth={1.2} className="absolute right-10 top-16 text-gold/50" aria-hidden />

      <Link
        href={`/talents/${talent.id}`}
        className="group absolute left-1/2 top-1/2 w-[72%] max-w-[330px] -translate-x-1/2 -translate-y-1/2 -rotate-[5deg] overflow-hidden rounded-[1.6rem] bg-white shadow-2xl transition duration-500 hover:-rotate-2 hover:scale-[1.03]"
      >
        <TalentVisual
          discipline={talent.discipline}
          nom={talent.nom}
          photoUrl={talent.photo_url}
          className="h-44 w-full sm:h-52"
        />
        <div className="p-4">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-forest-2">{talent.discipline}</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="font-display text-xl leading-tight">{talent.nom}</p>
            <ArrowUpRight size={18} className="text-forest-2 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <div className="filet mt-3 flex items-center justify-between pt-2.5 text-xs">
            <span className="text-muted">{talent.ville}</span>
            <span className="font-bold text-forest">{formatFcfa(talent.tarif_depart)}</span>
          </div>
        </div>
      </Link>

      <div className="glass flottement absolute right-2 top-[16%] flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-lg sm:right-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-white"><BadgeCheck size={16} /></span>
        <span className="text-xs font-bold leading-tight">Profil<br />vérifié</span>
      </div>

      <div className="glass flottement absolute bottom-[14%] left-5 hidden items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-lg sm:flex" style={{ animationDelay: "1.4s" }}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-ink"><CalendarCheck size={16} /></span>
        <span className="text-xs font-bold leading-tight">Disponible<br />pour votre date</span>
      </div>

      <div className="absolute bottom-6 right-6 rotate-6 rounded-full bg-gold px-4 py-2 text-xs font-extrabold text-ink shadow-lg">
        Réservation directe
      </div>
    </div>
  );
}
