# 🏪 HF Solutions App - Full Stack (Vite + Node + PostgreSQL + Docker)

Este proyecto es un **ejemplo completo** de aplicación web con **frontend (Vite + React)**, **backend (Node.js + Express)** y **base de datos PostgreSQL**, todo orquestado con **Docker Compose**.

El objetivo de este proyecto es servir como **prueba técnica** o **demostración de arquitectura** moderna para entrevistas o evaluación de habilidades Full Stack.

# IMPORTANTE

Este proyecto al ser de muestra no posee mecanismos de identificación.

---

## 📁 Estructura del Proyecto

hf-solutions/
│
├── backend/ # API con Node.js, Express y PostgreSQL
│ ├── Dockerfile
│ ├── package.json
| ├── server.js ← Express API server
│ ├── .env # Variables del backend (no confidenciales)
│ └── init.sql # Script de inicialización de la base de datos
│
├── frontend/ # Interfaz en React con Vite
│ ├── Dockerfile
│ ├── package.json
│ └── src/
│
├── docker-compose.yml
└── README.md

---

## ⚙️ Requisitos Previos

Asegúrate de tener instalados:

- 🐳 [Docker](https://www.docker.com/)
- 🐙 [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) Node.js 18+ si deseas correr partes localmente sin Docker

---

## 🚀 Levantar la Aplicación

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/matiastraub/hfsolutions.git
cd hfsolutions
```

2️⃣ Construir e Iniciar los Servicios

```bash
docker compose up -d --build
```

Ejecuta en la raíz del proyecto:

### 🧪 Acceso y Verificación

🌐 Frontend: http://localhost:3000

🔗 Backend API: http://localhost:5000/api/v1/products

🐘 PostgreSQL: conectado internamente a través de postgres://postgres:postgres@postgres:5432/productos_db

### 🧰 Notas Técnicas

El frontend usa Vite y genera la carpeta /dist en el proceso de build.

En producción dentro del contenedor, se sirve con serve -s dist -l 3000.

El backend usa Express y una capa de servicio (productService) para manejar operaciones CRUD.

El proyecto fue pensado para ser simple pero representativo de una app moderna con separación de responsabilidades.

## 🧑‍💻 Autor

Matías Traub
Desarrollador Full Stack
📧 matias.traub@hec.ca
🌐 https://halo.cl

## 📄 Licencia

Este proyecto es libre para fines de evaluación y demostración técnica.
No contiene información sensible ni credenciales privadas.
