require('dotenv').config();
const faker = require('faker');
const { AWS, S3 } = require('./aws.js');
const nano = require('nano');
const { createCouch } = require('./schema.js');

const languages = ['English', 'Spanish', 'French', 'Portuguese', 'German', 'Italian', 'Cambodian', 'Thai', 'Shyriiwook'];

let params = { Bucket: 'userservicebucket' };

let listAllKeys = S3.listObjectsV2(params).promise();

const getImgKeys = () => {
  return new Promise((resolve, reject) => {
    listAllKeys
      .then(({ Contents }) => {
        let allKeys = Contents.map(({ Key }) => Key)
        resolve(allKeys[faker.random.number({ min: 0, max: 999 })]);
      })
      .catch(err => {
        console.log(err)
        reject(err);
      })
  })
};

const seedManyUsers = async (start, number) => {
  const user = await createCouch();
  const ids = [];
  // batchSize determines how many users get created simultaneously
  // Use batchSize to not overload image service with too many requests at once
  // Batches of 100+ requests known to cause socket error
  let batchSize = 100000;

  while (number > 0 && batchSize > 0) {
    ids.push(start);
    start++;
    number--;
    batchSize--;
  }
  const multipleUsers =  await Promise.all(ids.map(async id => {
    const S3Url = await getImgKeys();
    const userData = {
      userId: id,
      name: faker.name.firstName(),
      joinDate: faker.date.past(),
      bio: faker.lorem.sentences(),
      avatarUrl: `https://userservicebucket.s3.us-east-2.amazonaws.com/${S3Url}`,
      isSuperhost: faker.random.boolean(),
      identityVerified: faker.random.boolean(),
      languages: faker.random.arrayElements(languages, faker.random.number({ min: 1, max: 3 })),
      responseRate: faker.random.number({ min: 93, max: 100 }),
      responseTime: 'within an hour'
    };
    return userData;
  }))
  const response = await user.bulk({ docs: multipleUsers });
  console.log('seeding is done!');
};

seedManyUsers(0, 50000);