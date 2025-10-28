<?php
session_start();
header('Content-Type: application/json');
// Utiliser la configuration centralisée (CORS + OPTIONS)
require_once '../config.php';
require_once '../csrf.php';

$token = generate_csrf_token();
echo json_encode(['csrf_token' => $token]);
