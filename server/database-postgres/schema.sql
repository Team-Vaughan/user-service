-- drop the database if it already exists
DROP DATABASE IF EXISTS users;
-- create a database
CREATE DATABASE users;
-- connect to the database
\c users;
--create tables
CREATE TABLE IF NOT EXISTS users (
  userId SERIAL,
  name VARCHAR,
  bio VARCHAR,
  joinDate date,
  avatarUrl VARCHAR,
  isSuperhost Boolean,
  identityVerified Boolean,
  responseRate integer,
  responseTime VARCHAR,
  PRIMARY KEY (userId)
);

CREATE TABLE IF NOT EXISTS languages (
  languageId SERIAL,
  languageName VARCHAR,
  PRIMARY KEY (languageId)
);


CREATE TABLE IF NOT EXISTS users_languages (
  id SERIAL,
  userId integer,
  languageId integer,
  PRIMARY KEY (id)
);
-- insert into a table
INSERT INTO languages (languageName) values ('English');
INSERT INTO languages (languageName) values ('Spanish');
INSERT INTO languages (languageName) values ('French');
INSERT INTO languages (languageName) values ('Portuguese');
INSERT INTO languages (languageName) values ('German');
INSERT INTO languages (languageName) values ('Italian');
INSERT INTO languages (languageName) values ('Cambodian');
INSERT INTO languages (languageName) values ('Thai');

-- Type the following command, and then press Enter. Replace postgres with your username!
-- psql -U postgres < schema.sql