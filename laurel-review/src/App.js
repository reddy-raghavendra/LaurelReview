import logo from "./logo.svg";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard";
import { Component } from "react";
// import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Login from "./components/Login";
import UserList from "./pages/Preferences/userList/UserList";
import User from "./pages/Preferences/user/User";
import NewUser from "./pages/Preferences/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Chapbook from "./components/Chapbook";
import CreateUser from "./components/CreateUser.js";
import AboutUs from "./pages/pages/AboutUs";
import { Issues } from "./components/Issues/Issues.js";
import issuesService from "./service/issues.service";
import Navbar from "./components/Navbar";
import IssueDetails from './components/Issues/IssueDetails/IssueDetails';

// import AdminBar from "./components/AdminBar.js";

export default class App extends Component {
  state = { issues: [], isLoading: false };

  componentWillMount() {
    this.iniitateData();
  }
  async iniitateData() {
    const issuesData = await issuesService.fetchIssues();
    this.setState({issues: issuesData.issues, isLoading: issuesData.isLoading})
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/Chapbook">
            <Chapbook />
          </Route>
          <Route exact path="/CreateUser">
            <CreateUser />
          </Route>
          <Route exact path="/Issues">
            <Issues {...this.state}/>
          </Route>
          <Route exact path="/Issues/:id" render={(props) => <IssueDetails {...props} {...this.state} />}/>


          <Route exact path="/Dashboard"></Route>
          {/* <Navbar /> */}
        </Router>
      </div>
    );
  }
}
