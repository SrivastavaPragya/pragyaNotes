// HTTP in System Design: Methods, Status & Headers
//
// HTTP (Hypertext Transfer Protocol) is the foundational application-layer protocol for data
// exchange on the web, operating as a stateless request-response protocol between clients and
// servers. It has evolved from HTTP/1.1's sequential processing through HTTP/2's multiplexing to
// HTTP/3's QUIC-based transport, each solving critical performance bottlenecks. Understanding
// HTTP versions, methods, status codes, and headers is essential for designing scalable APIs and
// web services.
//
// 1. HTTP/1.1 — Ek Line, Ek Order (The Sequential Era)
// Desi Analogy:
// Maano tum ek dhabe par gaye. Wahan ek hi waiter (Single Connection) hai. Tumne 3 cheezein order
// keen: 1. Paani (Choti request), 2. Paneer Tikka (Medium), aur 3. Biryani (Jise banne mai time
// lagega — Heavy request).
// HTTP/1.1 mai Persistent Connection toh aaya (yani waiter tumhari table par hi ruka rahega,
// baar-baar kitchen se naya waiter nahi aayega), par dikkat yeh thi ki kaam Line se
// (Sequentially) hoga.
// Drawback: Head-of-Line Blocking (HOLB)
// Agar tumne pehle Biryani bol di, aur phir Paani bola, toh jab tak kitchen se Biryani ban kar
// nahi aayegi, waiter tumhe Paani lakar nahi dega! Paani peeche line mai khada reh jayega.
// Websites mai bhi yahi hota tha: Agar ek badhiya photo load hone mai fas gayi (Biryani), toh
// uske chakkar mai niche ka chota sa text ya button (Paani) bhi load nahi hota tha. Is rukawat ko
// kehte hain Head-of-Line Blocking at Application Layer.
//
// HTTP/2 — Ek Waiter, Haath mai Multiple Plates (The Multiplexing Era)
// HTTP/1.1 ka dukh dekh kar HTTP/2 laya gaya. Isne do naye dhasu concepts diye: Binary Framing aur
// Multiplexing.
// Desi Analogy:
// Ab dhabe ka waiter up-to-date ho gaya. Uske paas ek badi si tray hai (Single TCP Connection).
// Woh kitchen jata hai, Biryani ka thoda sa hissa plate mai rakhta hai, Paneer Tikka ka ek piece
// rakhta hai, aur Paani ka glass bhi rakh leta hai. Woh sabko ek saath (Parallel) tumhari table
// par laata rehta hai.
// Binary Framing: Pehle data plain text (English) mai jata tha, ab data 0s aur 1s (Binary) ke
// chhote-chhote tukdon (Frames) mai toot jata hai.
// Multiplexing: Ek hi connection ke andar saari requests aur responses ke tukde bina ek-dusre ko
// roke aage-piche aa-ja sakte hain.
// Iska Drawback kya tha? (Transport Layer HOLB)
// Yahan application level par toh problem solve ho gayi, par ek naya panga phas gaya. HTTP/2 abhi
// bhi TCP protocol par chal raha tha.
// TCP ka rule hai ki saara data line se aur sahi-salamati se pahunchna chahiye. Maano waiter tray
// lekar aa raha hai aur raste mai uske haath se Paneer Tikka ka piece gir gaya (Packet Drop). Ab
// TCP ka rule yeh hai ki jab tak kitchen se naya Paneer Tikka bankar nahi aayega aur tray mai fit
// nahi hoga, tab tak waiter table par baaki bacha hua Paani aur Biryani bhi server nahi kar sakta!
// Yani ek packet loss hone par poora ka poora TCP connection hi jam (block) ho jata tha. Isko
// kehte hain Transport Layer Head-of-Line Blocking.
//
// HTTP/3
// For over 30 years, HTTP relied entirely on TCP (Transmission Control Protocol) to transport
// data. HTTP/3 completely abandons TCP and introduces a new transport protocol called QUIC
// (Quick UDP Internet Connections), which runs on top of UDP.
// Here are the two primary reasons why this shift was necessary:
// 1. Elimination of Transport-Layer Head-of-Line Blocking (HOLB)
// In HTTP/2, we gained the ability to send multiple files (JS, CSS, Images) at the exact same
// time over a single connection (Multiplexing). However, because it used TCP, the network viewed
// all these files as a single, continuous stream of bytes.
// The Problem: If you were downloading 10 images simultaneously, and just one packet of data
// from the 1st image got lost in transit, TCP would freeze the entire connection. The remaining 9
// images would stop loading entirely until that single lost packet was retransmitted and
// repaired.
// The HTTP/3 Solution: QUIC natively understands that multiple streams are running
// independently. If a packet from Image 1 is lost, only Image 1 stalls. Image 2 through 10
// continue downloading at full speed without interruption.
//
// 3. HTTP/3 — Alag-Alag Delivery Boys (The QUIC/UDP Era)
// TCP ki is jadd (rigidity) ko khatam karne ke liye aaya HTTP/3. Isne TCP ko lathmar bhaga diya
// aur uski jagah QUIC protocol banaya jo UDP par chalta hai.
// Desi Analogy:
// Ab dhabe ne apna system badal diya. Unhone ek waiter ke bharose rehna chhod diya. Unhone 3
// alag-alag Chotu (Independent Streams) pakad liye.
// Ek Chotu Paani lekar dauda.
// Ek Chotu Paneer Tikka lekar dauda.
// Ek Chotu Biryani lekar dauda.
// Agar raste mai Paneer Tikka wale Chotu ka pair fisal gaya aur Paneer gir gaya, toh baaki ke do
// Chotu (Paani aur Biryani wale) nahi rukenge! Woh tumhari table par turant delivery de denge.
// Sirf Paneer Tikka dobara aayega. Is tarah Transport Layer ka Head-of-Line Blocking hamesha ke
// liye khatam ho gaya.
//
// When to Use (and When Not To)
// Use HTTP/1.1 when you need maximum compatibility with legacy systems or when debugging
// simplicity is paramount. It's appropriate for internal tools, admin interfaces, or systems
// where request volume is low (< 10 requests/second). If your infrastructure doesn't support
// HTTP/2 or you're working with embedded systems with limited resources, HTTP/1.1 remains
// viable. However, for any modern web application or public API, HTTP/2 should be the baseline.
// HTTP/2 is the right choice for most web applications and APIs today. It provides significant
// performance improvements with minimal migration risk. Use HTTP/2 when serving web pages with
// many resources, building REST APIs with moderate request rates (100-10,000 requests/second), or
// when clients are primarily browsers or modern HTTP clients. The single-connection model
// simplifies server resource management compared to HTTP/1.1's multiple connections. Enable
// HTTP/2 if you're using HTTPS (required by browsers) and your infrastructure supports it—most
// modern web servers (nginx, Apache, Caddy) and cloud load balancers support HTTP/2 with simple
// configuration changes.
// HTTP/3 is ideal for mobile applications, video streaming services, and global applications
// where users experience variable network conditions. If your users frequently switch networks
// (WiFi to cellular), HTTP/3's connection migration prevents interruptions. For applications
// serving users on lossy networks (mobile, satellite, developing regions), HTTP/3's independent
// stream delivery provides 10-20% latency improvements. However, adopt HTTP/3 only if you can
// handle the infrastructure complexity and CPU overhead. Implement it as an opt-in upgrade using
// the Alt-Svc header, maintaining HTTP/2 as a fallback.
