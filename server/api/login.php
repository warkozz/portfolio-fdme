<?php
// login.php
header('Content-Type: application/json');
session_start();
require_once '../config.php';
require_once '../csrf.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);
$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$password = $data['password'] ?? '';
$csrf = $data['csrf_token'] ?? '';
if (!$email || !$password || !verify_csrf_token($csrf)) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides ou CSRF']);
    exit;
}
$stmt = $pdo->prepare('SELECT * FROM admin WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();
if ($user && password_verify($password, $user['password'])) {
    $_SESSION['admin'] = $user['id'];
    echo json_encode(['success' => true]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Identifiants invalides']);
}
?>
