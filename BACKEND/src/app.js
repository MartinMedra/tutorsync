import express from "express";
import auth from "./routes/auth.js";
import disponibilidad from "./routes/disponibilidad.js";
import cita from "./routes/cita.js";
import ticket from "./routes/ticket.js";
import 'dotenv/config';

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("app funcionando correctamente");
});

app.use("/", auth);
app.use("/", disponibilidad);
app.use("/", cita);
app.use("/", ticket);

app.listen(3000);
console.log("Server on port", 3000);
