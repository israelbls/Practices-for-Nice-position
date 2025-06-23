require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function uploadFileToS3(filePath, fileName) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: fileStream
        };
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log(`File uploaded successfully: ${fileName}` + data.$metadata.httpStatusCode);
    } catch (error) {
        console.error(`Error uploading file: ${error.message}`);
    }
}

// const filePath = path.join(__dirname, 'my-test-file.txt');
// const fileName = 'test-from-node.txt';
// uploadFileToS3(filePath, fileName);

async function downloadFileFromS3(fileName, downloadPath) {
    try {
        const downloadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName
        }
        const data = await s3.send(new GetObjectCommand(downloadParams));
        const writeStream = fs.createWriteStream(downloadPath);
        data.Body.pipe(writeStream);
        writeStream.on('close', () => {
            console.log(`File downloaded successfully: ${fileName}`);
        });
    } catch (error) {
        console.error(`Error downloading file: ${error.message}`);
    }
}

const fileName = 'test-from-node.txt';
const downloadPath = path.join(__dirname, 'downloaded-file.txt');
downloadFileFromS3(fileName, downloadPath);