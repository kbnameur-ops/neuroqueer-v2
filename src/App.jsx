import { useState, useEffect } from "react";

/**
 * NEUROQUEER — v3
 * Direction dérivée du logo, plus du brief initial.
 *
 * Le logo est un réseau : un noyau crème, des nœuds de couleur reliés par des
 * traits épais à bouts ronds, et quelques points gris à peine visibles.
 * Tout le site en découle : géométrie ronde, palette du logo, et les pôles
 * représentés comme des nœuds reliés.
 *
 * Changements par rapport à la v2 :
 * - Palette du brief (violet/or) abandonnée au profit de celle du logo
 * - Typo affiche : Fredoka (ronde) au lieu d'Anton (anguleuse)
 * - Angles arrondis, boutons pilule
 * - Alternance sections sombres / sections crème : rythme + confort de lecture
 * - Métaphore "gouttière BD" remplacée par "les points gris" (issue du logo)
 */

const C = {
  magenta: "#FF1F8F",
  turquoise: "#00D5C8",
  lime: "#C2E82C",
  orange: "#F89B2C",
  creme: "#F0EBE1",
  encre: "#0B0F19",
};

const POLES = [
  {
    id: "reseau",
    kicker: "Se relier",
    titre: "Réseau & entraide",
    chapo: "Se retrouver entre personnes qui n'ont rien à t'expliquer.",
    couleur: C.turquoise,
    items: [
      "Groupes de parole en ligne et à Paris, deux fois par mois",
      "Binômes d'entraide entre membres",
      "Rencontres informelles sans prise de parole obligatoire",
    ],
  },
  {
    id: "sante",
    kicker: "Se protéger",
    titre: "Santé & prévention",
    chapo: "Trouver des pro qui ne te feront pas repartir à zéro.",
    couleur: C.magenta,
    items: [
      "Annuaire de professionnel·les formé·es aux neuroatypies et aux parcours LGBTQIA+",
      "Réduction des risques : chemsex, substances, épuisement",
      "Repérage du burn-out autistique et de la détresse suicidaire",
    ],
  },
  {
    id: "culture",
    kicker: "Créer",
    titre: "Culture & talents",
    chapo: "Fabriquer nos récits plutôt que d'attendre qu'on les écrive.",
    couleur: C.lime,
    items: [
      "Ateliers d'écriture, de son et d'image",
      "Scènes ouvertes et expositions collectives",
      "Accompagnement des projets portés par des membres",
    ],
  },
  {
    id: "plaidoyer",
    kicker: "Peser",
    titre: "Plaidoyer & ressources",
    chapo: "Faire changer les pratiques, pas seulement les tenir.",
    couleur: C.orange,
    items: [
      "Sensibilisation en entreprise, en école et en structure de soin",
      "Fiches pratiques libres : droits, aménagements, démarches MDPH",
      "Accompagnement en cas de discrimination",
    ],
  },
];

const FILTRES = [
  { groupe: "Ton profil", options: ["TDAH", "Autisme", "Dys", "HPI", "Hypersensibilité"] },
  { groupe: "Ce que tu cherches", options: ["Diagnostic", "Suivi régulier", "Urgence", "Aménagements", "Couple / famille"] },
  { groupe: "Parcours pris en compte", options: ["Trans / non-binaire", "LGBTQIA+", "Trauma", "Chemsex"] },
];

const NAV = [
  { href: "#poles", label: "Ce qu'on fait" },
  { href: "#liens", label: "Qui nous sommes" },
  { href: "#annuaire", label: "Annuaire santé" },
  { href: "#recits", label: "Récits" },
  { href: "#rejoindre", label: "Rejoindre" },
];

/*
 * CTA externes — à brancher sur HelloAsso (adhésion, dons, reçus fiscaux).
 * Remplace les "#" par les vraies URL HelloAsso une fois les campagnes créées ;
 * tant que la valeur vaut "#", le lien reste interne et ne s'ouvre pas dans un
 * nouvel onglet (voir <LienCta/>).
 */
const LIENS = {
  adhesion: "#", // TODO HelloAsso : formulaire d'adhésion
  don: "#", // TODO HelloAsso : page de dons (reçu fiscal)
  benevolat: "#", // TODO : formulaire bénévolat / contact
};

/* Ouvre les vraies URL externes dans un nouvel onglet ; laisse les "#" inertes. */
function LienCta({ href, className, style, children }) {
  const externe = href && href !== "#";
  return (
    <a
      href={href}
      className={className}
      style={style}
      {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/* Marque reconstruite en SVG — remplace par ton vrai fichier neuroqueer-mark.svg */
function Marque({ taille = 40, actif = null }) {
  const noeuds = [
    { id: "sante", x: 152, y: 48, r: 21, c: C.magenta },
    { id: "plaidoyer", x: 42, y: 60, r: 14, c: C.orange },
    { id: "culture", x: 44, y: 158, r: 18, c: C.lime },
    { id: "reseau", x: 158, y: 142, r: 17, c: C.turquoise },
  ];
  return (
    <svg viewBox="0 0 200 200" width={taille} height={taille} role="img" aria-label="NeuroQueer">
      {/* points gris : les liens pas encore faits */}
      <circle cx="118" cy="38" r="4" fill="#8A93A6" opacity=".35" />
      <circle cx="134" cy="104" r="4" fill="#8A93A6" opacity=".3" />
      <circle cx="66" cy="128" r="3" fill="#8A93A6" opacity=".3" />
      <circle cx="126" cy="72" r="11" fill="#C9CEDA" opacity=".28" />
      {noeuds.map((n) => (
        <line
          key={n.id}
          x1="100" y1="100" x2={n.x} y2={n.y}
          stroke={n.c}
          strokeWidth={actif && actif !== n.id ? 5 : 11}
          strokeLinecap="round"
          opacity={actif && actif !== n.id ? 0.3 : 1}
          style={{ transition: "all .3s" }}
        />
      ))}
      <line x1="126" y1="72" x2="158" y2="142" stroke={C.turquoise} strokeWidth="3" opacity=".5" strokeLinecap="round" />
      {noeuds.map((n) => (
        <circle
          key={n.id} cx={n.x} cy={n.y} r={n.r} fill={n.c}
          opacity={actif && actif !== n.id ? 0.35 : 1}
          style={{ transition: "all .3s" }}
        />
      ))}
      <circle cx="100" cy="100" r="27" fill={C.creme} />
      <circle cx="100" cy="100" r="11" fill={C.encre} />
    </svg>
  );
}

export default function App() {
  const [prefs, setPrefs] = useState({ motion: true, dys: false, grandTexte: false });
  const [panneau, setPanneau] = useState(false);
  const [menu, setMenu] = useState(false);
  const [survol, setSurvol] = useState(null);
  const [filtres, setFiltres] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      setPrefs((p) => ({ ...p, motion: false }));
  }, []);

  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));
  const toggleFiltre = (f) =>
    setFiltres((l) => (l.includes(f) ? l.filter((x) => x !== f) : [...l, f]));

  const root = ["nq", prefs.motion ? "" : "nq-static", prefs.dys ? "nq-dys" : "", prefs.grandTexte ? "nq-xl" : ""]
    .filter(Boolean).join(" ");

  return (
    <div className={root}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Outfit:wght@400;500;700&family=Space+Mono:wght@700&family=Atkinson+Hyperlegible:wght@400;700&display=swap');

.nq{
  --encre:#0B0F19; --sombre:#141B2D; --creme:#F5F1E8; --creme2:#EAE3D6;
  --magenta:#FF1F8F; --turquoise:#00D5C8; --lime:#C2E82C; --orange:#F89B2C;
  --display:'Fredoka',system-ui,sans-serif;
  --body:'Outfit',system-ui,sans-serif;
  --util:'Space Mono',monospace;
  background:var(--encre); color:#F4F6FB;
  font-family:var(--body); font-size:17px; line-height:1.7;
}
.nq-xl{ font-size:19px; }
.nq-dys{ --display:'Atkinson Hyperlegible',sans-serif; --body:'Atkinson Hyperlegible',sans-serif;
  --util:'Atkinson Hyperlegible',sans-serif; line-height:1.95; letter-spacing:.03em; word-spacing:.14em; }
.nq h1,.nq h2,.nq h3{ font-family:var(--display); font-weight:600; line-height:1.05; letter-spacing:-.01em; }
.nq-dys h1,.nq-dys h2,.nq-dys h3{ font-weight:700; line-height:1.3; letter-spacing:0; }
.nq-kicker{ font-family:var(--util); font-size:.72rem; text-transform:uppercase; letter-spacing:.2em; }

/* Sections crème : rythme visuel + confort pour qui lit mal en sombre */
.nq-clair{ background:var(--creme); color:#14161F; }
.nq-clair .nq-carte{ background:#fff; border-color:#DED6C6; }

.nq-carte{ background:var(--sombre); border:2px solid #263148; border-radius:24px;
  transition:transform .25s, border-color .25s; }
.nq-carte:hover,.nq-carte:focus-within{ transform:translateY(-5px); }

.nq-pilule{ border-radius:999px; font-weight:700; }

@keyframes flotte{ 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-14px) } }
.nq-flotte{ animation:flotte 7s ease-in-out infinite; }
.nq-static *{ animation:none !important; transition:none !important; }
@media (prefers-reduced-motion: reduce){ .nq *{ animation:none !important; transition:none !important; } }

.nq a:focus-visible,.nq button:focus-visible{ outline:3px solid var(--turquoise); outline-offset:3px; border-radius:6px; }
.nq-skip{ position:absolute; left:-9999px; }
.nq-skip:focus{ left:1rem; top:1rem; z-index:60; }
      `}</style>

      <a className="nq-skip nq-pilule px-4 py-2 text-slate-950" style={{ background: C.lime }} href="#contenu">
        Aller au contenu
      </a>

      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
          <a href="#" className="flex items-center gap-3">
            <Marque taille={38} />
            <span className="hidden text-lg font-bold sm:block" style={{ fontFamily: "var(--display)" }}>
              NeuroQueer
            </span>
          </a>

          <nav aria-label="Navigation principale" className="ml-auto hidden lg:block">
            <ul className="flex gap-6 text-sm">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a className="text-slate-300 hover:text-white" href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={() => setPanneau((v) => !v)}
            aria-expanded={panneau} aria-controls="confort"
            className="nq-pilule ml-auto border-2 border-slate-700 px-4 py-2 text-xs hover:border-white lg:ml-0"
          >
            Confort de lecture
          </button>

          <a href="#rejoindre" className="nq-pilule hidden px-5 py-2 text-sm text-slate-950 sm:block"
            style={{ background: C.lime }}>
            Adhérer
          </a>

          <button className="nq-pilule border-2 border-slate-700 px-4 py-2 text-xs lg:hidden"
            onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-controls="menu-mobile">
            Menu
          </button>
        </div>

        {menu && (
          <nav id="menu-mobile" aria-label="Navigation mobile" className="border-t border-slate-800 lg:hidden">
            <ul className="mx-auto max-w-6xl px-5">
              {NAV.map((l) => (
                <li key={l.href} className="border-b border-slate-800 last:border-0">
                  <a className="block py-3" href={l.href} onClick={() => setMenu(false)}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {panneau && (
          <div id="confort" className="border-t border-slate-800 bg-slate-900">
            <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-5 py-4">
              {[["motion", "Animations"], ["dys", "Typographie Dys"], ["grandTexte", "Texte agrandi"]].map(
                ([k, label]) => (
                  <button key={k} onClick={() => toggle(k)} aria-pressed={prefs[k]}
                    className="nq-pilule border-2 px-4 py-2 text-sm"
                    style={
                      prefs[k]
                        ? { background: C.turquoise, borderColor: C.turquoise, color: "#0B0F19", fontWeight: 700 }
                        : { borderColor: "#475569", color: "#CBD5E1" }
                    }>
                    {label} : {prefs[k] ? "activé" : "désactivé"}
                  </button>
                )
              )}
              <p className="w-full text-xs text-slate-400">
                Appliqué immédiatement. Les animations suivent ton réglage système par défaut.
              </p>
            </div>
          </div>
        )}
      </header>

      <main id="contenu">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden px-5 py-16 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-0 h-96 w-96 rounded-full"
              style={{ background: C.magenta, filter: "blur(120px)", opacity: 0.3 }} />
            <div className="absolute -right-32 top-40 h-96 w-96 rounded-full"
              style={{ background: C.turquoise, filter: "blur(120px)", opacity: 0.28 }} />
          </div>

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="nq-kicker" style={{ color: C.turquoise }}>
                Le réseau neurodivergent et queer
              </p>
              <h1 className="mt-5 text-5xl sm:text-6xl">
                On n'a pas à se traduire{" "}
                <span style={{ color: C.lime }}>en permanence.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-slate-300">
                NeuroQueer est une association d'entraide. On organise des groupes de parole, on
                référence des professionnel·les formé·es, on soutient des projets créatifs et on fait
                bouger les institutions.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#rejoindre" className="nq-pilule px-7 py-4 text-slate-950" style={{ background: C.lime }}>
                  Adhérer à l'association
                </a>
                <a href="#poles" className="nq-pilule border-2 px-7 py-4"
                  style={{ borderColor: C.magenta, color: "#FFC9E4" }}>
                  Voir ce qu'on fait
                </a>
              </div>
            </div>

            {/* Le réseau : survole un nœud, le pôle correspondant s'allume */}
            <div className="nq-flotte mx-auto hidden max-w-sm lg:block">
              <Marque taille={420} actif={survol} />
            </div>
          </div>
        </section>

        {/* ============ PÔLES ============ */}
        <section id="poles" className="nq-clair px-5 py-20" aria-labelledby="poles-titre">
          <div className="mx-auto max-w-6xl">
            <p className="nq-kicker" style={{ color: C.magenta }}>Concrètement</p>
            <h2 id="poles-titre" className="mt-4 text-4xl sm:text-5xl">Quatre pôles, une même adresse</h2>
            <p className="mt-4 max-w-2xl text-slate-700">
              Tu peux venir pour un seul et ignorer les trois autres. Personne ne tient de compte.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {POLES.map((p) => (
                <article
                  key={p.id} id={p.id}
                  onMouseEnter={() => setSurvol(p.id)}
                  onMouseLeave={() => setSurvol(null)}
                  className="nq-carte p-7"
                  style={{ borderColor: p.couleur }}
                >
                  <span aria-hidden="true" className="block h-5 w-5 rounded-full" style={{ background: p.couleur }} />
                  <p className="nq-kicker mt-4 text-slate-500">{p.kicker}</p>
                  <h3 className="mt-2 text-3xl">{p.titre}</h3>
                  <p className="mt-3 text-slate-700">{p.chapo}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-600">
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden="true" style={{ color: p.couleur }}>●</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ LES POINTS GRIS ============ */}
        <section id="liens" className="px-5 py-24" aria-labelledby="liens-titre">
          <div className="mx-auto max-w-6xl">
            <p className="nq-kicker" style={{ color: C.orange }}>Qui nous sommes</p>
            <h2 id="liens-titre" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Sur notre logo, il y a des points gris
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Ce sont les liens qu'on n'a pas encore faits. Les personnes qu'on n'a pas encore
              trouvées, celles qui n'osent pas écrire, celles à qui on n'a pas encore été utile.
              L'association existe pour les allumer un par un.
            </p>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <article className="nq-carte p-7 md:col-span-2">
                <h3 className="text-2xl" style={{ color: C.magenta }}>Neurodivergences</h3>
                <p className="mt-3 text-slate-300">
                  TDAH, autisme, troubles dys, haut potentiel, hypersensibilité. Des fonctionnements
                  différents — ni supérieurs, ni défaillants. On ne demande à personne de compenser
                  pour être accueilli·e.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-400">
                  <li>— Ordre du jour envoyé à l'avance, réunions courtes</li>
                  <li>— Sous-titres, transcriptions et supports écrits systématiques</li>
                  <li>— Droit de partir, de couper la caméra, de ne rien dire</li>
                  <li>— Auto-identification suffisante : aucun diagnostic à fournir</li>
                </ul>
              </article>
              <div className="grid gap-5">
                <article className="nq-carte p-7">
                  <h3 className="text-xl" style={{ color: C.turquoise }}>Parcours queer</h3>
                  <p className="mt-3 text-slate-300">
                    Nos parcours d'identité et nos parcours neuro se croisent bien plus souvent qu'on
                    ne le dit — et rarement dans les mêmes lieux d'accueil.
                  </p>
                </article>
                <article className="nq-carte p-7">
                  <h3 className="text-xl" style={{ color: C.lime }}>Allié·es</h3>
                  <p className="mt-3 text-slate-300">
                    Proches, collègues, soignant·es. Bienvenue, à condition de venir écouter avant de
                    venir aider.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ANNUAIRE ============ */}
        <section id="annuaire" className="nq-clair px-5 py-20" aria-labelledby="annuaire-titre">
          <div className="mx-auto max-w-6xl">
            <p className="nq-kicker" style={{ color: C.magenta }}>Santé</p>
            <h2 id="annuaire-titre" className="mt-4 text-4xl sm:text-5xl">Annuaire de professionnel·les</h2>
            <p className="mt-4 max-w-2xl text-slate-700">
              Des psychologues, psychiatres et thérapeutes formé·es aux neuroatypies et aux parcours
              LGBTQIA+. Chaque fiche est vérifiée avant publication, l'inscription se fait sur
              candidature.
            </p>

            <div className="mt-9 space-y-6">
              {FILTRES.map((g) => (
                <fieldset key={g.groupe}>
                  <legend className="nq-kicker text-slate-500">{g.groupe}</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.options.map((o) => {
                      const actif = filtres.includes(o);
                      return (
                        <button key={o} onClick={() => toggleFiltre(o)} aria-pressed={actif}
                          className="nq-pilule border-2 px-4 py-2 text-sm"
                          style={
                            actif
                              ? { background: C.encre, borderColor: C.encre, color: "#fff" }
                              : { borderColor: "#C9BFAC", color: "#3B3B44", fontWeight: 400 }
                          }>
                          {o}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            {/* État vide honnête — ne jamais remettre de profils fictifs ici */}
            <div className="nq-carte mt-10 p-10 text-center">
              <h3 className="text-3xl">L'annuaire ouvre bientôt</h3>
              <p className="mx-auto mt-3 max-w-xl text-slate-700">
                Nous constituons le premier réseau de professionnel·les. Laisse ton adresse pour être
                prévenu·e à l'ouverture — ou candidate si tu exerces.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <a href="#rejoindre" className="nq-pilule px-6 py-3 text-slate-950" style={{ background: C.lime }}>
                  Être prévenu·e
                </a>
                <a href="#rejoindre" className="nq-pilule border-2 px-6 py-3" style={{ borderColor: C.encre, color: C.encre }}>
                  Je suis professionnel·le
                </a>
              </div>
              <p className="mt-8 border-t-2 border-slate-200 pt-5 text-sm text-slate-600">
                En cas d'urgence, ne passe pas par nous : <strong>3114</strong>, numéro national de
                prévention du suicide, gratuit et 24h/24.
              </p>
            </div>
          </div>
        </section>

        {/* ============ RÉCITS ============ */}
        <section id="recits" className="px-5 py-20" aria-labelledby="recits-titre">
          <div className="mx-auto max-w-6xl">
            <p className="nq-kicker" style={{ color: C.turquoise }}>En partenariat avec Strobo</p>
            <h2 id="recits-titre" className="mt-4 text-4xl sm:text-5xl">Récits &amp; médias</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Portraits, entretiens et formats sonores produits avec les membres. Publier son histoire
              n'est jamais une condition pour faire partie de l'association.
            </p>
            <div className="nq-carte mt-9 p-10">
              <p className="text-slate-300">
                Les premiers épisodes arrivent. Si tu veux raconter quelque chose — anonymement ou non —
                écris-nous à{" "}
                <a className="underline" style={{ color: C.lime }} href="mailto:hello@neuroqueer.fr">
                  hello@neuroqueer.fr
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* ============ REJOINDRE ============ */}
        <section id="rejoindre" className="px-5 pb-24" aria-labelledby="rejoindre-titre">
          <div className="relative mx-auto max-w-6xl overflow-hidden p-10 sm:p-14"
            style={{ borderRadius: 32, background: `linear-gradient(115deg, ${C.magenta} 0%, ${C.orange} 45%, ${C.lime} 100%)` }}>
            <h2 id="rejoindre-titre" className="text-4xl text-slate-950 sm:text-6xl">Rejoindre</h2>
            <p className="mt-4 max-w-2xl text-lg font-medium text-slate-900">
              Trois façons d'en être. Aucune ne demande une énergie que tu n'as pas.
            </p>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {[
                ["Adhérer", "Accès aux groupes, aux ateliers et à l'annuaire interne. Cotisation libre à partir de 5 € par an, gratuite si tu le demandes.", "Adhérer", LIENS.adhesion],
                ["Donner", "Un don finance les permanences, les salles et les ateliers. Reçu fiscal sur demande.", "Faire un don", LIENS.don],
                ["Prêter main-forte", "Deux heures par mois ou une compétence ponctuelle. Dis-nous ce que tu peux tenir dans la durée.", "Se proposer", LIENS.benevolat],
              ].map(([t, d, cta, href]) => (
                <div key={t} className="p-7" style={{ background: C.encre, borderRadius: 24 }}>
                  <h3 className="text-2xl" style={{ color: C.lime }}>{t}</h3>
                  <p className="mt-3 text-sm text-slate-300">{d}</p>
                  <LienCta href={href} className="nq-pilule mt-5 inline-block px-5 py-3 text-sm text-slate-950"
                    style={{ background: C.creme }}>
                    {cta}
                  </LienCta>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-slate-800 px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
          <div>
            <Marque taille={48} />
            <p className="mt-3 text-lg font-bold" style={{ fontFamily: "var(--display)" }}>NeuroQueer</p>
            <p className="nq-kicker" style={{ color: C.magenta }}>Le réseau neurodivergent et queer</p>
            <p className="mt-4 text-sm text-slate-400">
              Association loi 1901. Entraide, santé, création et plaidoyer pour les personnes
              neurodivergentes et LGBTQIA+.
            </p>
            <p className="mt-4 text-sm">
              <a className="underline" style={{ color: C.turquoise }} href="mailto:hello@neuroqueer.fr">
                hello@neuroqueer.fr
              </a>
            </p>
          </div>
          <nav aria-label="Liens de bas de page">
            <h2 className="nq-kicker text-slate-300">Informations</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><a className="hover:text-white" href="#">Mentions légales</a></li>
              <li><a className="hover:text-white" href="#">Politique de confidentialité</a></li>
              <li><a className="hover:text-white" href="#">Déclaration d'accessibilité</a></li>
              <li><a className="hover:text-white" href="#">Statuts de l'association</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="nq-kicker text-slate-300">Nous suivre</h2>
            <ul className="mt-4 flex gap-4 text-sm text-slate-400">
              <li><a className="hover:text-white" href="#">Instagram</a></li>
              <li><a className="hover:text-white" href="#">Mastodon</a></li>
              <li><a className="hover:text-white" href="#">Discord</a></li>
            </ul>
            <p className="mt-8 text-xs text-slate-500">
              Ce site se lit sans animation, sans son et entièrement au clavier.
            </p>
            <p className="mt-3 text-xs text-slate-500">© 2026 NeuroQueer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
