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

## Installation

### 1. Base de données (MariaDB)
- Importez `/database/init.sql` dans votre MariaDB.
- (Optionnel) Lancez `/server/init_admin.php` pour créer un admin par défaut.

### 2. Back-end PHP
- Placez `/server` sur votre hébergement PHP (OVH, 000WebHost, etc.).
- Configurez la connexion à la base dans `/server/config.php`.

### 3. Front-end React
- Placez-vous dans `/client` puis lancez :
  ```bash
  npm install --legacy-peer-deps
  npm start
  ```

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
