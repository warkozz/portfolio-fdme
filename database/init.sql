CREATE TABLE admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  github_link VARCHAR(255),
  competencies TEXT,
  category ENUM('pro', 'ecole', 'perso') DEFAULT 'perso',
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE veille (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  url VARCHAR(255),
  category ENUM('automatique', 'forum') DEFAULT 'automatique',
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes to improve read performance on list queries
CREATE INDEX idx_projects_visible_created_at ON projects (visible, created_at);
CREATE INDEX idx_veille_visible_created_at ON veille (visible, created_at);
