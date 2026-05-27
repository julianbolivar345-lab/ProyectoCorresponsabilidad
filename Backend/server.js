const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

const SECRET = 'clave_secreta_sena';

// Base de datos simulada en memoria
let usuarios = [];
let intentosFallidos = {};

// REGISTRO
app.post('/api/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    return res.status(400).json({ error: 'El email ya está registrado' });
  }

  const hash = await bcrypt.hash(password, 10);
  usuarios.push({ nombre, email, password: hash });

  res.json({ mensaje: 'Usuario registrado exitosamente' });
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Verificar bloqueo
  if (intentosFallidos[email] >= 3) {
    return res.status(403).json({ error: 'Cuenta bloqueada por 3 intentos fallidos' });
  }

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    intentosFallidos[email] = (intentosFallidos[email] || 0) + 1;
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) {
    intentosFallidos[email] = (intentosFallidos[email] || 0) + 1;
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  // Login exitoso
  intentosFallidos[email] = 0;
  const token = jwt.sign({ email: usuario.email }, SECRET, { expiresIn: '1h' });
  res.json({ mensaje: 'Login exitoso', token });
});

// OLVIDÉ CONTRASEÑA
app.post('/api/olvide-password', (req, res) => {
  const { email } = req.body;
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(404).json({ error: 'Email no encontrado' });
  }
  res.json({ mensaje: `Se enviaría un correo de recuperación a ${email}`});
});

app.listen(3000, () => {
  console.log('Backend corriendo en http://localhost:3000');
});