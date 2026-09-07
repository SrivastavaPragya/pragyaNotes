// RPC vs REST: Remote Procedure Call Explained
//
// In system design interviews, RPC is a critical decision point that reveals your understanding of
// API design trade-offs. Interviewers want to see if you know when to choose RPC over REST—typically
// for internal service-to-service communication where performance and type safety matter more than
// flexibility. Companies like Google built their entire infrastructure on RPC (with gRPC), while
// Netflix uses it extensively for low-latency microservice calls. Understanding RPC demonstrates you
// can make pragmatic architectural choices: REST for public APIs where clients are diverse and
// unknown, RPC for internal systems where you control both ends and need maximum efficiency. The
// ability to articulate this trade-off—and explain why Stripe uses REST externally but RPC
// internally—is what separates mid-level engineers from senior architects.
//
// RPC vs REST: When to Use Each
// Technical Trade Offs
// REST's resource model maps naturally to HTTP semantics, making it cacheable by default. A
// GET /users/123 request can be cached by CDNs, reverse proxies, and browsers without any custom
// logic. RPC calls, even read-only ones, typically use POST requests (since they're sending
// procedure parameters in the body), which breaks HTTP caching. You can work around this with
// custom cache headers, but you're fighting the framework. However, RPC wins on performance for
// internal systems: binary serialization is 5-10x more compact than JSON, and frameworks like gRPC
// use HTTP/2 multiplexing to send multiple requests over a single connection. REST's text-based
// JSON over HTTP/1.1 incurs significant overhead. For type safety, RPC is unmatched—your IDE
// autocompletes remote function calls and catches type errors before you commit code. REST APIs
// require runtime validation and manual deserialization, leading to the classic 'undefined is not
// a function' errors when the API changes.
