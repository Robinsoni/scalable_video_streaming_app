import express from "express";
import dotenv from "dotenv";
import KafkaConfig from "./kafka/kafka.js";
import convertToHLS from "./hls/transcode.js";
import s3ToS3 from "./hls/s3ToS3.js";
dotenv.config(); 
const port = process.env.PORT || 8081;

const app = express();

const kafkaconfig = new KafkaConfig()
kafkaconfig.consume("transcode", async (message) => {
   try {
       console.log("Got data from Kafka:", message);
      
       // Parsing JSON message value
       const value = JSON.parse(message); 
       console.log("testing the files ** ", value);
       // Checking if value and filename exist
       if (value && value.filename) {
           console.log("Filename is", value.filename);
           await s3ToS3(value.filename); // Make this change in controller
       } else {
           console.log("Didn't receive filename to be picked from S3");
       }
   } catch (error) {
       console.error("Error processing Kafka message:", error);
       // You might want to handle or log this error appropriately
   }
});

app.use("/transcode_stage", async(req,res) => {
    await s3ToS3();
    res.status(200).send("Transcoding successful");
});


app.use("/health",(req,res)=>{return res.status(200).send({"status":"Good health"});});
app.listen(port, () => {
    console.log(`Transcoder service connected on port : ${port}`);
});