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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, resetStatus } from "./slices/loginSlice";

import ErrorComponent from "../popup/Error";
import LoadingComponent from "../popup/Loading";
import SuccessComponent from "../popup/Success";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special symbol and one number"
    ),
});

const Login = () => {

  const userLogin = useSelector((state) => state.login);
  const { user, status, error } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };



  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  const onCloseError = ()=>{
    dispatch(resetStatus())
 }


 const onCloseSuccess = ()=>{
  dispatch(resetStatus())
  console.log("user after login", user)
  localStorage.setItem('token', user.access)
  localStorage.setItem("user", JSON.stringify(user.user))
  alert("navigate to choices")
  navigate("/choices")
}
  const formStyles = {
    backgroundColor: "#ffffff",
    color: "black",
    borderRadius: "6px",
    width: "400px",
    border: "2px solid white",
  };

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
    {status === "success" && <SuccessComponent open={status === "success"} onClose={onCloseSuccess} message={"Successfully LoggedIn"}/>}
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

export default Login;
