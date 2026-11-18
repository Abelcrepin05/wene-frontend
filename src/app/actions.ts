"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  COOKIE_DEMANDES,
  COOKIE_USER,
  getDemandes,
  getTalent,
  getUser,
  type Demande,
  type SessionUser,
} from "@/lib/data";
import type { RequestStatus } from "@/lib/types";

/**
 * Actions serveur de DÉMONSTRATION : pas de backend, l'état est gardé dans des cookies.
 * À remplacer par de vrais appels API quand le backend sera branché.
 */

const OPTIONS_COOKIE = { path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax" as const };

function texte(formData: FormData, nom: string): string {
  return String(formData.get(nom) ?? "").trim();
}

function echec(page: string, message: string): never {
  redirect(`${page}?erreur=${encodeURIComponent(message)}`);
}

async function ouvrirSession(user: SessionUser) {
  (await cookies()).set(COOKIE_USER, encodeURIComponent(JSON.stringify(user)), OPTIONS_COOKIE);
}

async function sauverDemandes(demandes: Demande[]) {
  (await cookies()).set(COOKIE_DEMANDES, encodeURIComponent(JSON.stringify(demandes)), OPTIONS_COOKIE);
}

export async function inscription(formData: FormData) {
  const role = texte(formData, "role") === "talent" ? "talent" : "organisateur";
  const email = texte(formData, "email");
  if (!email) echec("/inscription", "E-mail obligatoire.");
  await ouvrirSession({
    id: `user-${Date.now()}`,
    nom: texte(formData, "nom") || "Sans nom",
    email,
    telephone: texte(formData, "telephone"),
    role,
  });
  redirect("/espace");
}

export async function connexion(formData: FormData) {
  const email = texte(formData, "email");
  if (!email) echec("/connexion", "E-mail ou mot de passe incorrect.");
  // Démo : tout e-mail est accepté. Un e-mail contenant « talent » ouvre un compte artiste.
  const role = email.toLowerCase().includes("talent") ? "talent" : "organisateur";
  await ouvrirSession({
    id: role === "talent" ? "demo-1" : "demo-org",
    nom: email.split("@")[0],
    email,
    telephone: "",
    role,
  });
  redirect("/espace");
}

export async function deconnexion() {
  (await cookies()).delete(COOKIE_USER);
  redirect("/");
}

/** Demande de date envoyée par un organisateur (US4). */
export async function creerDemande(formData: FormData) {
  const talentId = texte(formData, "talent_id");
  const retour = `/talents/${talentId}`;
  const user = await getUser();
  if (!user) redirect("/connexion");
  const talent = await getTalent(talentId);
  if (!talent) echec(retour, "Talent introuvable.");

  const demandes = await getDemandes();
  demandes.unshift({
    id: `req-${Date.now()}`,
    talent_id: talent.id,
    date_evenement: texte(formData, "date_evenement"),
    heure_debut: texte(formData, "heure_debut") || null,
    heure_fin: texte(formData, "heure_fin") || null,
    lieu: texte(formData, "lieu"),
    type_evenement: texte(formData, "type_evenement"),
    message: texte(formData, "message"),
    statut: "en_attente",
    organisateur: { nom: user.nom },
    talent: { nom: talent.nom },
    organisateur_contact: { nom: user.nom, email: user.email, telephone: user.telephone },
  });
  await sauverDemandes(demandes.slice(0, 20));
  revalidatePath("/espace");
  redirect("/espace?envoyee=1");
}

/** Réponse du talent (US8) ou annulation par l'organisateur. */
export async function repondreDemande(formData: FormData) {
  const statut = texte(formData, "statut") as RequestStatus;
  if (!["confirmee", "refusee", "annulee"].includes(statut)) echec("/espace", "Statut invalide.");
  const id = texte(formData, "id");
  const demandes = await getDemandes();
  const cible = demandes.find((d) => d.id === id);
  if (!cible) echec("/espace", "Demande introuvable.");
  // RG3 : pas deux confirmations le même jour pour un même talent
  if (
    statut === "confirmee" &&
    demandes.some((d) => d.id !== id && d.talent_id === cible.talent_id && d.statut === "confirmee" && d.date_evenement === cible.date_evenement)
  ) {
    echec("/espace", "Cette date est déjà confirmée pour une autre demande.");
  }
  cible.statut = statut;
  await sauverDemandes(demandes);
  revalidatePath("/espace");
  redirect("/espace");
}

/** Profil talent (US6) : en démo, simplement mémorisé dans un cookie. */
export async function enregistrerProfilTalent(formData: FormData) {
  const user = await getUser();
  if (!user) redirect("/connexion");
  const profil = {
    discipline: texte(formData, "discipline"),
    ville: texte(formData, "ville"),
    presentation: texte(formData, "presentation"),
    tarif_depart: Number(texte(formData, "tarif_depart")) || 0,
  };
  if (!profil.discipline) echec("/espace", "Choisissez un métier.");
  (await cookies()).set("wene_profil", encodeURIComponent(JSON.stringify(profil)), OPTIONS_COOKIE);
  revalidatePath("/espace");
  redirect("/espace?profil=1");
}
