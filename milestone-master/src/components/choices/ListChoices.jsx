// ChoicesList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChoices, selectedChoice } from "./slices/choices.slice";
import { addChoice } from "./slices/addChoice.slice";
import { deleteChoice } from "./slices/deleteChoice.slice";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AddChoice from "./AddChoice";
import DeleteConfirmation from "./DeleteConfirmation";
import UpdateChoice from "./UpdateChoice";
import { updateChoice } from "./slices/updateChoice.slice";
import GenericTable from "../common/GenericTable";

const ChoicesList = () => {
  const dispatch = useDispatch();
  const choices = useSelector((state) => state.choices.choices);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateChoiceData, setUpdateChoiceData] = useState({});
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

  const handleUpdateChoice = (inputData) => {
    const data = {
      id: updateChoiceData.id,
      become: inputData.become,
    };
    dispatch(updateChoice(data));
    dispatch(getChoices());
    setOpenUpdateModal(false);
    navigate("/choices");
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
    .map(({ id, user, ...rest }) => ({ id, ...rest }));

  const handleEdit = (choice) => {
    setOpenUpdateModal(true);
    setUpdateChoiceData(choice);
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
      <Box sx={{ width: "75%", marginTop: "1%", border: "5px solid #92918e" }}>
        <Box p={1} sx={{backgroundColor: "white"}}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddModal(true)}
                sx={{ backgroundColor: "rgb(21, 100, 104)" }}
              >
                Add Choice
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Your Choices
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

        <GenericTable
          data={choicesToDisplay}
          headers={Object.keys(choicesToDisplay[0] || {}).filter(
            (key) => key !== "id"
          )}
          onCellClick={handleCellClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>

      <AddChoice
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddChoice={handleAddChoice}
      />
      <UpdateChoice
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handleUpdateChoice={handleUpdateChoice}
        existingChoice={updateChoiceData}
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
