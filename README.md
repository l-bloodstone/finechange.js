# finechange.js
### A simple package for currency operations.
---

Floating Point operation is error-prone due to how it is implemented. In most of the modern programming languages `IEEE 754` standard is used. In node when  `2.80 + 2.14` shows `4.9399999999999995` which is clearly wrong. It is not a good way to calculate fractional amount of any currency. This package is written to deal with this problem.

### Features
* Decimal Currency(100cents/dollar) and No-Decimal Currency
* Basic Operations
* Getting a discounted amount
* Exchance from one currency to another based on user provided Exchange Rate.

### Installation
This package is not in the `npm` package registry. So, you have to use this git repo to install install it in your projects.

```sh
npm install https://github.com/l-bloodstone/finechange.js
```

## Usage
This package sums up to a single class `XAmount`. Other classes are used as helper classes. **Feel free to `fork` it and extend it to your needs.**

### `XAmount` class

**WARNING:** always pass the `cents` part with two digits, like `2.50`. If you pass `2.5` it will be parsed as `2 dollar, 05 cents`.

```js
	// new XAmount(<integer>, <interger>)

	const productPrice = new XAmount( 199, 99 )
```
The first parameter is the `dollar` part and the second is `cents`. You can also use a string as a parameter.
```js
	// new XAmount(<string>)

	const productPrice = new XAmount("199.99")
```

**WARNING:** always pass the `cents` part with two digits, like `2.50`. If you pass `2.5` it will be parsed as `2 dollar, 05 cents`.

`2.50 	= 2 dollar, 50 cents`

`2.05 	= 2 dollar, 05 cents`

`99.9 	= 99 dollar, 09 cents`

`99.99	= 99 dollar, 99 cents`

### `add(), sub(), mul(), div()` methods
