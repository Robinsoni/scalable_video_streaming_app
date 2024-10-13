import AWS from 'aws-sdk';
import fs from "fs";
 
const uploadFileToS3 = async (req, res) => {
    console.log("In uploadFileTO S3 function");
    res.send("great to see it here.");
}
export default uploadFileToS3;