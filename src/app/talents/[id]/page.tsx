import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { creerDemande } from "@/app/actions";
import PortfolioVisual from "@/components/PortfolioVisual";
import TalentVisual from "@/components/TalentVisual";
import { getTalent, getUser } from "@/lib/data";
import { formatFcfa } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function FicheTalent({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { id } = await params;
  const { erreur } = await searchParams;
  const talent = await getTalent(id);
  if (!talent) notFound();
  const user = await getUser();

  return (
    <>
      <div className="site-container pt-8">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="transition hover:text-forest">Accueil</Link>
          <ChevronRight size={13} />
          <Link href="/talents" className="transition hover:text-forest">Répertoire</Link>
          <ChevronRight size={13} />
          <span className="font-semibold text-ink">{talent.nom}</span>
        </nav>
        <Link href="/talents" className="lien-fleche mt-5"><ArrowLeft size={15} /> Retour au répertoire</Link>
      </div>

      <section className="site-container grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
        <div>
          <div className="relative overflow-hidden rounded-[2rem] shadow-card">
            <TalentVisual
              discipline={talent.discipline}
              nom={talent.nom}
              photoUrl={talent.photo_url}
              className="h-[280px] w-full sm:h-[420px]"
            />
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-forest shadow-sm">
              <BadgeCheck size={15} /> Profil vérifié
            </span>
          </div>

          <div className="card mt-6 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill">{talent.discipline}</span>
              <span className="pill"><MapPin size={12} /> {talent.ville}, Bénin</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl">{talent.nom}</h1>

            <h2 className="mt-8 text-xl">À propos</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
              {talent.presentation || "Aucune présentation renseignée pour le moment."}
            </p>

            <div className="filet mt-8 grid gap-4 pt-6 sm:grid-cols-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-forest-2" />
                <p className="text-xs leading-relaxed text-muted"><span className="block font-bold text-ink">Profil vérifié</span>Identité contrôlée par Wênê</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-forest-2" />
                <p className="text-xs leading-relaxed text-muted"><span className="block font-bold text-ink">Selon son agenda</span>Le talent accepte votre date</p>
              </div>
              <div className="flex items-start gap-2.5">
                <LockKeyhole size={18} className="mt-0.5 shrink-0 text-forest-2" />
                <p className="text-xs leading-relaxed text-muted"><span className="block font-bold text-ink">Contact privé</span>Partagé après confirmation</p>
              </div>
            </div>
          </div>

          {talent.portfolio.length > 0 && (
            <div className="card mt-6 p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">Portfolio</p>
                  <h2 className="mt-3 text-xl">Quelques réalisations</h2>
                </div>
                <Link href={`/talents/${talent.id}/portfolio`} className="lien-fleche">
                  Voir les {talent.portfolio.length} projets <ArrowRight size={16} />
                </Link>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {talent.portfolio.slice(0, 3).map((projet, index) => (
                  <Link
                    key={projet.id}
                    href={`/talents/${talent.id}/portfolio`}
                    className="group overflow-hidden rounded-2xl border border-line transition hover:border-forest"
                  >
                    <PortfolioVisual
                      projet={projet}
                      discipline={talent.discipline}
                      index={index}
                      className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <p className="truncate px-3 py-2.5 text-xs font-bold">{projet.titre}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside id="demande" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          {talent.portfolio.length > 0 && (
            <Link href={`/talents/${talent.id}/portfolio`} className="btn btn-outline btn-block mb-4">
              Voir le portfolio ({talent.portfolio.length}) <ArrowRight size={16} />
            </Link>
          )}
          <div className="card overflow-hidden">
            <div className="bg-forest px-6 py-5 text-white">
              <p className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold-soft"><Wallet size={14} /> Tarif indicatif</p>
              <p className="mt-2 font-display text-3xl">{formatFcfa(talent.tarif_depart)}</p>
              <p className="mt-1 text-xs text-white/60">Prix de départ, à confirmer avec le talent.</p>
            </div>

            <div className="p-6">
              <h2 className="text-xl">Envoyer une demande de date</h2>
              <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-muted">
                <Sparkles size={15} className="mt-0.5 shrink-0 text-forest-2" />
                Vos coordonnées ne sont partagées qu&apos;après l&apos;accord du talent.
              </p>

              {erreur && <div role="alert" className="alert alert-error mt-4">{erreur}</div>}

              {user?.role === "organisateur" ? (
                <form action={creerDemande} className="mt-5 space-y-3.5">
                  <input type="hidden" name="talent_id" value={talent.id} />
                  <label className="label-champ">Date de l&apos;événement
                    <input name="date_evenement" type="date" required className="champ" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="label-champ">Début
                      <input name="heure_debut" type="time" className="champ" />
                    </label>
                    <label className="label-champ">Fin
                      <input name="heure_fin" type="time" className="champ" />
                    </label>
                  </div>
                  <label className="label-champ">Lieu
                    <input name="lieu" required placeholder="Ex. Palais des congrès, Cotonou" className="champ" />
                  </label>
                  <label className="label-champ">Type d&apos;événement
                    <input name="type_evenement" required placeholder="Mariage, concert, réception..." className="champ" />
                  </label>
                  <label className="label-champ">Message (facultatif)
                    <textarea name="message" placeholder="Parlez-lui brièvement de votre projet..." className="champ" />
                  </label>
                  <button className="btn btn-primary btn-block">Envoyer la demande <ArrowLeft size={16} className="rotate-180" /></button>
                  <p className="flex items-center justify-center gap-1.5 text-[0.7rem] text-muted"><Clock3 size={13} /> Réponse directe dans votre espace</p>
                </form>
              ) : user ? (
                <div className="mt-5">
                  <p className="text-sm text-muted">Seuls les comptes organisateurs peuvent envoyer une demande.</p>
                  <Link href="/espace" className="btn btn-outline btn-block mt-5">Aller à mon espace</Link>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  <p className="text-sm text-muted">Connectez-vous avec un compte organisateur pour envoyer votre demande.</p>
                  <Link href="/connexion" className="btn btn-primary btn-block">Connexion</Link>
                  <Link href="/inscription" className="btn btn-outline btn-block">Créer un compte</Link>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-cream-2 p-4 text-xs text-muted">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-forest-2" />
            Aucun paiement n&apos;est demandé sur Wênê : l&apos;accord final se fait directement entre vous et le talent.
          </div>
        </aside>
      </section>
    </>
  );
}
