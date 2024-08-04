// ChoicesList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getChoices,
  selectedChoice,
} from "./slices/choices.slice"; // Include deleteChoice action
import { addChoice } from "./slices/addChoice.slice";
import { deleteChoice } from "./slices/deleteChoice.slice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Box,
  IconButton,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AddChoice from "./AddChoice"; // Import the AddChoice component
import DeleteConfirmation from "./DeleteConfirmation"; // Import the DeleteConfirmation component

const ChoicesList = () => {
  const dispatch = useDispatch();
  const choices = useSelector((state) => state.choices.choices); // Adjust according to your Redux state structure
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4); // Default rows per page
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Store ID of item to delete
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getChoices());
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
    dispatch(addChoice(inputData));
    dispatch(getChoices());
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteChoice(deleteId));
      setDeleteId(null);
      setOpenDeleteModal(false);
      dispatch(getChoices());
      navigate("/choices");
    }
  };

  const filteredChoices = choices.filter((choice) =>
    Object.values(choice).join(" ").toLowerCase().includes(searchTerm)
  );

  const choicesToDisplay = filteredChoices
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({ id, user, ...rest }) => ({ id, ...rest })); // Include `id` for actions

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
    // Implement your edit logic here
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleCellClick = (id) => {
    dispatch(selectedChoice(id));
    navigate("/goals");
  };

  return (
    <>
      <Paper
        sx={{ width: "75%", marginTop: "1%", border: "5px solid #92918e" }}
      >
        <Box p={1}>
          <Grid container spacing={1} alignItems="center">
            {/* First Column: Add Choices Button */}
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddModal(true)} // Open the modal
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Add Choice
              </Button>
            </Grid>

            {/* Third Column: Your Choices Heading */}
            <Grid item xs={6}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Your Choices
              </Typography>
            </Grid>

            {/* Fourth Column: Search */}
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

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "rgb(16 76 79)" }}>
              <TableRow>
                {choicesToDisplay.length > 0 &&
                  Object.keys(choicesToDisplay[0]).map(
                    (key) =>
                      key !== "id" && (
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            padding: "3px",
                            fontSize: "12px",
                          }}
                          key={key}
                        >
                          {key.toString().toUpperCase()}
                        </TableCell>
                      )
                  )}
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    padding: "3px",
                    fontSize: "12px",
                  }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {choicesToDisplay.map((choice, index) => (
                <TableRow key={index}>
                  {Object.keys(choice).map(
                    (key, idx) =>
                      key !== "id" && (
                        <TableCell
                          key={idx}
                          sx={{
                            fontWeight: "bold",
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                            padding: "2px",
                            fontSize: "10px",
                          }}
                          onClick={() => handleCellClick(choice.id)}
                        >
                          {choice[key]}
                        </TableCell>
                      )
                  )}
                  <TableCell sx={{ padding: "2px", fontSize: "10px" }}>
                    <IconButton
                      onClick={() => handleEdit(choice.id)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(choice.id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredChoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[4, 8, 12, 20]}
        />
      </Paper>
      <AddChoice
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddChoice={handleAddChoice}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ChoicesList;
