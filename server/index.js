import express from "express";
import cors from "cors";
import _ from "./env.js";
import authRouter from "./routers/auth-router.js";

// Configuración del servidor
const app = express();
app.use(cors());
app.use(express.json());
const port = 4700;

// Configuración de routers
app.use('/auth', authRouter);

// Ruta inicial
app.get("/", async (req, res) => {
    res.send("Hola, estoy sirviendo :)");
});

// Configuraciones adicionales
app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});