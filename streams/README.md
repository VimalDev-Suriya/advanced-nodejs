# Streams

Ability to tackle the heavy data in chunk, rather than loading them entirely into the RAM and preocessing it. There are 4 variation of Streams. All the streams are `async` operations by default.

## Why Streams.

Without streams, we need to load the entire file in the RAM and we need to process them, which causes more performance issues, Consider if the file is more than 30GB. On this occasion the app will entirely blocks the thread and may result in crash <br>.

To fix this we use streams, so teh data converted into smaller chunks

## Types of Streams

1. Readable Streams - Data flows out from source - `createReadStreams`, `process.stdin`, `http.incomingMessage`
2. Writable Streams - Data flows into target - `createWriteStreams`, `process.stdout`, `http.responseMessage`
3. Duplex - Independent read / write , TCP conecctions
4. Transform - Output derived from input

- Backpressure - a technique slowing the source, when writable is slower than readable

### Readable Streams:

The Architecture looks like [./01-ReadableStreams/readable_stream_internals.svg]. <br>

'readable' gives you control — good when processing speed matters and you don't want to be flooded. 'data' is simpler but puts the stream in full-throttle flowing mode. Never mix both on the same stream.

### Writable Streams:

'drain' — the backpressure heartbeat. <br>

drain fires when the internal buffer has emptied back below the highWaterMark. It is the signal to resume writing after .write() returned false. Without it, you either flood memory or unnecessarily stall.

- we can call the drain event using once, rather than on, because we dont need this everytime, we need this only we met the backpressure.

```
new Writable()
    │
    ▼
.write(chunk) ──► [internal buffer] ──► _write(chunk, enc, cb)
    │                                          │
    │  returns true  ◄── buffer below hwm      │ cb() ── ready for next
    │  returns false ◄── buffer above hwm      │ cb(err) ── emits 'error'
    │                                          │
    ▼                                          ▼
'drain' event ◄──────── buffer emptied ◄──────┘
    │
    ▼
.end([chunk])
    │
    ▼
_final(cb) ── last-chance flush
    │
    ▼
'finish' ── all data handed to OS
    │
    ▼
'close' ── file descriptor released
```
