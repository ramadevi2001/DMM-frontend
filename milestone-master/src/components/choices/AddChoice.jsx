// AddChoice.jsx
import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import SuccessComponent from '../popup/Success';
import ErrorComponent from '../popup/Error';
import LoadingComponent from '../popup/Loading';
import { resetStatus } from './slices/addChoice.slice';
import { useNavigate } from 'react-router-dom';
import { getChoices } from './slices/choices.slice';


const AddChoice = ({ open, handleClose, handleAddChoice }) => {

  const choiceState = useSelector((state) => state.addChoice);
  const { status, error } = choiceState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { become: '' },
    validationSchema: Yup.object({
      become: Yup.string().required('Choice Name is required'),
    }),
    onSubmit: (values) => {
      handleAddChoice(values);
      formik.resetForm();
      handleClose();
    },
  });

  const onCloseError = ()=>{
    dispatch(resetStatus())
 }

 const onCloseSuccess = ()=>{
    dispatch(resetStatus())
    dispatch(getChoices())
    navigate("/choices")
    
  }

  return (
    <>
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Choice</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Become"
            name="become"
            value={formik.values.become}
            onChange={formik.handleChange}
            error={formik.touched.become && Boolean(formik.errors.become)}
            helperText={formik.touched.become && formik.errors.become}
          />
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>

    {status === "success" && <SuccessComponent open={status === "success"} onClose={onCloseSuccess} message={"Choice Added Successfully"}/>}
      {status === "pending" && <LoadingComponent open={status === "pending"}/>}
      {status === "failed" && (
        <ErrorComponent
          open={status === "failed"}
          onClose={onCloseError}
          message={error.message}
        />
      )}
    
    </>
  );
};

export default AddChoice;
