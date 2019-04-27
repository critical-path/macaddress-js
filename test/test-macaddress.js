var chai = require("chai")
var MediaAccessControlAddress = require("../lib/macaddress.js")

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
    describe(`new MediaAccessControlAddress(${argument})`, function() {
        it("should throw an error", function() {
            chai.assert.throws(
                function() { return new MediaAccessControlAddress(argument) },
                Error,
                "Pass in 12 hexadecimal digits."
            )
        })
    })
})

var broadcast = "ffffffffffff"

describe(`new MediaAccessControlAddress(${broadcast})`, function() {
    var mac = new MediaAccessControlAddress(broadcast)

    describe(".isBroadcast", function() {
        it("should equal true", function() {
            chai.assert.isTrue(mac.isBroadcast)
        })
    })

    describe(".isMulticast", function() {
	it("should equal true", function() {
	    chai.assert.isTrue(mac.isMulticast)
	})
    })

    describe(".isUnicast", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isUnicast)
        })
    })

    describe(".isUAA", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isUAA)
        })
    })

    describe(".isLAA", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isLAA)
        })
    })

    describe(".type", function() {
        it("should equal unknown", function() {
            chai.assert.equal(mac.type, "unknown")
        })
    })

    describe(".hasOUI", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.hasOUI)
        })
    })

    describe(".hasCID", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.hasCID)
        })
    })
})

var multicast = "0180c2000000"  // Link-Layer Discovery Protocol

describe(`new MediaAccessControlAddress(${multicast})`, function() {
    var mac = new MediaAccessControlAddress(multicast)

    describe(".isBroadcast", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isBroadcast)
        })
    })

    describe(".isMulticast", function() {
	it("should equal true", function() {
	    chai.assert.isTrue(mac.isMulticast)
	})
    })

    describe(".isUnicast", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isUnicast)
        })
    })

    describe(".isUAA", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isUAA)
        })
    })

    describe(".isLAA", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isLAA)
        })
    })

    describe(".type", function() {
        it("should equal unknown", function() {
            chai.assert.equal(mac.type, "unknown")
        })
    })

    describe(".hasOUI", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.hasOUI)
        })
    })

    describe(".hasCID", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.hasCID)
        })
    })
})

var unicastUAA = "a0b1c2d3e4f5"

describe(`new MediaAccessControlAddress(${unicastUAA})`, function() {
    var mac = new MediaAccessControlAddress(unicastUAA)

    describe(".isBroadcast", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isBroadcast)
        })
    })

    describe(".isMulticast", function() {
	it("should equal false", function() {
	    chai.assert.isFalse(mac.isMulticast)
	})
    })

    describe(".isUnicast", function() {
        it("should equal true", function() {
            chai.assert.isTrue(mac.isUnicast)
        })
    })

    describe(".isUAA", function() {
        it("should equal true", function() {
            chai.assert.isTrue(mac.isUAA)
        })
    })

    describe(".isLAA", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isLAA)
        })
    })

    describe(".type", function() {
        it("should equal unique", function() {
            chai.assert.equal(mac.type, "unique")
        })
    })

    describe(".hasOUI", function() {
        it("should equal true", function() {
            chai.assert.isTrue(mac.hasOUI)
        })
    })

    describe(".hasCID", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.hasCID)
        })
    })
})

var unicastLAA = "aab1c2d3e4f5"

describe(`new MediaAccessControlAddress(${unicastLAA})`, function() {
    var mac = new MediaAccessControlAddress(unicastLAA)

    describe(".isBroadcast", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isBroadcast)
        })
    })

    describe(".isMulticast", function() {
	it("should equal false", function() {
	    chai.assert.isFalse(mac.isMulticast)
	})
    })

    describe(".isUnicast", function() {
        it("should equal true", function() {
            chai.assert.isTrue(mac.isUnicast)
        })
    })

    describe(".isUAA", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.isUAA)
        })
    })

    describe(".isLAA", function() {
        it("should equal true", function() {
            chai.assert.isTrue(mac.isLAA)
        })
    })

    describe(".type", function() {
        it("should equal local", function() {
            chai.assert.equal(mac.type, "local")
        })
    })

    describe(".hasOUI", function() {
        it("should equal false", function() {
            chai.assert.isFalse(mac.hasOUI)
        })
    })

    describe(".hasCID", function() {
        it("should equal true", function() {
            chai.assert.isTrue(mac.hasCID)
        })
    })
})
