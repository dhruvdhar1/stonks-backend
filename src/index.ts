import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { rootRouter } from "./routes/rootRouter"

const PORT = 8000

const app = express()
app.use(bodyParser.json())
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80', 'http://10.0.0.133:3000'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions));
app.use(rootRouter)
app.listen(PORT, () => {
    console.log('app started...')
})
app.on("error", (err) => {
    console.error("Fatal error encountered!: ", err)
})

