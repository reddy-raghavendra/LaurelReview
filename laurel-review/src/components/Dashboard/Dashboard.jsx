import "./Dashboard.css";
import { Link } from "react-router-dom";


export default function Dashboard() {
    return (
      <div className="Dashboard">
        <div className="DashboardWrapper">
          <div className="DashboardMenu">
            <h2 className="DashboardTitle">Submissions</h2>
            <ul className="DashboardList">
              <Link to="/users" className="link">
              <li className="DashboardListItem active">
                Categories
              </li>
              </Link>
             
            </ul>
          </div>
          <div className="DashboardMenu">
            <h2 className="DashboardTitle">Subscriptions</h2>
            <ul className="DashboardList">
              <Link to="/products" className="link">
              <li className="DashboardListItem active">
                Categories
              </li>
              </Link>
            </ul>
          </div>
          <div className="DashboardMenu">
            <h2 className="DashboardTitle">News</h2>
            <ul className="DashboardList">
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Newsletter
              </li>
              </Link>
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Subscribers
              </li>
              </Link>
            </ul>
          </div>
          <div className="DashboardMenu">
            <h2 className="DashboardTitle">Issues</h2>
            <ul className="DashboardList">
              <Link to="/products" className="link">
              <li className="DashboardListItem active">
                Chapbooks
              </li>
              </Link>
              
            </ul>
          </div>

          <div className="DashboardMenu">
            <h2 className="DashboardTitle">Pages</h2>
            <ul className="DashboardList">
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Snippets
              </li>
              </Link>
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Files
              </li>
              </Link>
              <Link to="/AboutUs" className="link">
              <li className="DashboardListItem active">
                Aboutus
              </li>
              </Link>
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Podcast
              </li>
              </Link>
            </ul>
          </div>


          <div className="DashboardMenu">
          <Link to="/" className="link">
            <h2 className="DashboardTitle">Orders</h2>
              </Link>
              
          </div>


          <div className="DashboardMenu">
            <h2 className="DashboardTitle">Preferences</h2>
            <ul className="DashboardList">
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Templates
              </li>
              </Link>
              <Link to="/users" className="link">
              <li className="DashboardListItem active">
                Users
              </li>
              </Link>
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Roles
              </li>
              </Link>
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Exporters
              </li>
              </Link>
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                Backup/Restore
              </li>
              </Link>
              <Link to="/" className="link">
              <li className="DashboardListItem active">
                About
              </li>
              </Link>
            </ul>
          </div>


         
        </div>
      </div>
    );
  }
  