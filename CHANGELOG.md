# Changelog

Tous les changements notables de ce projet sont documentés dans ce fichier.

## [1.0.0] - 2025-10-28

### ✨ Ajouté
- Application React complète avec routing
- Interface d'administration sécurisée
- API REST PHP complète (15 endpoints)
- Gestion CRUD des projets (avec upload d'images)
- Gestion CRUD de la veille technologique
- Authentification admin avec sessions PHP
- Protection CSRF sur toutes les routes admin
- Configuration de la base de données MySQL
- Script d'installation (`init_admin.php`)
- Documentation complète (README.md)
- Fichier .gitignore
- Structure de projet professionnelle

### 🔐 Sécurité
- Validation et sanitation des données
- Requêtes préparées (protection SQL injection)
- Tokens CSRF
- Sessions PHP sécurisées
- Upload d'images sécurisé
- Configuration CORS

### 📁 Structure
```
/portfolio-fdme/
├── /client/          # React App
├── /server/          # API PHP
│   ├── /api/         # Endpoints REST
│   ├── config.php
│   ├── csrf.php
│   └── init_admin.php
├── /database/        # SQL Schema
└── README.md
```

### 🛠️ Technologies
- **Front:** React 18, React Router, Tailwind CSS, Axios
- **Back:** PHP 8.0+, PDO, Sessions
- **BDD:** MySQL/MariaDB

---

## Notes de version

### Configuration requise
- Node.js 16+
- PHP 8.0+
- MySQL 10.4+

### Installation rapide
```bash
# 1. Base de données
CREATE DATABASE bts_portfolio;
# Importer database/init.sql

# 2. Config back-end
# Modifier server/config.php

# 3. Créer admin
# Accéder à server/init_admin.php

# 4. Front-end
cd client
npm install
npm start
```

### Identifiants par défaut
- Email: `admin@portfolio.com`
- Mot de passe: `password`

⚠️ **À changer immédiatement en production !**
