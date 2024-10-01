import express from "express"
import stockRouter from "./stockRouter"

export const rootRouter = express.Router()
rootRouter.use(stockRouter)