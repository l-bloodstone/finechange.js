import {describe, it} from "node:test"
import assert from "node:assert/strict"

import XAmount from "../index.js"

describe("XAmount Constructor", ()=> {

    it("should not throw error while passing an integer", ()=> {
        assert.doesNotThrow(()=> {
            new XAmount(20)
        })
    })

    it("should not throw error while passing a valid string ($20.05)", ()=> {
        assert.doesNotThrow(()=> {
            new XAmount("$20.05")
        })
    })

    it("should throw an error while passing an invalid string (gothgirl)", ()=> {
        assert.throws(()=> {
            new XAmount("gothgirl")
        })
    })

    it("should give us dollar = 20 and cents = 05", ()=> {
        assert.deepEqual(new XAmount(20.05).dollar, 20)
        assert.deepEqual(new XAmount(20.05).cents, 5)
    })

    it("should parse `20.126` as 20 dollar 13 cents", () => {
        assert.equal(new XAmount("20.126").dollar, 20)
        assert.equal(new XAmount("20.126").cents, 13)
    })

    it("should parse the float with a round 123.456 => 123.46", ()=> {
        assert.equal(new XAmount(123.456).getAmount(), 123.46)
    })

})

describe("XAmount basic functions", ()=> {

    it("should add 123.45 and 20.05 and equal to 143.50", ()=> {
        assert.deepEqual(new XAmount(20.05).add(123.45).getAmount(), 143.50)
    })
    it("should subtract 123.45 and 20.05 and equal to 103.40", ()=> {
        assert.deepEqual(new XAmount(123.45).sub(20.05).getAmount(), 103.40)
    })
    it("should divide 123.45 and 20.05 and equal to 6.16", ()=> {
        assert.deepEqual(new XAmount(123.45).div(20.05).getAmount(), 6.16)
    })
    it("should multiply 123.458 and 20.05 and equal to 2475.37", ()=> {
        assert.deepEqual(new XAmount(20.05).mul(123.458).getAmount(), 2475.37)
    })
    it("should throw error while trying to divide by zero", ()=> {
        assert.throws(()=> {
            new XAmount(2).div(0)
        })
    })

    it("should add the float with rounding 123.456 + 234.567 => 358.03", ()=> {
        assert.equal(new XAmount(123.456).add(234.567).getAmount(), 358.03)
    })
})

describe("XAmount discount methods", () => {
    it("should give a discounted value from $99.99 with a 33.33% discount which is 66.66", ()=> {
        assert.equal( new XAmount(99.99).getDiscount(33.33), 66.66)
    })
})

describe("initExchanger() method", ()=> {

    it("should create an instant of exchanger class in the XAmount", ()=> {
        assert.ok(new XAmount(20.20).initExchanger({btd: 122}).exchanger)
    })

    it("should exchange from USD to CAD 25.22 => 34.55 with 1.37CAD per USD", ()=> {
        assert.equal(new XAmount(25.22).initExchanger({cad: 1.37}).exchange("cad").getAmount(), 34.55)
    })
})
