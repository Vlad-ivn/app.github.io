const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/fetchDocument', async (req, res) => {
  try {
    const response = await fetch('https://github.com/Vlad-ivn/app.github.io/raw/f904010fcd7ff086593215960c898e747b304188/4.docx');
    const data = await response.arrayBuffer();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка при отриманні документа');
  }
});

app.listen(3000, () => {
  console.log('Проксі-сервер запущено на порту 3000');
});
