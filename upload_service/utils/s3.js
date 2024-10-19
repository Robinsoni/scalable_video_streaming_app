import AWS from 'aws-sdk';
class awsS3{
    constructor(){
        AWS.config.update({
            region: 'ap-south-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
        this.s3 = new AWS.S3();
        this.bucket = process.env.AWS_BUCKET; 
        // Set standard messages for s3 response.
        this.S3_SUCCESS_UPLOAD_MSG = "File uploaded successfully";
        this.S3_ERROR_UPLOAD_MSG = "File could not be uploaded!";
    } 
}
export default awsS3;


