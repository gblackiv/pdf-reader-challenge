import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import {DropzoneForm, ScrollableTextArea} from './Components/'

function App() {
  const styles = useStyles();

  return (
    <div className={styles.pageMargins}>
      <Grid container spacing={2}>
          <DropzoneForm />
          <ScrollableTextArea />
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  pageMargins: {
    height: '90vh',
    width: '80vw',
    margin: '5vh 10vw',
  },
}
));

export default App;
