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
import { resetStatus} from "./slices/deleteGoals.slice";
import { getGoalsByChoice } from "./slices/listgoals.slice";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({ open, handleClose, handleConfirm }) => {
  const goalState = useSelector((state) => state.deleteGoal);
  const selectedChoice = useSelector((state) => state.choices.selectedChoice)
  const { status, error } = goalState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCloseError = () => {
    dispatch(resetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(resetStatus());
    dispatch(getGoalsByChoice(selectedChoice)); // Refresh the choices list after deletion. This will trigger a new API request.
    navigate("/goals");
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
            Are you sure you want to delete this goal? This action cannot be
            undone.
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
          message={"Goal Deleted Successfully"}
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
