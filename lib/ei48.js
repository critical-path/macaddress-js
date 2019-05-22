var Octet = require("./octet.js")

/**
 * ExtendedIdentifier48 makes it easy to work with the IEEE's 48-bit
 * extended unique identifiers (EUI) and extended local identifiers (ELI).
 *
 * The first 24 or 36 bits of an EUI is called an organizationally-
 * uniqe identifier (OUI), while the first 24 or 36 bits of an ELI is
 * called a company ID (CID).
 *
 * Visit the IEEE's website for more information on EUIs and ELIs.
 *
 * Helpful link:
 * https://standards.ieee.org/products-services/regauth/tut/index.html
 *
 * @class ExtendedIdentifier48
 */
class ExtendedIdentifier48 {
    /**
     * Instantiate ExtendedIdentifier48 with 12 hexadecimal digits 
     * (0-9, A-F, or a-f).
     *
     * @constructor
     * @param {string} identifier
     * @throws {error} Error
     */
    constructor(identifier) {
        /**
         * The hexadecimal identifier passed in by the user.
         *
         * @property {string} original
         */
        this.original = identifier

        if (!this.isValid) {
            throw new Error("Pass in 12 hexadecimal digits.")
        }
    }

    /**
     * Whether the user passed in a valid hexadecimal identifier.
     *
     * @readonly
     */
    get isValid() {
        var plain = new RegExp("^[0-9A-Fa-f]{12}$")
        var hyphen = new RegExp("^([0-9A-Fa-f]{2}[-]{1}){5}[0-9A-Fa-f]{2}$")
        var colon = new RegExp("^([0-9A-Fa-f]{2}[:]{1}){5}[0-9A-Fa-f]{2}$")
        var dot = new RegExp("^([0-9A-Fa-f]{4}[.]{1}){2}[0-9A-Fa-f]{4}$")  

        if (plain.test(this.original)) {
            return true
        } else if (hyphen.test(this.original)) {
            return true
        } else if (colon.test(this.original)) {
            return true
        } else if (dot.test(this.original)) {
            return true
        } else {
            return false
        }
    }

    /**
     * The hexadecimal identifier after replacing all uppercase
     * letters with lowercase letters and removing all hypens,
     * colons, and dots.
     *
     * For example, if the user passes in `A0-B1-C2-D3-E4-F5`,
     * then ExtendedIdentifier48 will return `a0b1c2d3e4f5`.
     *
     * @readonly
     */
    get normalized() {
        var pattern = new RegExp("[^0-9a-f]", "g")
        return this.original.toLowerCase().replace(pattern, "")
    }

    /**
     * Each of the hexadecimal identifier's six octets.
     *
     * @readonly
     */
    get octets() {
        var pattern = new RegExp("[0-9a-f]{2}", "g")
        var matches = this.normalized.match(pattern)
        return matches.map(match => new Octet(match))
    }

    /**
     * The hexadecimal identifier's first octet.
     *
     * @readonly
     */
    get firstOctet() {
        return this.octets.slice(0, 1)
    }

    /**
     * The binary equivalent of the hexadecimal identifier passed
     * in by the user.  *The most-significant digit of each
     * octet appears first.*
     *
     * For example, if the user passes in `A0-B1-C2-D3-E4-F5`,
     * then ExtendedIdentifier48 will return
     * `101000001011000111000010110100111110010011110101`.
     *
     * @readonly
     */
    get binary() {
        var binaries = this.octets.map(octet => octet.binary)
        return binaries.join("")
    }

    /**
     * The reverse-binary equivalent of the hexadecimal identifier
     * passed in by the user.  *The least-significant digit of
     * each octet appears first.*
     *
     * For example, if the user passes in `A0-B1-C2-D3-E4-F5`,
     * then ExtendedIdentifier48 will return
     * `000001011000110101000011110010110010011110101111`.
     *
     * @readonly
     */
    get reverseBinary() {
        var reverseBinaries = this.octets.map(octet => octet.reverseBinary)
        return reverseBinaries.join("")
    }

    /**
     * The hexadecimal identifier's type, where type is unique,
     * local, or unknown.
     *
     * The two least-significant bits in the first octet of
     * an extended identifier determine whether it is an EUI.
     *
     * 00 = unique.
     *
     * The four least-signficant bits in the first octet of
     * an extended identifier determine whether it is an ELI.
     *
     * 1010 = local.
     *
     * @readonly
     */
    get type() {
        if (this.firstOctet.binary.slice(6) === "00") {
            return "unique"
        } else if (this.firstOctet.binary.slice(4) == "1010") {
            return "local"
        } else {
            return "unknown"
        }
    }

    /**
     * Whether the hexadecimal identifier has an OUI.
     *
     * If the identifier is an EUI, then it has an OUI.
     *
     * @readonly
     */
    get hasOUI() {
        if (this.type === "unique") {
            return true
        } else {
            return false
        }
    }

    /**
     * Whether the hexadecimal identifier has a CID.
     *
     * If the identifier is an ELI, then it has a CID.
     *
     * @readonly
     */
    get hasCID() {
        if (this.type === "local") {
            return true
        } else {
            return false
        }
    }
}

/**
 * Returns the hexadecimal identifier's two "fragments."
 *
 * For an EUI, this means the 24- or 36-bit OUI as the first
 * fragment and the remaining device- or object-specific bits
 * as the second fragment. 
 *
 * For an ELI, this means the 24- or 36-bit CID as the first
 * fragment and the remaining device- or object-specific bits
 * as the second fragment. 
 *
 * For example, if the user passes in `A0-B1-C2-D3-E4-F5` and
 * calls this method with either `bits=24` or no named argument,
 * then ExtendedIdentifier48 will return `[ a0b1c2, d3e4f5 ]`.
 *
 * If the user passes in `A0-B1-C2-D3-E4-F5` and calls this method
 * with `bits=36`, then ExtendedIdentifier48 will return
 * `[ a0b1c2d3e, 4f5 ]`.
 *
 * @method
 * @returns {array}
 */
ExtendedIdentifier48.prototype.toFragments = function(bits=24) {
    var digits = bits / 4
    return Array.of(
        this.normalized.slice(0, digits), this.normalized.slice(digits)
    )
}

/**
 * Returns the hexadecimal identifier in plain notation
 * (for example, `a0b1c2d3e4f5`).
 *
 * @method
 * @returns {string}
 */
ExtendedIdentifier48.prototype.toPlainNotation = function() {
    return this.normalized
}

/**
 * Returns the hexadecimal identifier in hyphen notation
 * (for example, `a0-b1-c2-d3-e4-f5`).
 *
 * @method
 * @returns {string}
 */
ExtendedIdentifier48.prototype.toHyphenNotation = function() {
    var pattern = new RegExp("[0-9a-f]{2}", "g")
    var matches = this.normalized.match(pattern)
    return matches.join("-")
}

/**
 * Returns the hexadecimal identifier in colon notation
 * (for example, `a0:b1:c2:d3:e4:f5`).
 *
 * @method
 * @returns {string}
 */
ExtendedIdentifier48.prototype.toColonNotation = function() {
    var pattern = new RegExp("[0-9a-f]{2}", "g")
    var matches = this.normalized.match(pattern)
    return matches.join(":")
}

/**
 * Returns the hexadecimal identifier in dot notation
 * (for example, `a0b1.c2d3.e4f5`).
 *
 * @method
 * @returns {string}
 */
ExtendedIdentifier48.prototype.toDotNotation = function() {
    var pattern = new RegExp("[0-9a-f]{4}", "g")
    var matches = this.normalized.match(pattern)
    return matches.join(".")
}

module.exports = ExtendedIdentifier48
