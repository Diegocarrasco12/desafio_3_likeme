const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Configurar conexión a PostgreSQL
const pool = new Pool({
  user: "postgres", // Reemplaza con tu usuario de PostgreSQL
  host: "localhost",
  database: "likeme",
  password: "123456", // Reemplaza con tu contraseña
  port: 5432,
});

// Ruta GET para obtener los posts
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta POST para agregar un nuevo post
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  try {
    await pool.query(
      "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)",
      [titulo, img, descripcion]
    );
    res.status(201).send("Post creado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
