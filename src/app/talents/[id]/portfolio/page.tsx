import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, ChevronRight, MapPin, Sparkles, Wallet } from "lucide-react";
import PortfolioGallery from "@/components/PortfolioGallery";
import TalentVisual from "@/components/TalentVisual";
import { getTalent } from "@/lib/data";
import { formatFcfa } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Portfolio({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const talent = await getTalent(id);
  if (!talent) notFound();

  return (
    <>
      <div className="site-container pt-8">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="transition hover:text-forest">Accueil</Link>
          <ChevronRight size={13} />
          <Link href="/talents" className="transition hover:text-forest">Répertoire</Link>
          <ChevronRight size={13} />
          <Link href={`/talents/${talent.id}`} className="transition hover:text-forest">{talent.nom}</Link>
          <ChevronRight size={13} />
          <span className="font-semibold text-ink">Portfolio</span>
        </nav>
        <Link href={`/talents/${talent.id}`} className="lien-fleche mt-5"><ArrowLeft size={15} /> Retour à la fiche</Link>
      </div>

      <section className="site-container pt-6">
        <div className="card relative overflow-hidden p-6 md:p-8">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-gold/15 blur-3xl" aria-hidden />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
            <TalentVisual
              discipline={talent.discipline}
              nom={talent.nom}
              photoUrl={talent.photo_url}
              className="h-36 w-full shrink-0 rounded-2xl md:w-48"
            />
            <div className="flex-1">
              <p className="eyebrow"><Sparkles size={14} /> Portfolio du talent</p>
              <h1 className="mt-3 text-3xl md:text-4xl">{talent.nom}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="pill">{talent.discipline}</span>
                <span className="pill"><MapPin size={12} /> {talent.ville}</span>
                <span className="pill"><BadgeCheck size={12} /> Vérifié</span>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2 md:w-52">
              <Link href={`/talents/${talent.id}#demande`} className="btn btn-primary btn-block">
                Envoyer une demande <ArrowRight size={16} />
              </Link>
              <Link href={`/talents/${talent.id}`} className="btn btn-outline btn-block">Voir la fiche complète</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Réalisations</p>
            <h2 className="section-title mt-4">Un aperçu de son travail</h2>
            <p className="section-lead mt-3">Cliquez sur une réalisation pour l&apos;ouvrir en grand et découvrir les détails du projet.</p>
          </div>
          <span className="pill pill-gold"><CalendarDays size={13} /> {talent.portfolio.length} projet{talent.portfolio.length > 1 ? "s" : ""}</span>
        </div>

        <div className="mt-9">
          <PortfolioGallery projets={talent.portfolio} discipline={talent.discipline} />
        </div>
      </section>

      <section className="site-container pb-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-8 py-12 text-white md:px-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="max-w-xl text-3xl md:text-4xl">Un projet similaire en tête ?</h2>
              <p className="mt-3 max-w-xl text-sm text-white/70">Envoyez votre date et votre lieu à {talent.nom}. Vos coordonnées restent privées jusqu&apos;à son accord.</p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Link href={`/talents/${talent.id}#demande`} className="btn btn-gold">Envoyer une demande <ArrowRight size={16} /></Link>
              <span className="flex items-center gap-1.5 text-xs text-white/70"><Wallet size={15} className="text-gold" /> À partir de {formatFcfa(talent.tarif_depart)}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
