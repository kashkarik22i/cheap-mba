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
  results = []
  try {
    db.collection('messages').orderBy('date', 'desc').limit(10).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        results.push({id: doc.id, ...doc.data()})
      });
      res.send({ results });
    });
  } catch (error) {
    console.log(error);
    res.send({ results });
  }
});

app.post('/api/messages', (req, res) => {
  try {
    db.collection('messages').add({ ...req.body, ...{ 'date': new Date().toUTCString() } });
    res.send('OK');
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));