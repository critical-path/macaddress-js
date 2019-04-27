var chai = require("chai")
var Octet = require("../lib/octet.js")

var invalid = [
    "f",          // Too few digits
    "fff",        // Too many digits
    "gg"          // Invalid digits
]

invalid.forEach(function(argument) {
    describe(`new Octet(${argument})`, function() {
        it("should throw an error", function() {
            chai.assert.throws(
                function() { return new Octet(argument) },
                Error,
                "Pass in two hexadecimal digits."
            )
        })
    })
})

var valid = [
    {
        "digits": "A0",
        "normalized": "a0",
        "binary": "10100000",
        "reverseBinary": "00000101"
    },
    {
        "digits": "a0",
        "normalized": "a0",
        "binary": "10100000",
        "reverseBinary": "00000101"
    },
    {
        "digits": "B1",
        "normalized": "b1",
        "binary": "10110001",
        "reverseBinary": "10001101"
    },
    {
        "digits": "b1",
        "normalized": "b1",
        "binary": "10110001",
        "reverseBinary": "10001101"
    },
    {
        "digits": "C2",
        "normalized": "c2",
        "binary": "11000010",
        "reverseBinary": "01000011"
    },
    {
        "digits": "c2",
        "normalized": "c2",
        "binary": "11000010",
        "reverseBinary": "01000011"
    },
    {
        "digits": "D3",
        "normalized": "d3",
        "binary": "11010011",
        "reverseBinary": "11001011"
    },
    {
        "digits": "d3",
        "normalized": "d3",
        "binary": "11010011",
        "reverseBinary": "11001011"
    },
    {
        "digits": "E4",
        "normalized": "e4",
        "binary": "11100100",
        "reverseBinary": "00100111"
    },
    {
        "digits": "e4",
        "normalized": "e4",
        "binary": "11100100",
        "reverseBinary": "00100111"
    },
    {
        "digits": "F5",
        "normalized": "f5",
        "binary": "11110101",
        "reverseBinary": "10101111"
    },
    {
        "digits": "f5",
        "normalized": "f5",
        "binary": "11110101",
        "reverseBinary": "10101111"
    }
]

valid.forEach(function(argument) {
    describe(`new Octet(${argument.digits})`, function() {
        var octet = new Octet(argument.digits)

        describe(".original", function() {
            it(`should equal ${argument.digits}`, function() {
                chai.assert.equal(octet.original, argument.digits)
            })
        })

        describe(".normalized", function() {
            it(`should equal ${argument.normalized}`, function() {
                chai.assert.equal(octet.normalized, argument.normalized)
            })
        })

        describe(".isValid", function() {
            it("should equal true", function() {
                chai.assert.isTrue(octet.isValid)
            })
        })

        describe(".binary", function() {
            it(`should equal ${argument.binary}`, function() {
                chai.assert.equal(octet.binary, argument.binary)
            })
        })

        describe(".reverseBinary", function() {
            it(`shoud equal ${argument.reverseBinary}`, function() {
                chai.assert.equal(octet.reverseBinary, argument.reverseBinary)
            })
        })
    })
})
