import { io } from "socket.io-client";
    
    //Socket.io for live updates 
const socket = io("http://localhost:3001", {
    autoConnect: false, // Doesn't connect until we want it to
});

export default socket;