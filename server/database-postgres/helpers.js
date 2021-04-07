const axios = require('axios');
const { db, User, Language, UserLanguage } = require('./models.js');

const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ where: { userId } });
    // console.log('😂 getUserById function result', user.dataValues);
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getUserLanguagesByUserId = async (userId) => {
  try {
    const languages = await UserLanguage.findAll({ where: { userUserId: userId }})
      .then(ids => ids.map(id => id.languageLanguageId))
      .then(languageIds => Language.findAll({ where: {languageId: languageIds}}))
      .then(languageNames => languageNames.map(lang => lang.name))
      .catch(error => console.log(error));

      return languages;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const getUserNameAndPhoto = async (userId) => {
  try {
    const { name, avatarUrl } = await User.findOne({ where: { userId } }, 'name avatarUrl');
    // console.log('🎷 getUserNameAndPhoto result', name, avatarUrl)
    return { name, avatarUrl };
  } catch (err) {
    return null;
  }
};

const getUserSuperhostStatus = async (userId) => {
  try {
    const { isSuperhost } = await User.findOne({ where: { userId } }, 'isSuperhost');
    // console.log('🥁 getUserSuperhostStatus function result', isSuperhost)
    return { isSuperhost };
  } catch (err) {
    return null;
  }
};

const formatData = (userData, languageData) => {
  let formatted = userData;
  const {
    userId,
    name,
    bio,
    joinDate,
    avatarUrl,
    isSuperhost,
    identityVerified,
    responseRate,
    responseTime
  } = formatted

  formatted.dataValues.languages = languageData;
  return formatted;
}

//update if ID exists already, insert if not - create and update together
// const updateUserInfo = (id, params) => {
//   const { name, bio, avatarUrl, isSuperhost, identityVerified, languages, responseRate, responseTime } = params;
//   //if any of the params is a falsy value
//   for(let prop in params) {
//     if(!params[prop]) {
//       delete params[prop];
//     }
//   }
//   let options = {new: true, upsert: true, useFindAndModify: false};
//   User.findOneAndUpdate({ userId: id }, params , options)
//     .then(result => result)
//     .catch(error => console.log(error))
// }

//update or create
//gets an object from user
//split into 2 -> user and language
//check if userId exist,
  //if exists, then update user & language
// else
  //create a new user
    //check if language exist,
      //if not create a new language

const deleteUserById = (id) => {
  User.destroy({ where: { userId: id }})
    .then(result => result)
    .catch(error => console.log(error))
  UserLanguage.destroy({ where: { userUserId: id} })
    .then(result => result)
    .catch(error => console.log(error))
}

module.exports = {
  getUserById,
  getUserNameAndPhoto,
  getUserSuperhostStatus,
  getUserLanguagesByUserId,
  formatData,
  deleteUserById
  // updateUserInfo,

};