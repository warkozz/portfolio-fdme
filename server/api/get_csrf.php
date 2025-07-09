<?php
// get_csrf.php
header('Content-Type: application/json');
session_start();
require_once '../csrf.php';
echo json_encode(['csrf_token' => generate_csrf_token()]);
?>
