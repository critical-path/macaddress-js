[![Build Status](https://travis-ci.com/critical-path/macaddress-js.svg?branch=master)](https://travis-ci.com/critical-path/macaddress-js) [![Coverage Status](https://coveralls.io/repos/github/critical-path/macaddress-js/badge.svg?branch=master)](https://coveralls.io/github/critical-path/macaddress-js?branch=master)

## macaddress v0.1.0

The macaddress library makes it easy to work with media access control (MAC) addresses.


## Dependencies

macaddress requires Node and the npm package.  It also requires the following packages for testing.

- chai
- eslint
- istanbul
- mocha


## Installing macaddress with test cases and testing dependencies

Clone or download this repository.

Run `npm` with the `install` command.

```bash
npm install
```


## Using macaddress

Require `MediaAccessControlAddress`.

```node
> var MediaAccessControlAddress = require("macaddress").MediaAccessControlAddress
undefined
```

Instantiate `MediaAccessControlAddress` with a MAC address in plain, hyphen, colon, or dot notation.

```node
> var mac = new MediaAccessControlAddress("a0b1c2d3e4f5")
undefined
> console.log(mac)
MediaAccessControlAddress { original: 'a0b1c2d3e4f5' }
undefined
```

```node
> var mac = new MediaAccessControlAddress("a0-b1-c2-d3-e4-f5")
undefined
> console.log(mac)
MediaAccessControlAddress { original: 'a0-b1-c2-d3-e4-f5' }
undefined
```

```node
> var mac = new MediaAccessControlAddress("a0:b1:c2:d3:e4:f5")
undefined
> console.log(mac)
MediaAccessControlAddress { original: 'a0:b1:c2:d3:e4:f5' }
undefined
```

```node
> var mac = new MediaAccessControlAddress("a0b1.c2d3.e4f5")
undefined
> console.log(mac)
MediaAccessControlAddress { original: 'a0b1.c2d3.e4f5' }
undefined
```

To determine whether the MAC address is a broadcast, multicast (layer-two), or unicast, access its `isBroadcast`, `isMulticast`, and `isUnicast` properties.

```node
> console.log(mac.isBroadcast)
false
undefined
```

```node
> console.log(mac.isMulticast)
false
undefined
```

```node
> console.log(mac.isUnicast)
true
undefined
```

To determine whether the MAC address is a universally-administered address (UAA) or a locally-administered address (LAA), access its `isUAA` and `isLAA` properties.

```node
> console.log(mac.isUAA)
true
undefined
```

```node
> console.log(mac.isLAA)
false
undefined
```

To work with the MAC address's octets, access its `octets` property.  It contains one `Octet` object for each of the address's six octets.

```node
> console.log(mac.octets)
[ Octet { original: 'a0' },
  Octet { original: 'b1' },
  Octet { original: 'c2' },
  Octet { original: 'd3' },
  Octet { original: 'e4' },
  Octet { original: 'f5' } ]
undefined
```

To determine whether the MAC address is an extended unique identifier (EUI), an extended local identifier (ELI), or unknown, access its `type` property.

```node
> console.log(mac.type)
unique
undefined
```

To determine whether the MAC address has an organizationally-unique identifier (OUI) or a company ID (CID), access its `hasOUI` and `hasCID` properties.

```node
> console.log(mac.hasOUI)
true
undefined
```

```node
> console.log(mac.hasCID)
false
undefined
```

To view the binary equivalent of the MAC address, access its `binary` and `reverseBinary` properties. With `binary`, the most-significant digit of each octet appears first.  With `reverseBinary`, the least-significant digit of each octet appears first.

```node
> console.log(mac.binary)
101000001011000111000010110100111110010011110101
undefined
```

```node
> console.log(mac.reverseBinary)
000001011000110101000011110010110010011110101111
undefined
```

To return the MAC address's two "fragments," call the `toFragments` method.  For an EUI, this means the 24-bit OUI as the first fragment and the remaining interface-specific bits as the second fragment.  For an ELI, this means the 24-bit CID as the first fragment and the remaining interface-specific bits as the second fragment.

```node
> var fragments = mac.toFragments()
undefined
> console.log(fragments)
[ 'a0b1c2', 'd3e4f5' ]
undefined
```

To return the MAC address in different notations, call the `toPlainNotation`, `toHyphenNotation`, `toColonNotation`, and `toDotNotation` methods.

```node
> var plain = mac.toPlainNotation()
undefined
> console.log(plain)
a0b1c2d3e4f5
undefined
```

```node
> var hyphen = mac.toHyphenNotation()
undefined
> console.log(hyphen)
a0-b1-c2-d3-e4-f5
undefined
```

```node
> var colon = mac.toColonNotation()
undefined
> console.log(colon)
a0:b1:c2:d3:e4:f5
undefined
```

```node
> var dot = mac.toDotNotation()
undefined
> console.log(dot)
a0b1.c2d3.e4f5
undefined
```


## Testing macaddress after installation

Run `npm` with the `test` command.

```bash
npm test
```


## A note on OUIs, CIDs, UAAs, and LAAs

It appears that all OUIs are UAAs, all UAAs are OUIs, all CIDs are LAAs, but not all LAAs are CIDs.
