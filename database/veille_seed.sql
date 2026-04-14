-- ============================================================
-- Veille technologique — données de référence
-- 5 entrées thématiques BTS SIO SLAM (août 2025 – janv. 2026)
-- Encodage : UTF-8 (SET NAMES utf8mb4 requis)
-- Usage : source database/veille_seed.sql  (depuis mysql CLI)
-- ============================================================
SET NAMES utf8mb4;

INSERT INTO veille (title, content, analysis, url, category, visible, created_at) VALUES

('React 19 : les Server Components en production',
'React 19, sorti fin 2024, officialise les Server Components. Ce paradigme permet de rendre des composants directement côté serveur : seul le HTML final est envoyé au navigateur, sans le code JavaScript du composant. Résultat : le bundle JS envoyé au client est réduit, le chargement initial est plus rapide et le référencement (SEO) est amélioré. React 19 introduit aussi les Server Actions, qui permettent d\'exécuter du code serveur directement depuis un formulaire React sans créer d\'endpoint API séparé. Autre nouveauté : l\'hook use() qui simplifie la gestion des Promesses dans les composants.',
'Dans mes projets React actuels (ce portfolio, zoo-app), j\'utilise encore le rendu côté client (CSR). J\'ai expérimenté le SSR via Next.js sur mon projet BTP Basic Fit Renove, où j\'ai constaté concrètement la différence : les temps de chargement sont divisés par 2 sur mobile et Google indexe le contenu sans JavaScript. Mon avis : les Server Components sont la bonne direction pour les applications data-heavy, mais ils ajoutent une complexité d\'architecture (distinction client/serveur dans le code) qui n\'est pas justifiée pour tous les projets. À adopter progressivement, en commençant par les pages statiques.',
'https://react.dev/blog/2024/12/05/react-19', 'automatique', 1, '2025-08-28 10:00:00'),

('IA Générative & Prompt Engineering — retour AuditGen AI (Capgemini)',
'Les LLM (Large Language Models : GPT-4, Claude, Gemini) génèrent du texte, du code et des analyses à partir d\'instructions en langage naturel. Le prompt engineering consiste à rédiger ces instructions de façon précise pour obtenir des résultats fiables. Les techniques les plus efficaces en 2025 : le few-shot prompting (fournir 2-3 exemples pour guider le format de sortie), le chain-of-thought (demander à l\'IA de raisonner étape par étape), et le role prompting (assigner un rôle précis : "Tu es un auditeur financier expert..."). GitHub Copilot, outil d\'IA intégré aux IDE, génère du code en temps réel à partir des commentaires et du contexte du fichier ouvert.',
'Sur le projet AuditGen AI chez Capgemini, j\'ai travaillé directement avec ces technologies. Observation clé : la qualité des résultats dépend à 80% de la précision du prompt. Un prompt vague donne un résultat générique inutilisable. Un prompt structuré ("Tu es un auditeur. Analyse la colonne C et repère les incohérences entre HT, TVA et TTC. Réponds en JSON avec les champs : ligne, anomalie, valeur_attendue") donne un résultat directement exploitable. Limite sérieuse rencontrée : les hallucinations — l\'IA a inventé un total de TVA inexistant sans signaler d\'incertitude. J\'ai dû implémenter une validation croisée systématique. Conclusion : l\'IA ne remplace pas le développeur — elle transforme son rôle vers la validation et l\'orchestration des outputs.',
'https://www.promptingguide.ai/', 'automatique', 1, '2025-09-12 10:00:00'),

('Sécurité des API REST : JWT, CORS et protection contre les injections',
'Une API REST expose des données via des endpoints HTTP. Sans protection, elle est vulnérable à trois risques majeurs identifiés par l\'OWASP API Security Top 10 : 1) L\'injection SQL — un attaquant insère du SQL dans un paramètre pour manipuler la base de données. 2) L\'absence d\'authentification — des endpoints sensibles sont accessibles sans vérification d\'identité. 3) Les requêtes CORS non contrôlées — n\'importe quel site peut appeler l\'API. Les solutions : requêtes paramétrées (PDO/SQLAlchemy) contre les injections, JWT (JSON Web Token) pour l\'authentification sans session serveur, configuration CORS stricte pour n\'autoriser que les origines connues, et rate limiting pour bloquer le brute force.',
'Dans mon projet Football Manager 5V5 (FastAPI + MySQL), j\'ai appliqué ces mesures concrètement : protection injection via SQLAlchemy, CORS configuré pour n\'autoriser que localhost:3000 en dev, et validation systématique des entrées. Sur ce portfolio PHP, j\'utilise PDO avec requêtes préparées, tokens CSRF sur tous les formulaires admin, et bcrypt pour le mot de passe. Observation importante : les failles de sécurité sont rarement visibles pendant le développement — elles se révèlent en production. La sécurité des API est une compétence que je considère maintenant non-négociable dès le début d\'un projet.',
'https://owasp.org/www-project-api-security/', 'automatique', 1, '2025-10-17 14:30:00'),

('React et Next.js : SSR, SSG et App Router — quel impact sur les performances ?',
'Next.js propose trois modes de rendu : CSR (Client-Side Rendering, comme React pur — le HTML est généré dans le navigateur via JavaScript), SSR (Server-Side Rendering — le HTML est généré côté serveur à chaque requête), et SSG (Static Site Generation — les pages sont pré-générées au moment du build, sans requête serveur à chaque visite). Next.js 14 introduit l\'App Router : un système de routing basé sur l\'arborescence des fichiers, avec support natif des Server Components et des Server Actions. Les Server Actions permettent de gérer les formulaires sans créer d\'API séparée : la logique serveur est colocalisée avec le composant.',
'Dans mon projet BTP (Basic Fit Renove, Next.js 14 + TypeScript), j\'ai utilisé SSG pour les pages statiques (accueil, services) et SSR pour les pages dynamiques (portfolio de réalisations mis à jour par le client). Résultat mesurable : le First Contentful Paint passe de ~2.1s (React CSR) à ~0.7s (Next.js SSG) sur mobile 4G. Le SEO est directement amélioré car Google reçoit du HTML complet sans dépendre de JavaScript. Limite observée : l\'App Router change la logique de cache et de revalidation, ce qui demande un temps d\'adaptation. Conclusion : pour un site vitrine professionnel, Next.js est clairement supérieur à React pur.',
'https://nextjs.org/docs/app/building-your-application/rendering', 'automatique', 1, '2025-11-21 11:00:00'),

('Architecture microservices vs monolithique — expérience FastAPI',
'Une architecture monolithique regroupe toute l\'application dans un seul déployable (une seule base de code, un seul serveur). Une architecture microservices découpe l\'application en services indépendants qui communiquent via des API. Chaque service a sa propre base de code, peut être déployé indépendamment, et utilise la technologie qui lui convient. Les microservices sont utilisés par les grandes entreprises (Netflix, Amazon, Capgemini) pour permettre aux équipes de travailler en parallèle sans se bloquer mutuellement. L\'inconvénient principal : la complexité opérationnelle augmente fortement (gestion des pannes réseau entre services, cohérence des données distribuées, multiplication des déploiements).',
'Dans mon projet Football Manager 5V5, j\'ai isolé le backend web (FastAPI) de l\'application desktop existante en partageant uniquement la base de données MySQL. Avantage direct : j\'ai pu modifier et redéployer le service web sans toucher à l\'application desktop. Inconvénient réel : j\'ai dû dupliquer certaines règles de validation côté desktop ET côté API. Chez Capgemini, cette approche est systématique sur les projets d\'envergure. Mon avis : les microservices apportent une flexibilité réelle mais ne se justifient pas pour un projet solo — le monolithe bien structuré (comme Laravel ou Symfony) est souvent plus pragmatique en BTS et en début de carrière.',
'https://microservices.io/', 'automatique', 1, '2026-01-08 14:00:00');

('React 19 : les Server Components en production',
'React 19, sorti fin 2024, officialise les Server Components. Ce paradigme permet de rendre des composants directement côté serveur, réduisant le JavaScript envoyé au client. Dans mes projets (zoo-app, portfolio), j\'ai pu observer que les pages chargent plus vite car seules les données utiles sont transmises. Cette évolution rapproche React du modèle de Laravel/Symfony côté backend et change profondément la façon de penser l\'architecture front-end.',
'https://react.dev/blog/2024/12/05/react-19', 'automatique', 1),

('Python et IA générative : les LLM en entreprise (retour Capgemini)',
'Durant mon alternance chez Capgemini sur le projet AuditGen AI, j\'ai utilisé des LLM (Large Language Models) pour automatiser l\'audit de documents Excel. J\'ai constaté que le Prompt Engineering est une compétence clé : une formulation précise du prompt réduit significativement les erreurs de l\'IA. Les frameworks comme LangChain simplifient l\'intégration de ces modèles dans des scripts Python. Cette veille m\'a permis d\'améliorer directement mes contributions sur le projet.',
'https://python.langchain.com', 'automatique', 1),

('OWASP Top 10 2025 : les failles web à connaître en BTS SIO',
'L\'OWASP Top 10 liste les 10 risques de sécurité web les plus critiques. En 2025, les injections (SQL, XSS, command injection) restent en tête, suivies par les défauts de contrôle d\'accès. Dans mon portfolio (PHP + React), j\'ai appliqué plusieurs contre-mesures : tokens CSRF sur tous les formulaires admin, requêtes PDO préparées contre l\'injection SQL, et validation MIME pour les uploads d\'images. La sécurité est un critère évalué en BTS SIO et dans tous mes projets professionnels.',
'https://owasp.org/www-project-top-ten/', 'automatique', 1),

('FastAPI (Python) : une alternative moderne à Flask pour les API REST',
'FastAPI est un framework Python qui génère automatiquement la documentation OpenAPI (Swagger). Je l\'ai utilisé sur mon projet Football Manager 5V5 pour créer le backend web synchronisé avec l\'appli desktop. Sa particularité : la validation automatique des données via Pydantic et les performances proches de Node.js grâce à l\'async/await natif. Comparé à Flask, FastAPI réduit le code boilerplate et détecte les erreurs de typage dès le développement.',
'https://fastapi.tiangolo.com', 'automatique', 1),

('TypeScript : pourquoi migrer depuis JavaScript ?',
'TypeScript ajoute le typage statique à JavaScript. Sur mon projet BTP (Next.js 14 + TypeScript), j\'ai constaté que les erreurs détectées à la compilation évitent des bugs en production. Par exemple, passer un objet null à une fonction qui attend un string est bloqué avant même l\'exécution. L\'adoption de TypeScript dépasse 80% des projets React en 2025 selon les sondages Stack Overflow. C\'est une compétence attendue sur le marché du travail.',
'https://www.typescriptlang.org/docs/', 'automatique', 1),

('Sécurité PHP : les bonnes pratiques en 2025',
'PHP alimente encore une large majorité des sites web (WordPress, Laravel, Symfony). Les failles les plus courantes restent les injections SQL (évitées avec PDO et les requêtes préparées), le stockage de mots de passe en clair (évité avec password_hash/bcrypt), et les sessions non sécurisées. Dans mon portfolio, j\'ai implémenté bcrypt pour les mots de passe admin, des tokens CSRF contre les requêtes forgées, et session_regenerate_id() après la connexion. Ces pratiques correspondent directement aux attendus du référentiel BTS SIO.',
'https://cheatsheetseries.owasp.org/cheatsheets/PHP_Security_Cheat_Sheet.html', 'automatique', 1),

('React Native : développement mobile cross-platform',
'React Native permet de développer des applications iOS et Android avec du JavaScript/React. Sur le projet Protectiv Pint chez Capgemini, j\'ai travaillé sur une app mobile de détection du taux d\'alcoolisation avec géolocalisation. La réutilisation du code entre iOS et Android atteint 90%, ce qui réduit les coûts de développement. En 2025, React Native reste le framework mobile le plus utilisé avec Flutter (Dart/Google) comme principal concurrent.',
'https://reactnative.dev', 'automatique', 1),

('Git et GitHub : collaborer en équipe de développement',
'Git est l\'outil de versioning incontournable en développement logiciel. En BTS SIO et en alternance, j\'utilise quotidiennement les branches feature/, les pull requests et les code reviews. Les bonnes pratiques incluent des commits atomiques avec messages descriptifs, une stratégie de branches (GitFlow), et l\'intégration de CI/CD (GitHub Actions) pour automatiser les tests. Sur ce portfolio, chaque feature est développée sur une branche dédiée avant merge sur develop.',
'https://github.com', 'forum', 1),

('Stack Overflow Developer Survey 2025 : tendances du marché',
'Le sondage annuel de Stack Overflow auprès de 65 000 développeurs révèle les tendances 2025 : JavaScript reste le langage le plus utilisé (12e année consécutive), Python dépasse Java en popularité grâce à l\'IA, et TypeScript s\'impose comme standard. Les outils IA (GitHub Copilot, ChatGPT) sont utilisés par 78% des développeurs. Ces données orientent mes choix de formation continue et de technologies à maîtriser.',
'https://survey.stackoverflow.co/2025', 'forum', 1),

('Next.js 14 : App Router et Server Actions',
'Next.js 14 introduit les Server Actions, permettant d\'exécuter du code serveur directement depuis les composants React sans créer d\'endpoint API séparé. Sur mon projet BTP (site vitrine rénovation salles de sport), j\'ai utilisé l\'App Router pour le routing file-based et les layouts imbriqués. Cette approche réduit le nombre de fichiers API et simplifie la gestion des formulaires. Next.js est aujourd\'hui le standard de facto pour les projets React en production.',
'https://nextjs.org/blog/next-14', 'automatique', 1),

('Docker et conteneurisation : déploiement simplifié',
'Docker permet d\'empaqueter une application et ses dépendances dans un conteneur portable. Un conteneur PHP+Apache+MySQL remplace une installation XAMPP locale et garantit que l\'environnement dev = environnement prod. En BTS SIO et en entreprise, Docker est de plus en plus demandé pour standardiser les déploiements. Un docker-compose.yml suffit pour démarrer tout un projet en une seule commande, ce qui facilite l\'onboarding des nouveaux développeurs.',
'https://docs.docker.com', 'automatique', 1),

('Accessibilité web (WCAG) : obligation légale et bonne pratique',
'Les WCAG (Web Content Accessibility Guidelines) définissent les critères d\'accessibilité web. En France, le RGAA est obligatoire pour les sites publics depuis 2019. Les critères essentiels incluent : contraste suffisant texte/fond (4.5:1), navigation clavier, attributs alt sur les images, et balises ARIA. Dans mon portfolio React, j\'ai ajouté des attributs aria-label et vérifié les contrastes Tailwind CSS. C\'est un critère de qualité attendu en BTS SIO.',
'https://www.w3.org/WAI/WCAG22/quickref/', 'automatique', 1);
