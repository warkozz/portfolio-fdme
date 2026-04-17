<?php
// add_project.php
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
$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$github_link = trim($_POST['github_link'] ?? '');
$live_link = trim($_POST['live_link'] ?? '');
$competencies = trim($_POST['competencies'] ?? '');
$category = trim($_POST['category'] ?? 'perso');
$csrf = $_POST['csrf_token'] ?? '';
if (!$title || !$description || !verify_csrf_token($csrf)) {
    http_response_code(400);
    echo json_encode(['error' => !$title ? 'Le titre est requis' : (!$description ? 'La description est requise' : 'Token CSRF invalide - veuillez recharger la page')]);
    exit;
}
$image = null;
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
try {
    $stmt = $pdo->prepare('INSERT INTO projects (title, description, github_link, live_link, competencies, category, image_base64, image_mime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$title, $description, $github_link, $live_link, $competencies, $category, $imageBase64, $imageMime]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    error_log('add_project.php error: ' . $e->getMessage());
    http_response_code(500);
    $resp = ['error' => 'Erreur lors de l\'ajout du projet'];
    if (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) {
        $resp['details'] = $e->getMessage();
    }
    echo json_encode($resp);
}
?>
