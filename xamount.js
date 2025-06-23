import Formatter from "./formatter.js"

export default class XAmount {

    constructor(dollar, cents = 0) {
        if (!Number.isInteger(dollar) || !Number.isInteger(cents)) {
            throw Error("Parameters should be Integers")
        }
        if (cents > 99) {
            throw Error("Cent can not be more than 99")
        }
        this.dollar = dollar
        this.cents = cents
        if (!cents) {
            this.dollar = parseInt(dollar / 100)
            this.cents = dollar % 100
        }
        this.amount = this.dollar + this.cents

    }

    getAmount() {
        return this.amount
    }

    getAmountFloat() {
        return this.dollar + (this.cents / 100)
    }

    toString() {
        return this.getAmountFloat().toFixed(2)
    }

    format(options) {
        const fmt = new Formatter(this, options)
        return fmt.format()
    }
}

// for (let i = 0; i < 100; i++) {
//     const usd = new XAmount(i, i)
//     console.log(usd.toString())
//     console.log(usd.getAmountFloat())
// }
const pd = new XAmount(20,4)
console.log(pd.format({}))
