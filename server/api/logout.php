<?php
// logout.php
header('Content-Type: application/json');
// Inclure la config pour CORS + gestion OPTIONS
require_once '../config.php';
session_start();
session_destroy();
echo json_encode(['success' => true]);
?>
