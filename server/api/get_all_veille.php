<?php
// get_all_veille.php
header('Content-Type: application/json');
session_start();
require_once '../config.php';
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}
$stmt = $pdo->prepare('SELECT * FROM veille ORDER BY created_at DESC');
$stmt->execute();
echo json_encode($stmt->fetchAll());
?>
