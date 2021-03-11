// Note: The URL you supply may also contain authentication credentials e.g.
// http://admin:mypassword@localhost:5984.
const nano = require('nano')('http://admin:123456@localhost:5984');

const createCouch = async () => {
  try {
    await nano.db.destroy('users');
    await nano.db.create('users');
    const db = await nano.db.use('users');
    console.log('You got a couch!');
    return db;
  } catch (error) {
    console.error('Failed to create a database', error);
  }
};

module.exports = { createCouch };
