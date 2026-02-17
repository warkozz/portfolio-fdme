# 🎓 Portfolio BTS SIO SLAM – Full Stack

Portfolio professionnel développé dans le cadre du BTS SIO option SLAM. Application full-stack moderne avec React.js (front-end) et API REST PHP (back-end).

**Dernière mise à jour :** 17 février 2026

---

## ✨ Fonctionnalités

### Pages Publiques
- **🏠 Accueil** - Présentation et vue d'ensemble
- **💼 Projets** - Portfolio de projets organisés par catégories :
  - 🏢 **Projets Professionnels** - Réalisations en entreprise (Capgemini, etc.)
  - 🎓 **Projets Scolaires** - Travaux BTS SIO SLAM (PPE, projets pédagogiques)
  - 💻 **Projets Personnels** - Développements individuels
- **📡 Veille Technologique** - Articles organisés par type :
  - 📧 **Veille automatique** - Newsletters, flux RSS, réseaux sociaux
  - 💬 **Forums et communautés** - Discord, Stack Overflow, Dev.to, Reddit
- **👤 À propos** - Parcours et compétences professionnelles
- **📬 Contact** - Formulaire de contact
- **📄 CV** - Curriculum vitae complet

### Administration Sécurisée
- 🔐 Authentification avec protection CSRF
- ✏️ Gestion complète des **projets** (CRUD avec catégories)
- 📝 Gestion complète de la **veille** (CRUD avec catégories)
- 👁️ Système de visibilité (afficher/masquer les contenus)
- 🖼️ Upload et gestion d'images pour les projets

---

## 📁 Structure du Projet

```
/portfolio-fdme/
├── /client/              # Application React (Front-end)
│   ├── /public/          # Fichiers statiques
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── /src/
│   │   ├── /api/         # Configuration et appels API
│   │   │   ├── config.js
│   │   │   ├── projects.js
│   │   │   └── veille.js
│   │   ├── /components/  # Composants React réutilisables
│   │   │   ├── Layout.js
│   │   │   ├── ProjectCard.js
│   │   │   ├── VeilleCard.js
│   │   │   └── /admin/   # Composants d'administration
│   │   │       ├── AddProjectForm.js
│   │   │       ├── EditProjectForm.js
│   │   │       ├── AddVeilleForm.js
│   │   │       ├── EditVeilleForm.js
│   │   │       ├── ProjectsAdmin.js
│   │   │       └── VeilleAdmin.js
│   │   ├── /context/     # Contextes React
│   │   │   └── AuthContext.js
│   │   ├── /pages/       # Pages de l'application
│   │   │   ├── Home.js
│   │   │   ├── Projects.js (3 catégories)
│   │   │   ├── Veille.js (2 catégories)
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   ├── CV.js
│   │   │   ├── Technologies.js
│   │   │   └── AdminPanel.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── /server/              # API REST PHP (Back-end)
│   ├── /api/             # Endpoints API REST
│   │   ├── login.php, logout.php, check_session.php
│   │   ├── get_csrf.php
│   │   ├── get_projects.php       # Projets publics
│   │   ├── get_all_projects.php   # Tous projets (admin)
│   │   ├── add_project.php        # Ajouter projet (admin)
│   │   ├── update_project.php     # Modifier projet (admin)
│   │   ├── delete_project.php     # Supprimer projet (admin)
│   │   ├── get_veille.php         # Veille publique
│   │   ├── get_all_veille.php     # Toute veille (admin)
│   │   ├── add_veille.php         # Ajouter veille (admin)
│   │   ├── update_veille.php      # Modifier veille (admin)
│   │   ├── delete_veille.php      # Supprimer veille (admin)
│   │   └── toggle_visibility.php  # Visibilité (admin)
│   ├── config.php        # Configuration BDD + CORS
│   ├── csrf.php          # Gestion tokens CSRF
│   └── init_admin.php    # Script d'installation admin
│
└── /database/            # Scripts SQL
    ├── init.sql              # Structure des tables seules
    ├── install_with_data.sql # Installation complète (structure + données)
    ├── data_projects.sql     # Backup des projets
    ├── data_veille.sql       # Backup de la veille
    ├── install.bat / .ps1    # Scripts d'installation automatique
    ├── backup.bat / .ps1     # Scripts de sauvegarde
    └── README.md             # Documentation d'installation
```

---

## 🗄️ Structure de la Base de Données

### Table `admin`
Comptes administrateurs avec authentification sécurisée (bcrypt).

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | Identifiant unique |
| `email` | VARCHAR(255) UNIQUE | Email de connexion |
| `password` | VARCHAR(255) | Hash bcrypt du mot de passe |

### Table `projects`
Portfolio de projets avec **catégorisation**.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | Identifiant unique |
| `title` | VARCHAR(255) NOT NULL | Titre du projet |
| `description` | TEXT NOT NULL | Description détaillée |
| `image` | VARCHAR(255) | Chemin de l'image |
| `github_link` | VARCHAR(255) | Lien GitHub |
| `competencies` | TEXT | Compétences mobilisées |
| **`category`** | **ENUM('pro', 'ecole', 'perso')** | **Catégorie du projet** |
| `visible` | TINYINT DEFAULT 1 | Visibilité (0=masqué, 1=visible) |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Date de création |

**Catégories de projets :**
- `pro` - Projets professionnels (Capgemini, entreprises)
- `ecole` - Projets scolaires (BTS SIO SLAM, PPE)
- `perso` - Projets personnels

### Table `veille`
Articles de veille technologique avec **catégorisation**.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | Identifiant unique |
| `title` | VARCHAR(255) NOT NULL | Titre de l'article |
| `content` | TEXT NOT NULL | Contenu de l'article |
| `url` | VARCHAR(255) | Lien source |
| **`category`** | **ENUM('automatique', 'forum')** | **Type de veille** |
| `visible` | TINYINT DEFAULT 1 | Visibilité (0=masqué, 1=visible) |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Date de création |

**Catégories de veille :**
- `automatique` - Sources automatiques (newsletters, RSS, réseaux sociaux)
- `forum` - Forums et communautés (Discord, Stack Overflow, Dev.to, Reddit)

---

## 🚀 Installation Rapide

### Prérequis
- ✅ **XAMPP** (ou Apache + PHP 8.x + MySQL/MariaDB)
- ✅ **Node.js** LTS + npm
- ✅ **Git** (optionnel)

### Option 1 : Installation automatique avec données

Cette méthode installe la structure ET les données de démo (projets et veilles).

#### Windows
```bash
cd database
install.bat
```

#### PowerShell / Linux / macOS
```bash
cd database
pwsh install.ps1
```

Le script :
1. Crée la base de données `bts_portfolio`
2. Importe la structure et les données depuis `install_with_data.sql`
3. Demande de créer un compte admin

### Option 2 : Installation manuelle

#### 1️⃣ Créer la base de données

Ouvrez **phpMyAdmin** ou votre client MySQL :

```sql
CREATE DATABASE bts_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 2️⃣ Importer le schéma

**Pour une base vide (sans données) :**
- Dans phpMyAdmin, sélectionnez `bts_portfolio`
- Importez `database/init.sql`

**Pour une base avec données de démo :**
- Dans phpMyAdmin, sélectionnez `bts_portfolio`
- Importez `database/install_with_data.sql` (contient 10 projets et 8 veilles)

#### 3️⃣ Configurer la connexion

Ouvrez `server/config.php` et vérifiez :

```php
$DB_HOST = 'localhost';      // Hôte MySQL
$DB_NAME = 'bts_portfolio';  // Nom de la base
$DB_USER = 'root';           // Utilisateur MySQL
$DB_PASS = '';               // Mot de passe MySQL (vide par défaut sur XAMPP)
```

#### 4️⃣ Créer le compte administrateur

**Via le navigateur :**
1. Accédez à : `http://localhost/portfolio-fdme/server/init_admin.php`
2. Remplissez le formulaire avec vos identifiants
3. Cliquez sur **"🚀 Installer la base de données"**
4. **Notez bien les identifiants affichés !**

**Ou via phpMyAdmin :**
```sql
INSERT INTO admin (email, password) VALUES 
('admin@portfolio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
```
> Mot de passe par défaut : `password`

⚠️ **IMPORTANT** : Après création de l'admin, supprimez ou protégez `init_admin.php` !

#### 5️⃣ Installer les dépendances React

```bash
cd client
npm install
```

---

## 🖥️ Démarrage en Développement

### Option A : XAMPP / WAMP (Recommandé)

#### Back-end (PHP)
1. Placez le projet dans `C:\xampp\htdocs\` (XAMPP) ou `C:\wamp64\www\` (WAMP)
2. Démarrez **Apache** et **MySQL** depuis le panneau de contrôle
3. L'API est accessible à : `http://localhost/portfolio-fdme/server/api/`

#### Front-end (React)
```bash
cd client
npm start
```
- L'application s'ouvre automatiquement sur `http://localhost:3000`
- Le proxy dans `package.json` redirige les appels API vers `http://localhost`

### Option B : Serveur PHP intégré

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
- ✅ **Validation des données** : Filtrage et échappement côté serveur (catégories validées)
- ✅ **Requêtes préparées** : Protection contre les injections SQL
- ✅ **CORS configuré** : Autorisations limitées au domaine du front-end
- ✅ **Upload sécurisé** : Validation des types MIME et extensions d'images
- ✅ **Sanitization** : Nettoyage des entrées utilisateur avec `htmlspecialchars()`

### Recommandations de production
1. ⚠️ Changez les identifiants admin par défaut
2. ⚠️ Supprimez `server/init_admin.php` après installation
3. 🔒 Configurez HTTPS (certificat SSL)
4. 📁 Limitez les permissions des dossiers d'upload
5. 📊 Activez les logs d'erreur PHP mais désactivez leur affichage public
6. 🛡️ Configurez un pare-feu applicatif (WAF)

---

## 🌐 API REST - Documentation

**Base URL (dev XAMPP)** : `http://localhost/portfolio-fdme/server/api`

### Endpoints publics

| Méthode | Endpoint | Description | Retour |
|---------|----------|-------------|--------|
| `GET` | `/get_projects.php` | Liste des projets visibles | JSON array avec `category` |
| `GET` | `/get_veille.php` | Articles de veille visibles | JSON array avec `category` |

**Exemple de réponse projets :**
```json
[
  {
    "id": 1,
    "title": "Processus Qualité Capgemini",
    "description": "...",
    "category": "pro",
    "image": "...",
    "github_link": "...",
    "competencies": "...",
    "created_at": "2024-01-15 10:30:00"
  }
]
```

### Endpoints admin (authentification requise)

#### Authentification

| Méthode | Endpoint | Description | Body | Headers |
|---------|----------|-------------|------|---------|
| `POST` | `/login.php` | Connexion admin | `{email, password, csrf_token}` | - |
| `POST` | `/logout.php` | Déconnexion | - | - |
| `GET` | `/get_csrf.php` | Récupérer token CSRF | - | - |
| `GET` | `/check_session.php` | Vérifier session | - | - |

#### Gestion des projets

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| `GET` | `/get_all_projects.php` | Tous les projets (y compris masqués) | - |
| `POST` | `/add_project.php` | Ajouter un projet | `FormData: {title, description, category, image, github_link, competencies, csrf_token}` |
| `POST` | `/update_project.php` | Modifier un projet | `FormData: {id, title, description, category, image, github_link, competencies, csrf_token}` |
| `POST` | `/delete_project.php` | Supprimer un projet | `{id, csrf_token}` |
| `POST` | `/toggle_visibility.php` | Basculer visibilité | `{id, type: 'project', csrf_token}` |

**Catégories valides pour projets** : `'pro'`, `'ecole'`, `'perso'`

#### Gestion de la veille

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| `GET` | `/get_all_veille.php` | Tous les articles (y compris masqués) | - |
| `POST` | `/add_veille.php` | Ajouter un article | `{title, content, url, category, csrf_token}` |
| `POST` | `/update_veille.php` | Modifier un article | `{id, title, content, url, category, csrf_token}` |
| `POST` | `/delete_veille.php` | Supprimer un article | `{id, csrf_token}` |
| `POST` | `/toggle_visibility.php` | Basculer visibilité | `{id, type: 'veille', csrf_token}` |

**Catégories valides pour veille** : `'automatique'`, `'forum'`

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

**1. Base de données**
- Créez une base MySQL sur votre hébergeur
- Importez `database/install_with_data.sql` (avec données) ou `database/init.sql` (sans données)
- Créez l'admin via `init_admin.php` puis supprimez-le

**2. Back-end**
- Uploadez le dossier `server/` via FTP
- Modifiez `server/config.php` avec vos identifiants de production
- Ajustez l'URL CORS si nécessaire dans `config.php` :
```php
$allowed_origins = ['https://votredomaine.com'];
```

**3. Front-end**
- Modifiez `client/src/api/config.js` pour pointer vers votre API de prod :
```javascript
const API_BASE = 'https://votredomaine.com/server/api';
```
- Rebuild le front-end : `npm run build`
- Uploadez le contenu de `client/build/` dans le répertoire web

**4. Configuration finale**
- Configurez un certificat SSL (Let's Encrypt recommandé)
- Testez l'authentification et les endpoints API
- Vérifiez que les catégories s'affichent correctement

---

## 🛠️ Technologies Utilisées

### Front-end
- ⚛️ **React** 18 - Framework JavaScript
- 🔀 **React Router** - Navigation SPA
- 🎨 **Tailwind CSS** - Framework CSS utility-first
- 🌐 **Axios** - Requêtes HTTP
- 🔄 **Context API** - Gestion d'état (AuthContext)

### Back-end
- 🐘 **PHP** 8.0+ - Langage serveur
- 🗄️ **PDO** - Accès base de données sécurisé
- 🔐 **Sessions PHP** - Gestion de l'authentification
- 🛡️ **CSRF Protection** - Sécurité des formulaires

### Base de données
- 🐬 **MySQL** / **MariaDB** 10.4+ - SGBD relationnel

---

## 💾 Sauvegarde des Données

### Export automatique

#### Windows
```bash
cd database
backup.bat
```

#### PowerShell / Linux / macOS
```bash
cd database
pwsh backup.ps1
```

Le script exporte :
- `data_projects.sql` - Tous les projets avec catégories
- `data_veille.sql` - Tous les articles avec catégories

### Import des sauvegardes

```sql
-- Dans phpMyAdmin, sélectionnez la base et importez :
source database/data_projects.sql;
source database/data_veille.sql;
```

---

## 🎯 Fonctionnalités des Catégories

### Projets - 3 catégories

**Interface publique** ([Projects.js](client/src/pages/Projects.js)) :
- Section **"🏢 Projets Professionnels"** - Projets réalisés en entreprise
- Section **"🎓 Projets Scolaires"** - Travaux académiques et PPE
- Section **"💻 Projets Personnels"** - Développements individuels

**Interface admin** ([AddProjectForm.js](client/src/components/admin/AddProjectForm.js), [EditProjectForm.js](client/src/components/admin/EditProjectForm.js)) :
- Dropdown de sélection avec 3 options :
  - `perso` - Projet personnel
  - `ecole` - École / Formation
  - `pro` - Professionnel

### Veille - 2 catégories

**Interface publique** ([Veille.js](client/src/pages/Veille.js)) :
- Section **"📧 Veille automatique"** - Newsletters, RSS, réseaux sociaux
- Section **"💬 Forums et communautés"** - Discord, Stack Overflow, Dev.to, Reddit

**Interface admin** ([AddVeilleForm.js](client/src/components/admin/AddVeilleForm.js), [EditVeilleForm.js](client/src/components/admin/EditVeilleForm.js)) :
- Dropdown de sélection avec 2 options :
  - `automatique` - Veille automatique
  - `forum` - Forum / Communauté

---

## 🤝 Contribution

Ce projet est développé dans le cadre du BTS SIO SLAM. Les contributions sont les bienvenues !

### Workflow Git
```bash
git clone https://github.com/warkozz/portfolio-fdme.git
git checkout -b feature/nouvelle-fonctionnalite
# ... modifications ...
git add .
git commit -m "feat: description de la fonctionnalité"
git push origin feature/nouvelle-fonctionnalite
```

### Conventions de commits
- `feat: ...` - Nouvelle fonctionnalité
- `fix: ...` - Correction de bug
- `docs: ...` - Documentation
- `style: ...` - Formatage du code
- `refactor: ...` - Refactorisation
- `test: ...` - Tests
- `chore: ...` - Tâches de maintenance

---

## 📝 Licence

Projet académique - BTS SIO SLAM

---

## 📧 Contact

**Dépôt GitHub** : [warkozz/portfolio-fdme](https://github.com/warkozz/portfolio-fdme)

Pour toute question relative au projet, n'hésitez pas à ouvrir une issue sur GitHub.

---

## 📚 Documentation Complémentaire

- [HOW_TO_BACKUP.md](HOW_TO_BACKUP.md) - Guide de sauvegarde détaillé
- [database/README.md](database/README.md) - Documentation des scripts d'installation
- [CHANGELOG.md](CHANGELOG.md) - Historique des modifications

---

**🎓 Projet BTS SIO SLAM - Portfolio Professionnel**

*Développé avec ⚛️ React + 🐘 PHP + 🐬 MySQL*
