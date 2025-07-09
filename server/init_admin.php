<?php
// init_admin.php
// À lancer une seule fois pour créer un admin par défaut
require_once 'config.php';
$email = 'admin@admin.com';
$password = password_hash('admin123', PASSWORD_DEFAULT);
try {
    $stmt = $pdo->prepare('INSERT INTO admin (email, password) VALUES (?, ?)');
    $stmt->execute([$email, $password]);
    echo "Admin créé : $email / admin123";
} catch (Exception $e) {
    echo "Erreur ou admin déjà existant.";
}
?>
