// MonthlyGoals.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMonthlyGoals,
  selectedMonthlyGoal,
  getMonthlyGoalsByGoal,
} from "./slices/listOfMonthlyGoals.slice";
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
import { selectedGoal as selectedGoalDispatch } from "../goals/slices/listgoals.slice";
import AddMonthlyGoal from "./AddMonthlyGoal";
import { addMonthlyGoal } from "./slices/addMonthlyGoals.slice";
import { deleteMonthlyGoal } from "./slices/deleteMonthlyGoal.slice";
import DeleteConfirmation from "./DeleteConfirmation";

const MonthlyGoals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const monthlyGoals = useSelector(
    (state) => state.listMonthlyGoals.monthlyGoals
  );
  const goals = useSelector((state) => state.listGoals.goals);
  const selectedFromGoal = useSelector((state) => state.listGoals.selectedGoal);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (selectedFromGoal) {
      dispatch(getMonthlyGoalsByGoal(selectedFromGoal));
    } else {
      dispatch(getMonthlyGoals());
    }
  }, [dispatch, selectedFromGoal]);

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

  const handleGoalChange = (event) => {
    dispatch(selectedGoalDispatch(event.target.value));
    dispatch(getMonthlyGoalsByGoal(event.target.value));
    setPage(0); // Reset to the first page on goal change
  };

  const filteredMonthlyGoals = monthlyGoals.filter((monthlyGoal) =>
    Object.values(monthlyGoal).join(" ").toLowerCase().includes(searchTerm)
  );

  const handleAddMonthlyGoal = (inputData) => {
    dispatch(addMonthlyGoal(inputData));
    setTimeout(() => {
      dispatch(getMonthlyGoalsByGoal(selectedFromGoal));
    }, 2000);
  };

  const handleCellClick = (id) => {
    dispatch(selectedMonthlyGoal(id));
    navigate("/habits");
  };

  const handleEdit = (monthlyGoal) => {
    // Handle edit action here (set up modals, etc.)
  };

  const handleDelete = (id) => {
    // Handle delete action here (open confirmation modal, etc.)
    alert("Are you sure you want to delete");
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteMonthlyGoal(deleteId));
      setDeleteId(null);
      setOpenDeleteModal(false);
      dispatch(getMonthlyGoalsByGoal(selectedFromGoal));
      navigate("/monthly-goals");
    }
  };

  return (
    <>
      <Box sx={{ width: "75%", marginTop: "1%", border: "5px solid #92918e" }}>
        <Box p={1} sx={{ backgroundColor: "white" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Goals</InputLabel>
                <Select
                  value={selectedFromGoal}
                  onChange={handleGoalChange}
                  label="Goals"
                >
                  {goals.map((goal) => (
                    <MenuItem key={goal.id} value={goal.id}>
                      {goal.goal}
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
                Add Monthly Goal
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Your Monthly Goals
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

        {filteredMonthlyGoals.length > 0 ? (
          <GenericTable
            data={filteredMonthlyGoals.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            headers={Object.keys(filteredMonthlyGoals[0] || {}).filter(
              (key) => key !== "id"
            )}
            onCellClick={handleCellClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={filteredMonthlyGoals.length} // Reflect the total number of filtered records
          />
        ) : (
          <h2>No Monthly Goals Yet</h2>
        )}
      </Box>
      <AddMonthlyGoal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddMonthlyGoal={handleAddMonthlyGoal}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default MonthlyGoals;
