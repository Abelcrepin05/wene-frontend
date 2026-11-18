import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound, UserRoundCog } from "lucide-react";
import { inscription } from "@/app/actions";
import AuthShell from "@/components/AuthShell";

export default async function Inscription({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  return (
    <AuthShell>
      <p className="eyebrow">Rejoindre Wênê</p>
      <h1 className="mt-4 text-3xl md:text-4xl">Créer mon compte</h1>
      <p className="mt-3 text-sm text-muted">Quelques informations et vous voilà prêt à commencer.</p>

      {erreur && <div role="alert" className="alert alert-error mt-6">{erreur}</div>}

      <form action={inscription} className="mt-8 space-y-5">
        <fieldset>
          <legend className="label-champ">Je suis</legend>
          <div className="mt-2 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
            <label className="group relative flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-white p-4 transition has-[:checked]:border-forest has-[:checked]:bg-forest/5">
              <input type="radio" name="role" value="organisateur" defaultChecked className="mt-0.5 accent-[#0d3b2c]" />
              <span>
                <UserRound size={18} className="text-forest-2" />
                <span className="mt-1.5 block text-sm font-bold">Organisateur</span>
                <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted">Je réserve des talents</span>
              </span>
            </label>
            <label className="group relative flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-white p-4 transition has-[:checked]:border-forest has-[:checked]:bg-forest/5">
              <input type="radio" name="role" value="talent" className="mt-0.5 accent-[#0d3b2c]" />
              <span>
                <UserRoundCog size={18} className="text-forest-2" />
                <span className="mt-1.5 block text-sm font-bold">Artiste / prestataire</span>
                <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted">Je propose mes services</span>
              </span>
            </label>
          </div>
        </fieldset>

        <label className="label-champ">Nom complet ou nom de scène
          <input name="nom" required placeholder="Ex. Awa Diallo" className="champ" />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="label-champ">E-mail
            <input name="email" type="email" required autoComplete="email" placeholder="vous@exemple.com" className="champ" />
          </label>
          <label className="label-champ">Téléphone
            <input name="telephone" type="tel" autoComplete="tel" placeholder="01 02 03 04 05" className="champ" />
          </label>
        </div>
        <label className="label-champ">Mot de passe (8 caractères minimum)
          <input name="motdepasse" type="password" minLength={8} required autoComplete="new-password" className="champ" />
        </label>

        <p className="text-xs leading-relaxed text-muted">
          En créant un compte, vous acceptez les{" "}
          <Link href="/conditions" className="font-semibold text-forest-2 underline decoration-gold decoration-2 underline-offset-2">conditions d&apos;utilisation</Link>{" "}
          et la{" "}
          <Link href="/confidentialite" className="font-semibold text-forest-2 underline decoration-gold decoration-2 underline-offset-2">politique de confidentialité</Link>.
        </p>
        <button className="btn btn-primary btn-lg btn-block">Créer mon compte <ArrowRight size={17} /></button>
      </form>

      <div className="filet mt-8 pt-6 text-sm text-muted">
        Déjà inscrit ?{" "}
        <Link href="/connexion" className="font-bold text-forest-2 underline decoration-gold decoration-2 underline-offset-4">Connexion</Link>
      </div>
      <p className="mt-5 flex items-start gap-2 rounded-xl bg-cream px-4 py-3 text-xs leading-relaxed text-muted">
        <CalendarDays size={15} className="mt-0.5 shrink-0 text-forest-2" /> Un compte talent vous permet de publier votre profil et de répondre aux demandes reçues.
      </p>
    </AuthShell>
  );
}
