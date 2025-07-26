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
            const {amount: a} = this.parse(amount)
            this.amount = a
        } else {
            this.amount = Math.round(amount * 100)
        }
        this.discounted = false
    }

    getDollars() {
        return parseInt(this.amount / 100)
    }

    getCents() {
        return this.amount % 100
    }

    fromCents(cents) {
        if (!Number.isInteger(cents)){
            throw Error("[ERROR] Cents sould be an Integer")
        }
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
        this.amount = amount
    }

    getAmount(){
        return this.amount / 100
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
        this.amount = Math.round(amt / 100)
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
        this.amount = Math.round(amt * 100)
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
        if ((sign || sign1) && amount > 0) {
            amount = -amount
        }
        const dollars = parseInt(amount / 100)
        const cents = parseInt(amount % 100)
        return {dollars: dollars, cents, amount}
    }
}
