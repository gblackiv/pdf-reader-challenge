import React, {useEffect, useState} from 'react';
import {Firestore} from '../config.js';
import {Grid, Typography, makeStyles, CircularProgress} from '@material-ui/core';

const ScrollableTextArea = () => {
  const styles = useStyles();
  const [pdfDocs, setPdfDocs] = useState(null);

  useEffect(() => {
    Firestore.collection('Pdf-Uploads').orderBy('UploadIndex').onSnapshot(snap => {
      const arrayOfPdfDocs = []
      snap.forEach(doc => {
        const data = doc.data();
        arrayOfPdfDocs.push(data);
      });
      setPdfDocs(arrayOfPdfDocs);
    });
  }, [])

  return (
    <Grid item xs={12} className={styles.textSection} container justify='center' alignContent={pdfDocs?.length > 0 ? 'flex-start' : 'center'}>
      {pdfDocs ? pdfDocs.map((pdfDoc, index) => (
        <Grid item xs={12} key={pdfDoc.Name + index}>
          <Typography variant='h5' paragraph>{pdfDoc.Name}</Typography>
          {pdfDoc.Text ? <Typography paragraph>{pdfDoc.Text}</Typography> : 
            <Typography paragraph>Your document&apos;s text is being extracted by our server. Please wait while text is loading...</Typography>
          }
        </Grid>
      )) : <CircularProgress />}
      {pdfDocs?.length === 0 && <Typography variant='h6'>There have been no PDF files uploaded. Please upload a PDF to view.</Typography>}
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  textSection: {
    overflowY: 'scroll',
    height: '60vh',
    background: 'no-repeat url(//s.ytimg.com/yt/imgbin/www-refreshbg-vflC3wnbM.png) 0 0',
    backgroundColor: '#EBEBEB',
    backgroundRepeat: 'repeat',
  },
}
));

export default ScrollableTextArea;
