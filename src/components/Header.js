import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  const res = localStorage.getItem('username');
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      <Stack direction="row" spacing={2} className="List">
        {hasHiddenAuthButtons && <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push('/')}
        >
          Back to explore
        </Button>}
        {!res && !hasHiddenAuthButtons && (<><Button variant="text" onClick={() => history.push('/login')}>login</Button><Button variant='contained' onClick={() => history.push('/register')}>Register</Button></>)}
        {res && !hasHiddenAuthButtons && (<><Avatar alt={res} src="avatar.png" >{res}</Avatar><p className="username-text">{res}</p><Button variant='text' onClick={() => { localStorage.clear(); history.push("/"); window.location.reload() }}>logout</Button></>)}
      </Stack>
    </Box>
  );
};

export default Header;
