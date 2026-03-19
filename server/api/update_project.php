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
// Si $_POST est vide lors d'un POST, c'est souvent un dépassement de post_max_size en PHP
if (empty($_POST)) {
    http_response_code(400);
    echo json_encode(['error' => 'Données du formulaire non reçues. Si vous uploadez une image, vérifiez sa taille (max 2 Mo).']);
    exit;
}
$id = intval($_POST['id'] ?? 0);
$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$github_link = trim($_POST['github_link'] ?? '');
$competencies = trim($_POST['competencies'] ?? '');
$category = trim($_POST['category'] ?? 'perso');
$csrf = $_POST['csrf_token'] ?? '';
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID du projet manquant']);
    exit;
}
if (!$title) {
    http_response_code(400);
    echo json_encode(['error' => 'Le titre est requis']);
    exit;
}
if (!$description) {
    http_response_code(400);
    echo json_encode(['error' => 'La description est requise']);
    exit;
}
if (!verify_csrf_token($csrf)) {
    http_response_code(400);
    echo json_encode(['error' => 'Token CSRF invalide - veuillez recharger la page']);
    exit;
}
$image = $_POST['current_image'] ?? null;
$imageBase64 = null;
$imageMime = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $allowed_ext = ['jpg','jpeg','png','gif','webp'];
    $fileInfo = pathinfo($_FILES['image']['name']);
    $ext = strtolower($fileInfo['extension'] ?? '');
    $mime = mime_content_type($_FILES['image']['tmp_name']);
    $allowed_mime = ['image/jpeg','image/jpg','image/png','image/gif','image/webp'];
    if (!in_array($ext, $allowed_ext) || !in_array($mime, $allowed_mime)) {
        http_response_code(400);
        echo json_encode(['error' => 'Format image invalide (JPG, PNG, GIF ou WEBP acceptés)']);
        exit;
    }
    if ($_FILES['image']['size'] > 2*1024*1024) {
        http_response_code(400);
        echo json_encode(['error' => 'Image trop lourde (max 2 Mo)']);
        exit;
    }
    // Stocker en base de données (base64) pour portabilité lors des migrations
    $imageBase64 = base64_encode(file_get_contents($_FILES['image']['tmp_name']));
    $imageMime = ($mime === 'image/jpg') ? 'image/jpeg' : $mime;
}
if (!in_array($category, ['pro', 'ecole', 'perso'])) {
    $category = 'perso';
}
// Mise à jour avec ou sans nouvelle image
if ($imageBase64 !== null) {
    $stmt = $pdo->prepare('UPDATE projects SET title=?, description=?, github_link=?, competencies=?, category=?, image_base64=?, image_mime=? WHERE id=?');
    $stmt->execute([$title, $description, $github_link, $competencies, $category, $imageBase64, $imageMime, $id]);
} else {
    $stmt = $pdo->prepare('UPDATE projects SET title=?, description=?, github_link=?, competencies=?, category=? WHERE id=?');
    $stmt->execute([$title, $description, $github_link, $competencies, $category, $id]);
}
echo json_encode(['success' => true]);
?>
