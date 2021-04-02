const axios = require('axios');
const nano = require('nano')('http://admin:123456@localhost:5984');
const users3 = nano.use('users3');

const dbname = 'users3';
const viewUrl = '_design/allUsers/_view/allUsers';


const getUserById = async () => {
  try{
    const body = await users3.view('allUsers', 'allUsers');
    const test = body.rows.slice(0,5);

    test.forEach(doc => {
      console.log(doc.key)
    })
  } catch(err) {
    console.log('the error 👎🏽', err)
  }
};


getUserById();

// const getUserNameAndPhoto = async (userId) => {
//   try {
//     const { name, avatarUrl } = await User.findOne({ userId }, 'name avatarUrl');
//     return { name, avatarUrl };
//   } catch (err) {
//     return null;
//   }
// };

// const getUserSuperhostStatus = async (userId) => {
//   try {
//     const { isSuperhost } = await User.findOne({ userId }, 'isSuperhost');
//     return { isSuperhost };
//   } catch (err) {
//     return null;
//   }
// };