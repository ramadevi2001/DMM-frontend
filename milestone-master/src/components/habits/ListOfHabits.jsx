// Habits.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getHabits,
  getHabitsByDate,
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
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericTable from "../common/GenericTable";
import AddHabit from "./AddHabit";
import { addHabit } from "./slices/addHabit.slice";
import { deleteHabit } from "./slices/deleteHabit.slice";
import DeleteConfirmation from "./DeleteConfirmation";
import UpdateHabit from "./HabitUpdate";
import { updateHabit } from "./slices/updateHabit.slice";
import AddIcon from "@mui/icons-material/Add";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import TodayHabits from "./TodayHabits";
import ProductivityChartPopup from "./ProductivityChart";
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

  const [selectedMonthlyGoal, setSelectedMonthlyGoal] = useState(
    selectedFromMonthlyGoal
  );
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateHabitData, setUpdateHabitData] = useState({});

  const [openProductivityModal, setOpenProductivityModal] = useState(false);

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
    .map(({ id, user, monthly_goal, is_done, ...rest }) => ({
      id,
      ...rest,
      is_done: is_done,
    }));

  const handleCellClick = (id) => {
    // dispatch(selectedHabit(id));
    navigate("/habits");
  };

  const handleAddHabit = (inputData) => {
    const data = {
      monthly_goal: selectedFromMonthlyGoal,
    };
    dispatch(addHabit({ ...inputData, ...data }));
    setTimeout(() => {
      dispatch(getHabitsByMonthlyGoal(selectedFromMonthlyGoal));
    }, 2000);
  };

  const handleEdit = (habit) => {
    setOpenUpdateModal(true);
    setUpdateHabitData(habit);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteHabit(deleteId));
      setDeleteId(null);
      setOpenDeleteModal(false);
      dispatch(getHabitsByMonthlyGoal(selectedFromMonthlyGoal));
      navigate("/habits");
    }
  };

  const handleUpdateHabit = (inputData) => {
    const data = {
      id: updateHabitData.id,
      monthly_goal: selectedFromMonthlyGoal,
    };
    const inputPayload = { ...data, ...inputData };
    dispatch(updateHabit(inputPayload));
    dispatch(getHabitsByMonthlyGoal(selectedFromMonthlyGoal));
    setOpenUpdateModal(false);
    navigate("/habits");
  };

  const hadleDateFectHabits = (date) => {
    dispatch(getHabitsByDate(date));
    setOpenDateModal(false);
    navigate("/habits");
  };

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
                onClick={() => setOpenAddModal(true)}
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Add Habit
              </Button>
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<VerticalSplitIcon />}
                onClick={() => setOpenDateModal(true)}
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Today Habits
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<InsertChartIcon />}
                onClick={() => setOpenProductivityModal(true)}
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Productivity
              </Button>
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
            onEdit={handleEdit}
            onDelete={handleDelete}
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

      <TodayHabits
        open={openDateModal}
        handleClose={() => setOpenDateModal(false)}
        handleFetchHabits={hadleDateFectHabits}
      />

      <UpdateHabit
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handleUpdateHabit={handleUpdateHabit}
        existingHabit={updateHabitData}
      />

      <ProductivityChartPopup
        open={openProductivityModal}
        handleClose={() => {
          setOpenProductivityModal(false);
        }}
        data={habits}
      />
    </>
  );
};

export default ListOfHabits;
