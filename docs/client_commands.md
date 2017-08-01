## Commands used by a client
A client can send a binary command back to the server.

The command HEADER has the following layout:

```
First 24 bits :: Command origin

01110100 01100110 01100011
   't'      'f'      'c'

Next 16 bits :: Command version : UInt16
0000000000000000

Next 32 bits :: Command size, including header and payload, in bytes :: UInt32
00000000000000000000000000000000

Next 8 bits :: Command payload type: UInt8
00000000

Header length = 80 bits = 10 bytes
```
