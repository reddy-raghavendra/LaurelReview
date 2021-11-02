import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import ADashboard from "./components/Admin-Dashboard";
import Chapbook from "./components/Chapbook";
import CreateUser from "./components/CreateUser.js";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/admin">
          <ADashboard />
        </Route>
        <Route exact path="/Chapbook">
          <Chapbook />
        </Route>
        <Route exact path="/CreateUser">
          <CreateUser />
        </Route>
      </div>
    </Router>
  );
};

export default App;
