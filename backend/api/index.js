require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const connectDB = require('../config/dbConnect');
const mongoose = require('mongoose');

connectDB();

app.use(cors(corsOptions));
app.use(express.json()); // middleware to parse json

// comment routes
app.use('/api/products', require('../routes/productRoutes'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})

module.exports = app;