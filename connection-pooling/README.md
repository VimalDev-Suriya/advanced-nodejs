# Connection pooling:

A technique to cache the pre-established connections, so the successive request will re-use the cached request, instead of creating. establishing and destroying a TCP connection.

## Without connection pooling:

Everytime when the code performs a API call, there are 5 major steps were followed

1. DNS lookup
2. TCP handshake
3. TLS and SSL connection establish
4. Data transfer
5. Destroying the connection

by successfull connection pooling the steps (1, 2, & 3) can be skipped. So the server **will never experience the exhaust TCP ports**.

- We can re-use the same request for all set of API calls.
- Once the request was processed successfully, the connection will never be closed

## Why do we need connection pooling?

1. Server can skip the first 3 steps, which can drastically reduce the latency of the API response if there was a frequent call to tye corresponding API.
2. Conserver the Server resources (CPU and RAM), so the server and clinet be in sync as fast as possible