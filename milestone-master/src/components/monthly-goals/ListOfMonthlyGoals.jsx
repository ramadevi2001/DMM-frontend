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
// //for add
// import AddMonthlyGoal from "./AddMonthlyGoal";
// import { addMonthlyGoal } from "./slices/addMonthlyGoal.slice";
// //for delete
// import DeleteConfirmation from "./DeleteConfirmation";
// import { deleteMonthlyGoal } from "./slices/deleteMonthlyGoals.slice";
// //for update
// import UpdateMonthlyGoal from "./UpdateMonthlyGoal";
// import { updateMonthlyGoal } from "./slices/updateMonthlyGoal.slice";

const MonthlyGoals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const monthlyGoals = useSelector((state) => state.listMonthlyGoals.monthlyGoals);
  const goals = useSelector((state) => state.listGoals.goals);
  
  const selectedFromGoal = useSelector((state) => state.listGoals.selectedGoal);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
 

  const [openAddModal, setOpenAddModal] = useState(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);

  // const [openUpdateModal, setOpenUpdateModal] = useState(false);
  // const [updateMonthlyGoalData, setUpdateMonthlyGoalData] = useState({});

  useEffect(() => {
    if (!selectedFromGoal) {
      dispatch(getMonthlyGoals());
    } else {
      dispatch(getMonthlyGoalsByGoal(selectedFromGoal));
    }
  }, [dispatch, selectedFromGoal]);

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

  const handleGoalChange = (event) => {
    // setSelectedGoal(event.target.value);
    dispatch(selectedGoalDispatch(event.target.value));
    dispatch(getMonthlyGoalsByGoal(event.target.value));
  };

  const filteredMonthlyGoals = monthlyGoals.filter((monthlyGoal) =>
    Object.values(monthlyGoal).join(" ").toLowerCase().includes(searchTerm)
  );

  const monthlyGoalsToDisplay = filteredMonthlyGoals
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({ id, user, goal, ...rest }) => ({ id, ...rest }));

  const handleEdit = (monthlyGoal) => {
    // setOpenUpdateModal(true);
    // setUpdateMonthlyGoalData(monthlyGoal);
  };

  const handleUpdateMonthlyGoal = (inputData) => {
    // const data = {
    //   id: updateMonthlyGoalData.id,
    //   goal: selectedFromGoal,
    // };
    // const inputPayload = { ...data, ...inputData };

    // dispatch(updateMonthlyGoal(inputPayload));
    // dispatch(getMonthlyGoalsByGoal(selectedFromGoal));
    // setOpenUpdateModal(false);
    // navigate("/monthly-goals");
  };

  const handleDelete = (id) => {
    // setDeleteId(id);
    // setOpenDeleteModal(true);
  };

  const handleCellClick = (id) => {
    dispatch(selectedMonthlyGoal(id));
    navigate("/habits");
  };

  const handleConfirmDelete = () => {
    // if (deleteId !== null) {
    //   dispatch(deleteMonthlyGoal(deleteId));
    //   setDeleteId(null);
    //   setOpenDeleteModal(false);
    //   dispatch(getMonthlyGoals());
    //   navigate("/monthly-goals");
    // }
  };

  const handleAddMonthlyGoal = (inputData) => {
    // dispatch(addMonthlyGoal(inputData));
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

        {monthlyGoals.length > 0 ? (
          <GenericTable
            data={monthlyGoalsToDisplay}
            headers={Object.keys(monthlyGoalsToDisplay[0] || {}).filter(
              (key) => key !== "id" && key !== "goal" && key !== "user"
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
          <h2>No Monthly Goals Yet</h2>
        )}
      </Box>

      {/* <AddMonthlyGoal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddMonthlyGoal={handleAddMonthlyGoal}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />

      <UpdateMonthlyGoal
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handleUpdateMonthlyGoal={handleUpdateMonthlyGoal}
        existingMonthlyGoal={updateMonthlyGoalData}
      /> */}
    </>
  );
};

export default MonthlyGoals;
