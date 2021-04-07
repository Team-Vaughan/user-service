//Use this file to delete existing and create new db w/o using psql CLI
const pgtools = require('pgtools');

const config = {
  user: 'postgres',
  password: 'Password123!',
  port: 5432,
  host: 'localhost'
};

pgtools.dropdb(config, 'users', (err, res) => {
  if (err) {
    console.error(err);
  }
  pgtools.createdb(config, 'users', (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
  });

  console.log(res);

});