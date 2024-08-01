import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/home/HomePage";
import Signup from "./components/home/Signup"; // Create this component
import Login from "./components/home/Login"; // Create this component
import { Box } from "@mui/material";
import ReferenceBooks from "./components/home/ReferenceBooks";
import styles from "./components/home/css/homepage.module.css";

const App = () => {
  return (
    <Router>
      
      
      <Homepage/>
      <Box  className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<ReferenceBooks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
       </Box>
       
    </Router>
  );
};

export default App;
