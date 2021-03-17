require('dotenv').config();
const AWS = require('aws-sdk');

const S3 = new AWS.S3({
  region: process.env.AWS_REGION,
  apiVersion: 'latest',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

let params = { Bucket: 'userservicebucket' };


const getImgKeys = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const bucket = await S3.listObjectsV2(params, (err, data) => {
        if (err) console.log(err);
        else {
          let object = data.Contents;
          resolve(data.Contents)
        }
      });
    } catch(err) {
      console.log(err);
    }
  })
}

module.exports = { S3, AWS, getImgKeys };