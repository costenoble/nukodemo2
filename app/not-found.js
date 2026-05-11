import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">
        CST — Erreur 404
      </p>
      <h1
        className="select-none font-headline font-black uppercase leading-none tracking-[-0.04em] text-white/10"
        style={{ fontSize: "clamp(6rem, 25vw, 22rem)" }}
      >
        404
      </h1>
      <p className="mt-6 max-w-sm text-center text-lg font-light leading-8 text-white/50">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          className="border border-white px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
          href="/"
        >
          Retour à l'accueil
        </Link>
        <Link
          className="border border-white/30 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 transition hover:border-white hover:text-white"
          href="/particulier"
        >
          Voir la collection
        </Link>
      </div>
    </div>
  );
}
