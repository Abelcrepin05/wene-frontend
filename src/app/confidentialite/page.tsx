import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Politique de confidentialité | Wênê" };

export default function Confidentialite() {
  return (
    <section className="site-container py-12 md:py-16">
      <Link href="/" className="lien-fleche"><ArrowLeft size={15} /> Retour à l&apos;accueil</Link>
      <div className="mx-auto mt-8 max-w-3xl">
        <p className="eyebrow"><LockKeyhole size={14} /> Vos données</p>
        <h1 className="mt-4 text-[clamp(2.2rem,4.5vw,3.4rem)]">Politique de confidentialité</h1>
        <div className="alert alert-info mt-6"><ShieldCheck size={17} className="shrink-0" /> Texte provisoire à faire valider par un juriste (loi béninoise sur les données personnelles, autorité APDP) avant la mise en ligne.</div>

        <div className="card mt-8 space-y-8 p-7 md:p-10">
          <div>
            <h2 className="text-xl">Données collectées</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Nom, e-mail, téléphone, informations de profil et demandes de date, uniquement pour faire fonctionner le service.</p>
          </div>
          <div className="filet pt-8">
            <h2 className="text-xl">Partage des coordonnées</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Vos coordonnées ne sont jamais publiques. Elles ne sont communiquées à l&apos;autre partie qu&apos;une fois la réservation confirmée par le talent.</p>
          </div>
          <div className="filet pt-8">
            <h2 className="text-xl">Vos droits</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Vous pouvez demander l&apos;accès, la correction ou la suppression de vos données à tout moment en écrivant à l&apos;équipe Wênê.</p>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted">Pour en savoir plus, consultez les{" "}
          <Link href="/conditions" className="font-bold text-forest-2 underline decoration-gold decoration-2 underline-offset-4">conditions d&apos;utilisation</Link>.
        </p>
      </div>
    </section>
  );
}
