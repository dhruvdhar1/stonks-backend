import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { rootRouter } from "./routes/rootRouter"

const PORT = 80

const app = express()
app.use(bodyParser.json())
// const corsOptions = {
//     credentials: true,
//     origin: [
//         'http://localhost:3000',
//         'http://localhost:80',
//         'http://10.0.0.133:3000'
//     ] // Whitelist the domains you want to allow
// };

app.use(cors());
app.use(rootRouter)
app.get('/', (req, res) => {
    console.log("request received...")
    res.send("It works!!")
})
app.listen(PORT, () => {
    console.log('app started...')
})
app.on("error", (err) => {
    console.error("Fatal error encountered!: ", err)
})

