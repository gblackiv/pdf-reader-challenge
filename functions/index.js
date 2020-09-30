const functions = require('firebase-functions');
const admin = require('./config.js');
const fs = require('fs');
const os = require('os');
const path = require('path');
const pdf = require('pdf-parse');
require('firebase-functions/lib/logger/compat');

exports.handlePdfUpload = functions.storage.object().onFinalize(async object =>{
  const fileBucket = object.bucket;
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await bucket.file(filePath).download({destination: tempFilePath});

  let dataBuffer = fs.readFileSync(tempFilePath);

  return pdf(dataBuffer).then(function(data) {
    return admin.firestore().collection('Pdf-Uploads').doc(filePath.split('_')[0]).update({
      Text: data.text
    });
  });

})