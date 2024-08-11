// DeleteConfirmation.jsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import SuccessComponent from "../popup/Success";
import ErrorComponent from "../popup/Error";
import LoadingComponent from "../popup/Loading";
import { resetStatus } from "./slices/deleteMonthlyGoal.slice";
import { getMonthlyGoalsByGoal } from "./slices/listOfMonthlyGoals.slice";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({ open, handleClose, handleConfirm }) => {
  const monthlyGoalState = useSelector((state) => state.deleteMonthlyGoal);
  const selectedGoal = useSelector((state) => state.listGoals.selectedGoal);
  const { status, error } = monthlyGoalState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCloseError = () => {
    dispatch(resetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(resetStatus());
    dispatch(getMonthlyGoalsByGoal(selectedGoal)); // Refresh the monthly goals list after deletion.
    navigate("/monthly-goals");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this monthly goal? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {status === "success" && (
        <SuccessComponent
          open={status === "success"}
          onClose={onCloseSuccess}
          message={"Monthly Goal Deleted Successfully"}
        />
      )}
      {status === "pending" && <LoadingComponent open={status === "pending"} />}
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

export default DeleteConfirmation;
