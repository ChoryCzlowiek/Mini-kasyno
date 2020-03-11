const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.listen(5500, '127.0.0.1');

app.get('/contact', (req, res) => {
    console.log('gowno')
})