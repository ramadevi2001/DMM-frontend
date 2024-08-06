// AddGoal.jsx
import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import SuccessComponent from '../popup/Success';
import ErrorComponent from '../popup/Error';
import LoadingComponent from '../popup/Loading';
import { resetStatus } from './slices/addGoal.slice';
import { useNavigate } from 'react-router-dom';
import {  getGoalsByChoice } from './slices/listgoals.slice';

const AddGoal = ({ open, handleClose, handleAddGoal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedChoice = useSelector((state)=> state.choices.selectedChoice);

  const goalState = useSelector((state) => state.addGoal);
  const { status, error } = goalState;

  const formik = useFormik({
    initialValues: {
      goal: '',
      description: '',
      start_date: '',
      target_date: '',
    },
    validationSchema: Yup.object({
      goal: Yup.string().required('Goal is required'),
      description: Yup.string().required('Description is required'),
      start_date: Yup.date().required('Start Date is required').nullable(),
      target_date: Yup.date().required('Target Date is required').nullable(),
    }),
    onSubmit: (values) => {
      let inputData = { ...values, status: "To do", choice: selectedChoice };
      handleAddGoal(inputData);
      formik.resetForm();
      handleClose();
    },
  });

  const onCloseError = () => {
    dispatch(resetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(resetStatus());
    dispatch(getGoalsByChoice(selectedChoice));
    navigate('/goals');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Goal"
              name="goal"
              value={formik.values.goal}
              onChange={formik.handleChange}
              error={formik.touched.goal && Boolean(formik.errors.goal)}
              helperText={formik.touched.goal && formik.errors.goal}
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
              label="Target Date"
              name="target_date"
              type="datetime-local"
              value={formik.values.target_date}
              onChange={formik.handleChange}
              error={formik.touched.target_date && Boolean(formik.errors.target_date)}
              helperText={formik.touched.target_date && formik.errors.target_date}
              InputLabelProps={{
                shrink: true,
              }}
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

      {status === 'success' && (
        <SuccessComponent
          open={status === 'success'}
          onClose={onCloseSuccess}
          message="Goal Added Successfully"
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

export default AddGoal;
