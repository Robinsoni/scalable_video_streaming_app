import express from "express";
import dotenv from "dotenv";
import KafkaConfig from "./kafka/kafka.js";
dotenv.configDotenv(); 
const port = process.env.PORT || 8081;

const app = express();

const kafkaconfig =  new KafkaConfig();
kafkaconfig.consume("transcode", (value)=>{
   console.log("got data from kafka : " , value);
});

app.use("/",);
app.listen(port, () => {
    console.log(`Transcoder service connected on port : ${port}`);
});