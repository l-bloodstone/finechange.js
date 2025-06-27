export default class Exchanger {
    constructor(exchangeRates, xamount){
        this.exchangeRates = exchangeRates
        this.xamount = xamount
    }

    exchange(targetCurrency) {
        let targetCurrencyRate = 0
        if (this.exchangeRates.hasOwnProperty(targetCurrency)) {
            targetCurrencyRate = this.exchangeRates[targetCurrency]
        }
        if (targetCurrencyRate < 0 || targetCurrencyRate === 0) {
            throw Error("[ERROR] Exchange rate can not be negative or zero")
        }
        const amount = parseInt(this.xamount.amount * targetCurrencyRate)
        return (amount / 100)
    }
}
