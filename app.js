import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import path from "path"

import reservaRoutes from "./src/routes/reservaRoutes.js"
import clientsRoutes from "./src/routes/clientsRoutes.js"

const app = express()

const corsOptions = {
  origin: [
    'http://localhost:4000', 'https://api-rest-bl9i.onrender.com/'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./student-f19-reservasAPI-1.0.0-resolved.json"), "utf-8")
)


app.use(cors(corsOptions))
app.use(express.json())


app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/api/reservas", reservaRoutes)
app.use("/api/clients", clientsRoutes)

export default app