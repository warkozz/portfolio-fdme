<?php
// get_veille.php
header('Content-Type: application/json');
require_once '../config.php';
$stmt = $pdo->prepare('SELECT id, title, content, url, created_at FROM veille WHERE visible = 1 ORDER BY created_at DESC');
$stmt->execute();
echo json_encode($stmt->fetchAll());
?>
