import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, LockKeyhole } from "lucide-react";
import { connexion } from "@/app/actions";
import AuthShell from "@/components/AuthShell";

export default async function Connexion({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string; inscrit?: string }>;
}) {
  const { erreur, inscrit } = await searchParams;

  return (
    <AuthShell>
      <p className="eyebrow">Espace personnel</p>
      <h1 className="mt-4 text-3xl md:text-4xl">Content de vous revoir</h1>
      <p className="mt-3 text-sm text-muted">Connectez-vous pour gérer vos demandes et votre profil.</p>

      {inscrit && (
        <div role="status" className="alert alert-success mt-6">
          <CheckCircle2 size={17} className="shrink-0" /> Compte créé. Confirmez votre e-mail si un message vous a été envoyé, puis connectez-vous.
        </div>
      )}
      {erreur && <div role="alert" className="alert alert-error mt-6">{erreur}</div>}

      <form action={connexion} className="mt-8 space-y-5">
        <label className="label-champ">Adresse e-mail
          <span className="relative block">
            <Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input name="email" type="email" required autoComplete="email" placeholder="vous@exemple.com" className="champ !pl-11" />
          </span>
        </label>
        <label className="label-champ">Mot de passe
          <span className="relative block">
            <LockKeyhole size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input name="motdepasse" type="password" required autoComplete="current-password" placeholder="Votre mot de passe" className="champ !pl-11" />
          </span>
        </label>
        <button className="btn btn-primary btn-lg btn-block">Se connecter <ArrowRight size={17} /></button>
      </form>

      <div className="filet mt-8 pt-6 text-sm text-muted">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-bold text-forest-2 underline decoration-gold decoration-2 underline-offset-4">Créer un compte</Link>
      </div>
      <p className="mt-5 rounded-xl bg-cream px-4 py-3 text-xs leading-relaxed text-muted">
        Démonstration : utilisez n&apos;importe quelle adresse e-mail. Une adresse contenant « talent » ouvre un compte artiste.
      </p>
    </AuthShell>
  );
}
