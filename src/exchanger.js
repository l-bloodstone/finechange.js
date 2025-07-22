//          ╭─────────────────────────────────────────────────────────╮
//          │ Author:     L-BloodStone                                │
//          │ Email:      lucas.bloodstone@outlook.com                │
//          ╰─────────────────────────────────────────────────────────╯

import XAmount from "./xamount.js";

export default class Exchanger {
    constructor(exchangeRates, xamount){
        this.exchangeRates = exchangeRates
        this.xamount = xamount
    }

    __generateNewExchangeRate(baseCurrency, exchangeRates) {
        const newExchangeRate = { }
        for (const currency in exchangeRates) {
            if (currency === baseCurrency) {
                continue
            }
            newExchangeRate[currency] = exchangeRates[currency] / exchangeRates[baseCurrency]
        }
        newExchangeRate[baseCurrency] = 1
        return newExchangeRate
    }

    exchange(targetCurrency) {
        let targetCurrencyRate = 0
        if (this.exchangeRates.hasOwnProperty(targetCurrency)) {
            targetCurrencyRate = this.exchangeRates[targetCurrency]
        }
        if (targetCurrencyRate < 0 || targetCurrencyRate === 0) {
            throw Error("[ERROR] Exchange rate can not be negative or zero")
        }
        const amount = Math.round(this.xamount.amount * targetCurrencyRate)
        return new XAmount().fromCents(amount)
            .initExchanger(this.__generateNewExchangeRate(targetCurrency, this.exchangeRates))
    }
}
