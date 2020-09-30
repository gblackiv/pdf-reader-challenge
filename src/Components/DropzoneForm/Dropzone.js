import React from 'react';
import Dz from 'react-dropzone';
import {Typography, Grid, makeStyles} from '@material-ui/core';
import {Firestore} from '../../config.js'

const Dropzone = ({addFileToArray}) => {
  const styles = useStyles();

  const dzProps = {
    accept: 'application/pdf',
    multiple: false,
    onDropAccepted: files => {
      const fileName = files[0].name;
      addFileToArray({
        file: files[0],
        fileName,
        firestoreRef: Firestore.collection('Pdf-Uploads').doc()
      });
    },
    onDropRejected: (file, event) => {
      alert('ERROR')
      // if (file[0].size > (this.props.selectedInbound || this.props.selectedOutbound ? 26214400 : 5242880)) {
      //   this.setState({formError: 'The file you selected was too large.'});
      // } else {
      //   this.setState({formError: this.props.errorMessage || 'The file type you selected in not allowed.'});
      // }
    },
  };

  return (
    <Dz {...dzProps}>
      {({getRootProps, getInputProps}) => (
        <Grid {...getRootProps()} className={styles.fileDrop} container justify='center' alignContent='center'>
          <input {...getInputProps()} />
          <Grid item className={styles.centerText}>
            <Typography variant='subtitle1'>
              Drop file here or click inside the box to select a file.
            </Typography>
            <Typography variant='body2'>
              (File must be a PDF)
            </Typography>
            </Grid>
        </Grid>
      )}
    </Dz>
  )
}

const useStyles = makeStyles(theme => ({
  fileDrop: {
    backgroundColor: 'aliceblue',
    border: '2px gray dotted',
    height: '100px',
    minWidth: '30vw'
  },
  centerText: {
    textAlign: 'center'
  }
}
));

export default Dropzone;
