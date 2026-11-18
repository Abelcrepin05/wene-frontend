import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Inbox, LayoutDashboard, Sparkles, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { enregistrerProfilTalent, repondreDemande } from "@/app/actions";
import StatusBadge from "@/components/StatusBadge";
import { getDemandes, getUser } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { DISCIPLINES } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Espace({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string; envoyee?: string; profil?: string }>;
}) {
  const { erreur, envoyee, profil } = await searchParams;
  const user = await getUser();
  if (!user) redirect("/connexion");

  const toutes = await getDemandes();
  const demandes = toutes.filter((d) =>
    user.role === "talent" ? d.talent_id === user.id : d.organisateur_contact.email === user.email,
  );
  const enAttente = demandes.filter((d) => d.statut === "en_attente").length;
  const confirmees = demandes.filter((d) => d.statut === "confirmee").length;

  const contacts = new Map<string, { nom: string; email: string; telephone: string | null }>();
  for (const d of demandes.filter((x) => x.statut === "confirmee")) {
    contacts.set(
      d.id,
      user.role === "talent"
        ? d.organisateur_contact
        : { nom: d.talent?.nom ?? "", email: "contact@wene.example", telephone: null },
    );
  }

  let profilTalent: { discipline: string; ville: string; presentation: string; tarif_depart: number } | null = null;
  try {
    const brut = (await cookies()).get("wene_profil")?.value;
    if (brut && user.role === "talent") profilTalent = JSON.parse(decodeURIComponent(brut));
  } catch {}

  return (
    <>
      <section className="relative overflow-hidden pb-6 pt-12">
        <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden />
        <div className="site-container relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow"><LayoutDashboard size={14} /> Tableau de bord</p>
            <h1 className="mt-4 text-[clamp(2.2rem,4.5vw,3.4rem)]">Bonjour {user.nom.split(" ")[0]}</h1>
            <p className="section-lead mt-3">
              {user.role === "talent"
                ? "Retrouvez votre profil et les demandes de réservation qui vous sont adressées."
                : "Suivez vos demandes et préparez sereinement votre prochain événement."}
            </p>
          </div>
          <span className="pill pill-gold"><Sparkles size={13} /> {user.role === "talent" ? "Compte artiste" : "Compte organisateur"}</span>
        </div>
      </section>

      <section className="site-container">
        {envoyee && <div role="status" className="alert alert-success mb-4"><CheckCircle2 size={17} className="shrink-0" /> Demande envoyée. Vous serez prévenu dès la réponse du talent.</div>}
        {profil && <div role="status" className="alert alert-success mb-4"><CheckCircle2 size={17} className="shrink-0" /> Profil enregistré. Il sera visible après validation par l&apos;équipe Wênê.</div>}
        {erreur && <div role="alert" className="alert alert-error mb-4">{erreur}</div>}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-gold"><Inbox size={21} /></span>
            <div><p className="font-display text-2xl">{demandes.length}</p><p className="text-xs text-muted">Demandes au total</p></div>
          </div>
          <div className="card flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-[#8a5a00]"><Clock3 size={21} /></span>
            <div><p className="font-display text-2xl">{enAttente}</p><p className="text-xs text-muted">En attente</p></div>
          </div>
          <div className="card flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10 text-forest"><CheckCircle2 size={21} /></span>
            <div><p className="font-display text-2xl">{confirmees}</p><p className="text-xs text-muted">Confirmées</p></div>
          </div>
        </div>

        {user.role === "talent" && (
          <div className="card mt-8 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/10 text-forest"><UserRoundCog size={20} /></span>
              <div>
                <h2 className="text-xl">Mon profil artiste</h2>
                <p className="mt-1 text-xs text-muted">
                  {profilTalent ? "Profil en attente de validation : il n'est pas encore visible du public." : "Renseignez votre profil pour être visible dans le répertoire après validation."}
                </p>
              </div>
            </div>
            <form action={enregistrerProfilTalent} className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="label-champ">Métier
                <select name="discipline" required defaultValue={profilTalent?.discipline ?? ""} className="champ">
                  <option value="" disabled>Choisir un métier</option>
                  {DISCIPLINES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>
              <label className="label-champ">Ville
                <input name="ville" required defaultValue={profilTalent?.ville ?? ""} placeholder="Cotonou" className="champ" />
              </label>
              <label className="label-champ">Tarif de départ (FCFA)
                <input name="tarif_depart" type="number" min={0} step={1000} required defaultValue={profilTalent?.tarif_depart ?? ""} className="champ" />
              </label>
              <label className="label-champ md:col-span-2">Présentation
                <textarea name="presentation" defaultValue={profilTalent?.presentation ?? ""} placeholder="Parlez de votre parcours et de vos prestations..." className="champ" />
              </label>
              <div className="md:col-span-2"><button className="btn btn-primary">Enregistrer mon profil <ArrowRight size={16} /></button></div>
            </form>
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Suivi</p>
            <h2 className="mt-3 text-2xl">{user.role === "talent" ? "Demandes reçues" : "Mes demandes"}</h2>
          </div>
          {user.role === "organisateur" && <Link href="/talents" className="lien-fleche">Trouver un autre talent <ArrowRight size={16} /></Link>}
        </div>

        {demandes.length === 0 ? (
          <div className="card mt-6 px-8 py-14 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cream text-forest-2"><CalendarDays size={28} /></span>
            <h3 className="mt-5 text-xl">Aucune demande pour le moment</h3>
            <p className="mt-2 text-sm text-muted">Les demandes apparaîtront ici dès qu&apos;elles seront envoyées.</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {demandes.map((d) => {
              const contact = contacts.get(d.id);
              return (
                <li key={d.id} className="card p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-xl">{d.type_evenement} · {formatDate(d.date_evenement)}</p>
                      <p className="mt-1 text-xs text-muted">
                        {d.lieu}
                        {d.heure_debut ? ` · de ${d.heure_debut.slice(0, 5)}` : ""}
                        {d.heure_fin ? ` à ${d.heure_fin.slice(0, 5)}` : ""}
                      </p>
                    </div>
                    <StatusBadge statut={d.statut} />
                  </div>
                  {d.message && <p className="mt-4 rounded-xl bg-cream px-4 py-3 text-sm text-muted">{d.message}</p>}
                  {contact && (
                    <div className="mt-4 rounded-xl bg-forest/5 px-4 py-3 text-sm text-forest">
                      <span className="font-bold">Coordonnées :</span> {contact.nom} · {contact.email}
                      {contact.telephone ? ` · ${contact.telephone}` : ""}
                    </div>
                  )}
                  {d.statut === "en_attente" && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {user.role === "talent" ? (
                        <>
                          <form action={repondreDemande}>
                            <input type="hidden" name="id" value={d.id} />
                            <input type="hidden" name="statut" value="confirmee" />
                            <button className="btn btn-primary btn-sm">Accepter la demande</button>
                          </form>
                          <form action={repondreDemande}>
                            <input type="hidden" name="id" value={d.id} />
                            <input type="hidden" name="statut" value="refusee" />
                            <button className="btn btn-outline btn-sm">Refuser</button>
                          </form>
                        </>
                      ) : (
                        <form action={repondreDemande}>
                          <input type="hidden" name="id" value={d.id} />
                          <input type="hidden" name="statut" value="annulee" />
                          <button className="btn btn-outline btn-sm">Annuler la demande</button>
                        </form>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
