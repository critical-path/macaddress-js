var chai = require("chai")
var ExtendedIdentifier48 = require("../lib/ei48.js")
var Octet = require("../lib/octet.js")

var invalid = [
    "0a",                 // Too few digits
    "0a1b2c3d4e5f6",      // Too many digits
    "0a1b2c3d4e5g",       // Invalid digit
    "-0a-1b-2c-3d-4e-5f", // Leading hyphen
    "0a-1b-2c-3d-4e-5f-", // Trailing hyphen
    "0a-1b-2c-3d-4e5f",   // Missing hyphen
    ":0a:1b:2c:3d:4e:5f", // Leading colon
    "0a:1b:2c:3d:4e:5f:", // Trailing colon
    "0a:1b:2c:3d:4e5f",   // Missing colon
    ".0a1b.2c3d.4e5f",    // Leading dot
    "0a1b.2c3d.4e5f.",    // Trailing dot
    "0a1b.2c3d4e5f"       // Missing dot
]

invalid.forEach(function(argument) {
    describe(`new ExtendedIdentifier48(${argument})`, function() {
        it("should throw an error", function() {
            chai.assert.throws(
                function() { return new ExtendedIdentifier48(argument) },
                Error,
                "Pass in 12 hexadecimal digits."
            )
        })
    })
})

var eui = [ 
    { 
        digits: "a0b1c2d3e4f5",
        normalized: "a0b1c2d3e4f5",
        decimal: 176685338322165,
        binary: "101000001011000111000010110100111110010011110101",
        reverseBinary: "000001011000110101000011110010110010011110101111",
        fragments24: [ "a0b1c2", "d3e4f5" ],
        fragments36: [ "a0b1c2d3e", "4f5" ],
        plain: "a0b1c2d3e4f5",
        hyphen: "a0-b1-c2-d3-e4-f5",
        colon: "a0:b1:c2:d3:e4:f5",
        dot: "a0b1.c2d3.e4f5" 
    },
    { 
        digits: "A0B1C2D3E4F5",
        normalized: "a0b1c2d3e4f5",
        decimal: 176685338322165,
        binary: "101000001011000111000010110100111110010011110101",
        reverseBinary: "000001011000110101000011110010110010011110101111",
        fragments24: [ "a0b1c2", "d3e4f5" ],
        fragments36: [ "a0b1c2d3e", "4f5" ],
        plain: "a0b1c2d3e4f5",
        hyphen: "a0-b1-c2-d3-e4-f5",
        colon: "a0:b1:c2:d3:e4:f5",
        dot: "a0b1.c2d3.e4f5" 
    },
    { 
        digits: "a0-b1-c2-d3-e4-f5",
        normalized: "a0b1c2d3e4f5",
        decimal: 176685338322165,
        binary: "101000001011000111000010110100111110010011110101",
        reverseBinary: "000001011000110101000011110010110010011110101111",
        fragments24: [ "a0b1c2", "d3e4f5" ],
        fragments36: [ "a0b1c2d3e", "4f5" ],
        plain: "a0b1c2d3e4f5",
        hyphen: "a0-b1-c2-d3-e4-f5",
        colon: "a0:b1:c2:d3:e4:f5",
        dot: "a0b1.c2d3.e4f5" 
    },
    { 
        digits: "A0-B1-C2-D3-E4-F5",
        normalized: "a0b1c2d3e4f5",
        decimal: 176685338322165,
        binary: "101000001011000111000010110100111110010011110101",
        reverseBinary: "000001011000110101000011110010110010011110101111",
        fragments24: [ "a0b1c2", "d3e4f5" ],
        fragments36: [ "a0b1c2d3e", "4f5" ],
        plain: "a0b1c2d3e4f5",
        hyphen: "a0-b1-c2-d3-e4-f5",
        colon: "a0:b1:c2:d3:e4:f5",
        dot: "a0b1.c2d3.e4f5" 
    },
    { 
        digits: "a0:b1:c2:d3:e4:f5",
        normalized: "a0b1c2d3e4f5",
        decimal: 176685338322165,
        binary: "101000001011000111000010110100111110010011110101",
        reverseBinary: "000001011000110101000011110010110010011110101111",
        fragments24: [ "a0b1c2", "d3e4f5" ],
        fragments36: [ "a0b1c2d3e", "4f5" ],
        plain: "a0b1c2d3e4f5",
        hyphen: "a0-b1-c2-d3-e4-f5",
        colon: "a0:b1:c2:d3:e4:f5",
        dot: "a0b1.c2d3.e4f5" 
    },
    { 
        digits: "A0:B1:C2:D3:E4:F5",
        normalized: "a0b1c2d3e4f5",
        decimal: 176685338322165,
        binary: "101000001011000111000010110100111110010011110101",
        reverseBinary: "000001011000110101000011110010110010011110101111",
        fragments24: [ "a0b1c2", "d3e4f5" ],
        fragments36: [ "a0b1c2d3e", "4f5" ],
        plain: "a0b1c2d3e4f5",
        hyphen: "a0-b1-c2-d3-e4-f5",
        colon: "a0:b1:c2:d3:e4:f5",
        dot: "a0b1.c2d3.e4f5" 
    },
    { 
        digits: "a0b1.c2d3.e4f5",
        normalized: "a0b1c2d3e4f5",
        decimal: 176685338322165,
        binary: "101000001011000111000010110100111110010011110101",
        reverseBinary: "000001011000110101000011110010110010011110101111",
        fragments24: [ "a0b1c2", "d3e4f5" ],
        fragments36: [ "a0b1c2d3e", "4f5" ],
        plain: "a0b1c2d3e4f5",
        hyphen: "a0-b1-c2-d3-e4-f5",
        colon: "a0:b1:c2:d3:e4:f5",
        dot: "a0b1.c2d3.e4f5" 
    },
    { 
        digits: "A0B1.C2D3.E4F5",
        normalized: "a0b1c2d3e4f5",
        decimal: 176685338322165,
        binary: "101000001011000111000010110100111110010011110101",
        reverseBinary: "000001011000110101000011110010110010011110101111",
        fragments24: [ "a0b1c2", "d3e4f5" ],
        fragments36: [ "a0b1c2d3e", "4f5" ],
        plain: "a0b1c2d3e4f5",
        hyphen: "a0-b1-c2-d3-e4-f5",
        colon: "a0:b1:c2:d3:e4:f5",
        dot: "a0b1.c2d3.e4f5" 
    } 
]

eui.forEach(function(argument) {
    describe(`new ExtendedIndentifier48(${argument.digits})`, function() {
        var ei48 = new ExtendedIdentifier48(argument.digits)

        describe(".original", function() {
            it(`should equal ${argument.digits}`, function() {
                chai.assert.equal(ei48.original, argument.digits)
            })
        })

        describe(".normalized", function() {
            it(`should equal ${argument.normalized}`, function() {
                chai.assert.equal(ei48.normalized, argument.normalized)
            })
        })

        describe(".isValid", function() {
            it("should equal true", function() {
                chai.assert.isTrue(ei48.isValid)
            })
        })

        describe(".octets.length", function() {
            it("should equal 6", function() {
                chai.assert.equal(ei48.octets.length, 6)
            })
        })
 
        describe(".firstOctet", function() {
            it("should be an instance of Octet", function() {
                chai.assert.isTrue(ei48.firstOctet instanceof Octet)
            })
        })

        describe(".decimal", function() {
            it(`should equal ${argument.decimal}`, function() {
                chai.assert.equal(ei48.decimal, argument.decimal)
            })
        })

        describe(".binary", function() {
            it(`should equal ${argument.binary}`, function() {
                chai.assert.equal(ei48.binary, argument.binary)
            })
        })

        describe(".reverseBinary", function() {
            it(`should equal ${argument.reverseBinary}`, function() {
                chai.assert.equal(ei48.reverseBinary, argument.reverseBinary)
            })
        })

        describe(".type", function() {
            it("should equal unique", function() {
                chai.assert.equal(ei48.type, "unique")
            })
        })

        describe(".hasOUI", function() {
            it("should equal true", function() {
                chai.assert.isTrue(ei48.hasOUI)
            })
        })

        describe(".hasCID", function() {
            it("should equal false", function() {
                chai.assert.isFalse(ei48.hasCID)
            })
        })

        describe(".toFragments()", function() {
            it(`should equal ${argument.fragments24}`, function() {
                chai.assert.deepEqual(ei48.toFragments(), argument.fragments24)
            })
        })

        describe(".toFragments(bits=36)", function() {
            it(`should equal ${argument.fragments36}`, function() {
                chai.assert.deepEqual(
                    ei48.toFragments(bits=36), argument.fragments36
                )
            })
        })

        describe(".toPlainNotation()", function() {
            it(`should equal ${argument.plain}`, function() {
                chai.assert.equal(ei48.toPlainNotation(), argument.plain)
            })
        })

        describe(".toHyphenNotation()", function() {
            it(`should equal ${argument.hyphen}`, function() {
                chai.assert.equal(ei48.toHyphenNotation(), argument.hyphen)
            })
        })

        describe(".toColonNotation()", function() {
            it(`should equal ${argument.colon}`, function() {
                chai.assert.equal(ei48.toColonNotation(), argument.colon)
            })
        })

        describe(".toDotNotation()", function() {
            it(`should equal ${argument.dot}`, function() {
                chai.assert.equal(ei48.toDotNotation(), argument.dot)
            })
        })
    })
})

var eli = [ 
    { 
        digits: "0a1b2c3d4e5f",
        normalized: "0a1b2c3d4e5f",
        decimal: 11111822610015,
        binary: "000010100001101100101100001111010100111001011111",
        reverseBinary: "010100001101100000110100101111000111001011111010",
        fragments24: [ "0a1b2c", "3d4e5f" ],
        fragments36: [ "0a1b2c3d4", "e5f" ],
        plain: "0a1b2c3d4e5f",
        hyphen: "0a-1b-2c-3d-4e-5f",
        colon: "0a:1b:2c:3d:4e:5f",
        dot: "0a1b.2c3d.4e5f" 
    },
    { 
        digits: "0A1B2C3D4E5F",
        normalized: "0a1b2c3d4e5f",
        decimal: 11111822610015,
        binary: "000010100001101100101100001111010100111001011111",
        reverseBinary: "010100001101100000110100101111000111001011111010",
        fragments24: [ "0a1b2c", "3d4e5f" ],
        fragments36: [ "0a1b2c3d4", "e5f" ],
        plain: "0a1b2c3d4e5f",
        hyphen: "0a-1b-2c-3d-4e-5f",
        colon: "0a:1b:2c:3d:4e:5f",
        dot: "0a1b.2c3d.4e5f" 
    },
    { 
        digits: "0a-1b-2c-3d-4e-5f",
        normalized: "0a1b2c3d4e5f",
        decimal: 11111822610015,
        binary: "000010100001101100101100001111010100111001011111",
        reverseBinary: "010100001101100000110100101111000111001011111010",
        fragments24: [ "0a1b2c", "3d4e5f" ],
        fragments36: [ "0a1b2c3d4", "e5f" ],
        plain: "0a1b2c3d4e5f",
        hyphen: "0a-1b-2c-3d-4e-5f",
        colon: "0a:1b:2c:3d:4e:5f",
        dot: "0a1b.2c3d.4e5f" 
    },
    { 
        digits: "0A-1B-2C-3D-4E-5F",
        normalized: "0a1b2c3d4e5f",
        decimal: 11111822610015,
        binary: "000010100001101100101100001111010100111001011111",
        reverseBinary: "010100001101100000110100101111000111001011111010",
        fragments24: [ "0a1b2c", "3d4e5f" ],
        fragments36: [ "0a1b2c3d4", "e5f" ],
        plain: "0a1b2c3d4e5f",
        hyphen: "0a-1b-2c-3d-4e-5f",
        colon: "0a:1b:2c:3d:4e:5f",
        dot: "0a1b.2c3d.4e5f" 
    },
    { 
        digits: "0a:1b:2c:3d:4e:5f",
        normalized: "0a1b2c3d4e5f",
        decimal: 11111822610015,
        binary: "000010100001101100101100001111010100111001011111",
        reverseBinary: "010100001101100000110100101111000111001011111010",
        fragments24: [ "0a1b2c", "3d4e5f" ],
        fragments36: [ "0a1b2c3d4", "e5f" ],
        plain: "0a1b2c3d4e5f",
        hyphen: "0a-1b-2c-3d-4e-5f",
        colon: "0a:1b:2c:3d:4e:5f",
        dot: "0a1b.2c3d.4e5f" 
    },
    { 
        digits: "0A:1B:2C:3D:4E:5F",
        normalized: "0a1b2c3d4e5f",
        decimal: 11111822610015,
        binary: "000010100001101100101100001111010100111001011111",
        reverseBinary: "010100001101100000110100101111000111001011111010",
        fragments24: [ "0a1b2c", "3d4e5f" ],
        fragments36: [ "0a1b2c3d4", "e5f" ],
        plain: "0a1b2c3d4e5f",
        hyphen: "0a-1b-2c-3d-4e-5f",
        colon: "0a:1b:2c:3d:4e:5f",
        dot: "0a1b.2c3d.4e5f" 
    },
    { 
        digits: "0a1b.2c3d.4e5f",
        normalized: "0a1b2c3d4e5f",
        decimal: 11111822610015,
        binary: "000010100001101100101100001111010100111001011111",
        reverseBinary: "010100001101100000110100101111000111001011111010",
        fragments24: [ "0a1b2c", "3d4e5f" ],
        fragments36: [ "0a1b2c3d4", "e5f" ],
        plain: "0a1b2c3d4e5f",
        hyphen: "0a-1b-2c-3d-4e-5f",
        colon: "0a:1b:2c:3d:4e:5f",
        dot: "0a1b.2c3d.4e5f" 
    },
    { 
        digits: "0A1B.2C3D.4E5F",
        normalized: "0a1b2c3d4e5f",
        decimal: 11111822610015,
        binary: "000010100001101100101100001111010100111001011111",
        reverseBinary: "010100001101100000110100101111000111001011111010",
        fragments24: [ "0a1b2c", "3d4e5f" ],
        fragments36: [ "0a1b2c3d4", "e5f" ],
        plain: "0a1b2c3d4e5f",
        hyphen: "0a-1b-2c-3d-4e-5f",
        colon: "0a:1b:2c:3d:4e:5f",
        dot: "0a1b.2c3d.4e5f" 
    } 
]

eli.forEach(function(argument) {
    describe(`new ExtendedIndentifier48(${argument.digits})`, function() {
        var ei48 = new ExtendedIdentifier48(argument.digits)

        describe(".original", function() {
            it(`should equal ${argument.digits}`, function() {
                chai.assert.equal(ei48.original, argument.digits)
            })
        })

        describe(".normalized", function() {
            it(`should equal ${argument.normalized}`, function() {
                chai.assert.equal(ei48.normalized, argument.normalized)
            })
        })

        describe(".isValid", function() {
            it("should equal true", function() {
                chai.assert.isTrue(ei48.isValid)
            })
        })

        describe(".octets.length", function() {
            it("should equal 6", function() {
                chai.assert.equal(ei48.octets.length, 6)
            })
        })
 
        describe(".firstOctet", function() {
            it("should be an instance of Octet", function() {
                chai.assert.isTrue(ei48.firstOctet instanceof Octet)
            })
        })

        describe(".decimal", function() {
            it(`should equal ${argument.decimal}`, function() {
                chai.assert.equal(ei48.decimal, argument.decimal)
            })
        })

        describe(".binary", function() {
            it(`should equal ${argument.binary}`, function() {
                chai.assert.equal(ei48.binary, argument.binary)
            })
        })

        describe(".reverseBinary", function() {
            it(`should equal ${argument.reverseBinary}`, function() {
                chai.assert.equal(ei48.reverseBinary, argument.reverseBinary)
            })
        })

        describe(".type", function() {
            it("should equal local", function() {
                chai.assert.equal(ei48.type, "local")
            })
        })

        describe(".hasOUI", function() {
            it("should equal false", function() {
                chai.assert.isFalse(ei48.hasOUI)
            })
        })

        describe(".hasCID", function() {
            it("should equal true", function() {
                chai.assert.isTrue(ei48.hasCID)
            })
        })

        describe(".toFragments()", function() {
            it(`should equal ${argument.fragments24}`, function() {
                chai.assert.deepEqual(ei48.toFragments(), argument.fragments24)
            })
        })

        describe(".toFragments(bits=36)", function() {
            it(`should equal ${argument.fragments36}`, function() {
                chai.assert.deepEqual(
                    ei48.toFragments(bits=36), argument.fragments36
                )
            })
        })

        describe(".toPlainNotation()", function() {
            it(`should equal ${argument.plain}`, function() {
                chai.assert.equal(ei48.toPlainNotation(), argument.plain)
            })
        })

        describe(".toHyphenNotation()", function() {
            it(`should equal ${argument.hyphen}`, function() {
                chai.assert.equal(ei48.toHyphenNotation(), argument.hyphen)
            })
        })

        describe(".toColonNotation()", function() {
            it(`should equal ${argument.colon}`, function() {
                chai.assert.equal(ei48.toColonNotation(), argument.colon)
            })
        })

        describe(".toDotNotation()", function() {
            it(`should equal ${argument.dot}`, function() {
                chai.assert.equal(ei48.toDotNotation(), argument.dot)
            })
        })
    })
})

var nullEUI = [ 
    { 
        digits: "ffffffffffff",
        normalized: "ffffffffffff",
        decimal: 281474976710655,
        binary: "111111111111111111111111111111111111111111111111",
        reverseBinary: "111111111111111111111111111111111111111111111111",
        fragments24: [ "ffffff", "ffffff" ],
        fragments36: [ "fffffffff", "fff" ],
        plain: "ffffffffffff",
        hyphen: "ff-ff-ff-ff-ff-ff",
        colon: "ff:ff:ff:ff:ff:ff",
        dot: "ffff.ffff.ffff" 
    },
    { 
        digits: "FFFFFFFFFFFF",
        normalized: "ffffffffffff",
        decimal: 281474976710655,
        binary: "111111111111111111111111111111111111111111111111",
        reverseBinary: "111111111111111111111111111111111111111111111111",
        fragments24: [ "ffffff", "ffffff" ],
        fragments36: [ "fffffffff", "fff" ],
        plain: "ffffffffffff",
        hyphen: "ff-ff-ff-ff-ff-ff",
        colon: "ff:ff:ff:ff:ff:ff",
        dot: "ffff.ffff.ffff" 
    },
    { 
        digits: "ff-ff-ff-ff-ff-ff",
        normalized: "ffffffffffff",
        decimal: 281474976710655,
        binary: "111111111111111111111111111111111111111111111111",
        reverseBinary: "111111111111111111111111111111111111111111111111",
        fragments24: [ "ffffff", "ffffff" ],
        fragments36: [ "fffffffff", "fff" ],
        plain: "ffffffffffff",
        hyphen: "ff-ff-ff-ff-ff-ff",
        colon: "ff:ff:ff:ff:ff:ff",
        dot: "ffff.ffff.ffff" 
    },
    { 
        digits: "FF-FF-FF-FF-FF-FF",
        normalized: "ffffffffffff",
        decimal: 281474976710655,
        binary: "111111111111111111111111111111111111111111111111",
        reverseBinary: "111111111111111111111111111111111111111111111111",
        fragments24: [ "ffffff", "ffffff" ],
        fragments36: [ "fffffffff", "fff" ],
        plain: "ffffffffffff",
        hyphen: "ff-ff-ff-ff-ff-ff",
        colon: "ff:ff:ff:ff:ff:ff",
        dot: "ffff.ffff.ffff" 
    },
    { 
        digits: "ff:ff:ff:ff:ff:ff",
        normalized: "ffffffffffff",
        decimal: 281474976710655,
        binary: "111111111111111111111111111111111111111111111111",
        reverseBinary: "111111111111111111111111111111111111111111111111",
        fragments24: [ "ffffff", "ffffff" ],
        fragments36: [ "fffffffff", "fff" ],
        plain: "ffffffffffff",
        hyphen: "ff-ff-ff-ff-ff-ff",
        colon: "ff:ff:ff:ff:ff:ff",
        dot: "ffff.ffff.ffff" 
    },
    { 
        digits: "FF:FF:FF:FF:FF:FF",
        normalized: "ffffffffffff",
        decimal: 281474976710655,
        binary: "111111111111111111111111111111111111111111111111",
        reverseBinary: "111111111111111111111111111111111111111111111111",
        fragments24: [ "ffffff", "ffffff" ],
        fragments36: [ "fffffffff", "fff" ],
        plain: "ffffffffffff",
        hyphen: "ff-ff-ff-ff-ff-ff",
        colon: "ff:ff:ff:ff:ff:ff",
        dot: "ffff.ffff.ffff" 
    },
    { 
        digits: "ffff.ffff.ffff",
        normalized: "ffffffffffff",
        decimal: 281474976710655,
        binary: "111111111111111111111111111111111111111111111111",
        reverseBinary: "111111111111111111111111111111111111111111111111",
        fragments24: [ "ffffff", "ffffff" ],
        fragments36: [ "fffffffff", "fff" ],
        plain: "ffffffffffff",
        hyphen: "ff-ff-ff-ff-ff-ff",
        colon: "ff:ff:ff:ff:ff:ff",
        dot: "ffff.ffff.ffff" 
    },
    { 
        digits: "FFFF.FFFF.FFFF",
        normalized: "ffffffffffff",
        decimal: 281474976710655,
        binary: "111111111111111111111111111111111111111111111111",
        reverseBinary: "111111111111111111111111111111111111111111111111",
        fragments24: [ "ffffff", "ffffff" ],
        fragments36: [ "fffffffff", "fff" ],
        plain: "ffffffffffff",
        hyphen: "ff-ff-ff-ff-ff-ff",
        colon: "ff:ff:ff:ff:ff:ff",
        dot: "ffff.ffff.ffff" 
    } 
]

nullEUI.forEach(function(argument) {
    describe(`new ExtendedIndentifier48(${argument.digits})`, function() {
        var ei48 = new ExtendedIdentifier48(argument.digits)

        describe(".original", function() {
            it(`should equal ${argument.digits}`, function() {
                chai.assert.equal(ei48.original, argument.digits)
            })
        })

        describe(".normalized", function() {
            it(`should equal ${argument.normalized}`, function() {
                chai.assert.equal(ei48.normalized, argument.normalized)
            })
        })

        describe(".isValid", function() {
            it("should equal true", function() {
                chai.assert.isTrue(ei48.isValid)
            })
        })

        describe(".octets.length", function() {
            it("should equal 6", function() {
                chai.assert.equal(ei48.octets.length, 6)
            })
        })
 
        describe(".firstOctet", function() {
            it("should be an instance of Octet", function() {
                chai.assert.isTrue(ei48.firstOctet instanceof Octet)
            })
        })

        describe(".decimal", function() {
            it(`should equal ${argument.decimal}`, function() {
                chai.assert.equal(ei48.decimal, argument.decimal)
            })
        })

        describe(".binary", function() {
            it(`should equal ${argument.binary}`, function() {
                chai.assert.equal(ei48.binary, argument.binary)
            })
        })

        describe(".reverseBinary", function() {
            it(`should equal ${argument.reverseBinary}`, function() {
                chai.assert.equal(ei48.reverseBinary, argument.reverseBinary)
            })
        })

        describe(".type", function() {
            it("should equal unknown", function() {
                chai.assert.equal(ei48.type, "unknown")
            })
        })

        describe(".hasOUI", function() {
            it("should equal false", function() {
                chai.assert.isFalse(ei48.hasOUI)
            })
        })

        describe(".hasCID", function() {
            it("should equal false", function() {
                chai.assert.isFalse(ei48.hasCID)
            })
        })

        describe(".toFragments()", function() {
            it(`should equal ${argument.fragments24}`, function() {
                chai.assert.deepEqual(ei48.toFragments(), argument.fragments24)
            })
        })

        describe(".toFragments(bits=36)", function() {
            it(`should equal ${argument.fragments36}`, function() {
                chai.assert.deepEqual(
                    ei48.toFragments(bits=36), argument.fragments36
                )
            })
        })

        describe(".toPlainNotation()", function() {
            it(`should equal ${argument.plain}`, function() {
                chai.assert.equal(ei48.toPlainNotation(), argument.plain)
            })
        })

        describe(".toHyphenNotation()", function() {
            it(`should equal ${argument.hyphen}`, function() {
                chai.assert.equal(ei48.toHyphenNotation(), argument.hyphen)
            })
        })

        describe(".toColonNotation()", function() {
            it(`should equal ${argument.colon}`, function() {
                chai.assert.equal(ei48.toColonNotation(), argument.colon)
            })
        })

        describe(".toDotNotation()", function() {
            it(`should equal ${argument.dot}`, function() {
                chai.assert.equal(ei48.toDotNotation(), argument.dot)
            })
        })
    })
})
