import Link from "next/link";
import { ArrowRight, SearchX, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SearchForm from "@/components/SearchForm";
import TalentCard from "@/components/TalentCard";
import { getTalents } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Talents({
  searchParams,
}: {
  searchParams: Promise<{ discipline?: string; ville?: string }>;
}) {
  const { discipline, ville } = await searchParams;
  const talents = await getTalents({ discipline, ville });

  return (
    <>
      <PageHeader
        eyebrow="Le répertoire"
        titre={discipline ? `Nos talents ${discipline.toLowerCase()}` : "Répertoire des talents"}
        description="Des profils vérifiés, présentés avec leur métier, leur ville et leur tarif de départ. Le contact direct se fait une fois votre demande confirmée."
      />

      <section className="site-container py-6">
        <SearchForm valeurs={{ discipline, ville }} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            <span className="font-bold text-ink">{talents.length}</span> profil{talents.length > 1 ? "s" : ""} trouvé{talents.length > 1 ? "s" : ""}
            {discipline && <> pour <span className="font-semibold text-forest-2">{discipline}</span></>}
            {ville && <> à <span className="font-semibold text-forest-2">{ville}</span></>}
          </p>
          <span className="pill"><Sparkles size={13} /> Classé par tarif</span>
        </div>

        {talents.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {talents.map((talent) => <TalentCard key={talent.id} talent={talent} />)}
          </div>
        ) : (
          <div className="card mx-auto mt-8 max-w-lg px-8 py-14 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cream text-forest-2"><SearchX size={28} /></span>
            <h2 className="mt-5 text-2xl">Aucun profil ne correspond</h2>
            <p className="mt-3 text-sm text-muted">Essayez un autre métier ou une autre ville, ou parcourez l&apos;ensemble du répertoire.</p>
            <Link href="/talents" className="btn btn-primary mt-7">Voir tous les talents <ArrowRight size={16} /></Link>
          </div>
        )}
      </section>
    </>
  );
}
