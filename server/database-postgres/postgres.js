require('dotenv').config();
const { getImgKeys } = require('./aws.js');
const faker = require('faker');
const { db, User, Language, UserLanguage, sync } = require('./models.js');
const languages = ['English', 'Spanish', 'French', 'Portuguese', 'German', 'Italian', 'Cambodian', 'Thai', 'Shyriiwook'];

const seed = async () => {
  const S3Url = await getImgKeys();
  await sync();

  const usersSeeded = (end, batchSize) => {
    return new Promise(async (resolve, reject) => {
      // While loop call seedManyUsers until done
      let start = 1;
      while(end > 0 ){
        await seedManyUsers(start, batchSize);
        start += batchSize;
        end -= batchSize;
      }
      resolve();
    });
  };

  const seedManyUsers = async (start, batchSize) => {
      const ids = [];
      while (batchSize > 0) {
        ids.push(start);
        start++;
        batchSize--;
      }

      const multipleUsers = await Promise.all(ids.map(async id => {
        const userData = {
          userId: id,
          name: faker.name.firstName(),
          joinDate: faker.date.past(),
          bio: faker.lorem.sentences(),
          avatarUrl: `https://userservicebucket.s3.us-east-2.amazonaws.com/${S3Url[faker.random.number({ min: 0, max: 999 })].Key}`,
          isSuperhost: faker.random.boolean(),
          identityVerified: faker.random.boolean(),
          responseRate: faker.random.number({ min: 93, max: 100 }),
          responseTime: 'within an hour'
        };
        return userData;
      }))
      console.log('bulkCreatedUser Start');
      let bulkCreatedUser = await User.bulkCreate(multipleUsers);
      console.log('bulkCreatedUser End with length ' + bulkCreatedUser.length);
    }

  //ALTERNATE VERSION OF seedLanguage
  const seedLanguage = async () => {
    console.log('=> Func seedLanguage Start');
    let langToBeInserted = languages.map(lang => { return {'name': lang} });
    try {
      await Language.bulkCreate(langToBeInserted);
      console.log('=> SEEDED LANGUAGES TABLE COMPLETE');
    } catch (err) {
      console.log(err, 'error in seedLanguage fn');
    }
  };


  //ALTERNATE VERSION OF seedJoin
  const seedJoin = async () => {
    console.log('=> Func seedJoin Start');
    let dataForJoin = [];
    for (let i = 1; i <= 10000000; i ++) {
      let langId1 = faker.random.number({ min: 1, max: 9 });
      let langId2 = faker.random.number({ min: 1, max: 9 });
      dataForJoin.push({ userUserId: i, languageLanguageId: langId1 })
      dataForJoin.push({ userUserId: i, languageLanguageId: langId2 });
      if(dataForJoin.length === 10000) {
        await UserLanguage.bulkCreate(dataForJoin);
        console.log('10000 recorded bulk created to join table')
        dataForJoin = [];
      }
    }
  }

  try {
    await usersSeeded(10000000, 10000);
    await usersSeeded(100, 10000);
    console.log('1');
    await seedLanguage();
    console.log('2');
    await seedJoin();
    console.log('3');
  } catch (e) {
    console.log('ERROR SEEDING IN ASYNC/AWAIT CHAIN: ', e);
  }

}

seed()
  .then(() => console.log('finished seeding'))
  .catch(e => console.log('error in seeding', e))


// explain analyze
// SELECT users.*, languages.name
// FROM users, languages, user_languages
// WHERE users."userId" = user_languages."userUserId"
// AND languages."languageId" = user_languages."languageLanguageId"
// AND users."userId" = 9999999;


//create unique index index_users on users ("userId");
//create index index_ul on user_languages ("userUserId");

