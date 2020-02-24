const express = require('express');

const app = express();

app.get('/', (req, res) => res.send("API Runninng"))

const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`Serwer starter on port: ${port}`) })