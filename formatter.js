const defaultOptions = {
    symbol: "$",
    separator: " ",
    decimal: "."
}

export default class Formatter {
    constructor(xamount, options) {
        this.xamountFloat = xamount.toString()
        this.dollar = xamount.dollar
        this.cents = this.xamountFloat.split(".")[1]
        this.amount = xamount.amount
        if (options) {
            this.options = options
            for (const op in defaultOptions) {
                if (!options.hasOwnProperty(op)) {
                    options[op] = defaultOptions[op]
                }
            }
        } else {
            this.options = defaultOptions
        }
        this.formatString = `${this.options.symbol}${this.__formatDollar()}${this.options.decimal}${this.cents}`
    }

    __abs(num) {
        if (num < 0) {
            return -num
        }
        return num
    }

    __formatDollar(){
        let formattedDollar = ""
        const dollarString = this.__abs(this.dollar).toString()
        if (dollarString.length <= 3) {
            return dollarString
        }
        let count = 0
        for (let i = dollarString.length - 1; i >= 0; i--) {
            if (count % 3 === 0 && count !== 0) {
                formattedDollar = dollarString[i] + this.options.separator + formattedDollar
            } else {
                formattedDollar = dollarString[i] + formattedDollar
            }
            count++
        }
        return formattedDollar
    }

    format(){
        if (this.amount < 0) {
            this.formatString = "-" + this.formatString
        }
        return this.formatString
    }
}
