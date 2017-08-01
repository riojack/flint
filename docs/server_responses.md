## Responses sent by a server
A server responds.  It is not anti-social... usually.

The response HEADER has the following layout:

```
First 24 bits :: Command origin

01110100 01100110 01100011
   'r'      'f'      's'

Next 16 bits :: Command version : UInt16
0000000000000000

Next 32 bits :: Command size, including header and payload, in bytes :: UInt32
00000000000000000000000000000000

Next 8 bits :: Command payload type: UInt8
00000000

Header length = 80 bits = 10 bytes
```
