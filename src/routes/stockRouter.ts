import express from "express"
import { getHistoricalQuotes, subscribeStockQuote } from "../services/stockService"

const stockRouter = express.Router()

stockRouter.get('/quote/subscribe/:symbol', subscribeStockQuote)
stockRouter.get('/quote/history/:symbol', getHistoricalQuotes)

export default stockRouter