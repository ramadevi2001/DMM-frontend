import React from 'react';
import { Modal, Box, CircularProgress, Typography} from '@mui/material';


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

const LoadingComponent = ({ open }) => (
  <Modal open={open}>
    <Box sx={style}>
      <CircularProgress />
      <Typography variant="h6">Loading...</Typography>
    </Box>
  </Modal>
);






export default LoadingComponent;
