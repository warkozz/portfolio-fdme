<?php
// get_projects.php
header('Content-Type: application/json');
require_once '../config.php';
$stmt = $pdo->prepare('SELECT id, title, description, image, image_base64, image_mime, github_link, live_link, competencies, category, created_at FROM projects WHERE visible = 1 ORDER BY created_at DESC');
$stmt->execute();
echo json_encode($stmt->fetchAll());
?>
