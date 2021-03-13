require('dotenv').config();
const { generatePhoto } = require('./helpers');
const faker = require('faker');
const { AWS, S3 } = require('./aws.js');
const { mongoose, User } = require('./schema.js');

const languages = ['English', 'Spanish', 'French', 'Portuguese', 'German', 'Italian', 'Cambodian', 'Thai', 'Shyriiwook'];

let params = { Bucket: 'userservicebucket' };

let listAllKeys = S3.listObjectsV2(params).promise();

const getImgKeys = () => {
  return new Promise((resolve, reject) => {
    listAllKeys
      .then(({Contents}) => {
          let allKeys = Contents.map(({Key}) => Key)
          resolve(allKeys[faker.random.number({ min: 0, max: 999 })]);
        })
      .catch(err => {
        console.log(err)
        reject(err);
      })
  })
}

const seedUser = async (id) => {
  try {
    const S3Url = await getImgKeys();
    const user = new User({
      userId: id,
      name: faker.name.firstName(),
      joinDate: faker.date.past(),
      bio: faker.lorem.sentences(),
      avatarUrl: `https://userservicebucket.s3.us-east-2.amazonaws.com/${S3Url}`,
      isSuperhost: faker.random.boolean(),
      identityVerified: faker.random.boolean(),
      languages: faker.random.arrayElements(languages, faker.random.number({ min: 0, max: 3 })),
      responseRate: faker.random.number({ min: 93, max: 100 }),
      responseTime: 'within an hour'
    });
    const saveData = await user.save();
    return saveData;
  } catch (err) {
    console.error(err);
  }
};

const seedManyUsers = (start, number) => {
  const ids = [];
  // batchSize determines how many users get created simultaneously
  // Use batchSize to not overload image service with too many requests at once
  // Batches of 100+ requests known to cause socket error
  let batchSize = 50;

  while (number > 0 && batchSize > 0) {
    ids.push(start);
    start++;
    number--;
    batchSize--;
  }
  const promises = ids.map(id => seedUser(id));
  Promise.all(promises)
    .then(() => {
      console.log('Batch complete');
      if (number > 0) {
        seedManyUsers(start, number);
      } else {
        console.log('Seeding complete');
        mongoose.disconnect();
      }
    })
    .catch(() => console.error('Batch unsuccessful'));
};

seedManyUsers(10206, 10);

