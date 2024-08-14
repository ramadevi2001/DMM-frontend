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
import { resetStatus } from './slices/addHabit.slice';
import { useNavigate } from 'react-router-dom';

const AddHabit = ({ open, handleClose, handleAddHabit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const habitState = useSelector((state) => state.addHabit);
  const { status, error } = habitState;

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      planned_period_minutes: '',
      location: '',
      start_time: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      planned_period_minutes: Yup.number()
        .typeError('Planned period must be a number')
        .required('Planned period (minutes) is required')
        .positive('Planned period must be a positive number'),
      location: Yup.string().required('Location is required'),
      start_time: Yup.date().required('Start time is required').nullable(),
    }),
    onSubmit: (values) => {
      handleAddHabit(values);
      formik.resetForm();
      handleClose();
    },
  });

  const onCloseError = () => {
    dispatch(resetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(resetStatus());
    navigate('/habits');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Habit</DialogTitle>
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
              label="Planned Period (Minutes)"
              name="planned_period_minutes"
              type="number"
              value={formik.values.planned_period_minutes}
              onChange={formik.handleChange}
              error={formik.touched.planned_period_minutes && Boolean(formik.errors.planned_period_minutes)}
              helperText={formik.touched.planned_period_minutes && formik.errors.planned_period_minutes}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Start Time"
              name="start_time"
              type="datetime-local"
              value={formik.values.start_time}
              onChange={formik.handleChange}
              error={formik.touched.start_time && Boolean(formik.errors.start_time)}
              helperText={formik.touched.start_time && formik.errors.start_time}
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
          message="Habit Added Successfully"
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

export default AddHabit;
