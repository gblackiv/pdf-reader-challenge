import React from 'react';
import {Button} from '@material-ui/core';

const SubmitButton = ({handleSubmit, disabled}) => {

  return <Button variant='outlined' color='secondary' onClick={handleSubmit} disabled={disabled}>Submit</Button>
}

export default SubmitButton;
