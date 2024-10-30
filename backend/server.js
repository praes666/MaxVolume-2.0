const express = require('express');
const cors = require('cors');
const authModule = require('./components/auth')

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json())

app.use('/auth', authModule)

app.listen(PORT, () => {
    console.log(`Сервер работает на http://localhost:${PORT}`);
});