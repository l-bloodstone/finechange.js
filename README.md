# finechange.js
### A simple package for currency operations.
---

Floating Point operations are error-prone due to how it is implemented. In most of the modern programming languages `IEEE 754` standard is used inlcuding JavaScript and Node. A good way to calculate fractional amount of any currency is to use only integers to calculate. This package is written to deal with this problem.

### Features
* Decimal Currency(100cents/dollar) and No-Decimal Currency
* Basic Operations
* Getting a discounted amount
* Exchance from one currency to another based on user provided Exchange Rate.

### Installation
This package is not in the `npm` package registry. So, you have to use this git repo to install it in your projects.

```sh
npm install https://github.com/l-bloodstone/finechange.js
```

## Usage
This package sums up to a single class `XAmount`. Other classes are used as helper classes. **Feel free to `fork` it and extend it to your needs.**

### `XAmount` class

**WARNING:** The precision is always set at 2 digits. Anything more than that will be rounded.

```js
	// new XAmount([<integer> | <float> | <string>])
	const productPrice = new XAmount( 199.99 )
```
The first parameter is the `dollar` part and the second is `cents`. You can also use a string as a parameter.
```js
	// new XAmount(<string>)
	const productPrice = new XAmount("199.99")
```

### `add(), sub(), mul(), div()` methods
**returns the class instance for method chaining.**
```js
	const productPrice = new XAmount( 123.45 )
	productPrice.add(20.49)			// returns the object which is now 143.94
	productPrice.sub(43.94).mul(3)	// methods can be chained, now productPrice is 300
	productPrice.div(50).getAmount()	// 6.00
```

### `getAmount(), getDollars(), getCents()`
```js
	const pd = new XAmount("799.548").getAmount()	// 799.55
	pd.getDollars() 		// 799
	pd.getCents()		// 55
```

### `format(<options>)` returns a formated `string`
available options:
- `separator` default: "[space]"
- `decimal` default: "."
- `symbol` default: "$"

```js
	pd.format()	// "$799.55"
	const loan = new XAmount(150000.71).format()	// "$150 000.71"
	loan.format({separator: ","})		// "$150,000.71"
```

### `initExchanger(<exchange_rate>), exchange(<currency_name>)`
**exchange rate must be relative to the current currency** If the current currency is USD then exchange rate object would be `{cad: 1.37}` 1USD to CAD = 1.37.
```js
	const homePrice = new XAmount(340700).initExchanger({cad: 1.37})
	homePrice.getAmount()	// 340700 USD
	homePrice.exchange("cad").getAmount()		// 466759 CAD
```

### `fromCents(<integer>)`
**`fromCents()` always overwrite the class constructor.**
```js
	const p = new XAmount().fromCents(200)		// 200 cents = $2
	p.getAmount() 	// 2
```