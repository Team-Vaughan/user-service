const axios = require('axios');
const { User } = require('./schema.js');

const generatePhoto = async () => {
  try {
    const photo = await axios({
      url: 'https://picsum.photos/75',
      method: 'GET',
      responseType: 'stream'
    });
    return photo;
  } catch (err) {
    console.error(err);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getUserNameAndPhoto = async (userId) => {
  try {
    const { name, avatarUrl } = await User.findOne({ userId }, 'name avatarUrl');
    return { name, avatarUrl };
  } catch (err) {
    return null;
  }
};

const getUserSuperhostStatus = async (userId) => {
  try {
    const { isSuperhost } = await User.findOne({ userId }, 'isSuperhost');
    return { isSuperhost };
  } catch (err) {
    return null;
  }
};

const updateUserInfo = (id, object) => {
  const { name, bio, avatarUrl, isSuperhost, identityVerified, languages, responseRate, responseTime } = object;
  let options = {new: true, upsert: true, useFindAndModify: false};
  User.findOneAndUpdate({ userId: id }, { name, bio, avatarUrl, isSuperhost, identityVerified, languages, responseRate, responseTime }, options)
    .then(result => result)
    .catch(error => console.log(error))
}


module.exports = {
  generatePhoto,
  getUserById,
  getUserNameAndPhoto,
  getUserSuperhostStatus,
  updateUserInfo
};