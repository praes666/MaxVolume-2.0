const express = require('express');
const cors = require('cors');
const authModule = require('./components/auth')
const musicModule = require('./components/music')

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json())

app.use('/auth', authModule)
app.use('/music', musicModule)

app.listen(PORT, () => {
    console.log(`Сервер работает на http://localhost:${PORT}`);
});