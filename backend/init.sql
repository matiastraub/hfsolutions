

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  image TEXT,
  category_id INT REFERENCES categories(id),
  rate NUMERIC(3,2) CHECK (rate >= 0 AND rate <= 5),
  count INT
);


-- Crear index y referencia
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_name ON products(title);
CREATE INDEX idx_products_price ON products(price);


-- CATEGORIAS
INSERT INTO categories (name) VALUES
  ('ropa de hombre'),
  ('joyería'),
  ('electrónica');

-- PRODUCTOS
-- PRODUCTOS
INSERT INTO products (title, price, description, image, category_id, rate, count) VALUES
('Fjallraven - Mochila Foldsack No. 1, para laptops de 15 pulgadas', 109.95,
 'Tu mochila perfecta para el uso diario y paseos por el bosque. Guarda tu laptop (hasta 15 pulgadas) en la funda acolchada, tu compañera de todos los días',
 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png', 1, 3.9, 120),

('Camisetas de hombre casual premium slim fit', 22.3,
 'Estilo ajustado, manga larga raglán en contraste, placket henley de tres botones, tela ligera y suave...',
 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png', 1, 4.1, 259),

('Chaqueta de algodón para hombre', 55.99,
 'Excelentes chaquetas de abrigo para primavera/otoño/invierno...',
 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png', 1, 4.7, 500),

('Slim Fit casual para hombre', 15.99,
 'El color podría ser ligeramente diferente entre la pantalla y la práctica...',
 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png', 1, 2.1, 430),

('Pulsera John Hardy Women''s Legends Naga Oro y Plata con Estación Dragón', 695,
 'De nuestra Colección Legends, el Naga se inspiró en el mítico dragón de agua...',
 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png', 2, 4.6, 400),

('Oro macizo petite micropavé', 168,
 'Satisfacción garantizada. Devuelve o cambia cualquier pedido dentro de los 30 días...',
 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png', 2, 3.9, 70),

('Anillo Princesa chapado en oro blanco', 9.99,
 'Anillo de compromiso clásico con solitario de diamante creado para ella...',
 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png', 2, 3.0, 400),

('Pierced Owl Túnel Doble Acampanado Acero Inoxidable Chapado en Oro Rosa', 10.99,
 'Túneles dobles acampanados chapados en oro rosa...',
 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png', 2, 1.9, 100),

('Disco duro externo portátil WD 2TB Elements - USB 3.0', 64,
 'Compatibilidad USB 3.0 y USB 2.0, transferencias rápidas de datos...',
 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png', 3, 3.3, 203),

('SanDisk SSD PLUS 1TB Interno - SATA III 6 Gb/s', 109,
 'Fácil actualización para un arranque más rápido...',
 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png', 3, 2.9, 470);
