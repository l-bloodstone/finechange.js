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
            this.amount = Math.round(amount * 100)
            this.dollar = parseInt(this.amount / 100)
            this.cents = this.amount % 100
        }
        this.discounted = false
    }

    fromCents(cents) {
        this.dollar = parseInt(cents / 100)
        this.cents = cents % 100
        this.amount = cents
        return this
    }

    __sanityCheck(amount){
        if (Number.isNaN(amount)) {
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
            amt = Math.round(amount * 100)
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
            amt = Math.round(amount * 100)
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
            amt = Math.round(amount * 100)
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
            amt = this.parse(amount).amount
        } else {
            amt = Math.round(amount * 100)
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
        const regx = /(-?)\$?(-?)(\d*\.?\d*)?/
        const [, sign, sign1, number] = regx.exec(str)
        if (!number) {
            throw Error('Invalid String format. Acceptable - ($20.99, -$20.99, 20.99, -20.99)')
        }
        let amount = Math.round(Number(number) * 100)
        if (sign || sign1 && amount > 0) {
            amount = -amount
        }
        const dollar = parseInt(amount / 100)
        const cents = parseInt(amount % 100)
        return {dollar, cents, amount}
    }
}
