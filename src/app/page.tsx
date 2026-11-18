import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Camera,
  Disc3,
  MapPin,
  MessageCircle,
  Mic2,
  Music2,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Video,
  Volume2,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import HeroArt from "@/components/HeroArt";
import Reveal from "@/components/Reveal";
import SearchForm from "@/components/SearchForm";
import TalentCard from "@/components/TalentCard";
import { getTalents } from "@/lib/data";

export const dynamic = "force-dynamic";

const VILLES = ["Porto-Novo", "Abomey-Calavi", "Lomé", "Abidjan", "Dakar", "Accra", "Lagos", "Douala", "Ouagadougou", "Bamako", "Cotonou"];

const METIERS: { nom: string; icone: LucideIcon; teinte: string }[] = [
  { nom: "Musicien", icone: Music2, teinte: "from-[#0f4b39] to-[#22855f]" },
  { nom: "DJ", icone: Disc3, teinte: "from-[#102a43] to-[#3a7fa8]" },
  { nom: "Chanteur", icone: Mic2, teinte: "from-[#6b2e4f] to-[#bc708c]" },
  { nom: "Photographe", icone: Camera, teinte: "from-[#263238] to-[#62848a]" },
  { nom: "Vidéaste", icone: Video, teinte: "from-[#2b2360] to-[#7068b4]" },
  { nom: "Animateur / MC", icone: Mic2, teinte: "from-[#12503f] to-[#4b9571]" },
  { nom: "Traiteur", icone: UtensilsCrossed, teinte: "from-[#6b3516] to-[#c98143]" },
  { nom: "Technicien son & lumière", icone: Volume2, teinte: "from-[#152a38] to-[#3b7284]" },
];

const ETAPES = [
  {
    titre: "Explorez les profils",
    texte: "Parcourez les talents vérifiés, leurs métiers, leurs villes et leurs tarifs de départ affichés en FCFA.",
    icone: Search,
  },
  {
    titre: "Envoyez votre demande",
    texte: "Indiquez la date, les horaires et le lieu. Vos coordonnées restent privées tant que le talent n'a pas accepté.",
    icone: CalendarDays,
  },
  {
    titre: "Confirmez en direct",
    texte: "Le talent accepte ou refuse. Une fois confirmée, la réservation vous met directement en relation.",
    icone: MessageCircle,
  },
];

export default async function Accueil() {
  const talents = await getTalents({ limite: 4 });
  const talentVedette = talents[0];

  return (
    <>
      {/* Héro */}
      <section className="relative overflow-hidden pb-8 pt-12 md:pt-16">
        <div className="site-container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="apparition">
            <span className="pill"><Sparkles size={13} /> La scène commence ici</span>
            <h1 className="mt-6 text-[clamp(2.7rem,5.6vw,4.9rem)] leading-[1.03]">
              Vos événements méritent <span className="italic-display texte-foret">les plus beaux</span> talents.
            </h1>
            <p className="section-lead mt-6">
              Musiciens, DJ, photographes et prestataires vérifiés : trouvez la personne idéale, comparez les tarifs en toute transparence et réservez sans intermédiaire.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/talents" className="btn btn-primary btn-lg">
                Explorer les talents <ArrowRight size={17} />
              </Link>
              <Link href="/trouver" className="btn btn-outline btn-lg">Chercher par budget</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-muted">
              <span className="flex items-center gap-2"><BadgeCheck size={17} className="text-forest-2" /> Profils vérifiés</span>
              <span className="flex items-center gap-2"><Wallet size={17} className="text-forest-2" /> Tarifs transparents</span>
              <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-forest-2" /> Contact protégé</span>
            </div>
          </div>

          {talentVedette && <HeroArt talent={talentVedette} />}
        </div>

        <div className="site-container relative mt-14">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold">Commencez votre recherche</p>
            <p className="text-xs text-muted">Vous avez une enveloppe précise ?{" "}
              <Link href="/trouver" className="font-bold text-forest-2 underline decoration-gold decoration-2 underline-offset-4">Chercher selon mon budget</Link>
            </p>
          </div>
          <SearchForm />
        </div>
      </section>

      {/* Bande de villes */}
      <section className="mt-20 overflow-hidden bg-forest py-4" aria-label="Villes couvertes">
        <div className="masque-defile flex w-max gap-10 whitespace-nowrap" aria-hidden>
          <div className="defile flex gap-10">
            {[...VILLES, ...VILLES].map((ville, i) => (
              <span key={i} className="flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft/90">
                {ville} <span className="h-1 w-1 rounded-full bg-gold" />
              </span>
            ))}
          </div>
          <div className="defile flex gap-10">
            {[...VILLES, ...VILLES].map((ville, i) => (
              <span key={i} className="flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft/90">
                {ville} <span className="h-1 w-1 rounded-full bg-gold" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Talents à la une */}
      <section className="site-container py-20 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Sélection Wênê</p>
              <h2 className="section-title mt-4">Des talents prêts à faire vibrer votre événement</h2>
              <p className="section-lead mt-3">Des profils publiés avec soin, une présentation claire et un tarif annoncé dès la fiche.</p>
            </div>
            <Link href="/talents" className="lien-fleche">Voir tous les talents <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {talents.map((talent, i) => (
            <Reveal key={talent.id} delay={i * 80}>
              <TalentCard talent={talent} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Métiers */}
      <section id="metiers" className="site-container scroll-mt-24 py-16 md:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Explorer par métier</p>
            <h2 className="section-title mt-4">Le bon talent pour chaque moment</h2>
            <p className="section-lead mt-3">Mariage, concert, séance photo ou réception d&apos;entreprise : accédez directement aux spécialités les plus demandées.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {METIERS.map(({ nom, icone: Icone, teinte }, i) => (
            <Reveal key={nom} delay={i * 50}>
              <Link
                href={`/talents?discipline=${encodeURIComponent(nom)}`}
                className="group card card-hover flex h-full min-h-[8.5rem] flex-col justify-between overflow-hidden p-4 sm:min-h-[9.5rem] sm:p-5"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${teinte} text-white shadow-md transition group-hover:scale-110`}>
                  <Icone size={21} strokeWidth={1.8} />
                </span>
                <span className="mt-4 flex items-end justify-between gap-2">
                  <span className="min-w-0 break-words font-display text-sm leading-tight sm:text-lg">{nom}</span>
                  <ArrowRight size={16} className="mb-1 hidden shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-forest min-[380px]:block" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="scroll-mt-24 bg-white/70 py-20 md:py-24">
        <div className="site-container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow eyebrow-centered justify-center">Comment ça marche</p>
              <h2 className="section-title mt-4">Trois étapes, zéro complication</h2>
              <p className="section-lead mx-auto mt-3">De la première recherche à la confirmation, chaque étape est pensée pour vous faire gagner du temps.</p>
            </div>
          </Reveal>
          <div className="relative mt-14 grid gap-6 md:grid-cols-3">
            <div className="absolute left-1/2 top-8 hidden w-[62%] -translate-x-1/2 border-t-2 border-dashed border-gold/70 md:block" aria-hidden />
            {ETAPES.map(({ titre, texte, icone: Icone }, i) => (
              <Reveal key={titre} delay={i * 120}>
                <div className="card relative h-full p-7 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-gold shadow-lg">
                    <Icone size={24} strokeWidth={1.8} />
                  </span>
                  <span className="mt-5 block font-display text-4xl text-gold">0{i + 1}</span>
                  <h3 className="mt-2 text-xl">{titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deux publics */}
      <section className="site-container py-20 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-forest p-8 text-white shadow-lift md:p-10">
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-2xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-emerald-300/10 blur-2xl" aria-hidden />
              <div className="relative">
                <span className="pill pill-gold !bg-gold/15 !text-gold-soft">Pour les organisateurs</span>
                <h2 className="mt-5 max-w-md text-3xl md:text-4xl">Vous préparez un événement inoubliable ?</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                  Définissez votre budget et votre date. Nous vous montrons les talents disponibles qui correspondent, avec un tarif affiché et une demande en quelques clics.
                </p>
                <Link href="/trouver" className="btn btn-gold mt-8">Simuler selon mon budget <ArrowRight size={16} /></Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card relative h-full overflow-hidden rounded-[2rem] border-gold/50 p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-2xl" aria-hidden />
              <div className="relative">
                <span className="pill"><Sparkles size={13} /> Pour les artistes</span>
                <h2 className="mt-5 max-w-md text-3xl md:text-4xl">Votre talent mérite d&apos;être découvert</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  Publiez votre profil, votre présentation et votre tarif. Vous gardez la main sur chaque demande et acceptez uniquement les dates qui vous conviennent.
                </p>
                <Link href="/inscription" className="btn btn-primary mt-8">Publier mon profil <ArrowRight size={16} /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Témoignage */}
      <section className="site-container pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-cream-2 px-8 py-12 text-center md:px-16 md:py-14">
            <Quote size={42} className="mx-auto text-gold" strokeWidth={1.5} aria-hidden />
            <p className="mx-auto mt-5 max-w-3xl font-display text-2xl italic leading-snug md:text-3xl">
              « En quelques minutes, j&apos;ai comparé trois artistes, envoyé ma date et reçu une confirmation. Le jour J, tout était parfait. »
            </p>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm font-bold"><MapPin size={15} className="text-forest-2" /> Organisatrice · Cotonou</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
