const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const express=require('express');
const expressAsyncHandler=require('express-async-handler');
const multer = require('multer');
const uploadImageRoutes=express.Router();
const dotenv=require('dotenv');
dotenv.config();
const s3Client = new S3Client({
    region: process.env.AWS_ACCOUNT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY,
      secretAccessKey: process.env.AWS_ACCOUNT_SECRET_ACCESS_KEY,
    },
  });

const uploadImage=async (file) => {
    try {
      const contentType = file.mimetype;
  
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: contentType,
      };
  
      const response = await s3Client.send(new PutObjectCommand(params));
      console.log("File uploaded to S3:", response);
    
    } catch (error) {
      console.error("Failed to upload file to S3:", error);
      res.status(500).json({ error: "Failed to upload file to S3" });
    }
  };
  
module.exports=uploadImage;