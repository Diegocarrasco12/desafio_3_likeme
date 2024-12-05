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
  user: "postgres", 
  host: "localhost",
  database: "likeme",
  password: "123456", 
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

// Ruta para agregar LIKES
app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [id]);
    res.send("Like registrado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el like");
  }
});

// Ruta para eliminar un posts
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.send("Post eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el post");
  }
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
