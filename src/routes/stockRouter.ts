import express from "express"
import { getHistoricalQuotes, getStockSymbolSuggesstions, subscribeStockQuote } from "../services/stockService"

const stockRouter = express.Router()

stockRouter.get('/quote/subscribe/:symbol', subscribeStockQuote)
stockRouter.get('/quote/history/:symbol', getHistoricalQuotes)
stockRouter.get('/lookup/:searchTerm', getStockSymbolSuggesstions)

export default stockRouter