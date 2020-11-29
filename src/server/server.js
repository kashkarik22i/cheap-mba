const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const rateLimit = require("express-rate-limit");

const app = express();
const port = 8080;

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 miute window
  max: 5, // start blocking after 5 requests
  message:
    "Too many requests sent from this IP, please try again after a while"
});

app.use("/api/", rateLimiter);

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

// should be after APIs or otherwise api GET gets lost
app.use(express.static(path.join(__dirname, '..', '..', 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));