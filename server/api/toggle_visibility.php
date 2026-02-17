<?php
// toggle_visibility.php
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
$id = intval($_POST['id'] ?? 0);
$visible = isset($_POST['visible']) ? (int)$_POST['visible'] : null;
$table = $_POST['table'] ?? 'projects'; // Par défaut 'projects', ou 'veille'
$csrf = $_POST['csrf_token'] ?? '';
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID manquant']);
    exit;
}
if (!is_numeric($visible)) {
    http_response_code(400);
    echo json_encode(['error' => 'Paramètre visible manquant']);
    exit;
}
// Valider la table pour éviter les injections SQL
if (!in_array($table, ['projects', 'veille'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Table invalide']);
    exit;
}
if (!verify_csrf_token($csrf)) {
    http_response_code(400);
    echo json_encode(['error' => 'CSRF invalide']);
    exit;
}
$stmt = $pdo->prepare("UPDATE $table SET visible=? WHERE id=?");
$stmt->execute([$visible, $id]);
echo json_encode(['success' => true]);
?>
