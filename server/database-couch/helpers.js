const axios = require('axios');
const db = require('./schema.js');

// const getUserById = async (userId) => {
//   try {
//     const user = await User.findOne({ userId });
//     return user;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

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