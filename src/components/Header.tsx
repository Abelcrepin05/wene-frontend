import Link from "next/link";
import { CalendarDays, ChevronDown, LayoutDashboard, LogOut, Menu, Search, Sparkles, X } from "lucide-react";
import { getUser } from "@/lib/data";
import { deconnexion } from "@/app/actions";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/85 backdrop-blur-xl">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Aller au contenu principal
      </a>
      <div className="site-container flex h-[4.75rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Wênê, accueil" className="flex shrink-0 items-center gap-2.5">
          <span className="overflow-hidden rounded-xl bg-[#050a07] p-1 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Wênê" className="block h-9 w-auto" />
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          <Link href="/talents" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink/75 transition hover:bg-white hover:text-forest">
            <Search size={16} strokeWidth={2} /> Répertoire
          </Link>
          <Link href="/trouver" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink/75 transition hover:bg-white hover:text-forest">
            <CalendarDays size={16} strokeWidth={2} /> Selon mon budget
          </Link>
          <Link href="/#comment-ca-marche" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink/75 transition hover:bg-white hover:text-forest">
            <Sparkles size={16} strokeWidth={2} /> Comment ça marche
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link href="/espace" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-forest transition hover:bg-white">
                <LayoutDashboard size={16} /> Mon espace
              </Link>
              <form action={deconnexion}>
                <button type="submit" className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold text-muted transition hover:border-forest hover:text-forest">
                  <LogOut size={15} /> Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/connexion" className="rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition hover:text-forest">
                Connexion
              </Link>
              <Link href="/inscription" className="btn btn-primary btn-sm">
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-line bg-white text-ink [&::-webkit-details-marker]:hidden">
            <Menu size={20} className="group-open:hidden" />
            <X size={20} className="hidden group-open:block" />
          </summary>
          <div className="card absolute right-0 top-[calc(100%+0.7rem)] w-[min(19rem,calc(100vw-2.5rem))] p-2.5 shadow-lift">
            <p className="px-3 pb-1 pt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">Navigation</p>
            <Link href="/talents" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-cream">
              <Search size={16} className="text-forest-2" /> Répertoire des talents
            </Link>
            <Link href="/trouver" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-cream">
              <CalendarDays size={16} className="text-forest-2" /> Selon mon budget
            </Link>
            <Link href="/#comment-ca-marche" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-cream">
              <Sparkles size={16} className="text-forest-2" /> Comment ça marche
            </Link>
            <div className="filet mt-2 pt-2">
              {user ? (
                <>
                  <Link href="/espace" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-cream">
                    <LayoutDashboard size={16} className="text-forest-2" /> Mon espace
                  </Link>
                  <form action={deconnexion}>
                    <button type="submit" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-cream">
                      <LogOut size={16} /> Déconnexion
                    </button>
                  </form>
                </>
              ) : (
                <div className="grid gap-2 p-2">
                  <Link href="/connexion" className="btn btn-outline btn-sm">Connexion</Link>
                  <Link href="/inscription" className="btn btn-primary btn-sm">S&apos;inscrire</Link>
                </div>
              )}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
