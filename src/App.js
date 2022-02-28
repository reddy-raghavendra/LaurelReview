import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import UserList from "./components/UserList/UserList";
import AboutUs from "./components/AboutUs/AboutUs";
import User from "./components/User/User";
import NewUser from "./components/NewUser/NewUser";
import ProductList from "./components/ProductList/ProductList";
import Product from "./components/Product/Product";
import NewProduct from "./components/NewProduct/NewProduct";
import IssueList from "./components/Issues/IssueList";
import EditIssue from "./components/Issues/EditIssue";
import NewIssue from "./components/Issues/NewIssue";

function App() {

  return (
    <Router>
      <Navbar />
        <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <div className="container">
          <Route path="/users">
            <Dashboard />
            <UserList />
          </Route>
          <Route path="/aboutUs">
            <Dashboard />
            <AboutUs />
          </Route>
          <Route path="/user/:userId">
            <Dashboard />
            <User />
          </Route>
          <Route path="/newUser">
            <Dashboard />
            <NewUser />
          </Route>
          <Route path="/products">
            <Dashboard />
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Dashboard />
            <Product />
          </Route>
          <Route path="/newproduct">
            <Dashboard />
            <NewProduct />
          </Route>
          <Route path="/issuelist">
            <Dashboard />
            <IssueList />
          </Route>
          <Route path="/editissue/:productid">
            <Dashboard />
            <EditIssue />
          </Route>
          <Route path="/newissue">
            <Dashboard />
            <NewIssue />
          </Route>  
        </div>        
        </Switch>

    </Router>
  );
}

export default App
