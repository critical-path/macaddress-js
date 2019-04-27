/**
 * Octet makes it easy to convert two hexadecimal digits to eight
 * binary or reverse-binary digits.
 *
 * This is useful when working with the IEEE's extended unique
 * identifiers and extended local identifiers.
 *
 * @class Octet
 */
class Octet {
    /**
     * Instantiate Octet with two hexadecimal digits (0-9, A-F, or a-f).
     *
     * @constructor
     * @param {string} digits
     * @throws {error} Error
     */
    constructor(digits) {
        /**
         * The hexadecimal digits passed in by the user.
         *
         * @property {string} original
         */
        this.original = digits

        if (!this.isValid) {
            throw new Error("Pass in two hexadecimal digits.")
        }
    }

    /**
     * Whether the user passed in valid hexadecimal digits.
     *
     * @readonly
     */
    get isValid() {
        var pattern = new RegExp("^[0-9A-Fa-f]{2}$")
        return pattern.test(this.original)
    }

    /**
     * The hexadecimal digits after replacing all uppercase
     * letters with lowercase letters.
     *
     * For example, if the user passes in `A0`, then Octet
     * will convert it to `a0`.
     *
     * @readonly
     */ 
    get normalized() {
        return this.original.toLowerCase()
    }

    /**
     * The binary equivalent of the hexadecimal digits passed
     * in by the user.  *The most-significant digit appears first.*
     *
     * For example, if the user passes in `A0`, then Octet
     * will convert it to `10100000`.
     *
     * @readonly
     */
    get binary() {
        var decimal = parseInt(this.normalized, 16)
        return decimal.toString(2).padStart(8, 0)
    }

    /**
     * The reverse-binary equivalent of the hexadecimal digits
     * passed in by the user.  *The least-significant digit
     * appears first.*
     *
     * For example, if the user passes in `A0`, then Octet
     * will convert it to `00000101`.
     *
     * @readonly
     */
    get reverseBinary() {
        return Array.from(this.binary).reverse().join("")
    }
}

module.exports = Octet
