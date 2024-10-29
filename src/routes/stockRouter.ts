import express from "express"
import { getHistoricalQuotes, getLatestQuote, getStockSymbolSuggesstions, subscribeStockQuote } from "../services/stockService"

const stockRouter = express.Router()

stockRouter.get('/quote/subscribe/:symbol', subscribeStockQuote)
stockRouter.get('/quote/history/:symbol', getHistoricalQuotes)
stockRouter.get('/lookup/:searchTerm', getStockSymbolSuggesstions)
stockRouter.get('/quote/current/:symbol', getLatestQuote)

export default stockRouter