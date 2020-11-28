const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
const port = 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

app.get('/api/messages', (req, res) => {
  try {
    console.log('Hello From Express');
    res.send({ express: 'Hello From Express' });
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/messages', (req, res) => {
  try {
    console.log('Hello From Express');
    console.log(req.body);
    db.collection('messages').add({...req.body, ...{'date': new Date().toUTCString()}});
    res.send('OK');
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));