-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: bts_portfolio
-- ------------------------------------------------------
-- Server version	11.8.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `email`, `password`) VALUES (2,'admin@portfolio.com','$2y$10$MqnwbwMKdasIbjDU364k3OYjcrdgTvJT6EEP5khyUVUC76e/Zk83W');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_base64` longtext DEFAULT NULL,
  `image_mime` varchar(50) DEFAULT NULL,
  `github_link` varchar(255) DEFAULT NULL,
  `competencies` text DEFAULT NULL,
  `category` enum('pro','ecole','perso') DEFAULT 'perso',
  `visible` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_projects_visible_created_at` (`visible`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` (`id`, `title`, `description`, `image`, `image_base64`, `image_mime`, `github_link`, `competencies`, `category`, `visible`, `created_at`) VALUES (3,'Logiciel Gestion Conseil de classe','Ce logiciel me permet rentrer les infos sur les élèves récupérer au conseil de classe puis de les sauvegarder et transférer dans un document texte claire et précis avec moyenne par matières, notes général, et moyenne général.','',NULL,NULL,'https://github.com/warkozz/conseil_classe','Python, PHP, MYSQL','perso',1,'2025-11-24 13:57:30'),(4,'Application Logiciel Gestion Five 5v5','Application web développée dans le cadre d'un projet PPE pour mon BTS SIO option SLAM. Elle permet la gestion complète d'un centre de football en salle : administration des terrains, gestion des réservations, suivi des membres et interface d'administration sécurisée. L'outil facilite l'organisation, automatise les tâches courantes et offre une expérience utilisateur simple et intuitive.',NULL,NULL,NULL,'https://github.com/warkozz/projet-ppe-exam','PHP, Python, SQL, CSS,','ecole',1,'2025-11-24 14:01:33'),(5,'Application Gestion de projet','Dans le cadre d\'un exercice en cours, j\'ai pu réaliser un une application de gestion de projet','',NULL,NULL,'https://github.com/warkozz?tab=repositories','PHP, React, SQL, MYSQL, Python','ecole',1,'2025-11-24 14:05:32'),(6,'Application Web Zoo Arcadia','Dans le cadre d\'une formation précédant la reprise de mes études, j\'ai pu travailler sur un projet de A a Z de création d\'un site web pour un zoo fictif (cela inclu base de données, site web, documents annexes...)','',NULL,NULL,'https://github.com/warkozz/zoo-app','React js, Laravel, MYSQL, Prisma','perso',1,'2025-11-24 14:08:48'),(7,'Développeur R&D Python/IA  -  AuditGen AI (Capgemini)','Projet interne visant à automatiser la génération et l'analyse de prompts pour l'audit de documents (dont Excel) via l'IA générative.\r\nContributions : développement de scripts Python pour automatiser les traitements, amélioration des prompts avec les équipes métiers, mise en place de la traçabilité et vérification des résultats IA, participation à la documentation et travail en méthodologie agile.','',NULL,NULL,'','Python, Intelligence Artificielle, IA Générative, Prompt Engineering, Automatisation, Scripts Python, Traitement de données, Analyse de documents, Excel, R&D, Tests IA, Validation de résultats, Documentation technique, Méthodologie Agile, Collaboration métier','pro',1,'2025-11-24 14:10:47'),(8,'Développeur Web  -  AuditGen AI (Capgemini)','Développement de l'interface web du projet AuditGen AI, permettant l'audit intelligent de documents via IA générative.\r\nContributions : front-end en React.js, intégration avec les API Python/IA, création de vues dynamiques pour l'analyse de fichiers Excel, collaboration avec PO/UX/experts IA pour optimiser l'expérience utilisateur, documentation technique et travail en méthodologie agile.','',NULL,NULL,'','React.js, JavaScript, Développement Front-End, Intégration API, Python, Intelligence Artificielle, IA Générative, Analyse de données, Excel, Visualisation de données, UX/UI, Collaboration PO, Documentation technique, Méthodologie Agile, Travail en équipe','pro',1,'2025-11-24 14:11:35'),(9,'Développeur Mobile React  -  Protectiv Pint (Capgemini)','Participation au développement d'une application mobile permettant de tester son taux d'alcoolisation et d'alerter un tiers de confiance avec géolocalisation.\r\nContributions : mise à jour des écrans et fonctionnalités, corrections d'anomalies, optimisation des performances, ajout de l'envoi de messages et de la localisation, rédaction/mise à jour du cahier des charges, présentations internes, suivi des tickets et travail en méthodologie agile.','',NULL,NULL,'','React Native, Développement Mobile, JavaScript, Géolocalisation, API de localisation, Envoi de messages, Notifications push, Débogage, Optimisation des performances, Tests d\'application, Rédaction de cahier des charges, Méthodologie Agile, Scrum, Gestion de tickets, Travail en équipe, Présentations techniques, Communication','pro',1,'2025-11-24 14:12:16'),(10,'PPE MediaWiki - Installation et Documentation','Projet Professionnel Encadré réalisé dans le cadre du BTS SIO SLAM. Installation et configuration d\'un serveur MediaWiki sur environnements Linux et Windows. Création d\'une documentation technique complète détaillant la procédure d\'installation, la configuration des services (Apache, PHP, MySQL/MariaDB) et le paramétrage de MediaWiki. Ce projet démontre la maîtrise de l\'administration système, de la gestion de services web et de la rédaction de documentation technique.','',NULL,NULL,'','MediaWiki, Linux, Windows Server, Apache, PHP, MySQL, MariaDB, Administration système, Documentation technique, Installation de services web','ecole',1,'2026-02-17 08:04:56'),(11,'Site vitrine professionnel pour une entreprise BTP spécialisée en rénovation de salles de sport','[Basic Fit Renove] - Site Web Professionnel / Site vitrine professionnel développé pour une entreprise BTP spécialisée en rénovation de salles de sport. Application web moderne construite avec Next.js 14, TypeScript et TailwindCSS, incluant un système d\'administration complet pour la gestion du contenu. Le site présente les services de l\'entreprise, un portfolio de réalisations, et permet une gestion dynamique du contenu via le panel administrateur. Ce projet démontre la maîtrise du développement full-stack moderne avec les dernières technologies React.','69bbb10e69e05.png',NULL,NULL,'https://github.com/warkozz/btp-project','Next.js 14, TypeScript, React, TailwindCSS, Développement Full-Stack, Administration web, Responsive Design, SEO','pro',1,'2026-02-17 08:07:19'),(12,'Football Manager 5V5 - Extension Web','Extension web pour l\'application de gestion de terrains de football 5v5. Backend développé avec FastAPI (Python), entièrement fonctionnel et synchronisé avec l\'application desktop existante via une base de données MySQL partagée. Ce projet permet la gestion des réservations, des terrains et des utilisateurs via une interface web moderne, tout en maintenant la cohérence des données avec l\'application desktop. Démontre la maîtrise du développement backend avec FastAPI, l\'architecture distribuée et la synchronisation de bases de données.','',NULL,NULL,'https://github.com/warkozz/projet-ppe-foot5-web','FastAPI, Python, MySQL, API REST, Backend Development, Architecture distribuée, Synchronisation de données, Applications web','ecole',1,'2026-02-17 08:13:48');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veille`
--

DROP TABLE IF EXISTS `veille`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `veille` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `analysis` text DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `category` enum('automatique','forum') DEFAULT 'automatique',
  `visible` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_veille_visible_created_at` (`visible`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veille`
--

LOCK TABLES `veille` WRITE;
/*!40000 ALTER TABLE `veille` DISABLE KEYS */;
INSERT INTO `veille` (`id`, `title`, `content`, `analysis`, `url`, `category`, `visible`, `created_at`) VALUES
(40,'React 19 : les Server Components en production','React 19, sorti fin 2024, officialise les Server Components. Ce paradigme permet de rendre des composants directement côté serveur : seul le HTML final est envoyé au navigateur, sans le code JavaScript du composant. Résultat : le bundle JS envoyé au client est réduit, le chargement initial est plus rapide et le référencement (SEO) est amélioré. React 19 introduit aussi les Server Actions, qui permettent d\'exécuter du code serveur directement depuis un formulaire React sans créer d\'endpoint API séparé. Autre nouveauté : l\'hook use() qui simplifie la gestion des Promesses dans les composants.','Dans mes projets React actuels (ce portfolio, zoo-app), j\'utilise encore le rendu côté client (CSR). J\'ai expérimenté le SSR via Next.js sur mon projet BTP Basic Fit Renove, où j\'ai constaté concrètement la différence : les temps de chargement sont divisés par 2 sur mobile et Google indexe le contenu sans JavaScript. Mon avis : les Server Components sont la bonne direction pour les applications data-heavy, mais ils ajoutent une complexité d\'architecture (distinction client/serveur dans le code) qui n\'est pas justifiée pour tous les projets. À adopter progressivement, en commençant par les pages statiques.','https://react.dev/blog/2024/12/05/react-19','automatique',1,'2025-08-28 10:00:00'),
(41,'IA Générative & Prompt Engineering — retour AuditGen AI (Capgemini)','Les LLM (Large Language Models : GPT-4, Claude, Gemini) génèrent du texte, du code et des analyses à partir d\'instructions en langage naturel. Le prompt engineering consiste à rédiger ces instructions de façon précise pour obtenir des résultats fiables. Les techniques les plus efficaces en 2025 : le few-shot prompting (fournir 2-3 exemples pour guider le format de sortie), le chain-of-thought (demander à l\'IA de raisonner étape par étape), et le role prompting (assigner un rôle précis : "Tu es un auditeur financier expert..."). GitHub Copilot, outil d\'IA intégré aux IDE, génère du code en temps réel à partir des commentaires et du contexte du fichier ouvert.','Sur le projet AuditGen AI chez Capgemini, j\'ai travaillé directement avec ces technologies. Observation clé : la qualité des résultats dépend à 80% de la précision du prompt. Un prompt vague donne un résultat générique inutilisable. Un prompt structuré ("Tu es un auditeur. Analyse la colonne C et repère les incohérences entre HT, TVA et TTC. Réponds en JSON avec les champs : ligne, anomalie, valeur_attendue") donne un résultat directement exploitable. Limite sérieuse rencontrée : les hallucinations — l\'IA a inventé un total de TVA inexistant sans signaler d\'incertitude. J\'ai dû implémenter une validation croisée systématique. Conclusion : l\'IA ne remplace pas le développeur — elle transforme son rôle vers la validation et l\'orchestration des outputs.','https://www.promptingguide.ai/','automatique',1,'2025-09-12 10:00:00'),
(42,'Sécurité des API REST : JWT, CORS et protection contre les injections','Une API REST expose des données via des endpoints HTTP. Sans protection, elle est vulnérable à trois risques majeurs identifiés par l\'OWASP API Security Top 10 : 1) L\'injection SQL — un attaquant insère du SQL dans un paramètre pour manipuler la base de données. 2) L\'absence d\'authentification — des endpoints sensibles sont accessibles sans vérification d\'identité. 3) Les requêtes CORS non contrôlées — n\'importe quel site peut appeler l\'API. Les solutions : requêtes paramétrées (PDO/SQLAlchemy) contre les injections, JWT (JSON Web Token) pour l\'authentification sans session serveur, configuration CORS stricte pour n\'autoriser que les origines connues, et rate limiting pour bloquer le brute force.','Dans mon projet Football Manager 5V5 (FastAPI + MySQL), j\'ai appliqué ces mesures concrètement : protection injection via SQLAlchemy, CORS configuré pour n\'autoriser que localhost:3000 en dev, et validation systématique des entrées. Sur ce portfolio PHP, j\'utilise PDO avec requêtes préparées, tokens CSRF sur tous les formulaires admin, et bcrypt pour le mot de passe. Observation importante : les failles de sécurité sont rarement visibles pendant le développement — elles se révèlent en production. La sécurité des API est une compétence que je considère maintenant non-négociable dès le début d\'un projet.','https://owasp.org/www-project-api-security/','automatique',1,'2025-10-17 14:30:00'),
(49,'React et Next.js : SSR, SSG et App Router — quel impact sur les performances ?','Next.js propose trois modes de rendu : CSR (Client-Side Rendering, comme React pur — le HTML est généré dans le navigateur via JavaScript), SSR (Server-Side Rendering — le HTML est généré côté serveur à chaque requête), et SSG (Static Site Generation — les pages sont pré-générées au moment du build, sans requête serveur à chaque visite). Next.js 14 introduit l\'App Router : un système de routing basé sur l\'arborescence des fichiers, avec support natif des Server Components et des Server Actions. Les Server Actions permettent de gérer les formulaires sans créer d\'API séparée : la logique serveur est colocalisée avec le composant.','Dans mon projet BTP (Basic Fit Renove, Next.js 14 + TypeScript), j\'ai utilisé SSG pour les pages statiques (accueil, services) et SSR pour les pages dynamiques (portfolio de réalisations mis à jour par le client). Résultat mesurable : le First Contentful Paint passe de ~2.1s (React CSR) à ~0.7s (Next.js SSG) sur mobile 4G. Le SEO est directement amélioré car Google reçoit du HTML complet sans dépendre de JavaScript. Limite observée : l\'App Router change la logique de cache et de revalidation, ce qui demande un temps d\'adaptation. Conclusion : pour un site vitrine professionnel, Next.js est clairement supérieur à React pur.','https://nextjs.org/docs/app/building-your-application/rendering','automatique',1,'2025-11-21 11:00:00'),
(52,'Architecture microservices vs monolithique — expérience FastAPI','Une architecture monolithique regroupe toute l\'application dans un seul déployable (une seule base de code, un seul serveur). Une architecture microservices découpe l\'application en services indépendants qui communiquent via des API. Chaque service a sa propre base de code, peut être déployé indépendamment, et utilise la technologie qui lui convient. Les microservices sont utilisés par les grandes entreprises (Netflix, Amazon, Capgemini) pour permettre aux équipes de travailler en parallèle sans se bloquer mutuellement. L\'inconvénient principal : la complexité opérationnelle augmente fortement (gestion des pannes réseau entre services, cohérence des données distribuées, multiplication des déploiements).','Dans mon projet Football Manager 5V5, j\'ai isolé le backend web (FastAPI) de l\'application desktop existante en partageant uniquement la base de données MySQL. Avantage direct : j\'ai pu modifier et redéployer le service web sans toucher à l\'application desktop. Inconvénient réel : j\'ai dû dupliquer certaines règles de validation côté desktop ET côté API. Chez Capgemini, cette approche est systématique sur les projets d\'envergure. Mon avis : les microservices apportent une flexibilité réelle mais ne se justifient pas pour un projet solo — le monolithe bien structuré (comme Laravel ou Symfony) est souvent plus pragmatique en BTS et en début de carrière.','https://microservices.io/','automatique',1,'2026-01-08 14:00:00');
/*!40000 ALTER TABLE `veille` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-19 10:03:12

