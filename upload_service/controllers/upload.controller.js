import fs from "fs";
import awsS3 from '../utils/s3.js';
 
const uploadFileToS3 = async (req, res) => { 
    console.log("req** ",req.file);
    if(!req.file){
        return res.status(400).send('No file received');
    }
    try{
        const s3 = new awsS3();
        const uploadRes = await s3.uploadFileToS3(req.file);
         
        if(uploadRes.success){ 
            return res.status(200).send(uploadRes.success);
        }else{
            return res.status(200).send(uploadRes.error);
        }
    }catch(err){
        console.log(
            "Error Occurred while upload** ",err
        );
        return res.status(400).send("S3 file upload error");
    }
}
export default uploadFileToS3;