import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Conditions d'utilisation | Wênê" };

export default function Conditions() {
  return (
    <section className="site-container py-12 md:py-16">
      <Link href="/" className="lien-fleche"><ArrowLeft size={15} /> Retour à l&apos;accueil</Link>
      <div className="mx-auto mt-8 max-w-3xl">
        <p className="eyebrow"><FileText size={14} /> Informations légales</p>
        <h1 className="mt-4 text-[clamp(2.2rem,4.5vw,3.4rem)]">Conditions d&apos;utilisation</h1>
        <div className="alert alert-info mt-6"><ShieldCheck size={17} className="shrink-0" /> Texte provisoire à faire valider par un juriste avant la mise en ligne.</div>

        <div className="card mt-8 space-y-8 p-7 md:p-10">
          <div>
            <h2 className="text-xl">Objet</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Wênê met en relation des organisateurs d&apos;événements et des artistes ou prestataires. Wênê n&apos;est pas partie au contrat conclu entre eux.</p>
          </div>
          <div className="filet pt-8">
            <h2 className="text-xl">Tarifs et réservation</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Les tarifs affichés sont indicatifs, en FCFA. Une réservation est confirmée lorsque le talent accepte la demande ; les parties conviennent ensuite directement des modalités.</p>
          </div>
          <div className="filet pt-8">
            <h2 className="text-xl">Profils et comportement</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Les profils sont vérifiés avant publication. Tout contenu trompeur ou abusif peut être signalé et entraîner la suspension du compte.</p>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted">Une question ? Consultez aussi notre{" "}
          <Link href="/confidentialite" className="font-bold text-forest-2 underline decoration-gold decoration-2 underline-offset-4">politique de confidentialité</Link>.
        </p>
      </div>
    </section>
  );
}
