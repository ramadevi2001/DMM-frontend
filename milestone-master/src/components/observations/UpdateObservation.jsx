import React, {  useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import SuccessComponent from '../popup/Success';
import ErrorComponent from '../popup/Error';
import LoadingComponent from '../popup/Loading';
import { resetStatus } from './slices/updateObservation.slice';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const UpdateObservation = ({ open, handleClose, handleUpdateObservation, existingObservation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const observationState = useSelector((state) => state.updateObservation);
  const { status, error } = observationState;

  const formik = useFormik({
    initialValues: {
      observation: existingObservation.observation || '',
      action_plan: existingObservation.action_plan || [''], // Populate with existing data or start with one empty action plan field
    },
    validationSchema: Yup.object({
      observation: Yup.string().required('Observation is required'),
      action_plan: Yup.array()
        .of(Yup.string().required('Action plan item cannot be empty'))
        .min(1, 'At least one action plan is required'),
    }),
    onSubmit: (values) => {
      // Call the update observation function
      handleUpdateObservation(values);
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    // Reset the form values if the existing observation data changes
    if (existingObservation) {
      formik.setValues({
        observation: existingObservation.observation || '',
        action_plan: existingObservation.action_plan || [''],
      });
    }
  }, [existingObservation]);

  const handleAddActionPlan = () => {
    formik.setFieldValue('action_plan', [...formik.values.action_plan, '']);
  };

  const handleRemoveActionPlan = (index) => {
    const updatedActionPlan = formik.values.action_plan.filter((_, i) => i !== index);
    formik.setFieldValue('action_plan', updatedActionPlan);
  };

  const onCloseError = () => {
    dispatch(resetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(resetStatus());
    navigate('/observations');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Update Observation</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Observation"
              name="observation"
              value={formik.values.observation}
              onChange={formik.handleChange}
              error={formik.touched.observation && Boolean(formik.errors.observation)}
              helperText={formik.touched.observation && formik.errors.observation}
            />
            {formik.values.action_plan.map((plan, index) => (
              <Box key={index} display="flex" alignItems="center" marginTop={2}>
                <TextField
                  fullWidth
                  label={`Action Plan ${index + 1}`}
                  name={`action_plan[${index}]`}
                  value={plan}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.action_plan &&
                    formik.touched.action_plan[index] &&
                    Boolean(formik.errors.action_plan && formik.errors.action_plan[index])
                  }
                  helperText={
                    formik.touched.action_plan &&
                    formik.touched.action_plan[index] &&
                    formik.errors.action_plan &&
                    formik.errors.action_plan[index]
                  }
                />
                <IconButton
                  aria-label="remove"
                  color="secondary"
                  onClick={() => handleRemoveActionPlan(index)}
                  disabled={formik.values.action_plan.length === 1} // Disable if there's only one action plan
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddActionPlan}
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Add Action Plan
            </Button>
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

      {status === 'success' && (
        <SuccessComponent
          open={status === 'success'}
          onClose={onCloseSuccess}
          message="Observation Updated Successfully"
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

export default UpdateObservation;
