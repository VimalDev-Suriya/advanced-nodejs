# Duplex

As name suggest, it can perform both readable and writable at the same time. It means that the readable and writable are not in sync with each other,they will execute in same object with completly different context

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
