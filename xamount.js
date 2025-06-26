import Formatter from "./formatter.js"

export default class XAmount {
    constructor(dollar = 0, cents = 0) {
        if (!Number.isInteger(dollar) || !Number.isInteger(cents)) {
            if (typeof dollar !== 'string') {
                throw Error("Parameters should be Integers or a string")
            }
        }
        if (cents > 99 && cents < 0) {
            throw Error("Cents can not be larger than 99 or be negative")
        }
        if (typeof dollar === "string") {
            this.parse(dollar)
        } else {
            this.dollar = dollar
            this.cents = cents
            this.amount = this.dollar * 100 + this.cents
            this.discounted = false
        }
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
        if (cents > 99 && cents < 0) {
            throw Error("Cents can not be larger than 99 or be negative")
        }
        if (!Number.isInteger(dollar) || !Number.isInteger(cents)) {
            throw Error("Parameters should be Integers")
        }
        if (dollar < 0) {
            cents = -cents
        }
        const amount = dollar * 100 + cents
        this.__updateCurrentAmount(this.amount + amount)
        return this
    }

    sub(dollar = 0, cents = 0){
        if (cents > 99 && cents < 0) {
            throw Error("Cents can not be larger than 99 or be negative")
        }
        if (!Number.isInteger(dollar) || !Number.isInteger(cents)) {
            throw Error("Parameters should be Integers")
        }
        if (dollar < 0) {
            cents = -cents
        }
        const amount = dollar * 100 + cents
        this.__updateCurrentAmount(this.amount - amount)
        return this
    }

    mul(dollar = 0, cents = 0){
        if (cents > 99 && cents < 0) {
            throw Error("Cents can not be larger than 99 or be negative")
        }
        if (!Number.isInteger(dollar) || !Number.isInteger(cents)) {
            throw Error("Parameters should be Integers")
        }
        if (dollar < 0) {
            cents = -cents
        }
        let amount = dollar * 100 + cents
        amount = this.amount * amount
        this.dollar = parseInt(amount / 10000)
        this.cents = parseInt((amount % 10000) / 100)
        this.amount = this.dollar * 100 + this.cents
        return this
    }

    div(dollar = 0, cents = 0) {
        if (cents > 99 && cents < 0) {
            throw Error("Cents can not be larger than 99 or be negative")
        }
        if (!Number.isInteger(dollar) || !Number.isInteger(cents)) {
            throw Error("Parameters should be Integers")
        }
        if (dollar < 0) {
            cents = -cents
        }
        let amount = (dollar * 100) + cents
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
        let parsedNumber = Number(str)
        if (isNaN(parsedNumber)) {
            throw Error(`Could not parse the string.`)
        }
        parsedNumber *= 100
        this.dollar = parseInt(parsedNumber / 100)
        this.cents = parseInt(parsedNumber % 100)
        this.amount = parseInt(parsedNumber)
        return this
    }
}
