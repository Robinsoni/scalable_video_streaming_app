import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    allowedHeaders: ["*"],
    origin: "*"
}));
app.use("/", (req, res) => {
    console.log(" entered into root navigation "); 
    res.send('Youtube project');
});

app.listen(port,() =>{
    console.log(`Server is listening @ http://localhost:${port}`);
});