# BTS SIO SLAM – Portfolio Professionnel

## Structure du projet

```
/bts-portfolio/
│
├── /client/      # Front-end React
├── /server/      # Back-end PHP sécurisé et autonome
├── /database/    # Script SQL pour création tables
└── README.md
```

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

## Fonctionnalités principales
- Portfolio React moderne, responsive
- Interface admin sécurisée (PHP, sessions, CSRF)
- API REST PHP autonome (CRUD projets & veille, upload image)
- Sécurité : validation, sanitation, CSRF, XSS, SQLi
- Documentation complète et dépôt GitHub structuré

## API REST (exemples)
- `POST /api/login.php` : login admin (JSON)
- `GET /api/get_csrf.php` : obtenir token CSRF
- `GET /api/check_session.php` : vérifier session admin
- `GET /api/get_projects.php` : projets publics
- `GET /api/get_all_projects.php` : tous projets (admin)
- `POST /api/add_project.php` : ajouter projet (admin)
- ...

## Sécurité
- Toutes les routes admin nécessitent une session valide et un token CSRF.
- Validation/sanitation côté back et front.
- Upload images sécurisé (taille, MIME, extension).

## Déploiement
- Compatible hébergement PHP classique (MariaDB, OVH, 000WebHost...)

## Conventions Git
- Commits : `Feat/...`, `Fix/...`, `Docs/...`, etc.
- Push à chaque modification majeure.

## Pour plus de détails, voir le prompt dans `prompt.txt`.
