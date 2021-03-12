require('dotenv').config();
const faker = require('faker');
const { AWS, S3 } = require('./aws.js');
const nano = require('nano');
const { createCouch } = require('./schema.js');

const languages = ['English', 'Spanish', 'French', 'Portuguese', 'German', 'Italian', 'Cambodian', 'Thai', 'Shyriiwook'];

let params = { Bucket: 'userservicebucket' };

console.log(S3.accessKeyId);

// let listAllKeys = S3.listObjectsV2(params).promise();

// const getImgKeys = () => {
//   return new Promise((resolve, reject) => {
//     listAllKeys
//       .then(({Contents}) => {
//           let allKeys = Contents.map(({Key}) => Key)
//           resolve(allKeys[faker.random.number({ min: 0, max: 999 })]);
//         })
//       .catch(err => {
//         console.log(err)
//         reject(err);
//       })
//   })
// };

// const seedUser = async (id) => {
//   try {
//     const S3Url = await getImgKeys();
//     console.log('s3', S3Url)
//     const user = await createCouch();
//     const userData = await user.insert({
//       userId: id,
//       name: faker.name.firstName(),
//       joinDate: faker.date.past(),
//       bio: faker.lorem.sentences(),
//       avatarUrl: `https://userservicebucket.s3.us-east-2.amazonaws.com/${S3Url}`,
//       isSuperhost: faker.random.boolean(),
//       identityVerified: faker.random.boolean(),
//       languages: faker.random.arrayElements(languages, faker.random.number({ min: 0, max: 3 })),
//       responseRate: faker.random.number({ min: 93, max: 100 }),
//       responseTime: 'within an hour'
//     });
//     return userData;
//   } catch (err) {
//     console.error(err);
//   }
// };

// seedUser(1);