const express = require('express');
const mongoose = require('mongoose');

const app = express();


const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`Server is runnign on port: ${PORT}`) })