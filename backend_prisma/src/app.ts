import express  from "express";
import productRouter from "./routes/api/products";
import commentRouter from "./routes/api/comments";

const app = express();

app.use(express.json());

app.use("/api/product", productRouter);
app.use("/api/comment", commentRouter)

app.get('/', function (_req, res) {
    return res.send("Funcionandooo")
})

export default app;