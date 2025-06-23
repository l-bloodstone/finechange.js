const defaultOptions = {
    symbol: "$",
    separator: ",",
    decimal: "."
}

export default class Formatter {
    constructor(xamount, options) {
        this.xamountFloat = xamount.toString()
        this.dollar = xamount.dollar
        this.cents = this.xamountFloat.split(".")[1]

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
    }

    __separateDollar() {

    }

    format() {
        return `${this.options.symbol}${this.dollar}${this.options.decimal}${this.cents}`
    }
}
