-- ========================================
-- SCRIPT D'INSTALLATION COMPLET
-- Portfolio BTS SIO - Base de données
-- ========================================
-- Ce script crée la structure ET importe les données
-- Dernière mise à jour : 17 février 2026

-- 1. Créer les tables
CREATE TABLE IF NOT EXISTS admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  github_link VARCHAR(255),
  competencies TEXT,
  category ENUM('pro', 'ecole', 'perso') DEFAULT 'perso',
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS veille (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  url VARCHAR(255),
  category ENUM('automatique', 'forum') DEFAULT 'automatique',
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_projects_visible_created_at ON projects (visible, created_at);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects (category);
CREATE INDEX IF NOT EXISTS idx_veille_visible_created_at ON veille (visible, created_at);
CREATE INDEX IF NOT EXISTS idx_veille_category ON veille (category);

-- 2. Importer les données des projets
INSERT INTO `projects` (`id`, `title`, `description`, `image`, `github_link`, `competencies`, `category`, `visible`, `created_at`) VALUES 
(1,'Logiciel Gestion Conseil de classe','Ce logiciel me permet rentrer les infos sur les élèves récupérer au conseil de classe puis de les sauvegarder et transférer dans un document texte claire et précis avec moyenne par matières, notes général, et moyenne général.','','https://github.com/warkozz/conseil_classe','Python, PHP, MYSQL','ecole',1,'2025-11-24 13:57:30'),
(2,'Application Logiciel Gestion Five 5v5','Application web développée dans le cadre d'un projet PPE pour mon BTS SIO option SLAM. Elle permet la gestion complète d'un centre de football en salle : administration des terrains, gestion des réservations, suivi des membres et interface d'administration sécurisée. L'outil facilite l'organisation, automatise les tâches courantes et offre une expérience utilisateur simple et intuitive.',NULL,'https://github.com/warkozz/projet-ppe-exam','PHP, Python, SQL, CSS','ecole',1,'2025-11-24 14:01:33'),
(3,'Application Gestion de projet','Dans le cadre d\'un exercice en cours, j\'ai pu réaliser une application de gestion de projet',NULL,'https://github.com/warkozz?tab=repositories','PHP, React, SQL, MYSQL, Python','pro',1,'2025-11-24 14:05:32'),
(4,'Application Web Zoo Arcadia','Dans le cadre d\'une formation précédant la reprise de mes études, j\'ai pu travailler sur un projet de A à Z de création d\'un site web pour un zoo fictif (cela inclut base de données, site web, documents annexes...)','','https://github.com/warkozz/zoo-app','React js, Laravel, MYSQL, Prisma','pro',1,'2025-11-24 14:08:48'),
(5,'Développeur R&D Python/IA – AuditGen AI (Capgemini)','Projet interne visant à automatiser la génération et l'analyse de prompts pour l'audit de documents (dont Excel) via l'IA générative. Contributions : développement de scripts Python pour automatiser les traitements, amélioration des prompts avec les équipes métiers, mise en place de la traçabilité et vérification des résultats IA, participation à la documentation et travail en méthodologie agile.','','','Python, Intelligence Artificielle, IA Générative, Prompt Engineering, Automatisation, Scripts Python, Traitement de données, Analyse de documents, Excel, R&D, Tests IA, Validation de résultats, Documentation technique, Méthodologie Agile, Collaboration métier','pro',1,'2025-11-24 14:10:47'),
(6,'Développeur Web – AuditGen AI (Capgemini)','Développement de l'interface web du projet AuditGen AI, permettant l'audit intelligent de documents via IA générative. Contributions : front-end en React.js, intégration avec les API Python/IA, création de vues dynamiques pour l'analyse de fichiers Excel, collaboration avec PO/UX/experts IA pour optimiser l'expérience utilisateur, documentation technique et travail en méthodologie agile.','','','React.js, JavaScript, Développement Front-End, Intégration API, Python, Intelligence Artificielle, IA Générative, Analyse de données, Excel, Visualisation de données, UX/UI, Collaboration PO, Documentation technique, Méthodologie Agile, Travail en équipe','ecole',1,'2025-11-24 14:11:35'),
(7,'Développeur Mobile React – Protectiv Pint (Capgemini)','Participation au développement d'une application mobile permettant de tester son taux d'alcoolisation et d'alerter un tiers de confiance avec géolocalisation. Contributions : mise à jour des écrans et fonctionnalités, corrections d'anomalies, optimisation des performances, ajout de l'envoi de messages et de la localisation, rédaction/mise à jour du cahier des charges, présentations internes, suivi des tickets et travail en méthodologie agile.','','','React Native, Développement Mobile, JavaScript, Géolocalisation, API de localisation, Envoi de messages, Notifications push, Débogage, Optimisation des performances, Tests d\'application, Rédaction de cahier des charges, Méthodologie Agile, Scrum, Gestion de tickets, Travail en équipe, Présentations techniques, Communication','pro',1,'2025-11-24 14:12:16'),
(8,'PPE MediaWiki - Installation et Documentation','Projet Professionnel Encadré réalisé dans le cadre du BTS SIO SLAM. Installation et configuration d\'un serveur MediaWiki sur environnements Linux et Windows. Création d\'une documentation technique complète détaillant la procédure d\'installation, la configuration des services (Apache, PHP, MySQL/MariaDB) et le paramétrage de MediaWiki. Ce projet démontre la maîtrise de l\'administration système, de la gestion de services web et de la rédaction de documentation technique.',NULL,'','MediaWiki, Linux, Windows Server, Apache, PHP, MySQL, MariaDB, Administration système, Documentation technique, Installation de services web','ecole',1,'2026-02-17 08:04:56'),
(9,'Site Vitrine BTP - Rénovation Salles de Sport','Site vitrine professionnel développé pour une entreprise BTP spécialisée en rénovation de salles de sport. Application web moderne construite avec Next.js 14, TypeScript et TailwindCSS, incluant un système d\'administration complet pour la gestion du contenu. Le site présente les services de l\'entreprise, un portfolio de réalisations, et permet une gestion dynamique du contenu via le panel administrateur. Ce projet démontre la maîtrise du développement full-stack moderne avec les dernières technologies React.','','https://github.com/warkozz/btp-project','Next.js 14, TypeScript, React, TailwindCSS, Développement Full-Stack, Administration web, Responsive Design, SEO','perso',1,'2026-02-17 08:07:19'),
(10,'Football Manager 5V5 - Extension Web','Extension web pour l\'application de gestion de terrains de football 5v5. Backend développé avec FastAPI (Python), entièrement fonctionnel et synchronisé avec l\'application desktop existante via une base de données MySQL partagée. Ce projet permet la gestion des réservations, des terrains et des utilisateurs via une interface web moderne, tout en maintenant la cohérence des données avec l\'application desktop. Démontre la maîtrise du développement backend avec FastAPI, l\'architecture distribuée et la synchronisation de bases de données.',NULL,'https://github.com/warkozz/projet-ppe-foot5-web','FastAPI, Python, MySQL, API REST, Backend Development, Architecture distribuée, Synchronisation de données, Application web','perso',1,'2026-02-17 08:13:48');

-- 3. Importer les données de veille
INSERT INTO `veille` (`id`, `title`, `content`, `url`, `category`, `visible`, `created_at`) VALUES 
(1,'Newsletters et alertes email pour la veille technologique','Les newsletters spécialisées comme Dev.to Weekly, JavaScript Weekly, ou GitHub Trending permettent de recevoir régulièrement des articles sélectionnés. Les Google Alerts peuvent surveiller des mots-clés spécifiques et envoyer des notifications par email.','','automatique',1,'2026-02-17 08:31:03'),
(2,'Agrégation de flux RSS pour centraliser sa veille','Les flux RSS permettent de suivre plusieurs sources (blogs tech, sites d\'actualités) depuis un seul endroit. Des outils comme Feedly, Inoreader ou The Old Reader facilitent l\'organisation et la lecture des articles.','https://feedly.com','automatique',1,'2026-02-17 08:26:11'),
(3,'Réseaux sociaux et communautés','Twitter/X / Reddit / Tiktok / Instagram pour la veille en temps réel. Les hashtags sur Twitter/TikTok/Instagram (#DevOps, #ReactJS, #Dev, #SoftwareEngineer) et les subreddits spécialisés (r/programming, r/webdev) offrent des discussions en temps réel sur les nouvelles technologies et bonnes pratiques.','','automatique',1,'2026-02-17 08:28:26'),
(4,'Newsletters internes Capgemini pour la veille technologique','Capgemini diffuse régulièrement des newsletters internes à destination de ses collaborateurs, couvrant les actualités tech, les innovations du groupe, les retours d\'expérience projets et les formations disponibles. Ces newsletters permettent de rester informé sur les nouvelles pratiques adoptées dans l\'entreprise, les certifications recommandées, les communautés techniques internes et les événements de partage de connaissances.','','automatique',1,'2026-02-17 08:35:52'),
(5,'Discord : communautés de développeurs en temps réel','Discord héberge de nombreuses communautés de développeurs actives (Reactiflux, Python Discord, The Programmer\'s Hangout). Ces serveurs offrent des canaux spécialisés par technologie, permettant d\'échanger avec des experts, poser des questions et suivre les dernières actualités en temps réel. Discord combine veille passive (lecture des discussions) et active (participation aux échanges).','https://discord.com','forum',1,'2026-02-17 08:32:12'),
(6,'Stack Overflow : veille par résolution de problèmes','Stack Overflow et ses sous-sites (Server Fault, Super User) permettent de suivre les questions/réponses sur des technologies spécifiques via les tags. En observant les problèmes rencontrés par la communauté, on anticipe les difficultés courantes et découvre de nouvelles solutions. Les tags personnalisés et les flux RSS facilitent le suivi ciblé.','https://stackoverflow.com','forum',1,'2026-02-17 08:32:46'),
(7,'Dev.to et Hashnode : plateformes de blogs techniques','Dev.to et Hashnode sont des plateformes où les développeurs publient tutoriels, retours d\'expérience et analyses. Les systèmes de tags permettent de suivre des technologies spécifiques, et la dimension communautaire (commentaires, discussions) enrichit la compréhension. Ces plateformes combinent veille passive (lecture) et active (contributions).','https://dev.to','forum',1,'2026-02-17 08:33:46'),
(8,'Microsoft Teams : canaux de veille professionnels','Microsoft Teams permet de créer des canaux dédiés à la veille technologique au sein des équipes. Les intégrations avec RSS, les bots personnalisés et les connecteurs permettent d\'automatiser la diffusion d\'actualités tech. Les équipes peuvent partager articles, organiser des discussions thématiques et centraliser la veille collective. Teams est particulièrement adapté aux environnements professionnels avec sa suite d\'outils collaboratifs intégrés.','https://teams.microsoft.com','forum',1,'2026-02-17 08:34:47');

-- Fin de l'installation
