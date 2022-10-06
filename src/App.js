import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";

export const config = {
  endpoint: `https://qkart-frontend-ashwani.herokuapp.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/thanks">
            <Thanks/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;


        // curl -X POST -H "Content-Type: application/json" -d '{"username": "crio.do", "password": "something"}' http://3.6.5.12:8082/api/v1/auth/register
        // curl -X POST -H "Content-Type: application/json" -d '{"username": "crio.do", "password": "something"}' http://3.6.5.12:8082/api/v1/auth/login


// curl -X POST -H "Content-Type: application/json" \
//  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyaW8uZG8iLCJpYXQiOjE2NTkzNDUwOTMsImV4cCI6MTY1OTM2NjY5M30.LQikLXUDWSZtaRJ6YX6C9whKHbLq8YptLraD9RtjUMM' \
//     -d '{"productId":"KCRwjF7lN97HnEaY","qty":4}' \
//    http://43.205.58.230:8082/api/v1/cart


// curl 'http://localhost:8082/api/v1/user/addresses' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyaW8uZG8iLCJpYXQiOjE2NTk0NDcxNjYsImV4cCI6MTY1OTQ2ODc2Nn0.dqVKl_SuSeMaC2z9GUKvuyZDoeSsf07gHg0nZvYRz0E' \


// curl -X POST -H "Content-Type: application/json" \
//  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyaW8uZG8iLCJpYXQiOjE2NTk0NjA1MDYsImV4cCI6MTY1OTQ4MjEwNn0.vaztX1hPqt7fbRYYtq36Ubr7fUX8GmLiNTKOzJJTYi8' \
//     -d '{"address":"Rz-295, Rajnagar, Palam, New Delhi"}' \
//    http://localhost:8082/api/v1/user/addresses

   
// curl 'http://localhost:8082/api/v1/user/addresses/UKHypLu4kH2AWI8-TGVb-' \
// -X 'DELETE' \
// -H 'Accept: application/json, text/plain, */*' \
// -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyaW8uZG8iLCJpYXQiOjE2NTk0NDcxNjYsImV4cCI6MTY1OTQ2ODc2Nn0.dqVKl_SuSeMaC2z9GUKvuyZDoeSsf07gHg0nZvYRz0E' \