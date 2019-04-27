var ExtendedIdentifier48 = require("./ei48.js")

/**
 * MediaAccessControlAddress makes it easy to work with media access
 * control (MAC) addresses.
 *
 * @class MediaAccessControlAddress
 * @extends ExtendedIdentifier48
 */
class MediaAccessControlAddress extends ExtendedIdentifier48 {
    /**
     * Instantiate MediaAccessControlAddress with 12 hexadecimal digits 
     * (0-9, A-F, or a-f).
     *
     * @constructor
     * @param {string} address
     * @throws {error} Error
     */
    constructor(address) {
        super(address)
    }

    /**
     * Whether the MAC address is a broadcast address.
     * 
     * "ffffffffffff" = broadcast.
     *
     * @readonly
     */ 
    get isBroadcast() {
        if (this.normalized === "ffffffffffff") {
            return true
        } else {
            return false
        }
    }

    /**
     * Whether the MAC address is a multicast address
     * (layer-two multicast, not layer-three multicast).
     *
     * The least-significant bit in the first octet of a MAC address
     * determines whether it is a multicast or a unicast.
     *
     * 1 = multicast.
     *
     * @readonly
     */
    get isMulticast() {
        if (this.firstOctet.binary.slice(7) === "1") {
            return true
        } else {
            return false
       }
    }

    /**
     * Whether the MAC address is a unicast address.
     *
     * The least-significant bit in the first octet of a MAC address
     * determines whether it is a multicast or a unicast.
     *
     * 0 = unicast.
     *
     * @readonly
     */ 
    get isUnicast() {
       return !this.isMulticast
    }

    /**
     * Whether the MAC address is a universally-administered
     * address (UAA).
     *
     * The second-least-significant bit in the first octet of a MAC
     * address determines whether it is a UAA or an LAA.
     *
     * 0 = UAA.
     *
     * @readonly
     */ 
    get isUAA() {
        if ((this.isUnicast) 
        && (this.firstOctet.binary.slice(6, 7) === "0")) {
            return true
        } else {
            return false
        }
    }

    /**
     * Whether the MAC address is a locally-administered
     * address (LAA).
     * 
     * The second-least-significant bit in the first octet of a MAC
     * address determines whether it is a UAA or an LAA.
     *
     * 1 = LAA.
     *
     * @readonly
     */
    get isLAA() {
        if ((this.isUnicast) 
        && (this.firstOctet.binary.slice(6, 7) === "1")) {
            return true
        } else {
            return false
        }
    }
}

module.exports = MediaAccessControlAddress
