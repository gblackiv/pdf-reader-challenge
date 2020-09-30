const admin = require("firebase-admin");

const serviceAccount = require("./pdf-reader-challenge-firebase-adminsdk-lji6f-d2857cfd6d.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pdf-reader-challenge.firebaseio.com"
});
