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
INSERT INTO `projects` (`id`, `title`, `description`, `image`, `image_base64`, `image_mime`, `github_link`, `competencies`, `category`, `visible`, `created_at`) VALUES (3,'Logiciel Gestion Conseil de classe','Ce logiciel me permet rentrer les infos sur les ├®l├¿ves r├®cup├®rer au conseil de classe puis de les sauvegarder et transf├®rer dans un document texte claire et pr├®cis avec moyenne par mati├¿res, notes g├®n├®ral, et moyenne g├®n├®ral.','',NULL,NULL,'https://github.com/warkozz/conseil_classe','Python, PHP, MYSQL','perso',1,'2025-11-24 13:57:30'),(4,'Application Logiciel Gestion Five 5v5','Application web d├®velopp├®e dans le cadre dÔÇÖun projet PPE pour mon BTS SIO option SLAM. Elle permet la gestion compl├¿te dÔÇÖun centre de football en salle : administration des terrains, gestion des r├®servations, suivi des membres et interface dÔÇÖadministration s├®curis├®e. LÔÇÖoutil facilite lÔÇÖorganisation, automatise les t├óches courantes et offre une exp├®rience utilisateur simple et intuitive.',NULL,NULL,NULL,'https://github.com/warkozz/projet-ppe-exam','PHP, Python, SQL, CSS,','ecole',1,'2025-11-24 14:01:33'),(5,'Application Gestion de projet','Dans le cadre d\'un exercice en cours, j\'ai pu r├®aliser un une application de gestion de projet','',NULL,NULL,'https://github.com/warkozz?tab=repositories','PHP, React, SQL, MYSQL, Python','ecole',1,'2025-11-24 14:05:32'),(6,'Application Web Zoo Arcadia','Dans le cadre d\'une formation pr├®c├®dant la reprise de mes ├®tudes, j\'ai pu travailler sur un projet de A a Z de cr├®ation d\'un site web pour un zoo fictif (cela inclu base de donn├®es, site web, documents annexes...)','',NULL,NULL,'https://github.com/warkozz/zoo-app','React js, Laravel, MYSQL, Prisma','perso',1,'2025-11-24 14:08:48'),(7,'D├®veloppeur R&D Python/IA ÔÇô AuditGen AI (Capgemini)','Projet interne visant ├á automatiser la g├®n├®ration et lÔÇÖanalyse de prompts pour lÔÇÖaudit de documents (dont Excel) via lÔÇÖIA g├®n├®rative.\r\nContributions : d├®veloppement de scripts Python pour automatiser les traitements, am├®lioration des prompts avec les ├®quipes m├®tiers, mise en place de la tra├ºabilit├® et v├®rification des r├®sultats IA, participation ├á la documentation et travail en m├®thodologie agile.','',NULL,NULL,'','Python, Intelligence Artificielle, IA G├®n├®rative, Prompt Engineering, Automatisation, Scripts Python, Traitement de donn├®es, Analyse de documents, Excel, R&D, Tests IA, Validation de r├®sultats, Documentation technique, M├®thodologie Agile, Collaboration m├®tier','pro',1,'2025-11-24 14:10:47'),(8,'D├®veloppeur Web ÔÇô AuditGen AI (Capgemini)','D├®veloppement de lÔÇÖinterface web du projet AuditGen AI, permettant lÔÇÖaudit intelligent de documents via IA g├®n├®rative.\r\nContributions : front-end en React.js, int├®gration avec les API Python/IA, cr├®ation de vues dynamiques pour lÔÇÖanalyse de fichiers Excel, collaboration avec PO/UX/experts IA pour optimiser lÔÇÖexp├®rience utilisateur, documentation technique et travail en m├®thodologie agile.','',NULL,NULL,'','React.js, JavaScript, D├®veloppement Front-End, Int├®gration API, Python, Intelligence Artificielle, IA G├®n├®rative, Analyse de donn├®es, Excel, Visualisation de donn├®es, UX/UI, Collaboration PO, Documentation technique, M├®thodologie Agile, Travail en ├®quipe','pro',1,'2025-11-24 14:11:35'),(9,'D├®veloppeur Mobile React ÔÇô Protectiv Pint (Capgemini)','Participation au d├®veloppement dÔÇÖune application mobile permettant de tester son taux dÔÇÖalcoolisation et dÔÇÖalerter un tiers de confiance avec g├®olocalisation.\r\nContributions : mise ├á jour des ├®crans et fonctionnalit├®s, corrections dÔÇÖanomalies, optimisation des performances, ajout de lÔÇÖenvoi de messages et de la localisation, r├®daction/mise ├á jour du cahier des charges, pr├®sentations internes, suivi des tickets et travail en m├®thodologie agile.','',NULL,NULL,'','React Native, D├®veloppement Mobile, JavaScript, G├®olocalisation, API de localisation, Envoi de messages, Notifications push, D├®bogage, Optimisation des performances, Tests d\'application, R├®daction de cahier des charges, M├®thodologie Agile, Scrum, Gestion de tickets, Travail en ├®quipe, Pr├®sentations techniques, Communication','pro',1,'2025-11-24 14:12:16'),(10,'PPE MediaWiki - Installation et Documentation','Projet Professionnel Encadr├® r├®alis├® dans le cadre du BTS SIO SLAM. Installation et configuration d\'un serveur MediaWiki sur environnements Linux et Windows. Cr├®ation d\'une documentation technique compl├¿te d├®taillant la proc├®dure d\'installation, la configuration des services (Apache, PHP, MySQL/MariaDB) et le param├®trage de MediaWiki. Ce projet d├®montre la ma├«trise de l\'administration syst├¿me, de la gestion de services web et de la r├®daction de documentation technique.','',NULL,NULL,'','MediaWiki, Linux, Windows Server, Apache, PHP, MySQL, MariaDB, Administration syst├¿me, Documentation technique, Installation de services web','ecole',1,'2026-02-17 08:04:56'),(11,'Site vitrine professionnel pour une entreprise BTP sp├®cialis├®e en r├®novation de salles de sport','[Basic Fit Renove] - Site Web Professionnel / Site vitrine professionnel d├®velopp├® pour une entreprise BTP sp├®cialis├®e en r├®novation de salles de sport. Application web moderne construite avec Next.js 14, TypeScript et TailwindCSS, incluant un syst├¿me d\'administration complet pour la gestion du contenu. Le site pr├®sente les services de l\'entreprise, un portfolio de r├®alisations, et permet une gestion dynamique du contenu via le panel administrateur. Ce projet d├®montre la ma├«trise du d├®veloppement full-stack moderne avec les derni├¿res technologies React.','69bbb10e69e05.png',NULL,NULL,'https://github.com/warkozz/btp-project','Next.js 14, TypeScript, React, TailwindCSS, D├®veloppement Full-Stack, Administration web, Responsive Design, SEO','pro',1,'2026-02-17 08:07:19'),(12,'Football Manager 5V5 - Extension Web','Extension web pour l\'application de gestion de terrains de football 5v5. Backend d├®velopp├® avec FastAPI (Python), enti├¿rement fonctionnel et synchronis├® avec l\'application desktop existante via une base de donn├®es MySQL partag├®e. Ce projet permet la gestion des r├®servations, des terrains et des utilisateurs via une interface web moderne, tout en maintenant la coh├®rence des donn├®es avec l\'application desktop. D├®montre la ma├«trise du d├®veloppement backend avec FastAPI, l\'architecture distribu├®e et la synchronisation de bases de donn├®es.','',NULL,NULL,'https://github.com/warkozz/projet-ppe-foot5-web','FastAPI, Python, MySQL, API REST, Backend Development, Architecture distribu├®e, Synchronisation de donn├®es, Applications web','ecole',1,'2026-02-17 08:13:48');
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
  `url` varchar(255) DEFAULT NULL,
  `category` enum('automatique','forum') DEFAULT 'automatique',
  `visible` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_veille_visible_created_at` (`visible`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veille`
--

LOCK TABLES `veille` WRITE;
/*!40000 ALTER TABLE `veille` DISABLE KEYS */;
INSERT INTO `veille` (`id`, `title`, `content`, `url`, `category`, `visible`, `created_at`) VALUES (7,'Agr├®gation de flux RSS pour centraliser sa veille','Les flux RSS permettent de suivre plusieurs sources (blogs tech, sites d\'actualit├®s) depuis un seul endroit. Des outils comme Feedly, Inoreader ou The Old Reader facilitent l\'organisation et la lecture des articles.','https://feedly.com','automatique',1,'2026-02-17 08:26:11'),(8,'R├®seaux sociaux et communaut├®s','Twitter/X / Reddit / Tiktok / Instagram pour la veille en temps r├®el\n\nLes hashtags sur Twitter/TikTok/Instagram (#DevOps, #ReactJS, #Dev, #SoftwareEngineer) et les subreddits sp├®cialis├®s (r/programming, r/webdev) offrent des discussions en temps r├®el sur les nouvelles technologies et bonnes pratiques.','','automatique',1,'2026-02-17 08:28:26'),(9,'Newsletters et alertes email pour la veille technologique','Les newsletters sp├®cialis├®es comme Dev.to Weekly, JavaScript Weekly, ou GitHub Trending permettent de recevoir r├®guli├¿rement des articles s├®lectionn├®s. Les Google Alerts peuvent surveiller des mots-cl├®s sp├®cifiques et envoyer des notifications par email.','','automatique',1,'2026-02-17 08:31:03'),(10,'Discord : communaut├®s de d├®veloppeurs en temps r├®el','Discord h├®berge de nombreuses communaut├®s de d├®veloppeurs actives (Reactiflux, Python Discord, The Programmer\'s Hangout). Ces serveurs offrent des canaux sp├®cialis├®s par technologie, permettant d\'├®changer avec des experts, poser des questions et suivre les derni├¿res actualit├®s en temps r├®el. Discord combine veille passive (lecture des discussions) et active (participation aux ├®changes).','https://discord.com','forum',1,'2026-02-17 08:32:12'),(11,'Stack Overflow : veille par r├®solution de probl├¿mes','Stack Overflow et ses sous-sites (Server Fault, Super User) permettent de suivre les questions/r├®ponses sur des technologies sp├®cifiques via les tags. En observant les probl├¿mes rencontr├®s par la communaut├®, on anticipe les difficult├®s courantes et d├®couvre de nouvelles solutions. Les tags personnalis├®s et les flux RSS facilitent le suivi cibl├®.','https://stackoverflow.com','forum',1,'2026-02-17 08:32:46'),(12,'Dev.to et Hashnode : plateformes de blogs techniques','Dev.to et Hashnode sont des plateformes o├╣ les d├®veloppeurs publient tutoriels, retours d\'exp├®rience et analyses. Les syst├¿mes de tags permettent de suivre des technologies sp├®cifiques, et la dimension communautaire (commentaires, discussions) enrichit la compr├®hension. Ces plateformes combinent veille passive (lecture) et active (contributions).','https://dev.to','forum',1,'2026-02-17 08:33:46'),(13,'Microsoft Teams : canaux de veille professionnels','Microsoft Teams permet de cr├®er des canaux d├®di├®s ├á la veille technologique au sein des ├®quipes. Les int├®grations avec RSS, les bots personnalis├®s et les connecteurs permettent d\'automatiser la diffusion d\'actualit├®s tech. Les ├®quipes peuvent partager articles, organiser des discussions th├®matiques et centraliser la veille collective. Teams est particuli├¿rement adapt├® aux environnements professionnels avec sa suite d\'outils collaboratifs int├®gr├®s.','https://teams.microsoft.com','forum',1,'2026-02-17 08:34:47'),(14,'Newsletters internes Capgemini pour la veille technologique','Capgemini diffuse r├®guli├¿rement des newsletters internes ├á destination de ses collaborateurs, couvrant les actualit├®s tech, les innovations du groupe, les retours d\'exp├®rience projets et les formations disponibles. Ces newsletters permettent de rester inform├® sur les nouvelles pratiques adopt├®es dans l\'entreprise, les certifications recommand├®es, les communaut├®s techniques internes et les ├®v├®nements de partage de connaissances. Elles constituent une source de veille professionnelle adapt├®e au contexte de l\'entreprise.','','automatique',1,'2026-02-17 08:35:52');
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
