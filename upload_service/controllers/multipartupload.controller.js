import awsS3 from "../utils/s3.js";
export const initializeUpload = async (req, res) => {
    try {
        console.log("Initialize upload");
        const { filename } = req.body;
        console.log(filename);
        const s3 = new awsS3().s3;
        const bucketName = process.env.AWS_BUCKET;

        const createParams = {
            Bucket: bucketName,
            Key: filename,
            ContentType: 'video/mp4'
        };
        const multipartParams = await s3.createMultipartUpload(createParams).promise();
        console.log("multipartparams --- ", multipartParams);
        const uploadId = multipartParams.UploadId;
        res.status(200).json({ uploadId });
    } catch (err) {
        console.error('Error initializing upload:', err);
        res.status(500).send('Upload initialization failed');
    }
};
export const abort = async (req, res) => {
    try {
        const {key,uploadId} = req.body;
        const bucketName = process.env.AWS_BUCKET;
        const abortParams = {
          Bucket: bucketName,
          Key: key,
          UploadId: uploadId,
        };
        const s3 = new awsS3().s3;
        var data = await s3.abortMultipartUpload(abortParams).promise();
        console.log("Multipart upload aborted successfully.", data);
        return res.status(200).send("Multipart upload aborted successfully.");
    } catch (err) {
        console.error("Error aborting multipart upload:", err);
        return res.status(500).send("Error aborting multipart upload.");
      }
};

export const uploadChunk = async (req, res) => {
    console.log("chunk upload");
    try {
        const { filename, chunkIndex, uploadId } = req.body;
        const s3 = new awsS3().s3;
        const bucketName = process.env.AWS_BUCKET;
        const partParams = {
            Bucket: bucketName,
            Key: filename,
            UploadId: uploadId,
            PartNumber: parseInt(chunkIndex) + 1,
            Body: req.file.buffer,
        };

        const data = await s3.uploadPart(partParams).promise();
        console.log("data------- ", data);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error uploading chunk:', err);
        res.status(500).send('Chunk could not be uploaded');
    }
};

export const completeUpload = async (req, res) => {
    try {
        console.log('Completing Upload');
        const { filename, totalChunks, uploadId, title, description, author } = req.body;
        const uploadedParts = [];
        // Build uploadedParts array from request body
        for (let i = 0; i < totalChunks; i++) {
            uploadedParts.push({ PartNumber: i + 1, ETag: req.body[`part${i + 1}`] });
        }
        const s3 = new awsS3().s3;
        const bucketName = process.env.AWS_BUCKET;
        const completeParams = {
            Bucket: bucketName,
            Key: filename,
            UploadId: uploadId,
        };
        // Listing parts using promise
        const data = await s3.listParts(completeParams).promise();
        const parts = data.Parts.map(part => ({
            ETag: part.ETag,
            PartNumber: part.PartNumber
        }));
        completeParams.MultipartUpload = {
            Parts: parts
        };
        // Completing multipart upload using promise
        const uploadResult = await s3.completeMultipartUpload(completeParams).promise();
        console.log("data----- ", uploadResult);
        return res.status(200).json({ message: "Uploaded successfully!!!" });
    } catch (error) {
        console.log('Error completing upload :', error);
        return res.status(500).send('Upload completion failed');
    }
};
