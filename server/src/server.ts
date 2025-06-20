import express, { Request, Response } from "express";


const app = express();
app.use(express.json());
app.set("trust proxy", true);

app.get("/", (req: Request, res: Response) => {
    // res.send("Hello, Worldd!");
    console.log(req.ip)
    console.log(req.headers)

    // res.send(req.ip);

});

app.get("/api", (req: Request, res: Response) => {
    res.send({ message: "API is working!" });
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`); 
    
});
