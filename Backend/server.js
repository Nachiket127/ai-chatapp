import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/config/database.js"
import dns from "dns"
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js"

dns.setServers(['8.8.8.8','1.1.1.1']);

const httpServer = http.createServer(app);
initSocket(httpServer);

connectDB();

const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})