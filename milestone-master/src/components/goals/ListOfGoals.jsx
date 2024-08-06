// GoalsList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGoals, selectedGoal } from "./slices/listgoals.slice";
// import { addChoice } from "./slices/addChoice.slice";
// import { deleteChoice } from "./slices/deleteChoice.slice";
import { Box, Grid, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import GenericTable from "../common/GenericTable";

const GoalsList = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.listGoals.goals);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  //   const [openAddModal, setOpenAddModal] = useState(false);
  //   const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  //   const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateChoiceData, setUpdateChoiceData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGoals());
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

  const handleAddChoice = (inputData) => {
    // dispatch(addChoice(inputData));
    // dispatch(getGoals());
  };

  const handleUpdateChoice = (inputData) => {
    const data = {
      id: updateChoiceData.id,
      become: inputData.become,
    };
    // dispatch(updateChoice(data));
    // dispatch(getgoals());
    // setOpenUpdateModal(false);
    // navigate("/goals");
  };

  //   const handleConfirmDelete = () => {
  //     if (deleteId !== null) {
  //       dispatch(deleteChoice(deleteId));
  //       setDeleteId(null);
  //       setOpenDeleteModal(false);
  //       dispatch(getgoals());
  //       navigate("/goals");
  //     }
  //   };

  const filteredgoals = goals.filter((choice) =>
    Object.values(choice).join(" ").toLowerCase().includes(searchTerm)
  );

  const goalsToDisplay = filteredgoals
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({ id, user, choice, ...rest }) => ({ id, ...rest }));

  const handleEdit = (choice) => {
    // setOpenUpdateModal(true);
    // setUpdateChoiceData(choice);
  };

  const handleDelete = (id) => {
    // setDeleteId(id);
    // setOpenDeleteModal(true);
  };

  const handleCellClick = (id) => {
    dispatch(selectedGoal(id));
    // navigate("/goals");
  };

  return (
    <>
      <Box sx={{ width: "75%", marginTop: "1%", border: "5px solid #92918e" }}>
        <Box p={1} sx={{ backgroundColor: "white" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                // onClick={() => setOpenAddModal(true)}
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Add Goal
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Your Goals
              </Typography>
            </Grid>
            <Grid item xs={3}>
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

        {goals.length > 0 ? (
          <GenericTable
            data={goalsToDisplay}
            headers={Object.keys(goalsToDisplay[0] || {}).filter(
              (key) => key !== "id" && key !== "choice" && key !== "user"
            )}
            onCellClick={handleCellClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          <h2> No Goals Yet</h2>
        )}
      </Box>
    </>
  );
};

export default GoalsList;
