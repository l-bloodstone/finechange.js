//          ╭─────────────────────────────────────────────────────────╮
//          │ Author:     L-BloodStone                                │
//          │ Email:      lucas.bloodstone@outlook.com                │
//          ╰─────────────────────────────────────────────────────────╯

import Exchanger from "./exchanger.js"
import Formatter from "./formatter.js"

export default class XAmount {
    constructor(amount = 0) {
        this.__sanityCheck(amount)
        if (typeof amount === "string") {
            const {dollar: d, cents: c, amount: a} = this.parse(amount)
            this.dollar = d
            this.cents = c
            this.amount = a
        } else {
            this.dollar = parseInt(amount)
            this.cents = parseInt(amount * 100) % 100
            this.amount = amount * 100
        }
        this.discounted = false
        this.exchanger = {}
    }

    fromCents(cents) {
        this.dollar = parseInt(cents / 100)
        this.cents = parseInt(cents % 100)
        this.amount = cents
        return this
    }

    __sanityCheck(amount){
        if (!Number(amount) === amount) {
            if (typeof amount !== 'string') {
                throw Error("Parameters should be Integers or a string")
            }
        }
    }

    initExchanger(exchangeRates){
        this.exchanger = new Exchanger(exchangeRates, this)
        return this
    }

    exchange(exchageTarget) {
        return this.exchanger.exchange(exchageTarget)
    }

    __updateCurrentAmount(amount){
        this.dollar = parseInt(amount/100)
        this.cents = parseInt(amount % 100)
        this.amount = amount
    }

    getAmount(){
        return (this.dollar) + (this.cents / 100)
    }

    getAmountInCents(){
        return this.amount
    }

    toString(){
        return this.getAmount().toFixed(2)
    }

    format(options){
        const fmt = new Formatter(this, options)
        return fmt.format()
    }

    add(amount = 0){
        this.__sanityCheck(amount)
        let amt = 0
        if (typeof amount === 'string') {
            amt = this.parse(amount).amount
        } else {
            amt = parseInt(amount * 100)
        }
        this.__updateCurrentAmount(this.amount + amt)
        return this
    }

    sub(amount = 0){
        this.__sanityCheck(amount)
        let amt = 0
        if (typeof amount === 'string') {
            amt = this.parse(amount).amount
        } else {
            amt = parseInt(amount * 100)
        }
        this.__updateCurrentAmount(this.amount - amt)
        return this
    }

    mul(amount = 0){
        this.__sanityCheck(amount)
        let amt = 0
        if (typeof amount === 'string') {
            amt = this.parse(amount).amount
        } else {
            amt = parseInt(amount * 100)
        }
        amt = this.amount * amt
        this.dollar = parseInt(amt / 10000)
        this.cents = Math.round((amt % 10000) / 100)
        this.amount = this.dollar * 100 + this.cents
        return this
    }

    div(amount = 0) {
        this.__sanityCheck(amount)
        let amt = 0
        if (typeof amount === 'string') {
            amount = this.parse(amount).amount
        } else {
            amt = parseInt(amount * 100)
        }
        if (amt === 0 || this.amount === 0) {
            throw Error("Can't divide by 'zero'")
        }
        amt = this.amount / amt
        this.dollar = parseInt(amt)
        this.cents = Math.round((amt * 100) % 100)
        this.amount = this.dollar * 100 + this.cents
        return this
    }

    applyDiscount(disPercent) {
        const discount = this.amount - Math.round((this.amount * disPercent) / 100)
        this.__updateCurrentAmount(discount)
        this.discounted = true
        return this.getAmount()
    }

    getDiscount(disPercent) {
        const discount = this.amount - Math.round((this.amount * disPercent) / 100)
        return discount / 100
    }

    parse(str) {
        const regx = /(-)?.?(-)?(\d*)\.?(\d{0,2})/
        let [, sign0, sign1, dollar, cents] = regx.exec(str)
        if (dollar === "" && cents === "") {
            throw Error("[ERROR] Invalid string format. Acceptable: ('$20.50', '-$20.50, '20.50', '-20.50')")
        }
        if (cents.length !== 2) {
            cents += "0"
        }
        dollar = Number(dollar)
        cents = Number(cents)
        if (sign1 === "-" || sign0 === "-") {
            cents = -cents
            dollar = -dollar
        }
        const amount = dollar * 100 + cents
        return {dollar, cents, amount}
    }
}
