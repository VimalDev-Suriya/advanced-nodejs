# API DESIGN PRINCIPLE:

## Table of Contents

1. API Design
2. RESTful
3. GraphQL
4. Protocols
5. AuthN and AuthZ
6. Security

- JWT, OAuth2, SSO, Access vs Refresh
- Rate Limiting
- CQRS
- Injections
- Bearer
- Firewalls
- CSRF
- XSS
- Basic base64

## API Design Fundamentals:

Application Programming Interface - ability to make the clinet and server tocommuncate with each other.

- API is the abstraction layer which hide the business logic.

### Types of API's:

1. REST - Resource based, Stateless, (web & mobile UI)
2. Graph QL - Query language, Single endpoint but different query to retrive the specific data. (Complex User Interfaces)
3. gRPC - Highly performant, Method type, Streaming (uni & bi directional), (micorservices)

### REST vs GraphQL:

**REST**:

1. Resource based endpoints
2. Can be versioning - (/v1, /v2)
3. Multiple requests for related data (round trips)
4. Build in http caching
5. Fixed contract
6. HTTP methods define the operations

**GraphQL**:

1. Single endpoint for all operations
2. Single request for precise data
3. Query language defines operations
4. Appliction level caching
5. No versioning

### Key Design pillers for all API's:

1. Consistency - naming convention
2. Simplicity
3. Security - AuthN, AuthZ, rate limiting, input validation
4. Performance - caching strategies, Pagination, Minimize paylaods, Reduce round trips.

### Approach:

1. Top-down - High level requirements
2. Bottom - up - Existing data models
3. Contract First: API contract before implemetation (Similar to top-down)

## API Protocals

1. HTTPS/ HTTP
2. Web Scokets
3. AMQP (Advanced Message Queuing Protocal)
4. gRPC (Google Remote Procedure Call)

### OSI Model

1. Application Layer
   1. HTTPS/ HTTP
   2. Web Scokets
   3. AMQP (Advanced Message Queuing Protocal)
   4. gRPC (Google Remote Procedure Call)
2. Transport Layer
   1. TCP & UDP
3. Network Layer - IPv4 and IPv6
4. Data Link Layer - Ethernet, WiFi, Bluetooth
5. Physical layer
