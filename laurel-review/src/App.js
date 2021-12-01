import logo from "./logo.svg";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard";
// import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
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
// import AdminBar from "./components/AdminBar.js";

const App = () => {
  return (
    <div className="App">
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
        <Route exact path="/Dashboard"></Route>
        {/* <Navbar /> */}
       </Router>
     </div>
  );
};

export default App;
