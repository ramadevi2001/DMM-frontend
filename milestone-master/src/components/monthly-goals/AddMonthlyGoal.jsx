import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import SuccessComponent from '../popup/Success';
import ErrorComponent from '../popup/Error';
import LoadingComponent from '../popup/Loading';
import { resetStatus } from './slices/addMonthlyGoals.slice';
import { useNavigate } from 'react-router-dom';


const AddMonthlyGoal = ({ open, handleClose, handleAddMonthlyGoal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedGoal = useSelector((state)=> state.listGoals.selectedGoal)

  const goalState = useSelector((state) => state.addMonthlyGoal);
  const { status, error } = goalState;

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      start_date: '',
      status: 'To Do',
    },
    validationSchema: Yup.object({
      // goal: Yup.string().required('Goal ID is required'),
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      start_date: Yup.date().required('Start Date is required').nullable(),
      status: Yup.string().oneOf(['In progress', 'To do', 'Done']).required('Status is required'),
    }),
    onSubmit: (values) => {
      const target_date = new Date(values.start_date);
      target_date.setDate(target_date.getDate() + 30);

      let inputData = { ...values, target_date: target_date.toISOString(), goal: selectedGoal };
      handleAddMonthlyGoal(inputData);
      formik.resetForm();
      handleClose();
    },
  });

  const onCloseError = () => {
    dispatch(resetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(resetStatus());
    // dispatch(getMonthlyGoals());
    navigate('/monthly-goals');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Monthly Goal</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Start Date"
              name="start_date"
              type="datetime-local"
              value={formik.values.start_date}
              onChange={formik.handleChange}
              error={formik.touched.start_date && Boolean(formik.errors.start_date)}
              helperText={formik.touched.start_date && formik.errors.start_date}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              select
              label="Status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              <MenuItem value="In progress">In progress</MenuItem>
              <MenuItem value="To do">To Do</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
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

      {status === 'success' && (
        <SuccessComponent
          open={status === 'success'}
          onClose={onCloseSuccess}
          message="Monthly Goal Added Successfully"
        />
      )}
      {status === 'pending' && <LoadingComponent open={status === 'pending'} />}
      {status === 'failed' && (
        <ErrorComponent
          open={status === 'failed'}
          onClose={onCloseError}
          message={error.message}
        />
      )}
    </>
  );
};

export default AddMonthlyGoal;
