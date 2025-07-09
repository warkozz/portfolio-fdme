<?php
// update_veille.php
header('Content-Type: application/json');
session_start();
require_once '../config.php';
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
$id = intval($_POST['id'] ?? 0);
$title = trim($_POST['title'] ?? '');
$content = trim($_POST['content'] ?? '');
$url = trim($_POST['url'] ?? '');
$csrf = $_POST['csrf_token'] ?? '';
if (!$id || !$title || !$content || !verify_csrf_token($csrf)) {
    http_response_code(400);
    echo json_encode(['error' => 'Champs manquants ou CSRF']);
    exit;
}
$stmt = $pdo->prepare('UPDATE veille SET title=?, content=?, url=? WHERE id=?');
$stmt->execute([$title, $content, $url, $id]);
echo json_encode(['success' => true]);
?>
