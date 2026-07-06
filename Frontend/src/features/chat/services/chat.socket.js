import {io} from "socket.io-client"

let socket;

export const initializeSocketConnection = () => {
    socket = io("http://localhost:3000", {
        withCredentials: true,
    })

    socket.on("connect", () => {
        console.log("Connected to the socket io server");
    })

    return socket;
}