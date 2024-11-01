import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRouter from "./routes/upload.routes.js"; 
import kafkaPublisherRouter from "./routes/kafka.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    allowedHeaders: ["*"],
    origin: "*"
}));
app.use(express.json());
app.use("/upload", uploadRouter);
app.use('/publish', kafkaPublisherRouter);
app.listen(port,() =>{
    console.log(`Server is listening @ http://localhost:${port}`);
});