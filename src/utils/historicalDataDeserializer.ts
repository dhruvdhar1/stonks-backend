export const historicalDataDeserializer = (data:any[]=[]) => {
    const res = data.map((quote: any) => {
        return {
            date: quote.date,
            cost: quote.close?.toFixed(2)
        }
    })
    return res
}