export const historicalDataDeserializer = (data:any[]=[]) => {
    const res = data.map((quote: any) => {
        return {
            date: quote.date,
            cost: quote.close
        }
    })
    return res
}