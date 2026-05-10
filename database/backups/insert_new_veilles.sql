SET NAMES utf8mb4;
INSERT INTO veille (title, content, analysis, url, category, visible, created_at)
SELECT * FROM (SELECT 'GitHub Copilot et l\'IA dans le développement' AS title, 'GitHub Copilot est un assistant de programmation basé sur des modèles de langage qui suggère du code et des extraits en temps réel dans l\'éditeur. Il améliore la productivité mais nécessite une revue humaine systématique.' AS content, 'Observation : Copilot accélère les tâches répétitives, mais les suggestions doivent être revues pour sécurité et qualité.' AS analysis, 'https://github.com/features/copilot' AS url, 'automatique' AS category, 1 AS visible, '2026-05-10 12:00:00' AS created_at) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM veille WHERE title = 'GitHub Copilot et l\'IA dans le développement');

INSERT INTO veille (title, content, analysis, url, category, visible, created_at)
SELECT * FROM (SELECT 'Cybersécurité des applications web / OWASP' AS title, 'Résumé des principaux risques pour les applications web selon OWASP (Top 10), et bonnes pratiques : validation des entrées, gestion des sessions, contrôle d\'accès, chiffrement des données.' AS content, 'Action : intégrer des contrôles automatisés (SAST/DAST), politiques CORS strictes, et revue de dépendances.' AS analysis, 'https://owasp.org/www-project-top-ten/' AS url, 'automatique' AS category, 1 AS visible, '2026-05-10 12:05:00' AS created_at) AS tmp2
WHERE NOT EXISTS (SELECT 1 FROM veille WHERE title = 'Cybersécurité des applications web / OWASP');
