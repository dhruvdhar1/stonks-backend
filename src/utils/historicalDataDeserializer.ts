export const historicalDataDeserializer = (data:any[]=[]) => {
    const res = data.map((quote: any) => {
        return {
            date: quote.date,
            cost: quote.close?.toFixed(2),
            high: quote.high?.toFixed(2),
            low: quote.low?.toFixed(2),
            open: quote.open?.toFixed(2),
            volume: quote.volume,
            adjClose: quote.adjClose
        }
    })
    return res
}