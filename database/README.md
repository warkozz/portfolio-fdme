# 📁 Scripts d'Installation de la Base de Données

Ce dossier contient tous les fichiers nécessaires pour installer et maintenir la base de données du portfolio.

## 📋 Fichiers disponibles

### Scripts d'installation

- **`install_with_data.sql`** ⭐ **RECOMMANDÉ**
  - Script complet qui crée la structure ET importe toutes les données
  - Contient : tables + projets + 5 fiches de veille thématiques BTS SIO
  - Usage : Installation complète en une seule commande

- **`init.sql`**
  - Crée uniquement la structure des tables (sans données)
  - Usage : Installation minimale sans contenu, puis alimenter via l'admin

- **`veille_seed.sql`**
  - Insère uniquement les 5 fiches de veille (structure + analyse personnelle)
  - Usage : Ré-alimenter la veille sur une base déjà initialisée via `init.sql`

- **`install.bat`** 🪟 **Windows**
  - Script Windows pour installation automatique
  - Double-cliquez pour installer automatiquement
  - Vérifie MySQL, crée la base et importe les données

---

## 🚀 Installation Rapide

### Méthode 1 : Script automatique (Recommandé pour Windows)

```bash
cd database
install.bat
```

Le script va :
1. Vérifier que MySQL est démarré
2. Créer la base `bts_portfolio`
3. Importer structure + données
4. Afficher un résumé

### Méthode 2 : Manuelle via phpMyAdmin

1. Ouvrir phpMyAdmin : http://localhost/phpmyadmin
2. Créer une nouvelle base : `bts_portfolio`
3. Onglet "Importer"
4. Sélectionner `install_with_data.sql`
5. Cliquer sur "Exécuter"

### Méthode 3 : Ligne de commande MySQL

```bash
# Créer la base
mysql -u root -e "CREATE DATABASE bts_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Importer structure + données (depuis le dossier racine du projet)
mysql -u root bts_portfolio -e "source database/install_with_data.sql"
```

> ⚠️ Utiliser `source` (pas la redirection `<`) pour éviter les problèmes d'encodage UTF-8 sous Windows.

---

## 🔄 Mise à jour des données (backup)

Utiliser le script PowerShell inclus :

```bash
cd database
.\backup.ps1
```

Ou voir `HOW_TO_BACKUP.md` pour les instructions détaillées.

---

## 📝 Après l'installation

### Créer un compte administrateur

```bash
cd server
php init_admin.php
```

Suivez les instructions pour créer votre compte admin.

### Vérifier l'installation

Connectez-vous à phpMyAdmin et vérifiez :

```sql
USE bts_portfolio;

-- Vérifier les tables
SHOW TABLES;

-- Compter les projets
SELECT COUNT(*) FROM projects;

-- Compter les articles de veille
SELECT COUNT(*) FROM veille;

-- Vérifier les catégories de veille
SELECT category, COUNT(*) FROM veille GROUP BY category;
```

Vous devriez voir :
- 3 tables (admin, projects, veille)
- Les projets importés
- 5 fiches de veille thématiques BTS SIO SLAM

---

## 🔧 Dépannage

### Erreur : "Table already exists"

```sql
DROP DATABASE bts_portfolio;
CREATE DATABASE bts_portfolio;
-- Puis relancer l'installation
```

### Erreur : "MySQL not running"

Ouvrez XAMPP Control Panel et démarrez MySQL.

### Problème d'encodage (caractères bizarres)

Vérifiez que la base utilise utf8mb4 :

```sql
ALTER DATABASE bts_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 📦 Contenu des données

### Veille technologique (5 fiches thématiques BTS SIO SLAM)
1. React 19 : les Server Components en production — *août 2025*
2. IA Générative & Prompt Engineering — retour AuditGen AI (Capgemini) — *sept. 2025*
3. Sécurité des API REST : JWT, CORS et protection contre les injections — *oct. 2025*
4. React et Next.js : SSR, SSG et App Router — *nov. 2025*
5. Architecture microservices vs monolithique — expérience FastAPI — *janv. 2026*

Chaque fiche contient : informations collectées (`content`) + analyse personnelle liée aux projets réels (`analysis`).

---

## ⚠️ Important

- Le fichier `install_with_data.sql` est le script complet à utiliser pour toute installation fraîche
- `veille_seed.sql` permet de ré-insérer uniquement la veille (ex : après un `init.sql`)
- Penser à mettre à jour `install_with_data.sql` après chaque modification importante des données
