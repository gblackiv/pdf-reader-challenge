import React from 'react';
import {Chip} from '@material-ui/core';

const FileChip = ({fileName, removeFileFromUploadList}) => {

  return <Chip label={fileName} onDelete={removeFileFromUploadList} />
}

export default FileChip;
