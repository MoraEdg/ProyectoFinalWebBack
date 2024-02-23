-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS proyectnewsdb;

-- Usar la base de datos
USE proyectnewsdb;

-- Crear la tabla "users" para gestionar a los administradores y clientes
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,  -- Recomendado usar algoritmo de hash para almacenar contraseñas
    name VARCHAR(45),
    role ENUM('admin', 'client', 'editor') NOT NULL
);

-- Insertar el administrador predeterminado
INSERT INTO users (username, password, name, role) VALUES ('admin@uisek.edu.ec', 'admin1', 'Administrador', 'admin');



-- Crear la tabla "news" para gestionar las noticias
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(300) NOT NULL,
    fecha DATE,
    prioridad INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Insert noticias  de la tabla "news"
INSERT INTO news (title, content, fecha, prioridad, user_id) VALUES 
('Descubrimiento Científico en Marte', 'Científicos encuentran evidencia de agua líquida en Marte, lo que aumenta las posibilidades de vida en el planeta rojo. Este hallazgo podría tener implicaciones significativas para la exploración espacial futura.', '2023-02-22', 1, 1),
('Nuevas Tecnologías en Energía Renovable', 'Una empresa de tecnología presenta un avance revolucionario en el campo de las energías renovables. La nueva tecnología promete aumentar la eficiencia de la generación de energía solar en un 30%.', '2023-02-12', 2, 2),
('Avances en Inteligencia Artificial en la Medicina', 'Investigadores desarrollan un sistema de inteligencia artificial capaz de diagnosticar enfermedades con una precisión sorprendente. Este avance podría mejorar significativamente la rapidez y la precisión de los diagnósticos médicos.', '2024-01-20', 1, 3),
('Lanzamiento Exitoso de la Misión Espacial', 'La agencia espacial realiza con éxito el lanzamiento de una misión espacial para explorar asteroides cercanos a la Tierra. La misión tiene como objetivo obtener información crucial sobre la formación del sistema solar.', '2024-02-20', 2, 1),
('Innovaciones en la Industria del Automóvil', 'Fabricantes de automóviles presentan nuevos modelos eléctricos con autonomía extendida. Estos vehículos buscan cambiar el panorama de la movilidad y reducir la dependencia de los combustibles fósiles.', '2024-01-01', 1, 2);
