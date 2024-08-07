import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import SuccessComponent from '../popup/Success';
import ErrorComponent from '../popup/Error';
import LoadingComponent from '../popup/Loading';
import { resetStatus as updateResetStatus } from './slices/updateGoal.slice';
import { useNavigate } from 'react-router-dom';
import { getGoalsByChoice } from './slices/listgoals.slice';

const UpdateGoal = ({ open, handleClose, handleUpdateGoal, existingGoal }) => {
  const goalState = useSelector((state) => state.updateGoal);
  const selectedChoice = useSelector((state) => state.choices.selectedChoice)
  const { status, error } = goalState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDateTimeLocal = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const pad = (num) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const formik = useFormik({
    initialValues: {
      goal: existingGoal.goal || '',
      description: existingGoal.description || '',
      start_date: formatDateTimeLocal(existingGoal.start_date),
      target_date: formatDateTimeLocal(existingGoal.target_date),
      status: existingGoal.status || 'To do',
    },
    validationSchema: Yup.object({
      goal: Yup.string().required('Goal is required'),
      description: Yup.string().required('Description is required'),
      start_date: Yup.date().required('Start date is required').nullable(),
      target_date: Yup.date().required('Target date is required').nullable(),
      status: Yup.string().required('Status is required').oneOf(['To do', 'In progress', 'Done']),
    }),
    onSubmit: (values) => {
      handleUpdateGoal(values);
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    formik.setValues({
      goal: existingGoal.goal || '',
      description: existingGoal.description || '',
      start_date: formatDateTimeLocal(existingGoal.start_date),
      target_date: formatDateTimeLocal(existingGoal.target_date),
      status: existingGoal.status || 'To do',
    });
  }, [existingGoal]);

  const onCloseError = () => {
    dispatch(updateResetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(updateResetStatus());
    dispatch(getGoalsByChoice(selectedChoice));
    navigate('/goals');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Update Goal</DialogTitle>
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
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.start_date}
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
              error={formik.touched.target_date && Boolean(formik.errors.target_date)}
              helperText={formik.touched.target_date && formik.errors.target_date}
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

      {status === 'success' && <SuccessComponent open={status === 'success'} onClose={onCloseSuccess} message={'Goal Updated Successfully'} />}
      {status === 'pending' && <LoadingComponent open={status === 'pending'} />}
      {status === 'failed' && <ErrorComponent open={status === 'failed'} onClose={onCloseError} message={error.message} />}
    </>
  );
};

export default UpdateGoal;
