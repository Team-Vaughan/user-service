require('dotenv').config();
const AWS = require('aws-sdk');

const S3 = new AWS.S3({
  region: process.env.AWS_REGION,
  apiVersion: 'latest',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadPhotoToS3 = (photo) => {
  const uploadParams = {
    ACL: 'public-read',
    Body: photo.data,
    Bucket: process.env.AWS_BUCKET_KEY,
    ContentType: 'image/jpeg',
    Key: `${Date.now()}.jpg`,
  };

  return new Promise((resolve, reject) => {
    S3.upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports = {
  S3,
  uploadPhotoToS3,
  AWS
};