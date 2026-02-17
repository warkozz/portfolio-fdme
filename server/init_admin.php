<!DOCTYPE html>
<html>
<head>
    <title>Installation Base de Données</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .warning { background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .code { background: #f8f9fa; padding: 10px; border-left: 3px solid #007bff; margin: 10px 0; font-family: monospace; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
        button:hover { background: #0056b3; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        h2 { color: #666; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        input { width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Installation de la Base de Données Portfolio</h1>
        
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['install'])) {
            echo "<h2>Installation en cours...</h2>";
            
            $DB_HOST = 'localhost';
            $DB_USER = 'root';
            $DB_PASS = '';
            $DB_NAME = 'bts_portfolio';
            
            try {
                // Connexion sans spécifier de base
                $pdo = new PDO("mysql:host=$DB_HOST;charset=utf8mb4", $DB_USER, $DB_PASS, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                ]);
                
                echo "<div class='success'>✓ Connexion à MySQL réussie</div>";
                
                // Supprimer et recréer la base
                $pdo->exec("DROP DATABASE IF EXISTS $DB_NAME");
                echo "<div class='success'>✓ Ancienne base supprimée (si existante)</div>";
                
                $pdo->exec("CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                echo "<div class='success'>✓ Base de données '$DB_NAME' créée</div>";
                
                $pdo->exec("USE $DB_NAME");
                
                // Créer les tables
                $pdo->exec("CREATE TABLE admin (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL
                )");
                echo "<div class='success'>✓ Table 'admin' créée</div>";
                
                $pdo->exec("CREATE TABLE projects (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    image VARCHAR(255),
                    github_link VARCHAR(255),
                    competencies TEXT,
                    visible BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )");
                echo "<div class='success'>✓ Table 'projects' créée</div>";
                
                $pdo->exec("CREATE TABLE veille (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    title VARCHAR(255) NOT NULL,
                    content TEXT NOT NULL,
                    url VARCHAR(255),
                    visible BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )");
                echo "<div class='success'>✓ Table 'veille' créée</div>";
                
                // Créer les index
                $pdo->exec("CREATE INDEX idx_projects_visible_created_at ON projects (visible, created_at)");
                $pdo->exec("CREATE INDEX idx_veille_visible_created_at ON veille (visible, created_at)");
                echo "<div class='success'>✓ Index créés</div>";
                
                // Créer l'utilisateur admin
                $email = $_POST['admin_email'] ?? 'admin@portfolio.com';
                $password = $_POST['admin_password'] ?? 'admin123';
                $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
                
                $stmt = $pdo->prepare("INSERT INTO admin (email, password) VALUES (?, ?)");
                $stmt->execute([$email, $hashedPassword]);
                
                echo "<div class='success'>";
                echo "<h3>✅ Installation terminée avec succès !</h3>";
                echo "<p><strong>Identifiants admin :</strong></p>";
                echo "<div class='code'>Email: <strong>$email</strong><br>Mot de passe: <strong>$password</strong></div>";
                echo "</div>";
                
                echo "<div class='warning'>";
                echo "<p>⚠️ <strong>Important :</strong> Notez bien ces identifiants !</p>";
                echo "</div>";
                
                echo "<br><a href='http://localhost:3000' style='text-decoration:none;'><button>🚀 Aller sur le site</button></a>";
                echo " <a href='test_db.php' style='text-decoration:none;'><button style='background:#28a745;'>✓ Vérifier la BDD</button></a>";
                
            } catch (PDOException $e) {
                echo "<div class='error'>";
                echo "<h3>❌ Erreur lors de l'installation</h3>";
                echo "<p><strong>Message :</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
                echo "<p><strong>Code :</strong> " . $e->getCode() . "</p>";
                echo "</div>";
                
                if ($e->getCode() == 2054) {
                    echo "<div class='warning'>";
                    echo "<h3>🔧 Solution au problème d'authentification</h3>";
                    echo "<p>Le problème vient de la méthode d'authentification MySQL. Voici comment le résoudre :</p>";
                    echo "<ol>";
                    echo "<li>Ouvrez <strong>phpMyAdmin</strong> : <a href='http://localhost/phpmyadmin' target='_blank'>http://localhost/phpmyadmin</a></li>";
                    echo "<li>Cliquez sur l'onglet <strong>SQL</strong> en haut</li>";
                    echo "<li>Copiez et exécutez cette commande :</li>";
                    echo "</ol>";
                    echo "<div class='code'>";
                    echo "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';<br>";
                    echo "FLUSH PRIVILEGES;";
                    echo "</div>";
                    echo "<p>4. Revenez sur cette page et cliquez à nouveau sur 'Installer'</p>";
                    echo "</div>";
                }
            }
            
        } else {
            // Formulaire d'installation
            ?>
            <div class="warning">
                <p>⚠️ Cette installation va :</p>
                <ul>
                    <li>Supprimer la base de données existante (si elle existe)</li>
                    <li>Créer une nouvelle base de données 'bts_portfolio'</li>
                    <li>Créer toutes les tables nécessaires</li>
                    <li>Créer un compte administrateur</li>
                </ul>
            </div>
            
            <h2>Paramètres d'installation</h2>
            <form method="POST">
                <p>
                    <label><strong>Email admin :</strong></label><br>
                    <input type="email" name="admin_email" value="admin@portfolio.com" required>
                </p>
                <p>
                    <label><strong>Mot de passe admin :</strong></label><br>
                    <input type="text" name="admin_password" value="admin123" required>
                </p>
                <p>
                    <button type="submit" name="install">🚀 Installer la base de données</button>
                </p>
            </form>
            
            <div class="code">
                <strong>Note :</strong> Vous pouvez modifier l'email et le mot de passe avant l'installation.
            </div>
            <?php
        }
        ?>
    </div>
</body>
</html>
