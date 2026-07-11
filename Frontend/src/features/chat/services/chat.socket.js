import {io} from "socket.io-client"

let socket;
const SOCKET_URL = import.meta.env.VITE_API_URL || window.location.origin;

export const initializeSocketConnection = () => {
    socket = io(SOCKET_URL, {
        withCredentials: true,
    })

    socket.on("connect", () => {
        console.log("Connected to the socket io server");
    })

    return socket;
}