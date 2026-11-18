import Link from "next/link";
import { ArrowRight, PiggyBank, SearchX, Sparkles, Wallet } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SearchForm from "@/components/SearchForm";
import TalentCard from "@/components/TalentCard";
import { getTalents } from "@/lib/data";
import { formatFcfa } from "@/lib/format";

export const dynamic = "force-dynamic";

const BUDGETS = [25000, 50000, 100000, 200000];

/** Recherche selon le budget (F4, RG5) : seuls les talents au tarif de départ ≤ budget. */
export default async function SelonBudget({
  searchParams,
}: {
  searchParams: Promise<{ discipline?: string; ville?: string; budget?: string; date?: string }>;
}) {
  const params = await searchParams;
  const budget = Number(params.budget) || 0;
  const talents = budget
    ? await getTalents({ discipline: params.discipline, ville: params.ville, budget, date: params.date })
    : [];

  const lienBudget = (montant: number) => {
    const query = new URLSearchParams({ budget: String(montant) });
    if (params.discipline) query.set("discipline", params.discipline);
    if (params.ville) query.set("ville", params.ville);
    if (params.date) query.set("date", params.date);
    return "/trouver?" + query.toString();
  };

  return (
    <>
      <PageHeader
        eyebrow="Recherche intelligente"
        titre="Chercher selon mon budget"
        description="Indiquez votre enveloppe, votre ville et votre date. Wênê vous présente les talents dont le tarif de départ correspond, du moins cher au plus cher."
      />

      <section className="site-container py-6">
        <SearchForm action="/trouver" avecBudget valeurs={params} />

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 flex items-center gap-1.5 text-xs font-bold text-muted"><PiggyBank size={15} /> Budgets fréquents :</span>
          {BUDGETS.map((montant) => (
            <Link
              key={montant}
              href={lienBudget(montant)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                budget === montant
                  ? "border-forest bg-forest text-white"
                  : "border-line bg-white text-ink hover:border-forest hover:text-forest"
              }`}
            >
              {formatFcfa(montant)}
            </Link>
          ))}
        </div>

        {budget > 0 ? (
          <>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted" aria-live="polite">
                <span className="font-bold text-ink">{talents.length}</span> talent{talents.length > 1 ? "s" : ""} jusqu&apos;à{" "}
                <span className="font-bold text-forest-2">{formatFcfa(budget)}</span>
              </p>
              <span className="pill"><Sparkles size={13} /> Trié par tarif croissant</span>
            </div>

            {talents.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {talents.map((talent) => <TalentCard key={talent.id} talent={talent} />)}
              </div>
            ) : (
              <div className="card mx-auto mt-8 max-w-lg px-8 py-14 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cream text-forest-2"><SearchX size={28} /></span>
                <h2 className="mt-5 text-2xl">Aucun talent dans ce budget</h2>
                <p className="mt-3 text-sm text-muted">Essayez d&apos;augmenter l&apos;enveloppe, de changer de ville ou d&apos;élargir le métier recherché.</p>
                <Link href="/talents" className="btn btn-primary mt-7">Parcourir tous les talents <ArrowRight size={16} /></Link>
              </div>
            )}
          </>
        ) : (
          <div className="card mt-12 flex flex-col items-center px-8 py-14 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-forest text-gold"><Wallet size={28} /></span>
            <h2 className="mt-5 text-2xl">Votre budget, vos possibilités</h2>
            <p className="mt-3 max-w-md text-sm text-muted">Renseignez votre enveloppe dans le formulaire ci-dessus ou choisissez un budget fréquent pour voir les profils correspondants.</p>
          </div>
        )}
      </section>
    </>
  );
}
