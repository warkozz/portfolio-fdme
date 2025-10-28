<?php
// check_session.php
session_start();
header('Content-Type: application/json');
require_once '../config.php';
echo json_encode(['admin' => isset($_SESSION['admin']) ? true : false]);
?>
