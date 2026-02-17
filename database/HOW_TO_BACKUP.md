# 🔄 Guide de Sauvegarde et Mise à Jour des Données

Ce guide explique comment sauvegarder vos nouvelles données et les intégrer au script d'installation.

## 📦 Sauvegarder vos données

### Méthode automatique (Recommandé)

Double-cliquez sur le fichier **`backup.bat`** dans le dossier `database/`.

Ce script va automatiquement :
1. Exporter tous vos projets → `data_projects.sql`
2. Exporter tous vos articles de veille → `data_veille.sql`

### Méthode manuelle

```bash
cd C:\xampp\mysql\bin

# Exporter les projets
.\mysqldump.exe -u root --no-create-info --complete-insert --skip-extended-insert bts_portfolio projects > C:\xampp\htdocs\portfolio-fdme\database\data_projects.sql

# Exporter la veille
.\mysqldump.exe -u root --no-create-info --complete-insert --skip-extended-insert bts_portfolio veille > C:\xampp\htdocs\portfolio-fdme\database\data_veille.sql
```

---

## 🔧 Mettre à jour le script d'installation

Après avoir sauvegardé vos données, vous devez mettre à jour `install_with_data.sql` :

### Option 1 : Manuelle (plus de contrôle)

1. Ouvrez `data_projects.sql` et `data_veille.sql`
2. Copiez uniquement les lignes `INSERT INTO` (sans l'en-tête ni le pied de page)
3. Ouvrez `install_with_data.sql`
4. Remplacez les anciennes insertions par les nouvelles
5. Vérifiez que les catégories de veille sont correctes (`automatique` ou `forum`)

### Option 2 : Régénérer complètement (rapide)

1. Faites une sauvegarde de l'ancien `install_with_data.sql` (au cas où)
2. Créez un nouveau fichier avec :
   - L'en-tête et la création des tables (copiez depuis l'ancien)
   - Collez les nouveaux INSERT depuis `data_projects.sql`
   - Collez les nouveaux INSERT depuis `data_veille.sql`
   - **Important** : Ajoutez manuellement le champ `category` dans les INSERT de veille

---

## ⚠️ Points d'attention

### Catégories de veille

Les exports de `data_veille.sql` incluent maintenant le champ `category`. Vérifiez que chaque article a bien sa catégorie :

- `'automatique'` : Newsletters, RSS, alertes, réseaux sociaux
- `'forum'` : Discord, Stack Overflow, forums, communautés

### IDs des enregistrements

Les IDs sont conservés lors de l'export. Si vous ajoutez de nouveaux projets/veille :
- Gardez les IDs existants
- Les nouveaux auront des IDs plus élevés
- C'est normal et voulu pour la cohérence

### Encodage des caractères

Si vous voyez des caractères bizarres (é → ├®) :

1. Ouvrez les fichiers SQL avec un éditeur UTF-8 (VS Code, Notepad++)
2. Sauvegardez-les en UTF-8
3. Ou ajoutez `--default-character-set=utf8mb4` à la commande mysqldump

---

## 📅 Quand faire une sauvegarde ?

Faites une sauvegarde et mettez à jour `install_with_data.sql` quand :

✅ Vous ajoutez de nouveaux projets importants
✅ Vous ajoutez des articles de veille
✅ Vous modifiez des descriptions de projets
✅ Avant de réinstaller votre base de données
✅ Avant de partager votre code (Git)

---

## 🧪 Tester votre nouveau script

Après avoir mis à jour `install_with_data.sql` :

```bash
# 1. Supprimer la base actuelle (ATTENTION!)
mysql -u root -e "DROP DATABASE bts_portfolio;"

# 2. Réinstaller avec le nouveau script
cd database
install.bat

# 3. Vérifier le nombre d'enregistrements
mysql -u root bts_portfolio -e "SELECT COUNT(*) FROM projects; SELECT COUNT(*) FROM veille;"
```

Si tout est OK, vous avez réussi ! 🎉

---

## 📝 Checklist avant commit Git

Avant de pousser vos modifications sur Git :

- [ ] Exécuter `backup.bat` pour sauvegarder les données
- [ ] Mettre à jour `install_with_data.sql` avec les nouvelles données
- [ ] Tester la réinstallation avec le nouveau script
- [ ] Vérifier que tous les projets et veilles sont présents
- [ ] Commit des fichiers :
  - `data_projects.sql`
  - `data_veille.sql`
  - `install_with_data.sql`

---

## 🆘 Problèmes courants

### "Commands out of sync"

Vérifiez qu'il n'y a pas de caractères spéciaux mal échappés dans les INSERT.

### "Duplicate entry for key 'PRIMARY'"

Les IDs sont en conflit. Utilisez `INSERT IGNORE` ou supprimez les anciens enregistrements avant.

### Données manquantes après installation

Vérifiez que tous les INSERT de `install_with_data.sql` ont bien été exécutés (pas d'erreur SQL).
