import express  from "express";
import productRouter from "./routes/api/products";
import commentRouter from "./routes/api/comments";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express();
app.use(cors(options));

app.use(express.json());

app.use("/api/product", productRouter);
app.use("/api/comment", commentRouter)

app.get('/', function (_req, res) {
    return res.send("Funcionandooo")
})


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API endpoints documentation',
    },
  },
  apis: ['./src/routes/api/*.ts'], 
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app;