import type { ReactNode } from "react";
import { BadgeCheck, CalendarCheck, LockKeyhole } from "lucide-react";

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <section className="site-container py-10 md:py-14">
      <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-forest p-10 text-white lg:flex xl:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" aria-hidden />
          <div className="relative">
            <span className="inline-block overflow-hidden rounded-xl bg-[#050a07] p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Wênê" className="block h-10 w-auto" />
            </span>
          </div>
          <div className="relative">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-soft">Bienvenue sur Wênê</p>
            <h2 className="mt-4 font-display text-4xl leading-tight xl:text-5xl">
              Votre prochain grand moment commence ici.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Rejoignez une communauté d&apos;organisateurs et de talents qui créent ensemble des événements mémorables.
            </p>
            <ul className="mt-9 space-y-4 text-sm text-white/80">
              <li className="flex items-center gap-3"><BadgeCheck size={18} className="text-gold" /> Des profils vérifiés et soigneusement présentés</li>
              <li className="flex items-center gap-3"><CalendarCheck size={18} className="text-gold" /> Une demande de date en quelques clics</li>
              <li className="flex items-center gap-3"><LockKeyhole size={18} className="text-gold" /> Vos coordonnées protégées jusqu&apos;à la confirmation</li>
            </ul>
          </div>
          <p className="relative text-xs text-white/40">© 2026 Wênê · Fait au Bénin</p>
        </aside>

        <div className="p-7 sm:p-10 lg:p-12">{children}</div>
      </div>
    </section>
  );
}
