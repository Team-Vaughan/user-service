// Note: The URL you supply may also contain authentication credentials e.g.
// http://admin:mypassword@localhost:5984.
const nano = require('nano')('http://admin:123456@localhost:5984');

const createCouch = async () => {
  const database = await nano.db.list();
  if(database.includes('users2')) {
    const db = await nano.db.use('users2');
    return db;
  }
  try {
    await nano.db.create('users2');
    const db = await nano.db.use('users2');
    console.log('You got a couch!');
    return db;
  } catch (error) {
    console.error('Failed to create a database', error);
  }
};

module.exports = { createCouch };
