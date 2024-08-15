import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import SuccessComponent from '../popup/Success';
import ErrorComponent from '../popup/Error';
import LoadingComponent from '../popup/Loading';
import { resetStatus as updateResetStatus } from './slices/updateHabit.slice';
import { useNavigate } from 'react-router-dom';
import { getHabitsByMonthlyGoal } from './slices/listOfHabits.slice';

// Utility function to format the date for the datetime-local input
const formatDateTimeLocal = (dateTime) => {
  return dateTime ? new Date(dateTime).toISOString().slice(0, 16) : '';
};

const UpdateHabit = ({ open, handleClose, handleUpdateHabit, existingHabit }) => {
  const habitState = useSelector((state) => state.updateHabit);
  const { status, error } = habitState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: existingHabit.title || '',
      description: existingHabit.description || '',
      planned_period_minutes: existingHabit.planned_period_minutes || '',
      location: existingHabit.location || '',
      start_time: formatDateTimeLocal(existingHabit.start_time),
      end_time: formatDateTimeLocal(existingHabit.end_time),
      is_done: existingHabit.is_done || false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      planned_period_minutes: Yup.number()
        .required('Planned Period (Minutes) is required')
        .positive('Planned Period must be a positive number')
        .integer('Planned Period must be an integer'),
      location: Yup.string().required('Location is required'),
      start_time: Yup.date().required('Start Time is required'),
      end_time: Yup.date()
        .required('End Time is required')
        .min(Yup.ref('start_time'), 'End Time cannot be before Start Time'),
      is_done: Yup.boolean().required('Completion status is required'),
    }),
    onSubmit: (values) => {
      handleUpdateHabit(values);
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    formik.setValues({
      title: existingHabit.title || '',
      description: existingHabit.description || '',
      planned_period_minutes: existingHabit.planned_period_minutes || '',
      location: existingHabit.location || '',
      start_time: formatDateTimeLocal(existingHabit.start_time),
      end_time: formatDateTimeLocal(existingHabit.end_time),
      is_done: existingHabit.is_done || false,
    });
  }, [existingHabit]);

  const onCloseError = () => {
    dispatch(updateResetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(updateResetStatus());
    navigate('/habits');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Update Habit</DialogTitle>
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
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="End Time"
              name="end_time"
              type="datetime-local"
              value={formik.values.end_time}
              onChange={formik.handleChange}
              error={formik.touched.end_time && Boolean(formik.errors.end_time)}
              helperText={formik.touched.end_time && formik.errors.end_time}
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_done}
                  onChange={(e) => formik.setFieldValue('is_done', e.target.checked)}
                  name="is_done"
                  color="primary"
                />
              }
              label="Is Done"
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {status === 'success' && <SuccessComponent open={status === 'success'} onClose={onCloseSuccess} message={'Habit Updated Successfully'} />}
      {status === 'pending' && <LoadingComponent open={status === 'pending'} />}
      {status === 'failed' && <ErrorComponent open={status === 'failed'} onClose={onCloseError} message={error.message} />}
    </>
  );
};

export default UpdateHabit;
