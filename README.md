# NeuroQueer — v2

Landing page. Vite + React 18 + Tailwind 3.

## Lancer en local

```bash
npm install
npm run dev
```

## Mettre en ligne

```bash
git init && git add . && git commit -m "NeuroQueer v2"
git remote add origin git@github.com:<compte>/neuroqueer-v2.git
git push -u origin main
```

Puis sur Vercel : **Add New → Project → Import Git Repository**.
Le preset Vite est détecté automatiquement. Ne définis **pas** `NODE_ENV`
dans les variables d'environnement : ça ferait sauter les devDependencies
et le build échouerait sur `vite: command not found`.

## À faire avant la production

- [x] Retirer `<meta name="robots" content="noindex, nofollow">` dans `index.html`
      — retiré. ⚠️ L'indexation est donc **ré-autorisée** : ne mettre en ligne
      qu'une fois le contenu prêt, ou remettre le `noindex` sur l'URL de preview.
- [x] Ajouter `og:image` en **PNG 1200×630** — ajouté (`public/og-image.png`,
      1200×630) + balises `og:*` et `twitter:card` dans `index.html`.
- [ ] Ajouter `<link rel="canonical">` — gabarit commenté prêt dans `index.html`,
      à dé-commenter avec le domaine réel une fois branché sur Vercel (même
      moment où l'on préfixe `og:image`/`og:url` avec le domaine absolu).
- [ ] Remplacer le SVG `Marque` dans `src/App.jsx` par le vrai `neuroqueer-mark.svg`
      (garder la logique de la prop `actif` pour l'interaction avec les pôles)
      — **nécessite le fichier source**, non fourni ici.
- [~] Brancher les CTA sur HelloAsso (adhésion, dons, reçus fiscaux)
      — câblage en place : URL centralisées dans la constante `LIENS` (`src/App.jsx`)
      et cartes « Rejoindre » reliées via `<LienCta>` (ouvre les URL externes dans
      un nouvel onglet). Il reste à **coller les vraies URL HelloAsso** dans `LIENS`.
- [ ] Rédiger mentions légales, politique de confidentialité, déclaration d'accessibilité
      — nécessite les infos légales de l'association (siège, RNA/SIRET, hébergeur…).
- [ ] Créer une version sombre du wordmark (la crème sur blanc est illisible)
      — nécessite l'asset du wordmark.

## Données

Aucune base de données, aucun formulaire qui stocke quoi que ce soit.
Une liste d'adhérent·es relève de l'article 9 du RGPD (données sensibles) :
elle doit être hébergée chez un tiers conforme — HelloAsso, Brevo — et pas ici.
