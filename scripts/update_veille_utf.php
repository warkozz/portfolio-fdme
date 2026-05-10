<?php
// update_veille_utf.php
$dsn = 'mysql:host=127.0.0.1;dbname=bts_portfolio;charset=utf8mb4;port=3306';
$user = 'root';
$pass = '';
$options = [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC];
$pdo = new PDO($dsn, $user, $pass, $options);

$updates = [
    41 => [
        'title' => "IA Générative & Prompt Engineering — retour AuditGen AI (Capgemini)",
        'content' => "Les LLM (Large Language Models : GPT-4, Claude, Gemini) génèrent du texte, du code et des analyses à partir d'instructions en langage naturel. Le prompt engineering consiste à rédiger ces instructions de façon précise pour obtenir des résultats fiables.",
        'analysis' => "Sur le projet AuditGen AI chez Capgemini, j'ai travaillé directement avec ces technologies. Observation clé : la qualité des résultats dépend à 80% de la précision du prompt. Limite : hallucinations."
    ],
    42 => [
        'title' => "Sécurité des API REST : JWT, CORS et protection contre les injections",
        'content' => "Une API REST expose des données via des endpoints HTTP. Sans protection, elle est vulnérable aux injections SQL, à l'absence d'authentification et aux mauvaises règles CORS.",
        'analysis' => "Solutions : requêtes paramétrées (PDO), JWT pour authentification, configuration CORS stricte et rate limiting."
    ],
    49 => [
        'title' => "React et Next.js : SSR, SSG et App Router — quel impact sur les performances ?",
        'content' => "Next.js propose CSR, SSR et SSG. L'App Router et les Server Components changent la façon de concevoir les applications React pour de meilleures performances.",
        'analysis' => "Dans mon projet BTP, SSG a réduit le FCP notablement. Next.js est pertinent pour sites vitrine et SEO."
    ],
    52 => [
        'title' => "Architecture microservices vs monolithique — expérience FastAPI",
        'content' => "Les microservices apportent indépendance et scalabilité, mais ajoutent de la complexité opérationnelle (réseaux, cohérence).",
        'analysis' => "Pour des projets solo ou BTS, un monolithe bien structuré reste souvent plus pragmatique."
    ],
    53 => [
        'title' => "Claude (Anthropic) : l'IA qui change ma façon de coder",
        'content' => "Claude est un assistant IA performant, adapté aux contextes longs et à une approche éthique (Constitutional AI).",
        'analysis' => "J'utilise Claude pour générer des composants, optimiser SQL et rédiger des prompts; toujours valider les sorties."
    ],
];

$updateSql = "UPDATE veille SET title = :title, content = :content, analysis = :analysis WHERE id = :id";
$stmt = $pdo->prepare($updateSql);

foreach ($updates as $id => $data) {
    $stmt->execute([':title'=>$data['title'], ':content'=>$data['content'], ':analysis'=>$data['analysis'], ':id'=>$id]);
}

// Insert two veilles if not exist
$check = $pdo->prepare("SELECT id FROM veille WHERE title = ?");
$insert = $pdo->prepare("INSERT INTO veille (title, content, analysis, url, category, visible, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");

$rows = [
    ["GitHub Copilot et l'IA dans le développement", "GitHub Copilot est un assistant de programmation basé sur des modèles de langage qui suggère du code et des extraits en temps réel dans l'éditeur. Il améliore la productivité mais nécessite une revue humaine systématique.", "Observation : Copilot accélère les tâches répétitives, mais les suggestions doivent être revues pour sécurité et qualité.", 'https://github.com/features/copilot', 'automatique', 1],
    ["Cybersécurité des applications web / OWASP", "Résumé des principaux risques pour les applications web selon OWASP (Top 10), et bonnes pratiques : validation des entrées, gestion des sessions, contrôle d'accès, chiffrement des données.", "Action : intégrer des contrôles automatisés (SAST/DAST), politiques CORS strictes, et revue de dépendances.", 'https://owasp.org/www-project-top-ten/', 'automatique', 1]
];

foreach ($rows as $r) {
    $check->execute([$r[0]]);
    if (!$check->fetch()) {
        $insert->execute($r);
    }
}

echo "OK\n";
