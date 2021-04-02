const express = require('express');
const app = express();
const cors = require('cors');
const { getUserById, getUserNameAndPhoto, getUserSuperhostStatus, getUserLanguagesByUserId } = require('./database-postgres/helpers');

app.use(express.static('public'));
app.use('/rooms/:id', express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users/:userId', async (req, res) => {
  try {
    const user = await getUserById(req.params.userId)
    const languages = await getUserLanguagesByUserId(req.params.userId)

    user ? res.status(200).send(user) : res.sendStatus(404);
    // user ? res.status(200).send(user) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send({ message: 'Server Error' });
  }
});

app.get('/users/:userId/id', async (req, res) => {
  try {
    const id = await getUserNameAndPhoto(req.params.userId);
    id ? res.status(200).send(id) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send({ message: 'Server Error' });
  }
});

app.get('/users/:userId/super', async (req, res) => {
  try {
    const status = await getUserSuperhostStatus(req.params.userId);
    status ? res.status(200).send(status) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send({ message: 'Server Error' });
  }
});

app.put('/users/:userId', async (req, res) => {
  let id = req.params.userId;
  let incomingObject = req.body;
  try {
    await updateUserInfo(id, incomingObject)
    res.sendStatus(200);
  } catch(err) {
    console.log('error updating user', err);
    res.status(500).send({ message: 'Server Error' });
  }
});

app.delete('/users/:userId', async (req, res) => {
  let id = req.params.userId;
  try {
    await deleteById(id)
    res.sendStatus(200);
  } catch(err) {
    console.log('error deleting user', err);
    res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = app;
