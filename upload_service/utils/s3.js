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
    uploadFileToS3(file){
        const params = {
            Bucket: this.bucket,
            Key: file.originalname,
            Body: file.buffer
        };
        // Upload the file to S3
       return this.s3.upload(params, (err, data) => {
            if (err) {
                console.log('Error uploading file:', err);
                return {"error":this.S3_ERROR_UPLOAD_MSG}; 
            } else {
                console.log('File uploaded successfully. File location:', data.Location);
                return {"success":this.S3_SUCCESS_UPLOAD_MSG}; 
            }
        });
    } 
}
export default awsS3;


