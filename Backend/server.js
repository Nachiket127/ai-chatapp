import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/config/database.js"
import dns from "dns"

dns.setServers(['8.8.8.8','1.1.1.1']);

connectDB();

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})