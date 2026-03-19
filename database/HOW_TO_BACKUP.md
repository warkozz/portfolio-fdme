# Guide de sauvegarde et migration

## Sauvegarder (avant de déployer)

Double-cliquez sur **`backup.ps1`**.

Cela génère un seul fichier `install_with_data.sql` qui contient **tout** : structure des tables, données, et images (stockées en base64 dans la DB).

> Faire ça à chaque fois qu'on veut préparer une migration vers le serveur.

---

## Restaurer sur un nouveau serveur

```bash
mysql -u root bts_portfolio < install_with_data.sql
```

Ou via phpMyAdmin : **Importer** → sélectionner `install_with_data.sql`.

---

## Importer les images

Les images sont stockées directement en base de données (colonne `image_base64`).  
**Il n'y a pas de dossier `upload/` à transférer.** Le dump SQL suffit.

---

## Quand faire une sauvegarde ?

Faites une sauvegarde et mettez à jour `install_with_data.sql` quand :

✅ Vous ajoutez de nouveaux projets importants
✅ Vous ajoutez des articles de veille
✅ Vous modifiez des descriptions de projets
✅ Avant de réinstaller votre base de données
✅ Avant de partager votre code (Git)

- Vous ajoutez ou modifiez des projets/veille dans l'admin
- Vous uploadez des images
- Avant un commit Git destiné à être déployé

---

## Checklist avant déploiement

- [ ] Lancer `backup.ps1`
- [ ] Commiter `install_with_data.sql`
- [ ] Sur le serveur : importer `install_with_data.sql`
