## Introduction

`ExtendedIdentifier48` relies upon `Octet` to convert hexadecimal digits to their binary and reverse-binary equivalents.  This file describes how to use `Octet` on its own.

## Using Octet

Require `Octet`.

```node
> var Octet = require("macaddress").Octet
undefined
```

Instantiate `Octet`, passing in two hexadecimal digits.  `Octet` accepts both uppercase letters and lowercase letters.

```node
> var digits = "a0"
undefined
> octet = new Octet(digits)
undefined
> console.log(octet)
Octet { original: 'a0' }
undefined
```

To view the binary equivalent of the hexadecimal digits, access the octet's `binary` and `reverseBinary` properties.  With `binary`, the most-significant digit appears first.  With `reverseBinary`, the least-significant digit appears first.

```node
> console.log(octet.binary)
10100000
undefined
```

```node
> console.log(octet.reverseBinary)
00000101
undefined
```
