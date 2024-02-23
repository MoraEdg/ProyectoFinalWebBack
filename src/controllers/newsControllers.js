import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../database.js';
// isAdmin middleware
// ...

const newsController = express.Router();

// Endpoint para obtener todas las noticias
newsController.get('/news/all', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM news');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para crear una nueva noticia
newsController.post('/news', async (req, res) => {
  const { title, content, fecha, prioridad, user_id } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO news (title, content, fecha, prioridad, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, content, fecha, prioridad, user_id]
    );

    res.json({ id: result.insertId, message: 'Noticia creada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para actualizar una noticia por su ID
newsController.put('/news/:id', async (req, res) => {
  const newsId = req.params.id;
  const { title, content, fecha, prioridad, user_id } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE news SET title = ?, content = ?, fecha = ?, prioridad = ?, user_id = ? WHERE id = ?',
      [title, content, fecha, prioridad, user_id, newsId]
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'Noticia actualizada con éxito' });
    } else {
      res.status(404).json({ error: 'Noticia no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para eliminar una noticia por su ID
newsController.delete('/news/:id', async (req, res) => {
  const newsId = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM news WHERE id = ?', [newsId]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Noticia eliminada con éxito' });
    } else {
      res.status(404).json({ error: 'Noticia no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default newsController;
