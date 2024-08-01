import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Box,
  Link
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special symbol and one number"
    )
});

const Login = () => {
  const initialValues = {
    email: "",
    password: ""
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (values) => {
    console.log("formdata", values);
  };

  const formStyles = {
    backgroundColor: "#ffffff",
    color: "black",
    borderRadius: "6px",
    width: "400px",
    border: "2px solid white",
  };

  return (
    <Box p={6} style={formStyles}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
            
            
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: { color: "black" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock style={{ color: "black" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleShowPassword}
                          style={{ color: "black" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "rgb(16 76 79)" }}
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Link
                  component={RouterLink}
                  to="/signup"
                  variant="body2"
                  style={{ color: "black" }}
                >
                  Don't Have Account? Signup
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
