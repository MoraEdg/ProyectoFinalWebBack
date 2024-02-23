import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../database.js';
import isAdmin from '../middlewares/authMiddleware.js';

const userController = express.Router();

// Endpoint para obtener todos los usuarios con el rol 'Client'
userController.get('/clients/all', isAdmin, async (req, res) => {
  try {
    // Realiza una consulta a la base de datos para obtener usuarios con el rol 'Client'
    const [rows] = await pool.query('SELECT id, username, role, name FROM users WHERE role <> ?', ['admin']);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


// Endpoint para actualizar un usuario por su ID
userController.put('/users/:id', isAdmin, async (req, res) => {
  const userId = req.params.id;
  const { username, password, name, role } = req.body;

  try {
    // Verificar si el usuario existe
    const [existingUser] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Realizar la actualización del usuario
    await pool.query(
      'UPDATE users SET username = ?, password = ?, name = ?, role = ? WHERE id = ?',
      [username, password, name, role, userId]
    );

    res.json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para eliminar un usuario por su ID
userController.delete('/users/:id', isAdmin, async (req, res) => {
  const userId = req.params.id;
  try {
    // Realiza una consulta para eliminar el usuario con el ID proporcionado
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Usuario eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default userController;