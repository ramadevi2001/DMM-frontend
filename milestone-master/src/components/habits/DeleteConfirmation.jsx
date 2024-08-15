// DeleteHabitConfirmation.jsx
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
import { resetStatus } from "./slices/deleteHabit.slice";
import { getHabits } from "./slices/listOfHabits.slice";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({ open, handleClose, handleConfirm }) => {
  const habitState = useSelector((state) => state.deleteHabit);
  const { status, error } = habitState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCloseError = () => {
    dispatch(resetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(resetStatus());
    dispatch(getHabits()); // Refresh the habits list after deletion. This will trigger a new API request.
    navigate("/habits");
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
            Are you sure you want to delete this habit? This action cannot be
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
          message={"Habit Deleted Successfully"}
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
