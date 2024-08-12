// ObservationsList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getObservations
} from "./slices/listObservations.slice";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import GenericTable from "../common/GenericTable";
// import AddObservation from "./AddObservation";
// import { addObservation } from "./slices/addObservation.slice";
// import DeleteConfirmation from "./DeleteConfirmation";
// import { deleteObservation } from "./slices/deleteObservations.slice";
// import UpdateObservation from "./UpdateObservation";
// import { updateObservation } from "./slices/updateObservation.slice";

const ObservationsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const observations = useSelector((state) => state.listObservations.observations);
  console.log("observations", observations)
//   alert(observations);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
 

  // const [openAddModal, setOpenAddModal] = useState(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);

  // const [openUpdateModal, setOpenUpdateModal] = useState(false);
  // const [updateObservationData, setUpdateObservationData] = useState({});

  useEffect(() => {
  
      dispatch(getObservations());
    
    // Assuming there's an action to fetch choices
    // dispatch(getChoices());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const filteredObservations = observations.filter((observation) =>
    Object.values(observation).join(" ").toLowerCase().includes(searchTerm)
  );

  const observationsToDisplay = filteredObservations
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({ id, user, ...rest }) => ({ id, ...rest }));

  // const handleEdit = (observation) => {
  //   setOpenUpdateModal(true);
  //   setUpdateObservationData(observation);
  // };

  // const handleUpdateObservation = (inputData) => {
  //   const data = {
  //     id: updateObservationData.id,
  //     choice: selectedFromChoice,
  //   };
  //   const inputPayload = { ...data, ...inputData };
  //   console.log("updateObservation payload: " + inputPayload)

  //   alert(inputPayload)
  //   alert("selected choice: " + selectedFromChoice)
  //   dispatch(updateObservation(inputPayload));
  //   dispatch(getObservationsByChoice(selectedFromChoice));
  //   setOpenUpdateModal(false);
  //   navigate("/observations");
  // };

  // const handleDelete = (id) => {
  //   setDeleteId(id);
  //   setOpenDeleteModal(true);
  // };

  const handleCellClick = (id) => {
    // dispatch(selectedObservation(id));
    alert("selected observationId: " + id)
    navigate("/monthly-observations");
  };

  // const handleConfirmDelete = () => {
  //   if (deleteId !== null) {
  //     dispatch(deleteObservation(deleteId));
  //     setDeleteId(null);
  //     setOpenDeleteModal(false);
  //     dispatch(getObservationsByChoice(selectedChoice));
  //     navigate("/observations");
  //   }
  // };

  // const handleAddObservation = (inputData) => {
  //   dispatch(addObservation(inputData));
  // };

  return (
    <>
      <Box sx={{ width: "75%", marginTop: "1%", border: "5px solid #92918e" }}>
        <Box p={1} sx={{ backgroundColor: "white" }}>
          <Grid container spacing={1} alignItems="center">
          
            {/* 
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
            */}
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

        {observations.length > 0 ? (
            
          <GenericTable
            data={observationsToDisplay}
            headers={Object.keys(observationsToDisplay[0] || {}).filter(
              (key) => key !== "id"  && key !== "user"
            )}
            onCellClick={handleCellClick}
            // onEdit={handleEdit}
            // onDelete={handleDelete}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          <h2>No Observations Yet</h2>
        )}
      </Box>

      {/* 
      <AddObservation
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddObservation={handleAddObservation}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />

      <UpdateObservation
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handleUpdateObservation={handleUpdateObservation}
        existingObservation={updateObservationData}
      />
      */}
    </>
  );
};

export default ObservationsList;
