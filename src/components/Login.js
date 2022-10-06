import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({ username: "", password: "" });
  const history = useHistory();

  const setInput = (event) => {
    const obj = { ...data };
    obj[event.target.name] = event.target.value;
    setData(obj);
  }
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    if (validateInput(formData)) {
      try {
        const params = { ...formData }
        const { data } = await axios.post(`${config.endpoint}/auth/login`, params);
        if (data.success) {
          enqueueSnackbar('Logged In', { variant: "success", autoHideDuration: 3000 });
          const { username, balance, token } = data;
          persistLogin(username, balance, token);
          history.push('/');
        }
      } catch (err) {
        console.log(err);
        if (err.response === undefined) {
          enqueueSnackbar('Backend not started!', { variant: 'error', autoHideDuration: 3000 });

        }
        else if (err.response.data.success === false) {
          enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 3000 });
        }
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    const { username, password } = data;
    if (username.length === 0) {
      enqueueSnackbar('Username required', { variant: "warning", autoHideDuration: 3000 });
      return false;

    }
    else if (password.length === 0) {
      enqueueSnackbar('Password required', { variant: "warning", autoHideDuration: 3000 });
      return false;

    }
    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (username, balance, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('balance', balance);
    localStorage.setItem('token', token);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={ true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={setInput}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={setInput}

          />

          {/* {loader && <CircularProgress color="inherit" id="loader" />} */}
          <Button className="button" variant="contained" onClick={() => login(data)}>
            Login to QKart
          </Button>
          <p className="secondary-action">
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register Now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
