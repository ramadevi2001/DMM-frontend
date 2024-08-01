import React from 'react';
import { Modal, Box, CircularProgress, Typography} from '@mui/material';
import { Error as ErrorIcon, CheckCircle as SuccessIcon } from '@mui/icons-material';

// Styles for the modal content
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: '25px'
};
const ErrorComponent = ({ open, onClose, message }) => {

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <ErrorIcon color="error" style={{ fontSize: 40 }} />
        <Typography variant="h6">{message}</Typography>
      </Box>
    </Modal>
  );
};
export default ErrorComponent;
