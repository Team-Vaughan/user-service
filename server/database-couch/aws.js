require('dotenv').config();
const AWS = require('aws-sdk');

const S3 = new AWS.S3({
  region: process.env.AWS_REGION,
  apiVersion: 'latest',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = { S3, AWS };