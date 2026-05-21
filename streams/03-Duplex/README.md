# Duplex

As name suggest, it can perform both readable and writable at the same time. It means that the readable and writable are not in sync with each other,they will execute in same object with completly different context

**The read and write sides of a Duplex share nothing internally.
Writing data in does NOT automatically make it readable out — that is Transform's job**

## Mental Model:

```
                 ┌────────────────────────────┐
 .on('data') ←── │  READ side   [read buffer] │ ←── _read() / push()
                 │                            │
 .write()    ──► │  WRITE side [write buffer] │ ──► _write() / callback()
                 └────────────────────────────┘
                Data written in ≠ data read out
```

- The Web Sockets, TCP connections are the example of Duplex
- `halfOpen` State is the one which tells whether if the read stops , then write should also be stopped. Its the boolean value
  - if true - any one may be open (either read/write)
  - if false - both read and write will be closed if ay one was closed
- The Property called as `passthrough`, as name suggest it help us to be a intermediate element in the pipe of streams, which acn help us to log/monitor the flow of readable/writabel sterams
