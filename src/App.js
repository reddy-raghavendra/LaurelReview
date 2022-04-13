import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Component } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import UserList from "./components/UserList/UserList";
import AboutUsList from "./components/AboutUs/AboutUsList";
import NewAboutUs from "./components/AboutUs/NewAboutUs";
import EditAboutUs from "./components/AboutUs/EditAboutUs";
import User from "./components/User/User";
import NewUser from "./components/NewUser/NewUser";
// import ProductList from "./components/ProductList/ProductList";
// import Product from "./components/Product/Product";
// import NewProduct from "./components/NewProduct/NewProduct";
import ChapbookList from "./components/ChapbookList/ChapbookList";
import Chapbook from "./components/ChapbookList/Chapbook";
import NewChapbook from "./components/ChapbookList/NewChapbook";
import PodCastList from "./components/PodCast/Podcastlist"
import IssueList from "./components/Issues/IssueList";
import EditIssue from "./components/Issues/EditIssue";
import NewIssue from "./components/Issues/NewIssue";
import {Issues} from "./components/CustomerIssues/Issues";
import AboutUsDetails from "./components/CustomerAboutUs/AboutUsDetails";
import issuesService from "./components/service/issues.service"
import PdfView from "./components/PdfViewer/PdfView";
import NewPodCast from "./components/PodCast/NewPodCast"
import IssueDetails from "./components/CustomerIssues/IssueDetails/IssueDetails";
import Podcasts from "./components/CustomerPodcast/Podcasts"
import samplePdf from "./54.2.pdf"
import EditPodCast from "./components/PodCast/EditPodCast";
import Chapbooks from "./components/CustomerChapbook/Chapbooks";
import ChapbookDetail from "./components/CustomerChapbook/ChapbookDetail";
import { getToken } from "./components/Token/Token";



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
    <Router>
      <Navbar />
        <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        {/* <Route exact path="/issues"> */}
          {/* <Issues/> */}
        {/* </Route> */}
        {/* <Route exact path="/issues/:issuedId"> */}
          {/* <IssueDetails/> */}
        {/* </Route> */}
        <Route exact path="/Issues">
            <Issues {...this.state}/>
          </Route>
          <Route exact path="/Podcasts">
            <Podcasts/>
          </Route>
          <Route exact path="/aboutus">
            <AboutUsDetails/>
          </Route>
          <Route exact path="/chapbooks">
            <Chapbooks/>
          </Route>
        <Route exact path="/Issues/:id" render={(props) => <IssueDetails {...props} {...this.state} />}/>
        <Route exact path="/chapbook/:id" render={(props) => <ChapbookDetail {...props} {...this.state} />}/>
        <Route exact path="/Issues/:id/pdf"><PdfView pdf={samplePdf}/></Route>
        
        <div className="container">
          <Route path="/users">
            <Dashboard />
            <UserList />
          </Route>
          <Route path="/AboutUsList">
            <Dashboard />
            <AboutUsList />
          </Route>
          <Route path="/NewAboutUs">
            <Dashboard />
            <NewAboutUs />
          </Route>
          <Route path="/EditAboutUs">
            <Dashboard />
            <EditAboutUs />
          </Route>
          <Route path="/user/:userId">
            <Dashboard />
            <User />
          </Route>
          <Route path="/newUser">
            <Dashboard />
            <NewUser />
          </Route>
          <Route path="/ChapbookList">
            <Dashboard />
            {/* <ProductList /> */}
            <ChapbookList />
          </Route>
          {/* <Route path="/product/:productId"> */}
          <Route path="/ChapbookList/:ChapbookId">
            <Dashboard />
            {/* <Product /> */}
            <Chapbook />
          </Route>
          {/* <Route path="/newproduct"> */}
          <Route path="/newChapbook">
            <Dashboard />
            {/* <NewProduct /> */}
            <NewChapbook />
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
          <Route path="/podcastlist">
            <Dashboard />
            <PodCastList />
          </Route>  
          <Route path="/newpodcast">
            <Dashboard />
            <NewPodCast />
          </Route>  
          <Route path="/editpodcast/:podcastid">
            <Dashboard />
            <EditPodCast />
          </Route>  
          
        </div>        
        </Switch>

    </Router>
  );
  }
}

// export default App
