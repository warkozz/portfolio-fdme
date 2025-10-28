<?php
// config.php
// CORS pour permettre les requêtes depuis le dev server React
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization, Accept');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
// Réduire le bruit des erreurs PHP dans les réponses JSON
ini_set('display_errors', '0');
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);
// Connexion sécurisée à MariaDB/MySQL
$DB_HOST = 'localhost';
$DB_NAME = 'bts_portfolio';
$DB_USER = 'root';
$DB_PASS = '';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
    // Forcer l'utilisation du socket TCP et désactiver les plugins
    PDO::MYSQL_ATTR_LOCAL_INFILE => true,
];

try {
    // Utiliser mysqli:// au lieu de mysql:// pour forcer l'ancien driver
    $dsn = "mysql:host=$DB_HOST;port=3306;dbname=$DB_NAME;charset=utf8mb4";
    
    // Essayer avec PDO_MYSQL
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
    
} catch (PDOException $e) {
    // Si échec, essayer avec emulate_prepares activé (contourne certains problèmes d'auth)
    try {
        $options[PDO::ATTR_EMULATE_PREPARES] = true;
        $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
    } catch (PDOException $e2) {
        // En développement, afficher l'erreur complète pour debug
        if (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur connexion BDD', 'details' => $e2->getMessage()]);
            exit;
        }
        http_response_code(500);
        echo json_encode(['error' => 'Erreur connexion BDD']);
        exit;
    }
}
?>
