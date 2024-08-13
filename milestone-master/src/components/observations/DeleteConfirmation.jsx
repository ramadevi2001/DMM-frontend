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
import { resetStatus } from "./slices/deleteObservation.slice";
import { getObservations } from "./slices/listObservations.slice";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({ open, handleClose, handleConfirm }) => {
  const observationState = useSelector((state) => state.deleteObservation);
  const { status, error } = observationState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCloseError = () => {
    dispatch(resetStatus());
  };

  const onCloseSuccess = () => {
    dispatch(resetStatus());
    dispatch(getObservations()); // Refresh the observations list after deletion.
    navigate("/observations");
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
            Are you sure you want to delete this observation? This action cannot be undone.
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
          message={"Observation Deleted Successfully"}
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
