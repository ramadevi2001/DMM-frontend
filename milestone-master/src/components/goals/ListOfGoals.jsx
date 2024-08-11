// GoalsList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getGoals,
  selectedGoal,
  getGoalsByChoice,
} from "./slices/listgoals.slice";
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
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import GenericTable from "../common/GenericTable";
import AddGoal from "./AddGoal";
import { addGoal } from "./slices/addGoal.slice";
import { selectedChoice as selectedChoiceDispatch } from "../choices/slices/choices.slice";
import DeleteConfirmation from "./DeleteConfirmation";
import { deleteGoal } from "./slices/deleteGoals.slice";
import UpdateGoal from "./UpdateGoal";
import { updateGoal } from "./slices/updateGoal.slice";

const GoalsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goals = useSelector((state) => state.listGoals.goals);
  const choices = useSelector((state) => state.choices.choices);
  const selectedFromChoice = useSelector(
    (state) => state.choices.selectedChoice
  );
  // Assuming your choices are in a slice named 'choices'

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChoice, setSelectedChoice] = useState(selectedFromChoice);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateGoalData, setUpdateGoalData] = useState({});

  useEffect(() => {
    if (!selectedChoice) {
      dispatch(getGoals());
    } else {
      dispatch(getGoalsByChoice(selectedChoice));
    }
    // Assuming there's an action to fetch choices
    // dispatch(getChoices());
  }, [dispatch, selectedChoice]);

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

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
    // Call a function with the ID of the selected choice
    dispatch(selectedChoiceDispatch(event.target.value));
    alert(event.target.value);
    dispatch(getGoalsByChoice(event.target.value));
  };

  const filteredGoals = goals.filter((goal) =>
    Object.values(goal).join(" ").toLowerCase().includes(searchTerm)
  );

  const goalsToDisplay = filteredGoals
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({ id, user, choice, ...rest }) => ({ id, ...rest }));

  const handleEdit = (goal) => {
    setOpenUpdateModal(true);
    setUpdateGoalData(goal);
  };

  const handleUpdateGoal = (inputData) => {
    const data = {
      id: updateGoalData.id,
      choice: selectedFromChoice,
    };
    const inputPayload = { ...data, ...inputData };
    console.log("updadtegoal payload: " + inputPayload)

    alert(inputPayload)
    alert("seelected choice: " + selectedFromChoice)
    dispatch(updateGoal(inputPayload));
    dispatch(getGoalsByChoice(selectedFromChoice));
    setOpenUpdateModal(false);
    navigate("/goals");
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleCellClick = (id) => {
    dispatch(selectedGoal(id));
    alert("selected goalid: " + id)
    navigate("/monthly-goals");
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteGoal(deleteId));
      setDeleteId(null);
      setOpenDeleteModal(false);
      dispatch(getGoalsByChoice(selectedChoice));
      navigate("/goals");
    }
  };

  const handleAddGoal = (inputData) => {
    dispatch(addGoal(inputData));
  };
  return (
    <>
      <Box sx={{ width: "75%", marginTop: "1%", border: "5px solid #92918e" }}>
        <Box p={1} sx={{ backgroundColor: "white" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Choice</InputLabel>
                <Select
                  value={selectedChoice}
                  onChange={handleChoiceChange}
                  label="Choice"
                >
                  {choices.map((choice) => (
                    <MenuItem key={choice.id} value={choice.id}>
                      {choice.become}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddModal(true)}
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Add Goal
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Your Goals
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
          <h2>No Goals Yet</h2>
        )}
      </Box>

      <AddGoal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddGoal={handleAddGoal}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />

      <UpdateGoal
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handleUpdateGoal={handleUpdateGoal}
        existingGoal={updateGoalData}
      />
    </>
  );
};

export default GoalsList;
