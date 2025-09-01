# BTS SIO SLAM – Portfolio Professionnel

## Structure du projet

```
/portfolio-fdme/
│
├── /client/      # Front-end React
├── /server/      # Back-end PHP sécurisé et autonome
├── /database/    # Script SQL pour création tables
└── README.md
```

## Pré-requis
- Node.js LTS + npm (Front)
- PHP 8.x (CLI ou serveur Apache/Nginx)
- MariaDB / MySQL

## Installation étape par étape

### 1. Créer la base de données MariaDB/MySQL
- Connecte-toi à phpMyAdmin ou à ton outil SQL.
- Crée une base nommée par exemple `bts_portfolio`.

### 2. Importer le script SQL
- Sélectionne la base `bts_portfolio`.
- Clique sur “Importer” et choisis le fichier `database/init.sql`.
- Valide pour créer les tables (`admin`, `projects`, `veille`)

### 3. Configurer la connexion dans `server/config.php`
- Mets à jour les variables `$DB_HOST`, `$DB_NAME`, `$DB_USER`, `$DB_PASS` selon tes accès MariaDB.

### 4. Créer l’admin par défaut
- Place-toi dans le dossier `/server` sur ton hébergement ou en local.
- Lance le script `init_admin.php` dans le navigateur ou via la ligne de commande :
  - Navigateur : `http://localhost/portfolio-fdme/server/init_admin.php`
  - Ligne de commande : `php init_admin.php`
- Un message “Admin créé : admin@admin.com / admin123” doit s’afficher.

### 5. Connexion admin
- Utilise l’email `admin@admin.com` et le mot de passe `admin123` sur le site.
- Important: change ces identifiants immédiatement en production.

## Démarrage rapide (Dev)

### Front-end (React)
```bash
cd client
npm install
npm start
```
- Application: http://localhost:3000
- Proxy dev: `client/package.json` définit `"proxy": "http://localhost"`.
- Base API utilisée par le front: `client/src/api/projects.js` et `client/src/api/veille.js` pointent vers `'/portfolio-fdme/server/api'`.

### Back-end (PHP)
Option 1 — serveur PHP intégré:
```bash
php -S 127.0.0.1:8000 -t server
```
API disponible sur: `http://127.0.0.1:8000/api/*`

Option 2 — WAMP/XAMPP/Apache:
- Place le dossier `server/` sous le DocumentRoot (ou configure un VirtualHost).
- Accès API: `http://localhost/portfolio-fdme/server/api/*`

## Fonctionnalités principales
- Portfolio React moderne, responsive
- Interface admin sécurisée (PHP, sessions, CSRF)
- API REST PHP autonome (CRUD projets & veille, upload image)
- Sécurité : validation, sanitation, CSRF, XSS, SQLi
- Documentation complète et dépôt GitHub structuré

## API REST (liste)
Base selon l’hébergement local: `http://localhost/portfolio-fdme/server/api` (Apache) ou `http://127.0.0.1:8000/api` (PHP intégré).

- `POST  /api/login.php` — login admin (JSON)
- `POST  /api/logout.php` — logout admin
- `GET   /api/get_csrf.php` — obtenir token CSRF
- `GET   /api/check_session.php` — vérifier session admin
- `GET   /api/get_projects.php` — projets publics
- `GET   /api/get_all_projects.php` — tous projets (admin)
- `POST  /api/add_project.php` — ajouter projet (admin)
- `POST  /api/update_project.php` — modifier projet (admin)
- `POST  /api/delete_project.php` — supprimer projet (admin)
- `POST  /api/toggle_visibility.php` — basculer visibilité projet (admin)
- `GET   /api/get_veille.php` — veille publique
- `GET   /api/get_all_veille.php` — toute la veille (admin)
- `POST  /api/add_veille.php` — ajouter veille (admin)
- `POST  /api/update_veille.php` — modifier veille (admin)
- `POST  /api/delete_veille.php` — supprimer veille (admin)

Notes:
- Les routes admin nécessitent une session valide + token CSRF (`get_csrf.php`).
- Upload: vérifier les contraintes MIME/extension/taille dans le code avant envoi.

## Sécurité
- Toutes les routes admin nécessitent une session valide et un token CSRF.
- Validation/sanitation côté back et front.
- Upload images sécurisé (taille, MIME, extension).

## Déploiement
- Compatible hébergement PHP classique (MariaDB, OVH, 000WebHost, Infomaniak...)

### Production — étapes
1) Base de données
   - Créer la base sur l’hébergeur et importer `database/init.sql`.

2) Back-end PHP
   - Déployer le dossier `server/` sur l’hébergement.
   - Configurer `server/config.php` avec les accès BDD de prod.
   - Exécuter `server/init_admin.php` une fois, puis le supprimer ou le protéger.

3) Front-end React
```bash
cd client
npm install
npm run build
```
   - Déployer le contenu de `client/build` (hébergement statique) ou le servir derrière Apache/Nginx.
   - Vérifier que les chemins API dans le front (`client/src/api/*.js`) correspondent à votre URL de prod.

4) Domaine et CORS
   - Idéalement servir front et back sous le même domaine pour éviter CORS.
   - Sinon, configurer CORS côté back et ajuster la base API côté front.

## Conventions Git
- Commits : `Feat/...`, `Fix/...`, `Docs/...`, etc.
- Push à chaque modification majeure.
