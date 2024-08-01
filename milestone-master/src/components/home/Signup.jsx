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
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup, resetStatus } from "./slices/authSlice";
import ErrorComponent from "../popup/Error";
import LoadingComponent from "../popup/Loading";
import SuccessComponent from "../popup/Success";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special symbol and one number"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const userSignup = useSelector((state) => state.auth);
  const { user, status, error } = userSignup;
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const userData = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    };
    dispatch(signup(userData));
  };

  const formStyles = {
    backgroundColor: "#ffffff",
    color: "black",
    borderRadius: "6px",
    width: "400px",
    border: "2px solid white",
  };


  const onCloseError = ()=>{
  
     dispatch(resetStatus())
  }

  const onCloseSuccess = ()=>{
    dispatch(resetStatus())
    navigate("/login")
  }

  return (
    <>
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
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    InputLabelProps={{
                      style: { color: "balck" },
                    }}
                    InputProps={{
                      style: { color: "balck" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
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
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
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
                            onClick={toggleShowConfirmPassword}
                            style={{ color: "black" }}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
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
                    Signup
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    style={{ color: "black" }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      {status === "success" && <SuccessComponent open={status === "success"} onClose={onCloseSuccess} message={"Signup Successful, Login Now"}/>}
      {status === "pending" && <LoadingComponent open={status === "pending"}/>}
      {status === "failed" && (
        <ErrorComponent
          open={status === "failed"}
          onClose={onCloseError}
          message={error.message}
        />
      )}
    </>
  );
};

export default Signup;
