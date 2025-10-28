# 🎓 Portfolio BTS SIO SLAM – Full Stack# BTS SIO SLAM – Portfolio Professionnel



Portfolio professionnel développé dans le cadre du BTS SIO option SLAM. Application full-stack moderne avec React.js (front-end) et API REST PHP (back-end).## Structure du projet



---```

/portfolio-fdme/

## 📁 Structure du Projet│

├── /client/      # Front-end React

```├── /server/      # Back-end PHP sécurisé et autonome

/portfolio-fdme/├── /database/    # Script SQL pour création tables

│└── README.md

├── /client/              # Application React (Front-end)```

│   ├── /public/          # Fichiers statiques

│   ├── /src/             # Code source React## Pré-requis

│   │   ├── /api/         # Configuration et appels API- Node.js LTS + npm (Front)

│   │   ├── /components/  # Composants React réutilisables- PHP 8.x (CLI ou serveur Apache/Nginx)

│   │   ├── /context/     # Contextes React (AuthContext)- MariaDB / MySQL

│   │   └── /pages/       # Pages de l'application

│   └── package.json## Installation étape par étape

│

├── /server/              # API REST PHP (Back-end)### 1. Créer la base de données MariaDB/MySQL

│   ├── /api/             # Endpoints API REST- Connecte-toi à phpMyAdmin ou à ton outil SQL.

│   │   ├── login.php           # Connexion admin- Crée une base nommée par exemple `bts_portfolio`.

│   │   ├── logout.php          # Déconnexion

│   │   ├── get_csrf.php        # Récupération token CSRF### 2. Importer le script SQL

│   │   ├── check_session.php   # Vérification session- Sélectionne la base `bts_portfolio`.

│   │   ├── get_projects.php    # Liste projets publics- Clique sur “Importer” et choisis le fichier `database/init.sql`.

│   │   ├── get_all_projects.php # Tous les projets (admin)- Valide pour créer les tables (`admin`, `projects`, `veille`)

│   │   ├── add_project.php     # Ajouter projet (admin)

│   │   ├── update_project.php  # Modifier projet (admin)### 3. Configurer la connexion dans `server/config.php`

│   │   ├── delete_project.php  # Supprimer projet (admin)- Mets à jour les variables `$DB_HOST`, `$DB_NAME`, `$DB_USER`, `$DB_PASS` selon tes accès MariaDB.

│   │   ├── toggle_visibility.php # Changer visibilité (admin)

│   │   ├── get_veille.php      # Articles veille publics### 4. Créer l’admin par défaut

│   │   ├── get_all_veille.php  # Tous les articles (admin)- Place-toi dans le dossier `/server` sur ton hébergement ou en local.

│   │   ├── add_veille.php      # Ajouter article (admin)- Lance le script `init_admin.php` dans le navigateur ou via la ligne de commande :

│   │   ├── update_veille.php   # Modifier article (admin)  - Navigateur : `http://localhost/portfolio-fdme/server/init_admin.php`

│   │   └── delete_veille.php   # Supprimer article (admin)  - Ligne de commande : `php init_admin.php`

│   ├── config.php        # Configuration BDD + CORS- Un message “Admin créé : admin@admin.com / admin123” doit s’afficher.

│   ├── csrf.php          # Gestion tokens CSRF

│   └── init_admin.php    # Script d'installation (à utiliser une fois)### 5. Connexion admin

│- Utilise l’email `admin@admin.com` et le mot de passe `admin123` sur le site.

├── /database/            # Scripts SQL- Important: change ces identifiants immédiatement en production.

│   └── init.sql          # Schéma de la base de données

│## Démarrage rapide (Dev)

└── README.md             # Ce fichier

```### Front-end (React)

```bash

---cd client

npm install

## 🚀 Pré-requisnpm start

```

### Environnement de développement- Application: http://localhost:3000

- **Node.js** 16+ et **npm** (pour React)- Proxy dev: `client/package.json` définit `"proxy": "http://localhost"`.

- **PHP** 8.0+ (avec extensions PDO et PDO_MySQL)- Base API côté front: centralisée dans `client/src/api/config.js`.

- **MySQL** ou **MariaDB** 10.4+  - Variable d'env: `REACT_APP_API_BASE` (facultatif)

- **XAMPP**, **WAMP**, ou serveur Apache/Nginx (recommandé pour le développement)  - Valeur par défaut: `'/portfolio-fdme/server/api'`

  - Exemples:

---    - Dev Apache/XAMPP: `REACT_APP_API_BASE=/portfolio-fdme/server/api`

    - Dev serveur PHP intégré: `REACT_APP_API_BASE=http://127.0.0.1:8000/api`

## ⚙️ Installation    - Prod domaine: `REACT_APP_API_BASE=/server/api` ou `https://exemple.com/server/api`



### 1️⃣ Cloner le projet### Back-end (PHP)

Option 1 — serveur PHP intégré:

```bash```bash

git clone https://github.com/warkozz/portfolio-fdme.gitphp -S 127.0.0.1:8000 -t server

cd portfolio-fdme```

```API disponible sur: `http://127.0.0.1:8000/api/*`



### 2️⃣ Configuration de la base de donnéesOption 2 — WAMP/XAMPP/Apache:

- Place le dossier `server/` sous le DocumentRoot (ou configure un VirtualHost).

#### a) Créer la base de données- Accès API: `http://localhost/portfolio-fdme/server/api/*`



Ouvrez **phpMyAdmin** ou votre client MySQL et exécutez :## Fonctionnalités principales

- Portfolio React moderne, responsive

```sql- Interface admin sécurisée (PHP, sessions, CSRF)

CREATE DATABASE bts_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;- API REST PHP autonome (CRUD projets & veille, upload image)

```- Sécurité : validation, sanitation, CSRF, XSS, SQLi

- Documentation complète et dépôt GitHub structuré

#### b) Importer le schéma

## API REST (liste)

- Dans **phpMyAdmin**, sélectionnez la base `bts_portfolio`Base selon l’hébergement local: `http://localhost/portfolio-fdme/server/api` (Apache) ou `http://127.0.0.1:8000/api` (PHP intégré).

- Cliquez sur **Importer**

- Sélectionnez le fichier `database/init.sql`- `POST  /api/login.php` — login admin (JSON)

- Cliquez sur **Exécuter**- `POST  /api/logout.php` — logout admin

- `GET   /api/get_csrf.php` — obtenir token CSRF

**Tables créées :**- `GET   /api/check_session.php` — vérifier session admin

- `admin` : Comptes administrateurs- `GET   /api/get_projects.php` — projets publics

- `projects` : Projets du portfolio- `GET   /api/get_all_projects.php` — tous projets (admin)

- `veille` : Articles de veille technologique- `POST  /api/add_project.php` — ajouter projet (admin)

- `POST  /api/update_project.php` — modifier projet (admin)

### 3️⃣ Configuration du Back-end (PHP)- `POST  /api/delete_project.php` — supprimer projet (admin)

- `POST  /api/toggle_visibility.php` — basculer visibilité projet (admin)

#### a) Configurer la connexion à la base de données- `GET   /api/get_veille.php` — veille publique

- `GET   /api/get_all_veille.php` — toute la veille (admin)

Ouvrez `server/config.php` et vérifiez/modifiez les paramètres :- `POST  /api/add_veille.php` — ajouter veille (admin)

- `POST  /api/update_veille.php` — modifier veille (admin)

```php- `POST  /api/delete_veille.php` — supprimer veille (admin)

$DB_HOST = 'localhost';      // Hôte MySQL

$DB_NAME = 'bts_portfolio';  // Nom de la baseNotes:

$DB_USER = 'root';           // Utilisateur MySQL- Les routes admin nécessitent une session valide + token CSRF (`get_csrf.php`).

$DB_PASS = '';               // Mot de passe MySQL- Upload: vérifier les contraintes MIME/extension/taille dans le code avant envoi.

```

## Sécurité

#### b) Créer le compte administrateur- Toutes les routes admin nécessitent une session valide et un token CSRF.

- Validation/sanitation côté back et front.

**Via le navigateur :**- Upload images sécurisé (taille, MIME, extension).

1. Accédez à : `http://localhost/portfolio-fdme/server/init_admin.php`

2. Remplissez le formulaire avec vos identifiants souhaités## Déploiement

3. Cliquez sur **"🚀 Installer la base de données"**- Compatible hébergement PHP classique (MariaDB, OVH, 000WebHost, Infomaniak...)

4. **Notez bien les identifiants affichés !**

### Production — étapes

**Ou via phpMyAdmin :**1) Base de données

   - Créer la base sur l’hébergeur et importer `database/init.sql`.

```sql

INSERT INTO admin (email, password) VALUES 2) Back-end PHP

('admin@portfolio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');   - Déployer le dossier `server/` sur l’hébergement.

```   - Configurer `server/config.php` avec les accès BDD de prod.

> Mot de passe par défaut : `password`   - Exécuter `server/init_admin.php` une fois, puis le supprimer ou le protéger.



⚠️ **Important** : Après avoir créé l'admin, supprimez ou protégez `init_admin.php` !3) Front-end React

```bash

### 4️⃣ Installation du Front-end (React)cd client

npm install

```bashnpm run build

cd client```

npm install   - Déployer le contenu de `client/build` (hébergement statique) ou le servir derrière Apache/Nginx.

```   - Vérifier `REACT_APP_API_BASE` (voir `client/src/api/config.js`) pour coller à l'URL API de prod.



---4) Domaine et CORS

   - Idéalement servir front et back sous le même domaine pour éviter CORS.

## 🖥️ Démarrage en Développement   - Sinon, configurer CORS côté back et ajuster la base API côté front.



### Option 1 : XAMPP / WAMP (Recommandé)## Conventions Git

- Commits : `Feat/...`, `Fix/...`, `Docs/...`, etc.

#### Back-end (PHP)- Push à chaque modification majeure.

- Placez le projet dans `C:\xampp\htdocs\` (XAMPP) ou `C:\wamp64\www\` (WAMP)
- Démarrez Apache et MySQL depuis le panneau de contrôle
- L'API est accessible à : `http://localhost/portfolio-fdme/server/api/`

#### Front-end (React)
```bash
cd client
npm start
```
- L'application s'ouvre automatiquement sur `http://localhost:3000`
- Le proxy dans `package.json` redirige les appels API vers `http://localhost`

### Option 2 : Serveur PHP intégré

#### Terminal 1 - Back-end (API PHP)
```bash
cd server
php -S 127.0.0.1:8000
```
API disponible sur : `http://127.0.0.1:8000/api/`

#### Terminal 2 - Front-end (React)
```bash
cd client
npm start
```

⚠️ **Avec le serveur PHP intégré**, modifiez `client/src/api/config.js` :
```javascript
const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000/api';
```

---

## 🔐 Sécurité

### Fonctionnalités implémentées
- ✅ **Protection CSRF** : Tokens générés et vérifiés sur toutes les routes admin
- ✅ **Sessions PHP sécurisées** : Authentification requise pour l'administration
- ✅ **Validation des données** : Filtrage et échappement côté serveur
- ✅ **Requêtes préparées** : Protection contre les injections SQL
- ✅ **CORS configuré** : Autorisations limitées au domaine du front-end
- ✅ **Upload sécurisé** : Validation des types MIME et extensions d'images

### Recommandations de production
1. Changez les identifiants admin par défaut
2. Supprimez `server/init_admin.php` après installation
3. Configurez HTTPS (certificat SSL)
4. Limitez les permissions des dossiers d'upload
5. Activez les logs d'erreur PHP mais désactivez leur affichage

---

## 🌐 API REST - Documentation

**Base URL (dev XAMPP)** : `http://localhost/portfolio-fdme/server/api`

### Endpoints publics

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/get_projects.php` | Liste des projets visibles |
| `GET` | `/get_veille.php` | Articles de veille visibles |

### Endpoints admin (authentification requise)

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| `POST` | `/login.php` | Connexion admin | `{email, password, csrf_token}` |
| `POST` | `/logout.php` | Déconnexion | - |
| `GET` | `/get_csrf.php` | Récupérer token CSRF | - |
| `GET` | `/check_session.php` | Vérifier session | - |
| `GET` | `/get_all_projects.php` | Tous les projets | - |
| `POST` | `/add_project.php` | Ajouter projet | `FormData` |
| `POST` | `/update_project.php` | Modifier projet | `FormData` |
| `POST` | `/delete_project.php` | Supprimer projet | `{id, csrf_token}` |
| `POST` | `/toggle_visibility.php` | Visibilité projet | `{id, type, csrf_token}` |
| `GET` | `/get_all_veille.php` | Tous les articles | - |
| `POST` | `/add_veille.php` | Ajouter article | `{title, content, url, csrf_token}` |
| `POST` | `/update_veille.php` | Modifier article | `{id, title, content, url, csrf_token}` |
| `POST` | `/delete_veille.php` | Supprimer article | `{id, csrf_token}` |

---

## 📦 Build de Production

### Front-end React

```bash
cd client
npm run build
```

Le dossier `client/build/` contient les fichiers statiques optimisés.

### Déploiement

#### Sur un hébergement classique (OVH, Hostinger, etc.)

1. **Base de données**
   - Créez une base MySQL sur votre hébergeur
   - Importez `database/init.sql`
   - Créez l'admin via `init_admin.php`

2. **Back-end**
   - Uploadez le dossier `server/` via FTP
   - Modifiez `server/config.php` avec vos identifiants de production
   - Ajustez l'URL CORS si nécessaire

3. **Front-end**
   - Uploadez le contenu de `client/build/` dans le répertoire web
   - Ou configurez un sous-domaine pour servir `build/`

4. **Configuration finale**
   - Modifiez `client/src/api/config.js` pour pointer vers votre API de prod
   - Exemple : `const API_BASE = 'https://votredomaine.com/server/api'`
   - Rebuild le front-end : `npm run build`

---

## 🛠️ Technologies Utilisées

### Front-end
- **React** 18 - Framework JavaScript
- **React Router** - Navigation SPA
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Requêtes HTTP

### Back-end
- **PHP** 8.0+ - Langage serveur
- **PDO** - Accès base de données sécurisé
- **Sessions PHP** - Gestion de l'authentification

### Base de données
- **MySQL** / **MariaDB** - Système de gestion de base de données

---

## 🤝 Contribution

Ce projet est développé dans le cadre du BTS SIO SLAM. Les contributions sont les bienvenues !

### Conventions Git
- `feat: ...` - Nouvelle fonctionnalité
- `fix: ...` - Correction de bug
- `docs: ...` - Documentation
- `style: ...` - Formatage du code
- `refactor: ...` - Refactorisation

---

## 📝 Licence

Projet académique - BTS SIO SLAM

---

## 📧 Contact

Pour toute question, contactez l'administrateur du projet.

---

**🎓 Projet BTS SIO SLAM - Portfolio Professionnel**
