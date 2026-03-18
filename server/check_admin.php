<?php
// Script de vérification et création du compte admin
session_start();

// Protection par code PIN
$PIN_CODE = '1301';

if (!isset($_SESSION['check_admin_auth'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pin'])) {
        if ($_POST['pin'] === $PIN_CODE) {
            $_SESSION['check_admin_auth'] = true;
        } else {
            $error_pin = true;
        }
    }
    
    if (!isset($_SESSION['check_admin_auth'])) {
        echo "<!DOCTYPE html><html><head><title>Accès sécurisé</title>";
        echo "<style>body{font-family:Arial;max-width:400px;margin:100px auto;padding:20px;background:#f5f5f5;}";
        echo ".container{background:white;padding:30px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}";
        echo "h2{color:#333;text-align:center;margin-bottom:20px;}";
        echo "input{width:100%;padding:15px;font-size:18px;border:1px solid #ddd;border-radius:5px;box-sizing:border-box;text-align:center;letter-spacing:5px;}";
        echo "button{width:100%;background:#007bff;color:white;padding:15px;border:none;border-radius:5px;cursor:pointer;font-size:16px;margin-top:15px;}";
        echo "button:hover{background:#0056b3;}";
        echo ".error{background:#f8d7da;color:#721c24;padding:10px;border-radius:5px;margin-bottom:15px;text-align:center;}";
        echo "</style></head><body>";
        echo "<div class='container'>";
        echo "<h2>🔒 Code PIN requis</h2>";
        if (isset($error_pin)) {
            echo "<div class='error'>Code PIN incorrect</div>";
        }
        echo "<form method='POST'>";
        echo "<input type='password' name='pin' placeholder='Code PIN' maxlength='4' autofocus required>";
        echo "<button type='submit'>Accéder</button>";
        echo "</form>";
        echo "</div></body></html>";
        exit;
    }
}

require_once 'config.php';

echo "<!DOCTYPE html><html><head><title>Vérification Admin</title>";
echo "<style>body{font-family:Arial;max-width:800px;margin:50px auto;padding:20px;}";
echo ".info{background:#d1ecf1;color:#0c5460;padding:15px;border-radius:5px;margin:10px 0;}";
echo ".success{background:#d4edda;color:#155724;padding:15px;border-radius:5px;margin:10px 0;}";
echo ".error{background:#f8d7da;color:#721c24;padding:15px;border-radius:5px;margin:10px 0;}";
echo ".code{background:#f8f9fa;padding:10px;border-left:3px solid #007bff;margin:10px 0;font-family:monospace;}";
echo "button{background:#007bff;color:white;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;font-size:16px;}";
echo "button:hover{background:#0056b3;}</style></head><body>";

echo "<h1>🔍 Vérification du compte Admin</h1>";

try {
    // Vérifier si la table admin existe
    $stmt = $pdo->query("SHOW TABLES LIKE 'admin'");
    if ($stmt->rowCount() === 0) {
        echo "<div class='error'>❌ La table 'admin' n'existe pas !</div>";
        echo "<p>Veuillez exécuter <a href='init_admin.php'>init_admin.php</a> pour créer la base de données.</p>";
        exit;
    }
    
    echo "<div class='success'>✓ Table 'admin' existe</div>";
    
    // Vérifier si un admin existe
    $stmt = $pdo->query("SELECT * FROM admin");
    $admins = $stmt->fetchAll();
    
    if (count($admins) === 0) {
        echo "<div class='error'>❌ Aucun utilisateur admin trouvé</div>";
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create'])) {
            // Créer l'admin par défaut
            $email = 'admin@portfolio.com';
            $password = 'admin123';
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            
            $stmt = $pdo->prepare("INSERT INTO admin (email, password) VALUES (?, ?)");
            $stmt->execute([$email, $hashedPassword]);
            
            echo "<div class='success'><h3>✅ Compte admin créé avec succès !</h3>";
            echo "<div class='code'>Email: <strong>$email</strong><br>Mot de passe: <strong>$password</strong></div>";
            echo "</div>";
        } else {
            echo "<form method='POST'>";
            echo "<button type='submit' name='create'>Créer le compte admin</button>";
            echo "</form>";
        }
    } else {
        echo "<div class='success'>✓ " . count($admins) . " utilisateur(s) admin trouvé(s)</div>";
        
        echo "<h3>Utilisateurs existants :</h3>";
        foreach ($admins as $admin) {
            echo "<div class='info'>";
            echo "<strong>ID:</strong> " . $admin['id'] . "<br>";
            echo "<strong>Email:</strong> " . $admin['email'] . "<br>";
            echo "<strong>Hash du mot de passe:</strong> " . substr($admin['password'], 0, 30) . "...<br>";
            echo "</div>";
        }
        
        echo "<h3>Tester la connexion</h3>";
        echo "<div class='code'>";
        echo "Email par défaut: <strong>admin@portfolio.com</strong><br>";
        echo "Mot de passe par défaut: <strong>admin123</strong>";
        echo "</div>";
        
        // Tester si le mot de passe par défaut fonctionne
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['test'])) {
            $testEmail = 'admin@portfolio.com';
            $testPassword = 'admin123';
            
            $stmt = $pdo->prepare("SELECT * FROM admin WHERE email = ?");
            $stmt->execute([$testEmail]);
            $user = $stmt->fetch();
            
            if ($user && password_verify($testPassword, $user['password'])) {
                echo "<div class='success'>✅ Le mot de passe par défaut fonctionne !</div>";
            } else {
                echo "<div class='error'>❌ Le mot de passe par défaut ne fonctionne pas</div>";
                echo "<p>Vous devez réinitialiser votre mot de passe.</p>";
            }
        } else {
            echo "<form method='POST'><button type='submit' name='test'>Tester le mot de passe par défaut</button></form>";
        }
        
        // Option pour réinitialiser
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['reset'])) {
            $email = 'admin@portfolio.com';
            $password = 'admin123';
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            
            // Supprimer tous les admins
            $pdo->exec("DELETE FROM admin");
            
            // Créer le nouveau
            $stmt = $pdo->prepare("INSERT INTO admin (email, password) VALUES (?, ?)");
            $stmt->execute([$email, $hashedPassword]);
            
            echo "<div class='success'><h3>✅ Compte admin réinitialisé !</h3>";
            echo "<div class='code'>Email: <strong>$email</strong><br>Mot de passe: <strong>$password</strong></div>";
            echo "</div>";
            echo "<p><a href='check_admin.php'>Recharger la page</a></p>";
        } else {
            echo "<br><form method='POST'><button type='submit' name='reset' style='background:#dc3545;'>Réinitialiser le compte admin</button></form>";
        }
    }
    
} catch (PDOException $e) {
    echo "<div class='error'>❌ Erreur: " . $e->getMessage() . "</div>";
}

echo "</body></html>";
?>
