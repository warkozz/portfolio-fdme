<?php
// restore.php - Recrée et peuple bts_portfolio proprement via PDO prepared statements
$host = '127.0.0.1';
$user = 'root';
$pass = '';
$db   = 'bts_portfolio';

try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    // Recréer la base
    $pdo->exec("DROP DATABASE IF EXISTS `$db`");
    $pdo->exec("CREATE DATABASE `$db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE `$db`");

    // Table admin
    $pdo->exec("CREATE TABLE `admin` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `email` varchar(100) NOT NULL,
        `password` varchar(255) NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `email` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->prepare("INSERT INTO `admin` (`id`,`email`,`password`) VALUES (2,?,?)")
        ->execute(['admin@portfolio.com', '$2y$10$MqnwbwMKdasIbjDU364k3OYjcrdgTvJT6EEP5khyUVUC76e/Zk83W']);

    // Table projects
    $pdo->exec("CREATE TABLE `projects` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `description` text NOT NULL,
        `image` varchar(255) DEFAULT NULL,
        `image_base64` longtext DEFAULT NULL,
        `image_mime` varchar(50) DEFAULT NULL,
        `github_link` varchar(255) DEFAULT NULL,
        `live_link` varchar(255) DEFAULT NULL,
        `competencies` text DEFAULT NULL,
        `category` enum('pro','ecole','perso') DEFAULT 'perso',
        `visible` tinyint(1) DEFAULT 1,
        `created_at` timestamp NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`),
        KEY `idx_projects_visible_created_at` (`visible`,`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $stmt = $pdo->prepare("INSERT INTO `projects` (`id`,`title`,`description`,`image`,`image_base64`,`image_mime`,`github_link`,`live_link`,`competencies`,`category`,`visible`,`created_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");

    $projects = [
        [3,'Logiciel Gestion Conseil de classe',"Ce logiciel me permet rentrer les infos sur les élèves récupérer au conseil de classe puis de les sauvegarder et transférer dans un document texte claire et précis avec moyenne par matières, notes général, et moyenne général.",'',null,null,'https://github.com/warkozz/conseil_classe',null,'Python, PHP, MYSQL','perso',1,'2025-11-24 13:57:30'],
        [4,'Application Logiciel Gestion Five 5v5',"Application web développée dans le cadre d'un projet PPE pour mon BTS SIO option SLAM. Elle permet la gestion complète d'un centre de football en salle : administration des terrains, gestion des réservations, suivi des membres et interface d'administration sécurisée. L'outil facilite l'organisation, automatise les tâches courantes et offre une expérience utilisateur simple et intuitive.",null,null,null,'https://github.com/warkozz/projet-ppe-exam',null,'PHP, Python, SQL, CSS,','ecole',1,'2025-11-24 14:01:33'],
        [5,'Application Gestion de projet',"Dans le cadre d'un exercice en cours, j'ai pu réaliser une application de gestion de projet",'',null,null,'https://github.com/warkozz?tab=repositories',null,'PHP, React, SQL, MYSQL, Python','ecole',1,'2025-11-24 14:05:32'],
        [6,'Application Web Zoo Arcadia',"Dans le cadre d'une formation précédant la reprise de mes études, j'ai pu travailler sur un projet de A à Z de création d'un site web pour un zoo fictif (cela inclut base de données, site web, documents annexes...)",'',null,null,'https://github.com/warkozz/zoo-app',null,'React js, Laravel, MYSQL, Prisma','perso',1,'2025-11-24 14:08:48'],
        [7,'Développeur R&D Python/IA - AuditGen AI (Capgemini)',"Projet interne visant à automatiser la génération et l'analyse de prompts pour l'audit de documents (dont Excel) via l'IA générative.\nContributions : développement de scripts Python pour automatiser les traitements, amélioration des prompts avec les équipes métiers, mise en place de la traçabilité et vérification des résultats IA, participation à la documentation et travail en méthodologie agile.",'',null,null,'',null,'Python, Intelligence Artificielle, IA Générative, Prompt Engineering, Automatisation, Scripts Python, Traitement de données, Analyse de documents, Excel, R&D, Tests IA, Validation de résultats, Documentation technique, Méthodologie Agile, Collaboration métier','pro',1,'2025-11-24 14:10:47'],
        [8,'Développeur Web - AuditGen AI (Capgemini)',"Développement de l'interface web du projet AuditGen AI, permettant l'audit intelligent de documents via IA générative.\nContributions : front-end en React.js, intégration avec les API Python/IA, création de vues dynamiques pour l'analyse de fichiers Excel, collaboration avec PO/UX/experts IA pour optimiser l'expérience utilisateur, documentation technique et travail en méthodologie agile.",'',null,null,'',null,'React.js, JavaScript, Développement Front-End, Intégration API, Python, Intelligence Artificielle, IA Générative, Analyse de données, Excel, Visualisation de données, UX/UI, Collaboration PO, Documentation technique, Méthodologie Agile, Travail en équipe','pro',1,'2025-11-24 14:11:35'],
        [9,'Développeur Mobile React - Protectiv Pint (Capgemini)',"Participation au développement d'une application mobile permettant de tester son taux d'alcoolisation et d'alerter un tiers de confiance avec géolocalisation.\nContributions : mise à jour des écrans et fonctionnalités, corrections d'anomalies, optimisation des performances, ajout de l'envoi de messages et de la localisation, rédaction/mise à jour du cahier des charges, présentations internes, suivi des tickets et travail en méthodologie agile.",'',null,null,'',null,'React Native, Développement Mobile, JavaScript, Géolocalisation, API de localisation, Envoi de messages, Notifications push, Débogage, Optimisation des performances, Tests application, Rédaction de cahier des charges, Méthodologie Agile, Scrum, Gestion de tickets, Travail en équipe, Présentations techniques, Communication','pro',1,'2025-11-24 14:12:16'],
        [10,'PPE MediaWiki - Installation et Documentation',"Projet Professionnel Encadré réalisé dans le cadre du BTS SIO SLAM. Installation et configuration d'un serveur MediaWiki sur environnements Linux et Windows. Création d'une documentation technique complète détaillant la procédure d'installation, la configuration des services (Apache, PHP, MySQL/MariaDB) et le paramétrage de MediaWiki. Ce projet démontre la maîtrise de l'administration système, de la gestion de services web et de la rédaction de documentation technique.",'',null,null,'',null,'MediaWiki, Linux, Windows Server, Apache, PHP, MySQL, MariaDB, Administration système, Documentation technique, Installation de services web','ecole',1,'2026-02-17 08:04:56'],
        [11,'Site vitrine professionnel pour une entreprise BTP spécialisée en rénovation de salles de sport',"[Basic Fit Renove] - Site Web Professionnel / Site vitrine professionnel développé pour une entreprise BTP spécialisée en rénovation de salles de sport. Application web moderne construite avec Next.js 14, TypeScript et TailwindCSS, incluant un système d'administration complet pour la gestion du contenu. Le site présente les services de l'entreprise, un portfolio de réalisations, et permet une gestion dynamique du contenu via le panel administrateur. Ce projet démontre la maîtrise du développement full-stack moderne avec les dernières technologies React.",'69bbb10e69e05.png',null,null,'https://github.com/warkozz/btp-project',null,'Next.js 14, TypeScript, React, TailwindCSS, Développement Full-Stack, Administration web, Responsive Design, SEO','pro',1,'2026-02-17 08:07:19'],
        [12,'Football Manager 5V5 - Extension Web',"Extension web pour l'application de gestion de terrains de football 5v5. Backend développé avec FastAPI (Python), entièrement fonctionnel et synchronisé avec l'application desktop existante via une base de données MySQL partagée. Ce projet permet la gestion des réservations, des terrains et des utilisateurs via une interface web moderne, tout en maintenant la cohérence des données avec l'application desktop. Démontre la maîtrise du développement backend avec FastAPI, l'architecture distribuée et la synchronisation de bases de données.",'',null,null,'https://github.com/warkozz/projet-ppe-foot5-web',null,'FastAPI, Python, MySQL, API REST, Backend Development, Architecture distribuée, Synchronisation de données, Applications web','ecole',1,'2026-02-17 08:13:48'],
        [13,'CodeAddict — Site freelance personnel',"Site freelance personnel présentant mes services de développement web, mon parcours et mes tarifs. Conçu en Next.js avec une approche moderne : design épuré, animations fluides, sections services, stack technique et contact. Déployé sur Vercel. L'objectif : proposer une vitrine professionnelle pour des missions freelance (sites vitrines, applications web) en parallèle de mon alternance chez Capgemini.",'',null,null,'https://github.com/warkozz/CodeAddict','https://www.codeaddict.fr/','Next.js, TypeScript, Tailwind CSS, Vercel, Responsive Design, SEO, Freelance','perso',1,'2026-04-01 10:00:00'],
        [14,'Facture2Clins — SaaS de facturation pour artisans',"Application SaaS de facturation et de gestion d'activité destinée aux artisans indépendants (plombiers, électriciens, peintres…). Fonctionnalités : création de devis et factures, gestion clients, planification de rendez-vous, rappels automatiques, export PDF et envoi par e-mail. Architecture full-stack avec authentification, gestion des abonnements (plans Starter/Pro) et données sécurisées. Déployé sur Vercel.",'',null,null,'https://github.com/warkozz/v0-saa-s-mvp-build','https://www.facture2clins.fr/','Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, SaaS, Vercel, Authentification, Full-Stack','perso',1,'2026-04-10 10:00:00'],
    ];

    foreach ($projects as $p) {
        $stmt->execute($p);
    }
    echo "✓ " . count($projects) . " projets insérés\n";

    // Table veille
    $pdo->exec("CREATE TABLE `veille` (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $vstmt = $pdo->prepare("INSERT INTO `veille` (`id`,`title`,`content`,`analysis`,`url`,`category`,`visible`,`created_at`) VALUES (?,?,?,?,?,?,?,?)");

    $veille = [
        [41,'IA Générative & Prompt Engineering — retour AuditGen AI (Capgemini)',
            "Les LLM (Large Language Models : GPT-4, Claude, Gemini) génèrent du texte, du code et des analyses à partir d'instructions en langage naturel. Le prompt engineering consiste à rédiger ces instructions de façon précise pour obtenir des résultats fiables. Les techniques les plus efficaces en 2025 : le few-shot prompting (fournir 2-3 exemples pour guider le format de sortie), le chain-of-thought (demander à l'IA de raisonner étape par étape), et le role prompting (assigner un rôle précis : \"Tu es un auditeur financier expert...\"). GitHub Copilot, outil d'IA intégré aux IDE, génère du code en temps réel à partir des commentaires et du contexte du fichier ouvert.",
            "Sur le projet AuditGen AI chez Capgemini, j'ai travaillé directement avec ces technologies. Observation clé : la qualité des résultats dépend à 80% de la précision du prompt. Un prompt vague donne un résultat générique inutilisable. Un prompt structuré donne un résultat directement exploitable. Limite sérieuse rencontrée : les hallucinations — l'IA a inventé un total de TVA inexistant sans signaler d'incertitude. J'ai dû implémenter une validation croisée systématique. Conclusion : l'IA ne remplace pas le développeur — elle transforme son rôle vers la validation et l'orchestration des outputs.",
            'https://www.promptingguide.ai/','automatique',1,'2025-09-12 10:00:00'],
        [42,'Sécurité des API REST : JWT, CORS et protection contre les injections',
            "Une API REST expose des données via des endpoints HTTP. Sans protection, elle est vulnérable à trois risques majeurs identifiés par l'OWASP API Security Top 10 : 1) L'injection SQL — un attaquant insère du SQL dans un paramètre pour manipuler la base de données. 2) L'absence d'authentification — des endpoints sensibles sont accessibles sans vérification d'identité. 3) Les requêtes CORS non contrôlées — n'importe quel site peut appeler l'API. Les solutions : requêtes paramétrées (PDO/SQLAlchemy) contre les injections, JWT (JSON Web Token) pour l'authentification sans session serveur, configuration CORS stricte pour n'autoriser que les origines connues, et rate limiting pour bloquer le brute force.",
            "Dans mon projet Football Manager 5V5 (FastAPI + MySQL), j'ai appliqué ces mesures concrètement : protection injection via SQLAlchemy, CORS configuré pour n'autoriser que localhost:3000 en dev, et validation systématique des entrées. Sur ce portfolio PHP, j'utilise PDO avec requêtes préparées, tokens CSRF sur tous les formulaires admin, et bcrypt pour le mot de passe. Observation importante : les failles de sécurité sont rarement visibles pendant le développement — elles se révèlent en production. La sécurité des API est une compétence que je considère maintenant non-négociable dès le début d'un projet.",
            'https://owasp.org/www-project-api-security/','automatique',1,'2025-10-17 14:30:00'],
        [53,'Claude (Anthropic) : l\'IA qui change ma façon de coder',
            "Claude est un assistant IA développé par Anthropic, société fondée en 2021 par d'anciens chercheurs d'OpenAI. Contrairement à ChatGPT ou Gemini, Claude se distingue par son approche Constitutional AI (apprentissage guidé par des principes éthiques) et sa capacité à traiter de très longs contextes (jusqu'à 200 000 tokens pour Claude 3). Plusieurs versions coexistent : Claude 3 Haiku (rapide et économique), Claude 3.5 Sonnet (utilisé dans GitHub Copilot Chat, meilleur équilibre performance/vitesse) et Claude 3 Opus (le plus puissant). Accessible via claude.ai, l'API Anthropic, VS Code (GitHub Copilot) ou des intégrations tierces. Ses points forts : qualité des explications techniques, respect du contexte long, et réponses nuancées sur des sujets complexes. Sources officielles : docs.anthropic.com, anthropic.com/research, claude.ai.",
            "J'utilise Claude quotidiennement dans mon workflow de développement, via GitHub Copilot Chat dans VS Code et directement sur claude.ai. Ce qui change ma façon de travailler : je rédige des prompts structurés (rôle précis, contexte, contraintes, format attendu) qui donnent des résultats directement exploitables. Concrètement, je l'ai utilisé sur mes deux projets freelance déployés sur Vercel — CodeAddict (site vitrine freelance en Next.js) et Facture2Clins (SaaS de facturation pour artisans) — pour générer des composants React complexes, structurer l'architecture du projet, écrire des requêtes SQL optimisées et déboguer rapidement. Sur ce portfolio, Claude m'a également aidé à refactoriser les API PHP/PDO et à rédiger des prompts d'audit de code. Le gain de temps est réel et mesurable — mais je valide systématiquement chaque output avant intégration. Mon avis : Claude est aujourd'hui l'outil IA le plus utile pour un développeur full-stack, à condition de maîtriser le prompt engineering et de rester critique sur les résultats.",
            'https://www.anthropic.com/claude','automatique',1,'2026-04-10 10:00:00'],
    ];

    foreach ($veille as $v) {
        $vstmt->execute($v);
    }
    echo "✓ " . count($veille) . " articles de veille insérés\n";

    // Vérification finale
    $pcount = $pdo->query("SELECT COUNT(*) FROM projects")->fetchColumn();
    $vcount = $pdo->query("SELECT COUNT(*) FROM veille")->fetchColumn();
    echo "\n=== Résultat ===\n";
    echo "projects : $pcount\n";
    echo "veille   : $vcount\n";
    echo "admin    : " . $pdo->query("SELECT COUNT(*) FROM admin")->fetchColumn() . "\n";
    echo "\nRestauration terminée avec succès !\n";

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage() . "\n";
    exit(1);
}
