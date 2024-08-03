import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChoices, selectedChoice } from './choices.slice'; // Adjust the import path according to your project structure
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, TextField, Box, IconButton, Grid, Button, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ChoicesList = () => {
  const dispatch = useDispatch();
  const choices = useSelector((state) => state.choices.choices); // Adjust according to your Redux state structure
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4); // Default rows per page
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredChoices = choices.filter((choice) =>
    Object.values(choice)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm)
  );

  const choicesToDisplay = filteredChoices
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({ id, user, ...rest }) => ({ id, ...rest })); // Include `id` for actions

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
    // Implement your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete item with id: ${id}`);
    // Implement your delete logic here
  };

  const handleCellClick = (id) => {
    dispatch(selectedChoice(id));
    navigate("/goals");
  };

  return (
    <Paper sx={{ width: "90%", marginTop: "5%", border: "5px solid #92918e" }}>
      <Box p={2}>
        <Grid container spacing={2} alignItems="center">
          {/* First Column: Add Choices Button */}
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => console.log("Add new choice")} // Replace with actual logic
            >
              Add Choice
            </Button>
          </Grid>


          {/* Third Column: Your Choices Heading */}
          <Grid item xs={6}>
            <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
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
                Object.keys(choicesToDisplay[0]).map((key) => (
                  key !== 'id' && <TableCell sx={{ color: "white", fontWeight: 'bold' }} key={key}>{key.toString().toUpperCase()}</TableCell>
                ))}
              <TableCell sx={{ color: "white", fontWeight: 'bold' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {choicesToDisplay.map((choice, index) => (
              <TableRow key={index}>
                {Object.keys(choice).map((key, idx) =>
                  key !== 'id' && (
                    <TableCell
                      key={idx}
                      sx={{
                        fontWeight: 'bold',
                        color: 'blue',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleCellClick(choice.id)}
                    >
                      {choice[key]}
                    </TableCell>
                  )
                )}
                <TableCell>
                  <IconButton onClick={() => handleEdit(choice.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(choice.id)} color="secondary">
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
  );
};

export default ChoicesList;
