import express from "express";
import _ from "./env.js";
import authRouter from "./routers/auth-router.js";

// Configuración del servidor
const app = express();

// Configuración de routers
app.use('/auth', authRouter);

// Ruta inicial
app.get("/", async (req, res) => {
    res.send("Hola, estoy sirviendo :)");
});

// Configuraciones adicionales
app.listen(process.env.PORT, () => {
    console.log(`Corriendo en el puerto ${process.env.PORT}`);
});