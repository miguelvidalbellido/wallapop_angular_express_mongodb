require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const connectDB = require('../config/dbConnect');
const mongoose = require('mongoose');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


connectDB();  // Connect to MongoDB

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

const options = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'API "wallapop" con Express + MongoDB + Mongoose + JWT + Swagger',
        version: '1.0.0',
        description: 'Documentación de la API de wallapop para el primer proyecto de segundo de DAW en el Ies Ontinyent.'
      },

      contact: {
        dev: 'Miguel Vidal',
        dev: 'Johan Villa'
      },
    },
    apis: ['./routes/*.js'], 
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// comment routes
app.use('/api/products', require('../routes/productRoutes'));   // Products
app.use('/api/categories', require('../routes/categoriesRoutes'));   // Categories
app.use('/api/carousel', require('../routes/carouselRoutes'));   // Carousel
app.use('/api/users', require('../routes/usersRoutes'));   // Users
app.use('/api/comments', require('../routes/commentsRoutes'));   // Products

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