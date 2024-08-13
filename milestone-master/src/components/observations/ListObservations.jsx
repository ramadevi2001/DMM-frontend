// ObservationsList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getObservations } from "./slices/listObservations.slice";
import { Box, Grid, Button, TextField, Typography } from "@mui/material";
import { updateObservation } from "./slices/updateObservation.slice";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import GenericTable from "../common/GenericTable";
import AddObservation from "./AddObservation";
import { addObservation } from "./slices/addObservation.slice";
import UpdateObservation from "./UpdateObservation";

const ObservationsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const observations = useSelector(
    (state) => state.listObservations.observations
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateObservationData, setUpdateObservationData] = useState({});

  useEffect(() => {
    dispatch(getObservations());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setPage(0); // Reset to the first page on search
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page on rows per page change
  };

  const filteredObservations = observations.filter((observation) =>
    Object.values(observation).join(" ").toLowerCase().includes(searchTerm)
  );

  const observationsToDisplay = filteredObservations
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({ id, user, ...rest }) => ({ id, ...rest }));

  const handleCellClick = (id) => {
    alert("Selected observationId: " + id);
    navigate("/monthly-observations");
  };

  const handleAddObservation = (inputData) => {
    dispatch(addObservation(inputData));
    setTimeout(() => {
      dispatch(getObservations());
    }, 1000);
  };

  const handleEdit = (observation) => {
    setOpenUpdateModal(true);
    setUpdateObservationData(observation);
  };

  const handleUpdateObservation = (inputData) => {
    const data = {
      id: updateObservationData.id,
    };
    const inputPayload = { ...data, ...inputData };
    console.log("updadteObservation payload: " + inputPayload);

    dispatch(updateObservation(inputPayload));
    setTimeout(() => {
      dispatch(getObservations());
    }, 2000);
    setOpenUpdateModal(false);
    navigate("/observations");
  };

  return (
    <>
      <Box sx={{ width: "75%", marginTop: "1%", border: "5px solid #92918e" }}>
        <Box p={1} sx={{ backgroundColor: "white" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddModal(true)}
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Add Observation
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Observations
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                label="Search"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Grid>
          </Grid>
        </Box>

        {filteredObservations.length > 0 ? (
          <GenericTable
            data={observationsToDisplay}
            headers={Object.keys(observationsToDisplay[0] || {}).filter(
              (key) => key !== "id" && key !== "user"
            )}
            onCellClick={handleCellClick}
            onEdit={handleEdit}
            // onDelete={handleDelete}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={filteredObservations.length} // Total number of filtered records
          />
        ) : (
          <h2>No Observations Yet</h2>
        )}
      </Box>

      <AddObservation
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddObservation={handleAddObservation}
      />

      <UpdateObservation
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handleUpdateObservation={handleUpdateObservation}
        existingObservation={updateObservationData}
      />
    </>
  );
};

export default ObservationsList;
