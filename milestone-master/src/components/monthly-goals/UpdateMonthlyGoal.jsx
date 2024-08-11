import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import SuccessComponent from '../popup/Success';
import ErrorComponent from '../popup/Error';
import LoadingComponent from '../popup/Loading';
import { resetStatus as updateResetStatus } from './slices/updateMonthlyGoal.slice';
import { useNavigate } from 'react-router-dom';
import { getMonthlyGoalsByGoal } from './slices/listOfMonthlyGoals.slice';

const UpdateMonthlyGoal = ({ open, handleClose, handleUpdateMonthlyGoal, existingMonthlyGoal }) => {
  const monthlyGoalState = useSelector((state) => state.updateMonthlyGoal);
  const selectedGoal = useSelector((state) => state.listGoals.selectedGoal);
  const { status, error } = monthlyGoalState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDateTimeLocal = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const pad = (num) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const calculateTargetDate = (startDate) => {
    if (!startDate) return '';
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return formatDateTimeLocal(date.toISOString());
  };

  const formik = useFormik({
    initialValues: {
      title: existingMonthlyGoal.title || '',
      description: existingMonthlyGoal.description || '',
      start_date: formatDateTimeLocal(existingMonthlyGoal.start_date),
      target_date: calculateTargetDate(existingMonthlyGoal.start_date),
      status: existingMonthlyGoal.status || 'To do',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      start_date: Yup.date().required('Start date is required').nullable(),
      status: Yup.string().required('Status is required').oneOf(['To do', 'In progress', 'Done']),
    }),
    onSubmit: (values) => {
      const updatedValues = {
        ...values,
        target_date: calculateTargetDate(values.start_date),
      };
      handleUpdateMonthlyGoal(updatedValues);
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    formik.setValues({
      title: existingMonthlyGoal.title || '',
      description: existingMonthlyGoal.description || '',
      start_date: formatDateTimeLocal(existingMonthlyGoal.start_date),
      target_date: calculateTargetDate(existingMonthlyGoal.start_date),
      status: existingMonthlyGoal.status || 'To do',
    });
  }, [existingMonthlyGoal]);

  const onCloseError = () => {
    dispatch(updateResetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(updateResetStatus());
    dispatch(getMonthlyGoalsByGoal(selectedGoal));
    navigate('/monthly-goals');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Update Monthly Goal</DialogTitle>
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
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.start_date}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('target_date', calculateTargetDate(e.target.value));
              }}
              error={formik.touched.start_date && Boolean(formik.errors.start_date)}
              helperText={formik.touched.start_date && formik.errors.start_date}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Target Date"
              name="target_date"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.target_date}
              InputProps={{
                readOnly: true,
              }}
              helperText="Target date is automatically calculated."
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
              <MenuItem value="To do">To do</MenuItem>
              <MenuItem value="In progress">In progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
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

      {status === 'success' && <SuccessComponent open={status === 'success'} onClose={onCloseSuccess} message={'Monthly Goal Updated Successfully'} />}
      {status === 'pending' && <LoadingComponent open={status === 'pending'} />}
      {status === 'failed' && <ErrorComponent open={status === 'failed'} onClose={onCloseError} message={error.message} />}
    </>
  );
};

export default UpdateMonthlyGoal;
