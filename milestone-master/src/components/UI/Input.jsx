import React, { forwardRef } from "react";
import {
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = forwardRef(function Input(
  {
    type = "text",
    label,
    id,
    error,
    showPassword,
    toggleShowPassword,
    options = [],
    ...props
  },
  ref
) {
  const inputStyles = {
    color: "black",
    width: "100%",
    padding: "0px",
    borderColor: error ? "red" : "white",
    backgroundColor: "white",
  };

  const selectInput = (
    <Select
      label={label}
      id={id}
      variant="outlined"
      name={id}
      {...props}
      ref={ref}
      style={inputStyles}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );

  const textareaInput = (
    <TextField
      aria-label={label}
      id={id}
      name={id}
      multiline
      maxRows={4}
      variant="outlined"
      style={inputStyles}
      {...props}
      ref={ref}
    />
  );

  const textInput = (
    <TextField
      type={type}
      label={label}
      id={id}
      name={id}
      variant="outlined"
      {...props}
      inputRef={ref}
      style={inputStyles}
      InputProps={{
        endAdornment: toggleShowPassword && (
          <IconButton onClick={toggleShowPassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
    />
  );

  return (
    <>
      {type === "select"
        ? selectInput
        : type === "textarea"
        ? textareaInput
        : textInput}
    </>
  );
});

export default Input;
