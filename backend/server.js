const express = require('express');
const cors = require('cors');
const bodyPasres = require('body-parser')
const db = require('./config/db')
const authRoutes = require('./routes/auth')

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/message', (req, res) => {
    res.json({ message: 'Привет от бэкенда!' });
});

app.listen(PORT, () => {
    console.log(`Сервер работает на http://localhost:${PORT}`);
});