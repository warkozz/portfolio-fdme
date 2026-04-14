# 📁 Base de Données — Portfolio BTS SIO

## ⚡ Installation rapide (méthode recommandée)

### Prérequis
- XAMPP démarré (Apache + MySQL)
- PHP disponible (`C:\xampp\php\php.exe`)

### Une seule commande à lancer :

```powershell
& "C:\xampp\php\php.exe" "C:\xampp\htdocs\portfolio-fdme\database\restore.php"
```

C'est tout. Le script :
1. Supprime l'ancienne base si elle existe
2. Recrée `bts_portfolio` en utf8mb4
3. Insère les 10 projets, 5 articles de veille et le compte admin
4. Affiche un résumé

**Identifiants admin par défaut :**
- Email : `admin@portfolio.com`
- Mot de passe : `admin123`

---

## 📋 Fichiers du dossier

| Fichier | Rôle |
|---|---|
| `restore.php` | ⭐ Script d'installation principal (recommandé) |
| `install_with_data.sql` | Dump SQL de référence (sauvegarde) |
| `init.sql` | Structure des tables uniquement (sans données) |
| `veille_seed.sql` | Données de veille uniquement |
| `backup.ps1` | Script de sauvegarde automatique |
| `HOW_TO_BACKUP.md` | Instructions de sauvegarde |

---

## 🔄 Lancer le projet complet

1. **Démarrer XAMPP** (Apache + MySQL)
2. **Restaurer la BDD** :
   ```powershell
   & "C:\xampp\php\php.exe" "C:\xampp\htdocs\portfolio-fdme\database\restore.php"
   ```
3. **Démarrer le front React** :
   ```powershell
   cd C:\xampp\htdocs\portfolio-fdme\client
   npm start
   ```
4. Ouvrir **http://localhost:3000**

---

## 🔄 Sauvegarder les données

```powershell
cd C:\xampp\htdocs\portfolio-fdme\database
.\backup.ps1
```

> Voir `HOW_TO_BACKUP.md` pour les détails. Penser à mettre à jour `restore.php` après avoir ajouté des projets importants via l'admin.

---

## 🔧 Dépannage

**MySQL ne démarre pas** → Ouvrir XAMPP Control Panel et démarrer MySQL.

**Erreur de connexion PDO** → Vérifier que MySQL tourne bien sur le port 3306.

**Caractères bizarres à l'affichage** → La BDD doit être en utf8mb4. Relancer `restore.php` qui recrée tout proprement.

---

## 📦 Données incluses

**10 projets** répartis en 3 catégories (pro / ecole / perso) incluant Capgemini, BTS SIO SLAM, projets personnels.

**5 articles de veille thématiques BTS SIO SLAM :**
1. React 19 : Server Components en production — *août 2025*
2. IA Générative & Prompt Engineering (Capgemini) — *sept. 2025*
3. Sécurité des API REST : JWT, CORS, injections — *oct. 2025*
4. React et Next.js : SSR, SSG et App Router — *nov. 2025*
5. Architecture microservices vs monolithique (FastAPI) — *janv. 2026*
