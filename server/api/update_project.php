<?php
// update_project.php
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
$description = trim($_POST['description'] ?? '');
$github_link = trim($_POST['github_link'] ?? '');
$competencies = trim($_POST['competencies'] ?? '');
$category = trim($_POST['category'] ?? 'perso');
$csrf = $_POST['csrf_token'] ?? '';
if (!$id || !$title || !$description || !verify_csrf_token($csrf)) {
    http_response_code(400);
    echo json_encode(['error' => 'Champs manquants ou CSRF']);
    exit;
}
$image = $_POST['current_image'] ?? null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $allowed = ['jpg','jpeg','png','gif'];
    $fileInfo = pathinfo($_FILES['image']['name']);
    $ext = strtolower($fileInfo['extension']);
    $mime = mime_content_type($_FILES['image']['tmp_name']);
    if (!in_array($ext, $allowed) || !in_array($mime, ['image/jpeg','image/png','image/gif'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Format image invalide']);
        exit;
    }
    if ($_FILES['image']['size'] > 2*1024*1024) {
        http_response_code(400);
        echo json_encode(['error' => 'Image trop lourde']);
        exit;
    }
    $image = uniqid().'.'.$ext;
    move_uploaded_file($_FILES['image']['tmp_name'], '../upload/'.$image);
}
if (!in_array($category, ['pro', 'ecole', 'perso'])) {
    $category = 'perso';
}
$stmt = $pdo->prepare('UPDATE projects SET title=?, description=?, image=?, github_link=?, competencies=?, category=? WHERE id=?');
$stmt->execute([$title, $description, $image, $github_link, $competencies, $category, $id]);
echo json_encode(['success' => true]);
?>
