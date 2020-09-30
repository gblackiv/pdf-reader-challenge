import React, {useState} from 'react';
import {Dropzone, FileChip, SubmitButton} from './DropzoneForm/';
import {Grid, makeStyles, CircularProgress } from '@material-ui/core';
import {Storage, Firestore} from '../config.js'

const DropzoneForm = () => {
  const styles = useStyles();
  const [fileArray, setFileArray] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const removeFileFromUploadList = indexOfRemovedFile => {
    const fileArrayWithoutFile = [
      ...fileArray.slice(0, indexOfRemovedFile),
      ...fileArray.slice(indexOfRemovedFile + 1)
    ]
    setFileArray(fileArrayWithoutFile);
  };

  const handleSubmit = async () => {
    if(!fileArray.length) return;
    setSubmitting(true);

    const transaction = Firestore.runTransaction(async transaction => {
      const counterDoc = await transaction.get(Firestore.collection('Counters').doc('UploadIndex'));

      const arrayOfWrites = [];
      fileArray.forEach((fileObj, fileIndex) => arrayOfWrites.push(transaction.set(fileObj.firestoreRef, {
        Text: null,
        UploadIndex: counterDoc.data().Counter + 1 + fileIndex,
        Name: fileObj.fileName,
      }))
      )

      transaction.update(Firestore.collection('Counters').doc('UploadIndex'), {Counter: counterDoc.data().Counter + fileArray.length})

      return Promise.all(arrayOfWrites);
    });

    const storageRef = Storage.ref();

    const arrayOfUploads = [];
    fileArray.forEach(fileObj => arrayOfUploads.push(storageRef.child(fileObj.firestoreRef.id + '_' + fileObj.fileName).put(fileObj.file)));

    Promise.all([transaction, ...arrayOfUploads])
      .then(values => {
        setFileArray([]);
        setSubmitting(false);
      })
      .catch(err => console.log(err))
  }

  return (
    <Grid container spacing={2} item xs={12} className={styles.uploadSection} justify='center'>
      
        <Grid item>
          <Dropzone addFileToArray={fileObj => setFileArray([...fileArray, fileObj])} />
        </Grid>
        <Grid item xs={12} justify='center' container spacing={1}>
        {fileArray.map((fileObj, index) => (
          <Grid item key={fileObj.fileName + index}>
            <FileChip fileName={fileObj.fileName} removeFileFromUploadList={() => removeFileFromUploadList(index)} />
          </Grid>
        ))}
      </Grid>

      <Grid item>
        <SubmitButton handleSubmit={handleSubmit} disabled={submitting} />
      </Grid>
      
      {submitting && <Grid item container justify='center'>
        <CircularProgress  color='primary' />
      </Grid>}

    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  uploadSection: {
    margin: '0px'
  },
}
));
export default DropzoneForm;
