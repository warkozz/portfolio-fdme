-- Migration : ajout colonne live_link à la table projects
-- À exécuter UNE SEULE FOIS sur une base existante (si vous ne faites pas de restore complet)
-- Usage : source database/migrate_add_live_link.sql
SET NAMES utf8mb4;

ALTER TABLE `projects`
    ADD COLUMN `live_link` VARCHAR(255) DEFAULT NULL
    AFTER `github_link`;

-- Mise à jour des 2 nouveaux projets (s'ils existent déjà en base)
UPDATE `projects` SET `live_link` = 'https://www.codeaddict.fr/'    WHERE `id` = 13;
UPDATE `projects` SET `live_link` = 'https://www.facture2clins.fr/' WHERE `id` = 14;

SELECT CONCAT('live_link ajouté — ', COUNT(*), ' projets en base') AS resultat FROM `projects`;
