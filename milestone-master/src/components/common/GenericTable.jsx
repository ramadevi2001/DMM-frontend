// GenericTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GenericTable = ({
  data,
  headers,
  onCellClick,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  rowKey = "id",
  count = 0, // Total number of filtered records
}) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(16 76 79)" }}>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    padding: "3px",
                    fontSize: "12px",
                  }}
                >
                  {header.toUpperCase()}
                </TableCell>
              ))}
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
            {data.map((row) => (
              <TableRow key={row[rowKey]}>
                {Object.keys(row).map(
                  (key, colIndx) =>
                    key !== rowKey && (
                      <TableCell
                        key={key}
                        sx={{
                          fontWeight: "bold",
                          color: colIndx === 1 ? "blue" : "inherit",
                          textDecoration: colIndx === 1 ? "underline" : "none",
                          cursor: colIndx === 1 ? "pointer" : "default",
                          padding: "2px",
                          fontSize: "10px",
                        }}
                        onClick={() => colIndx === 1 && onCellClick(row[rowKey])}
                      >
                        {Array.isArray(row[key])
                          ? row[key].map((item, index) => (
                              <div key={index}>{item}</div>
                            ))
                          : row[key]}
                      </TableCell>
                    )
                )}
                <TableCell sx={{ padding: "2px", fontSize: "10px" }}>
                  <IconButton onClick={() => onEdit(row)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(row[rowKey])}
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
        count={count} // Reflect total number of filtered records
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[2, 3, 4, 8, 12, 20]}
      />
    </Paper>
  );
};

export default GenericTable;
