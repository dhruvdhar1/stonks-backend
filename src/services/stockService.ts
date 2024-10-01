import { BroadcastStream, Session } from "event-flare"
import {Request, Response} from "express"
import { DefaultApi, Quote } from "finnhub-ts"
import yahooFinance from "yahoo-finance2"
import { historicalDataDeserializer } from "../utils/historicalDataDeserializer"

const TEST_MODE = false

interface ISubscription {
    prevQuote: Quote & {date?: Date},
    broadcastStream: BroadcastStream
}

const fetchQuote = async (symbol: string) => {
    const quoteRes = await finnhubClient.quote(symbol)
    return quoteRes.data
}

const finnhubClient = new DefaultApi({
    apiKey: 'crqs89hr01qq1umo1hvgcrqs89hr01qq1umo1i00', //todo: relocate
    isJsonMime: (input) => {
      try {
        JSON.parse(input)
        return true
      } catch (error) {}
      return false
    },
})

setInterval(async () => {
    for(const [symbol, subscription] of subscriptions) {
        const prevQuote: Quote = subscription.prevQuote
        const currQuote = await fetchQuote(symbol)
        if(TEST_MODE || prevQuote.c !== currQuote.c) {
            const date = new Date()
            const broadcastStream = subscription.broadcastStream
            subscription.prevQuote = {
                ...currQuote,
                date
            }
            broadcastStream.broadcastAll(JSON.stringify(subscription.prevQuote))
        }
    }
}, 15000)

const subscriptions:Map<string, ISubscription> = new Map()

export const subscribeStockQuote = async (req: Request, res: Response) => {
    try {
        const symbol = req.params["symbol"]
        if(!symbol) {
            res.status(400).send("invalid")
        }
        const symbolFormatted = symbol.toUpperCase()
        const session = new Session(req, res)
        if(!subscriptions.has(symbolFormatted)) {
            const quote = await fetchQuote(symbolFormatted)
            const date = new Date()
            const symBroadcastChannel = new BroadcastStream(symbolFormatted)
            subscriptions.set(symbolFormatted, {
                prevQuote: {
                    ...quote,
                    date
                },
                broadcastStream: symBroadcastChannel
            })
        }
        subscriptions.get(symbolFormatted)?.broadcastStream.register(session)
        session.sendMessage("ok")
    } catch(err) {
        res.status(500).send("something went wrong!")
    }

}

export const getHistoricalQuotes = async (req: Request, res: Response) => {
    console.log("request received...")
    const params = req.query
    const from = String(params.from!)
    const interval: '1m' | '1h' | '1d' = String(params.interval!) as '1m' | '1h' | '1d'
    const symbol = req.params["symbol"]
    if(!symbol) {
        res.status(400).send("invalid symbol")
        return
    }
    if(!from || !interval) {
        res.status(400).send("Invalid or missing fields")
        return
    }
    const queryOptions = { period1: from, interval: interval};
    const result = await yahooFinance.chart(symbol, queryOptions);
    const quotes = result.quotes
    if(quotes.length > 10) {
        const latest10 = quotes.slice(quotes.length - 10)
        const reformattedData = historicalDataDeserializer(latest10)
        res.status(200).json(reformattedData)
        return
    }
    const reformattedData = historicalDataDeserializer(result.quotes)
    res.status(200).json(reformattedData)
}