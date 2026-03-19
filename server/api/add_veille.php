<?php
// add_veille.php
header('Content-Type: application/json');
// CORS + OPTIONS centralisés
require_once '../config.php';
// Session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once '../csrf.php';
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}
$title = trim($_POST['title'] ?? '');
$content = trim($_POST['content'] ?? '');
$analysis = trim($_POST['analysis'] ?? '');
$url = trim($_POST['url'] ?? '');
$category = trim($_POST['category'] ?? 'automatique');
$csrf = $_POST['csrf_token'] ?? '';
if (!$title || !$content) {
    http_response_code(400);
    echo json_encode(['error' => 'Champs title/content manquants']);
    exit;
}
if (!in_array($category, ['automatique', 'forum'])) {
    $category = 'automatique';
}
if (!verify_csrf_token($csrf)) {
    http_response_code(400);
    echo json_encode(['error' => 'CSRF invalide']);
    exit;
}
$stmt = $pdo->prepare('INSERT INTO veille (title, content, analysis, url, category) VALUES (?, ?, ?, ?, ?)');
$stmt->execute([$title, $content, $analysis ?: null, $url, $category]);
echo json_encode(['success' => true]);
?>
