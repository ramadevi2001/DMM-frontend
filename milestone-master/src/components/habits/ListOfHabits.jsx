// Habits.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getHabits,
  getHabitsByMonthlyGoal,
} from "./slices/listOfHabits.slice";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericTable from "../common/GenericTable";
// import AddHabit from "./AddHabit";
// import { addHabit } from "./slices/addHabit.slice";
// import { deleteHabit } from "./slices/deleteHabit.slice";
// import DeleteConfirmation from "./DeleteConfirmation";
// import UpdateHabit from "./UpdateHabit";
// import { updateHabit } from "./slices/updateHabit.slice";
import AddIcon from "@mui/icons-material/Add";
const ListOfHabits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const habits = useSelector((state) => state.listHabits.habits);
  const monthlyGoals = useSelector(
    (state) => state.listMonthlyGoals.monthlyGoals
  );
  const selectedFromMonthlyGoal = useSelector(
    (state) => state.listMonthlyGoals.selectedMonthlyGoal
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedMonthlyGoal, setSelectedMonthlyGoal] = useState(selectedFromMonthlyGoal)
  // const [openAddModal, setOpenAddModal] = useState(false);

  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);

  // const [openUpdateModal, setOpenUpdateModal] = useState(false);
  // const [updateHabitData, setUpdateHabitData] = useState({});

  useEffect(() => {
    if (selectedFromMonthlyGoal) {
      dispatch(getHabitsByMonthlyGoal(selectedFromMonthlyGoal));
    } else {
      dispatch(getHabits());
    }
  }, [dispatch, selectedFromMonthlyGoal]);

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

  const handleMonthlyGoalChange = (event) => {
    // dispatch(selectedHabit(event.target.value));
    setSelectedMonthlyGoal(event.target.value);
    dispatch(getHabitsByMonthlyGoal(event.target.value));
    setPage(0); // Reset to the first page on monthly goal change
  };

  const filteredHabits = habits.filter((habit) =>
    Object.values(habit).join(" ").toLowerCase().includes(searchTerm)
  );

  const habitsToDisplay = filteredHabits
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map(({ id, user, monthly_goal, is_done, ...rest }) => ({ id,  ...rest , is_done: is_done.toString()  }));


  const handleCellClick = (id) => {
    // dispatch(selectedHabit(id));
    navigate("/habits");
  };

  // const handleAddHabit = (inputData) => {
  //   dispatch(addHabit(inputData));
  //   setTimeout(() => {
  //     dispatch(getHabitsByMonthlyGoal(selectedFromMonthlyGoal));
  //   }, 2000);
  // };

  // const handleEdit = (habit) => {
  //   setOpenUpdateModal(true);
  //   setUpdateHabitData(habit);
  // };

  // const handleDelete = (id) => {
  //   alert("Are you sure you want to delete");
  //   setDeleteId(id);
  //   setOpenDeleteModal(true);
  // };

  // const handleConfirmDelete = () => {
  //   if (deleteId !== null) {
  //     dispatch(deleteHabit(deleteId));
  //     setDeleteId(null);
  //     setOpenDeleteModal(false);
  //     dispatch(getHabitsByMonthlyGoal(selectedFromMonthlyGoal));
  //     navigate("/habits");
  //   }
  // };

  return (
    <>
      <Box sx={{ width: "75%", marginTop: "1%", border: "5px solid #92918e" }}>
        <Box p={1} sx={{ backgroundColor: "white" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Monthly Goals</InputLabel>
                <Select
                  value={selectedMonthlyGoal}
                  onChange={handleMonthlyGoalChange}
                  label="Monthly Goals"
                >
                  {monthlyGoals.map((goal) => (
                    <MenuItem key={goal.id} value={goal.id}>
                      {goal.title}
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
                // onClick={() => setOpenAddModal(true)}
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Add Habit
              </Button>
            </Grid> 
           
            <Grid item xs={4}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Your Habits
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

        {filteredHabits.length > 0 ? (
          <GenericTable
            data={habitsToDisplay}
            headers={Object.keys(filteredHabits[0] || {}).filter(
              (key) => key !== "id" && key !== "user" && key !== "monthly_goal"
            )}
            onCellClick={handleCellClick}
            // onEdit={handleEdit}
            // onDelete={handleDelete}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={filteredHabits.length} // Reflect the total number of filtered records
          />
        ) : (
          <h2>No Habits Yet</h2>
        )}
      </Box>
      {/* 
      <AddHabit
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddHabit={handleAddHabit}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />
      <UpdateHabit
       open = {openUpdateModal}
       handleClose = {() => setOpenUpdateModal(false)}
       handleUpdateHabit = {handleUpdateHabit}
       existingHabit={updateHabitData}
      />
      */}
    </>
  );
};

export default ListOfHabits;
