-- init.sql
CREATE TYPE tipo_evento AS ENUM ('partido', 'entrenamiento', 'vacaciones');

CREATE TYPE estado_partido AS ENUM ('PROGRAMADO', 'FINALIZADO');

CREATE TABLE IF NOT EXISTS equipo (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    nombre_equipo VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL,
    image_id VARCHAR(255),
    isVerified BOOLEAN NOT NULL DEFAULT false,
    conversaciones JSON
);

CREATE TABLE IF NOT EXISTS estadisticas (
    id SERIAL PRIMARY KEY,
    partidos_jugados INT,
    minutos_jugados INT,
    goles_anotados INT,
    asistencias INT,
    tarjetas_amarillas INT,
    tarjetas_rojas INT
);

CREATE TABLE IF NOT EXISTS jugadores (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    equipo_id INT NOT NULL,
    nombre_jugador VARCHAR(255) NOT NULL,
    numero_camiseta INT,
    edad INT,
    altura FLOAT,
    peso FLOAT,
    posicion VARCHAR(255),
    estadisticas_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (equipo_id) REFERENCES equipo(id),
    FOREIGN KEY (estadisticas_id) REFERENCES estadisticas(id)
);

CREATE TABLE IF NOT EXISTS entrenadores (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    equipo_id INT NOT NULL,
    nombre_entrenador VARCHAR(255) NOT NULL,
    edad INT,
    anios_experiencia INT,
    equipo_actual VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (equipo_id) REFERENCES equipo(id)
);


CREATE TABLE IF NOT EXISTS estadisticas_partidos (
    id SERIAL PRIMARY KEY,
    posesion_balon_equipo_local FLOAT,
    posesion_balon_equipo_visitante FLOAT,
    tiros_gol_equipo_local INT,
    tiros_gol_equipo_visitante INT,
    tiros_esquina_equipo_local INT,
    tiros_esquina_equipo_visitante INT,
    faltas_equipo_local INT,
    faltas_equipo_visitante INT,
    tarjetas_amarillas_equipo_local INT,
    tarjetas_amarillas_equipo_visitante INT,
    tarjetas_rojas_equipo_local INT,
    tarjetas_rojas_equipo_visitante INT
);


CREATE TABLE IF NOT EXISTS partidos (
    id SERIAL PRIMARY KEY,
    equipo_local_id INT ,
    equipo_local_nombre VARCHAR(255),
    equipo_visitante_id INT ,
    equipo_visitante_nombre VARCHAR(255),
    fecha_hora TIMESTAMP NOT NULL,
    lugar VARCHAR(255),
    goles_equipo_local INT,
    goles_equipo_visitante INT,
    estado estado_partido,
    estadisticas_partido_id INT,
    FOREIGN KEY (equipo_local_id) REFERENCES equipo(id),
    FOREIGN KEY (equipo_visitante_id) REFERENCES equipo(id),
    FOREIGN KEY (estadisticas_partido_id) REFERENCES estadisticas_partidos(id)
);

CREATE TABLE IF NOT EXISTS entrenamientos (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    equipo_id INT NOT NULL,
    exercises JSON,
    fecha TIMESTAMP NOT NULL,
    hora_fin TIMESTAMP NOT NULL,
    hora_inicio TIMESTAMP NOT NULL,
    name VARCHAR(255) NOT NULL,
    numexercises INT,
    FOREIGN KEY (equipo_id) REFERENCES equipo(id)
);

CREATE TABLE IF NOT EXISTS notas_calendario (
    id SERIAL PRIMARY KEY,              
    equipo_id INT NOT NULL,              
    titulo VARCHAR(255) NOT NULL,        
    type tipo_evento NOT NULL,
    bgColor VARCHAR(7),                  
    borderColor VARCHAR(7),              
    color VARCHAR(7),                    
    dragBgColor VARCHAR(7),             
    dueDateClass VARCHAR(50),           
    start TIMESTAMP NOT NULL,            
    end_time TIMESTAMP NOT NULL,         
    FOREIGN KEY (equipo_id) REFERENCES equipo(id)
);


CREATE TABLE IF NOT EXISTS conversaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    mensajes JSON,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS mensajes (
    id SERIAL PRIMARY KEY,
    contenido VARCHAR(255) NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    conversacion_id INT NOT NULL,
    remitente_id INT NOT NULL,
    FOREIGN KEY (conversacion_id) REFERENCES conversaciones(id),
    FOREIGN KEY (remitente_id) REFERENCES usuarios(id)
);


INSERT INTO equipo (token, nombre_equipo) VALUES
('f32d7af1b2e57b8', 'Navega'),
('f32d7af1b2e57b9', 'Helmantico'),
('f32d7af1b2e57b1', 'Monterrey'),
('f32d7af1b2e57b2', 'Villamayor'),
('f32d7af1b2e57b3', 'Bejar');

INSERT INTO usuarios (nombre, apellidos, email, password, rol, image_id) VALUES
('Juan', 'Perez', 'juan@example.com', '$2a$10$g9UnWZ/yie1Dh3.lV.WX2OwoHhNr7onejc5pK9ku/gz.h3MoJoofq', 'jugador','https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/profiles/1f71a7be-c6b8-42df-b081-5fc17d3a4f4d.PNG' ),
('Ivan', 'Lucas', 'ivannlucas@hotmail.com', '$2a$10$g9UnWZ/yie1Dh3.lV.WX2OwoHhNr7onejc5pK9ku/gz.h3MoJoofq', 'entrenador','https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/profiles/Imagen_ivan.jpg'),
('Luis', 'Lopez', 'luislopez@example.com', '$2a$10$g9UnWZ/yie1Dh3.lV.WX2OwoHhNr7onejc5pK9ku/gz.h3MoJoofq', 'jugador','https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/profiles/1f71a7be-c6b8-42df-b081-5fc17d3a4f4e.PNG'),
('Pedro', 'Hernandez', 'pedro@example.com', '$2a$10$g9UnWZ/yie1Dh3.lV.WX2OwoHhNr7onejc5pK9ku/gz.h3MoJoofq', 'jugador','https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/profiles/2f71a7be-c6b8-42df-b081-5fc17d3a4f4p.PNG'),
('Jorge', 'Martinez', 'jorge@example.com', '$2a$10$g9UnWZ/yie1Dh3.lV.WX2OwoHhNr7onejc5pK9ku/gz.h3MoJoofq', 'jugador','https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/profiles/2f71a7be-c6b8-42df-b081-5fc17d3a4f4t.PNG'),
('Luis', 'Moro', 'luis@example.com', '$2a$10$g9UnWZ/yie1Dh3.lV.WX2OwoHhNr7onejc5pK9ku/gz.h3MoJoofq', 'jugador','https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/profiles/3f71a7be-c6b8-42df-b081-5fc17d3a4f4d.PNG'),
('Maria', 'Diaz', 'maria@example.com', '$2a$10$g9UnWZ/yie1Dh3.lV.WX2OwoHhNr7onejc5pK9ku/gz.h3MoJoofq', 'jugador','https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/profiles/5f71a7be-c6b8-42df-b081-5fc17d3a4f4d.jpg'),
('Carlos', 'Garcia', 'carlos@example.com', '$2a$10$g9UnWZ/yie1Dh3.lV.WX2OwoHhNr7onejc5pK9ku/gz.h3MoJoofq', 'entrenador','');

INSERT INTO estadisticas (partidos_jugados, minutos_jugados, goles_anotados, asistencias, tarjetas_amarillas, tarjetas_rojas) VALUES
(10, 900, 5, 3, 1, 0),
(12, 1080, 7, 2, 2, 0),
(15, 1350, 10, 5, 3, 1),
(20, 1800, 15, 7, 4, 2),
(20, 1800, 15, 7, 4, 2),
(20, 1800, 15, 7, 4, 2),
(5, 450, 2, 1, 0, 0);

INSERT INTO jugadores (usuario_id, equipo_id, nombre_jugador, numero_camiseta, edad, altura, peso, posicion, estadisticas_id) VALUES
(1, 1, 'Juan Perez', 10, 25, 1.75, 70, 'Delantero centro', 1),
(3, 1, 'Luis Lopez', 9, 22, 1.80, 75, 'Central', 2),
(8, 1, 'Carlos Garcia', 4, 30, 1.85, 80, 'Defensa', 4),
(4, 1, 'Pedro Hernandez', 11, 26, 1.78, 72, 'Extremo Derecho', 5),
(5, 1, 'Jorge Martinez', 6, 24, 1.70, 68, 'Lateral Izquierdo', 6),
(6, 1, 'Luis Moro', 6, 24, 1.70, 68, 'Portero', 7),
(7, 1, 'Maria Diaz', 7, 28, 1.65, 60, 'Mediocentro Ofensivo', 3);


INSERT INTO entrenadores (usuario_id, equipo_id, nombre_entrenador, edad, anios_experiencia, equipo_actual) VALUES
(2, 1, 'Ivan Lucas', 45, 20, 'Navega');


INSERT INTO estadisticas_partidos (posesion_balon_equipo_local, posesion_balon_equipo_visitante, tiros_gol_equipo_local, tiros_gol_equipo_visitante, tiros_esquina_equipo_local, tiros_esquina_equipo_visitante, faltas_equipo_local, faltas_equipo_visitante, tarjetas_amarillas_equipo_local, tarjetas_amarillas_equipo_visitante, tarjetas_rojas_equipo_local, tarjetas_rojas_equipo_visitante) VALUES
(60.5, 39.5, 10, 8, 5, 3, 12, 14, 2, 3, 1, 0),
(55.0, 45.0, 9, 6, 4, 2, 10, 13, 1, 1, 0, 1),
(70.0, 30.0, 15, 5, 8, 1, 14, 12, 3, 2, 0, 0),
(40.0, 60.0, 5, 12, 2, 6, 8, 18, 1, 4, 1, 2),
(52.0, 48.0, 8, 7, 3, 4, 10, 12, 2, 2, 0, 1),
(60.0, 40.0, 10, 6, 5, 3, 9, 10, 1, 3, 0, 0),
(45.0, 55.0, 7, 9, 4, 6, 11, 14, 3, 4, 1, 1),
(65.0, 35.0, 12, 7, 7, 2, 10, 16, 2, 2, 0, 1);

INSERT INTO partidos (equipo_local_id, equipo_local_nombre, equipo_visitante_id, equipo_visitante_nombre, fecha_hora, lugar, goles_equipo_local, goles_equipo_visitante, estado, estadisticas_partido_id) VALUES
(1, 'Navega', 2, 'Helmantico', '2023-08-20 15:00:00', 'Estadio 1', 3, 2, 'FINALIZADO', 1),
(3, 'Monterrey', 1, 'Navega', '2023-08-21 17:00:00', 'Estadio 2', 1, 1, 'FINALIZADO', 2),
(1, 'Navega', 3, 'Monterrey', '2023-09-01 16:00:00', 'Estadio 4', 2, 2, 'FINALIZADO', 4),
(1, 'Navega', 5, 'Bejar', '2023-09-05 18:00:00', 'Estadio 5', 3, 1, 'FINALIZADO', 5),
(2, 'Helmantico', 1, 'Navega', '2023-09-10 19:00:00', 'Estadio 1', 1, 4, 'FINALIZADO', 6),
(5, 'Bejar', 4, 'Villamayor', '2023-08-22 19:00:00', 'Estadio 3', 0, 4, 'FINALIZADO', 3);

INSERT INTO entrenamientos (equipo_id, exercises, fecha, hora_inicio, hora_fin, name, numexercises) VALUES
(1, '[{"title":"Rondos","description":"Dar pases","material":"4 conos, 3 balones","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/feecb442-4c9f-47b6-8b3a-886b428915fe"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633777632419.jpg"},{"title":"Posesion","description":"Dar el mayor numero de pases posibles sin que el rival robe el balon","material":"6 conos, 7 picas","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/db49f1d9-0d0c-45f3-881c-cd82a8893f5a"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633779310322.jpg"}]', '2024-08-23 22:00:00', '2023-08-25 09:00:00', '2023-08-25 11:00:00', 'Entrenamiento 1', 2),
(1, '[{"title":"Rondos","description":"Dar pases","material":"4 conos, 3 balones","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/feecb442-4c9f-47b6-8b3a-886b428915fe"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633777632419.jpg"},{"title":"Posesion","description":"Dar el mayor numero de pases posibles sin que el rival robe el balon","material":"6 conos, 7 picas","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/db49f1d9-0d0c-45f3-881c-cd82a8893f5a"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633779310322.jpg"}]', '2023-09-02 22:00:00', '2023-09-02 07:00:00', '2023-09-02 09:00:00', 'Entrenamiento 6', 2),
(1, '[{"title":"Rondos","description":"Dar pases","material":"4 conos, 3 balones","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/feecb442-4c9f-47b6-8b3a-886b428915fe"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633777632419.jpg"},{"title":"Posesion","description":"Dar el mayor numero de pases posibles sin que el rival robe el balon","material":"6 conos, 7 picas","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/db49f1d9-0d0c-45f3-881c-cd82a8893f5a"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633779310322.jpg"}]', '2023-09-03 22:00:00', '2023-09-03 08:00:00', '2023-09-03 10:00:00', 'Entrenamiento 7', 2),
(1, '[{"title":"Rondos","description":"Dar pases","material":"4 conos, 3 balones","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/feecb442-4c9f-47b6-8b3a-886b428915fe"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633777632419.jpg"},{"title":"Posesion","description":"Dar el mayor numero de pases posibles sin que el rival robe el balon","material":"6 conos, 7 picas","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/db49f1d9-0d0c-45f3-881c-cd82a8893f5a"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633779310322.jpg"}]', '2023-09-04 22:00:00', '2023-09-04 06:00:00', '2023-09-04 08:00:00', 'Entrenamiento 8', 2),
(1, '[{"title":"Rondos","description":"Dar pases","material":"4 conos, 3 balones","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/feecb442-4c9f-47b6-8b3a-886b428915fe"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633777632419.jpg"},{"title":"Posesion","description":"Dar el mayor numero de pases posibles sin que el rival robe el balon","material":"6 conos, 7 picas","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/db49f1d9-0d0c-45f3-881c-cd82a8893f5a"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633779310322.jpg"}]', '2023-08-26 22:00:00', '2023-08-26 10:00:00', '2023-08-26 12:00:00', 'Entrenamiento 2', 2),
(1, '[{"title":"Rondos","description":"Dar pases","material":"4 conos, 3 balones","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/feecb442-4c9f-47b6-8b3a-886b428915fe"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633777632419.jpg"},{"title":"Posesion","description":"Dar el mayor numero de pases posibles sin que el rival robe el balon","material":"6 conos, 7 picas","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/db49f1d9-0d0c-45f3-881c-cd82a8893f5a"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633779310322.jpg"}]', '2023-08-27 22:00:00', '2023-08-27 08:00:00', '2023-08-27 10:00:00', 'Entrenamiento 3', 2),
(1, '[{"title":"Rondos","description":"Dar pases","material":"4 conos, 3 balones","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/feecb442-4c9f-47b6-8b3a-886b428915fe"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633777632419.jpg"},{"title":"Posesion","description":"Dar el mayor numero de pases posibles sin que el rival robe el balon","material":"6 conos, 7 picas","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/db49f1d9-0d0c-45f3-881c-cd82a8893f5a"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633779310322.jpg"}]', '2023-08-28 22:00:00', '2023-08-28 07:00:00', '2023-08-28 09:00:00', 'Entrenamiento 4', 2),
(1, '[{"title":"Rondos","description":"Dar pases","material":"4 conos, 3 balones","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/feecb442-4c9f-47b6-8b3a-886b428915fe"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633777632419.jpg"},{"title":"Posesion","description":"Dar el mayor numero de pases posibles sin que el rival robe el balon","material":"6 conos, 7 picas","photo":null,"selectedFile":{"objectURL":"blob:http://localhost:8080/db49f1d9-0d0c-45f3-881c-cd82a8893f5a"},"image_id":"https://awsbucketmanagement.s3.eu-north-1.amazonaws.com/uploads/exercises/1633779310322.jpg"}]', '2023-08-29 22:00:00', '2023-08-29 06:00:00', '2023-08-29 08:00:00', 'Entrenamiento 5', 2);


INSERT INTO notas_calendario (equipo_id, titulo, type, bgColor, borderColor, color, dragBgColor, dueDateClass, start, end_time) VALUES
(1, 'Partido Importante', 'partido', '#FF0000', '#FF0000', '#FFFFFF', '#FF0000', 'Clase 1', '2024-08-30 10:00:00', '2024-08-30 12:00:00'),
(1, 'Entrenamiento Matutino', 'entrenamiento', '#FF00FF', '#FF00FF', '#FFFFFF', '#FF00FF', 'Clase 2', '2024-08-31 08:00:00', '2024-08-31 10:00:00'),
(1, 'Vacaciones', 'vacaciones', '#00FF00', '#00FF00', '#FFFFFF', '#00FF00', 'Clase 3', '2024-09-01 00:00:00', '2024-09-15 23:59:59'),
(1, 'Partido Final', 'partido', '#FF0000', '#FF0000', '#FFFFFF', '#FF0000', 'Clase 4', '2024-09-16 16:00:00', '2024-09-16 18:00:00'),
(1, 'Reunión del Equipo', 'entrenamiento', '#FF00FF', '#FF00FF', '#FFFFFF', '#FF00FF', 'Clase 5', '2024-09-17 11:00:00', '2024-09-17 13:00:00');