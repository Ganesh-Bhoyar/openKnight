// import ws from "ws";
// import { useEffect, useState } from "react";

// const SocketLogic = () => {
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [message, setMessage] = useState<string>("");
//   const [connected, setConnected] = useState<boolean>(false);

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8080");
//     setSocket(socket);

//     socket.onopen = () => {
//       setConnected(true);
//     };

//     socket.onmessage = (event) => {
//       setMessage(event.data);
//     };

//     socket.onclose = () => {
//       setConnected(false);
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Socket Logic</h1>
//       <p>Connected: {connected ? "Yes" : "No"}</p>
//       <p>Message: {message}</p>
//     </div>
//   );
// };