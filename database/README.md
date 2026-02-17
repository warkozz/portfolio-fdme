# 📁 Scripts d'Installation de la Base de Données

Ce dossier contient tous les fichiers nécessaires pour installer et maintenir la base de données du portfolio.

## 📋 Fichiers disponibles

### Scripts d'installation

- **`install_with_data.sql`** ⭐ **RECOMMANDÉ**
  - Script complet qui crée la structure ET importe toutes les données
  - Contient : tables + 10 projets + 8 articles de veille
  - Usage : Installation complète en une seule commande

- **`init.sql`**
  - Crée uniquement la structure des tables (sans données)
  - Usage : Installation minimale sans contenu

- **`install.bat`** 🪟 **Windows**
  - Script Windows pour installation automatique
  - Double-cliquez pour installer automatiquement
  - Vérifie MySQL, crée la base et importe les données

### Fichiers de données (backups)

- **`data_projects.sql`**
  - Export de tous les projets existants
  - Format : mysqldump standard

- **`data_veille.sql`**
  - Export de tous les articles de veille
  - Format : mysqldump standard

### Migrations

- **`migration_add_category.sql`**
  - Ajoute le champ `category` à la table veille
  - À exécuter sur une base existante pour la mise à jour

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

# Importer les données
mysql -u root bts_portfolio < database/install_with_data.sql
```

---

## 🔄 Mise à jour des données (backup)

Si vous avez ajouté de nouveaux projets ou articles de veille et souhaitez sauvegarder :

```bash
# Sauvegarder les projets
cd C:\xampp\mysql\bin
.\mysqldump.exe -u root --no-create-info --complete-insert --skip-extended-insert bts_portfolio projects > C:\xampp\htdocs\portfolio-fdme\database\data_projects.sql

# Sauvegarder la veille
.\mysqldump.exe -u root --no-create-info --complete-insert --skip-extended-insert bts_portfolio veille > C:\xampp\htdocs\portfolio-fdme\database\data_veille.sql
```

Ensuite, mettez à jour `install_with_data.sql` avec les nouvelles données.

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
- 10 projets
- 8 articles de veille (4 automatiques + 4 forums)

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

### Projets (10)
1. Logiciel Gestion Conseil de classe
2. Application Logiciel Gestion Five 5v5
3. Application Gestion de projet
4. Application Web Zoo Arcadia
5. Développeur R&D Python/IA – AuditGen AI (Capgemini)
6. Développeur Web – AuditGen AI (Capgemini)
7. Développeur Mobile React – Protectiv Pint (Capgemini)
8. PPE MediaWiki - Installation et Documentation
9. Site Vitrine BTP - Rénovation Salles de Sport
10. Football Manager 5V5 - Extension Web

### Veille automatique (4)
- Newsletters et alertes email
- Agrégation de flux RSS (Feedly)
- Réseaux sociaux (Twitter, Reddit, TikTok, Instagram)
- Newsletters internes Capgemini

### Forums et communautés (4)
- Discord
- Stack Overflow
- Dev.to et Hashnode
- Microsoft Teams

---

## ⚠️ Important

- Les fichiers `data_projects.sql` et `data_veille.sql` sont des backups bruts (générés par mysqldump)
- Le fichier `install_with_data.sql` est le script optimisé à utiliser pour l'installation
- Pensez à mettre à jour `install_with_data.sql` après chaque modification importante de vos données
