//          ╭─────────────────────────────────────────────────────────╮
//          │ Author:     L-BloodStone                                │
//          │ Email:      lucas.bloodstone@outlook.com                │
//          ╰─────────────────────────────────────────────────────────╯

import Exchanger from "./exchanger.js"
import Formatter from "./formatter.js"

export default class XAmount {
    constructor(dollar = 0, cents = 0) {
        this.__sanityCheck(dollar, cents)
        if (dollar < 0) {
            cents = -cents
        }
        if (typeof dollar === "string") {
            const {dollar: d, cents: c, amount: a} = this.parse(dollar)
            this.dollar = d
            this.cents = c
            this.amount = a
        } else {
            this.dollar = dollar
            this.cents = cents
            this.amount = this.dollar * 100 + this.cents
            this.discounted = false
            this.exchanger = {}
        }
    }

    __sanityCheck(dollar, cents){
        if (!Number.isInteger(dollar) || !Number.isInteger(cents)) {
            if (typeof dollar !== 'string') {
                throw Error("Parameters should be Integers or a string")
            }
        }
        if (cents > 99 && cents < 0) {
            throw Error("Cents can not be larger than 99 or be negative")
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

    add(dollar = 0, cents = 0){
        this.__sanityCheck(dollar, cents)
        if (dollar < 0) {
            cents = -cents
        }
        let amount = 0
        if (typeof dollar === 'string') {
            amount = parseInt(this.parse(dollar).amount)
        } else {
            amount = (dollar * 100) + cents
        }
        this.__updateCurrentAmount(this.amount + amount)
        return this
    }

    sub(dollar = 0, cents = 0){
        this.__sanityCheck(dollar, cents)
        if (dollar < 0) {
            cents = -cents
        }
        let amount = 0
        if (typeof dollar === 'string') {
            amount = parseInt(this.parse(dollar).amount)
        } else {
            amount = (dollar * 100) + cents
        }
        this.__updateCurrentAmount(this.amount - amount)
        return this
    }

    mul(dollar = 0, cents = 0){
        this.__sanityCheck(dollar, cents)
        if (dollar < 0) {
            cents = -cents
        }
        let amount = 0
        if (typeof dollar === 'string') {
            amount = parseInt(this.parse(dollar).amount)
        } else {
            amount = (dollar * 100) + cents
        }
        amount = this.amount * amount
        this.dollar = parseInt(amount / 10000)
        this.cents = parseInt((amount % 10000) / 100)
        this.amount = this.dollar * 100 + this.cents
        return this
    }

    div(dollar = 0, cents = 0) {
        this.__sanityCheck(dollar, cents)
        if (dollar < 0) {
            cents = -cents
        }
        let amount = 0
        if (typeof dollar === 'string') {
            amount = parseInt(this.parse(dollar).amount)
        } else {
            amount = (dollar * 100) + cents
        }
        if (amount === 0) {
            throw Error("Can't divide by 'zero'")
        }
        amount = this.amount / amount
        this.dollar = parseInt(amount)
        this.cents = parseInt((amount * 100) % 100)
        this.amount = this.dollar * 100 + this.cents
        return this
    }

    discount(disPercent) {
        const discount = this.amount - parseInt((this.amount * disPercent) / 100)
        this.__updateCurrentAmount(discount)
        this.discounted = true
        return this.getAmount()
    }

    parse(str) {
        const regx = /\$?(-?\d*)\.?(\d{0,2})/
        let [, dollar, cents] = regx.exec(str)
        if (dollar === "" && cents === "") {
            throw Error("[ERROR] Invalid string format. Acceptable: ('$20.50', '20.50', '-20.50')")
        }
        dollar = Number(dollar)
        cents = Number(cents)
        if (dollar < 0) {
            cents = -cents
        }
        const amount = dollar * 100 + cents
        return {dollar, cents, amount}
    }
}
