import Link from "next/link";
import { ArrowUpRight, AtSign, Clock3, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-forest text-white">
      <div className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-48 left-1/4 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" aria-hidden />

      <div className="site-container relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="inline-block overflow-hidden rounded-xl bg-[#050a07] p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Wênê" className="block h-12 w-auto" />
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              La plateforme qui met en lumière les talents d&apos;Afrique de l&apos;Ouest et simplifie leur réservation pour vos événements.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="flex items-center gap-2"><MapPin size={15} className="text-gold" /> Cotonou, Bénin</span>
              <span className="flex items-center gap-2"><Clock3 size={15} className="text-gold" /> Réponse directe sous 48h</span>
            </div>
          </div>

          <nav aria-label="Navigation du pied de page">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold">Explorer</p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link href="/talents" className="inline-flex items-center gap-1 transition hover:text-white">Tous les talents <ArrowUpRight size={13} /></Link></li>
              <li><Link href="/trouver" className="inline-flex items-center gap-1 transition hover:text-white">Chercher par budget <ArrowUpRight size={13} /></Link></li>
              <li><Link href="/#metiers" className="inline-flex items-center gap-1 transition hover:text-white">Les métiers <ArrowUpRight size={13} /></Link></li>
              <li><Link href="/inscription" className="inline-flex items-center gap-1 transition hover:text-white">Devenir talent <ArrowUpRight size={13} /></Link></li>
            </ul>
          </nav>

          <nav aria-label="Informations légales">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold">Informations</p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link href="/#comment-ca-marche" className="transition hover:text-white">Comment ça marche</Link></li>
              <li><Link href="/connexion" className="transition hover:text-white">Mon compte</Link></li>
              <li><Link href="/conditions" className="transition hover:text-white">Conditions d&apos;utilisation</Link></li>
              <li><Link href="/confidentialite" className="transition hover:text-white">Confidentialité</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/50 sm:flex-row">
          <p>© 2026 Wênê. Tous droits réservés. Fait avec fierté au Bénin.</p>
          <p className="flex items-center gap-2">
            <AtSign size={14} /> Suivez le mouvement Wênê
          </p>
        </div>
      </div>
    </footer>
  );
}
