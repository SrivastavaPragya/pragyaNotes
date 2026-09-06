// Communication protocol
//
// The Network/Transport Layer (TCP/UDP):
// The delivery guys. They don't care if they are carrying a JPEG, a text message, or video stream
// data.
// Their only job is to move raw bytes across the network reliably or quickly.
//
// The Application Layer (HTTP/REST/RPC):
// The actual content of the letter. This layer defines the language, rules, and syntax that two
// software applications use to talk to each other.
//
// Network Layer: TCP vs. UDP
// These protocols handle connection management, data packet segmentation, and error checking.
// TCP (Transmission Control Protocol)
// How it works: Highly reliable and connection-oriented. It establishes a connection via a
// "3-way handshake" before sending data. It ensures all packets arrive in the exact order they
// were sent and retries if any data is lost.
// Best for: Web browsing (HTTP), email, file transfers, database connections.
// Trade-off: Slower due to the overhead of ensuring reliability.
// UDP (User Datagram Protocol)
// How it works: Lightweight and connectionless. It just fires packets ("datagrams") at the
// destination without checking if they actually arrived or came in the right order.
// Best for: Live video streaming, online gaming, voice calls (VoIP), DNS lookups.
// Trade-off: Fast and low-latency, but data packets can be lost or dropped.
//
// Application Layer
// Bhai, simple shabdo mai samjho: HTTP aur REST ko banaya gaya tha "Websites" ke liye, jabki RPC
// ko banaya gaya hai "Fast Actions" ke liye.
// Jab tum browser pe koi website kholte ho, toh REST bilkul sahi hai. Par jab piche backend mai
// hazaaron servers (microservices) ko aapas mai ek dusre se baat karni ho, toh REST bohot dheema
// (slow) aur bhari (heavy) ho jata hai.
// Bas isi backend ki speed badhane ke liye RPC (gRPC) ka use hota hai.
// Chalo isko ek aasan real-life analogy se samajhte hain.
// Real-Life Analogy: REST vs RPC
// Maano tum ek hotel mai ho:
// REST (Formal Waiter): Tum waiter ko bulate ho, woh menu card (URL) deta hai. Tum bolte ho
// "Mujhe paneer tikka chahiye" (JSON Request). Waiter kitchen jata hai, plate lekar aata hai
// (JSON Response). Yeh tarika bohot badhiya hai, par isme bohot formal tareeke se baat karni
// padti hai, har baar poora naam bolna padta hai, aur text-based communication hota hai.
// RPC (Kitchen ke andar ka Walkie-Talkie): Ab socho kitchen ke andar jo Chef 1 hai, usko Chef 2
// se bolna hai "tandoor garam kar". Woh waiter ke zariye chitthi (REST) nahi bhejega. Woh seedha
// walkie-talkie uthayega aur bolega garamKar(tandoor). Dusra chef turant action lega.
// RPC ka kaam yahi walkie-talkie banna hai. Ek server, dusre server ke function ko aise call kar
// deta hai jaise woh uske khud ke computer mai chal raha ho.
// HTTP/REST ke hote hue bhi RPC kyu aaya? (3 Main Reasons)
// Agar hamare paas REST tha, toh RPC ki zaroorat kyu padi? Iske piche 3 sabse bade technical
// reasons hain:
// 1. JSON bohot heavy aur slow hai (Text vs Binary)
// REST mai saara data JSON format mai jata hai, jo ki plain text hota hai:

const restExampleJson = {
  userId: 101,
  userName: "Rahul",
};

// Insan ke padhne ke liye toh yeh accha hai, par computers ko pehle is text ko binary (0s and 1s)
// mai badalna padta hai, jisme time lagta hai (Serialization overhead).
// RPC (khaskar modern gRPC) data ko text mai nahi bhejta. Woh usko pehle se hi highly compressed
// Binary format mai convert kar deta hai. Network par sirf chote-chote bytes jate hain, jisse
// speed 10 guna tak badh jaati hai.
// 2. HTTP/1.1 ki limitations vs HTTP/2 ka power
// Zyadatar REST APIs HTTP/1.1 use karti hain. Isme ek dikkat hoti hai: ek baar mai ek connection
// par ek hi request-response ja sakta hai. Agar ek saath 50 requests bhejni hain, toh waiting
// line (Head-of-line blocking) lag jaati hai.
// Modern RPC (gRPC) HTTP/2 use karta hai. Isme ek single pipe (connection) ke andar se ek hi time
// par hazaron requests aur responses bina ruke aa-ja sakte hain (Multiplexing). Isme real-time
// streaming bhi default milti hai.
//
// so basically rpc sirt backend to backend (microserices) call ke liye hai??
//
// Haan, moti-moti baat yahi hai! Agar tum aaj ke modern development architecture ki baat kar rahe
// ho, toh gRPC/RPC ka 95% use case backend-to-backend (microservices) communication hi hai.
// Par technical terms mai bolen toh aisa koi pathar ki lakeer nahi hai ki isko frontend se use
// nahi kiya ja sakta, par log karte nahi hain. Chalo iska poora sach aasan shabdo mai samajhte
// hain.
// Log Frontend (React/Mobile) se RPC kyu nahi use karte?
// Agar tum chaho toh React ya Android app se seedha gRPC call maar sakte ho (iske liye gRPC-Web
// jaisi libraries aati hain), par production mai koi aisa jaldi karta nahi hai. Iske 3 bade
// kaaran hain:
// 1. Browsers ko Binary samajh nahi aati
// RPC (gRPC) data ko Protobuf (Binary) mai bhejta hai. Browsers (Chrome, Safari) ko natively
// binary data decode karne mai dikkat hoti hai. Browser bana hi text (HTML, JSON) ke liye hai.
// Agar tum zabardasti browser mai binary data laoge, toh tumhe bich mai ek extra "Proxy layer"
// lagani padegi jo binary ko fir se convert kare. Itna jhanjhat kaun pale!
//
// Graphql
// GraphQL aaya kyu? (The Problem it Solves)
// REST aur RPC dono ke sath frontend developers ko do sabse badi dikkaton ka samna karna padta
// hai:
// Over-fetching (Zaroorat se zyada data aana): Maano tumhein screen par sirf user ka naam dikhana
// hai. Tumne REST API ko call kiya GET /api/users/123. Par us API ne naam ke sath-sath uska
// address, phone number, pichle 5 saal ki history, sab bhej diya. Network ka bandwidth faltu mai
// waste hua.
// Under-fetching (Kam data aana): Maano tumhein ek dashboard banana hai jahan user ki profile,
// uske orders, aur uske notifications sab dikhane hain. REST mai tumhe 3 alag-alag calls maarne
// padenge: GET /user, GET /orders, aur GET /notifications. Isse app slow ho jaati hai.
// GraphQL in dono problems ko ek jhatke mai khatam kar deta hai.
// GraphQL kaam kaise karta hai?
// GraphQL ka simple funda hai: "Tum utna hi mango, jitni tumhein zaroorat hai."
// GraphQL mai pure backend par sirf ek hi endpoint hota hai (usually /graphql). Frontend
// developer ek "Query" likhkar bhejta hai ki bhai mujhe is user ka sirf name aur email chahiye,
// aur backend use thik utna hi chota sa JSON return karta hai.
