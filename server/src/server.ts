import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
// const url = "https://invoice-tracker-server.onrender.com"
const url = "http://localhost:3000"
const interval = 1000 * 60 * 10; // 5 minutes in milliseconds
app.use(express.json());
app.set("trust proxy", true);

function reloadWebsite() {
    axios
        .get(url + "/u-awake")
        .then((response) => {
            console.log("website reloded");
        })
        .catch((error) => {
            console.error(`Error : ${error.message}`);
        });
}
setInterval(reloadWebsite, interval);
app.get("/u-awake", (req: Request, res: Response) => {
    res.send({ message: "ya-awake" });
});

app.get("/log", (req: Request, res: Response) => {
    // Trust proxy is already set in app config

    // Get direct IP from socket (likely internal IP on platforms like Render)
    const directIp = req.socket.remoteAddress;

    // Check the 'x-forwarded-for' header (may contain the real client IP if behind a proxy)
    const forwarded = req.headers['x-forwarded-for'];

    // Determine the real client IP: use forwarded IP if available, otherwise use socket IP
    const realIp = typeof forwarded === 'string' ? forwarded.split(',')[0] : directIp;

    // Log various forms of IP for debugging
    console.log("req.ip:", req.ip);                     // Express-calculated IP (uses trust proxy)
    console.log("req.ips:", req.ips);                   // Array of IPs from 'x-forwarded-for'
    console.log("req.socket.remoteAddress:", directIp); // Direct socket IP (raw TCP)
    console.log("x-forwarded-for header:", forwarded);  // Raw forwarded-for header
    console.log("Final chosen IP:", realIp);            // Our derived client IP

    // Respond to client
    res.send(`Your IP is: ${realIp}`);
});




app.get("/", (req: Request, res: Response) => {
    res.send({ message: "Server is working!" });
});




app.listen(3000, () => {
    console.log(`Server is running on port 3000`);

});
