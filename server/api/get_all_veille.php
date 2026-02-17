<?php
// get_all_veille.php
header('Content-Type: application/json');
// CORS + OPTIONS centralisés
require_once '../config.php';
// Session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}
$stmt = $pdo->prepare('SELECT * FROM veille ORDER BY created_at DESC');
$stmt->execute();
echo json_encode($stmt->fetchAll());
?>
