<?php
// get_all_projects.php
header('Content-Type: application/json');
session_start();
require_once '../config.php';
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non autorisé']);
    exit;
}
$stmt = $pdo->prepare('SELECT id, title, description, image, image_base64, image_mime, github_link, competencies, category, visible, created_at FROM projects ORDER BY created_at DESC');
$stmt->execute();
echo json_encode($stmt->fetchAll());
?>
