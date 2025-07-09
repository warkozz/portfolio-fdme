<?php
// check_session.php
header('Content-Type: application/json');
session_start();
echo json_encode(['admin' => isset($_SESSION['admin']) ? true : false]);
?>
