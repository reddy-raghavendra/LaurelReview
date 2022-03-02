import "./Dashboard.css";
import "./../../App.css"
import { Link } from "react-router-dom";
import "../Search/Search"


export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="DashboardWrapper">
        <div className="DashboardMenu">
          <h2 className="DashboardTitle">Issues</h2>
          <ul className="DashboardList">
            <Link to="/issuelist" className="link">
              <li className="DashboardListItem active">
                Issues
              </li>
            </Link>
          </ul>
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
            <div>
              <Link to="/" className="link">
                <li className="DashboardListItem active">
                  Files
                </li>
              </Link>
            </div>
            <div>
              <Link to="/AboutUs" className="link">
                <li className="DashboardListItem active">
                  Aboutus
                </li>
              </Link>
            </div>

            <Link to="/" className="link">
              <li className="DashboardListItem active">
                Podcast
              </li>
            </Link>

          </ul>
        </div>
        <div className="DashboardMenu">
          <h2 className="DashboardTitle">Preferences</h2>
          <ul className="DashboardList">
            <div>
            <Link to="/users" className="link">
              <li className="DashboardListItem active">
                Users
              </li>
            </Link>
            </div>
            <div>
            <Link to="/" className="link">
              <li className="DashboardListItem active">
                Roles
              </li>
            </Link>
            </div>
            
            <Link to="/" className="link">
              <li className="DashboardListItem active">
                About
              </li>
            </Link>
          </ul>
        </div>


        {/* <div className="DashboardMenu">
            <h2 className="DashboardTitle">Quick Menu</h2>
            <ul className="DashboardList">
              <Link to="/users" className="link">
                <li className="DashboardListItem">
                  Users
                </li>
              </Link>
              <Link to="/products" className="link">
                <li className="DashboardListItem">
                  Products
                </li>
              </Link>
              <li className="DashboardListItem">
                Transactions
              </li>
              <li className="DashboardListItem">
                Reports
              </li>
            </ul>
          </div>
          <div className="DashboardMenu">
            <h2 className="DashboardTitle">Notifications</h2>
            <ul className="DashboardList">
              <li className="DashboardListItem">
                Mail
              </li>
              <li className="DashboardListItem">
                Feedback
              </li>
              <li className="DashboardListItem">
                Messages
              </li>
            </ul>
          </div>
          <div className="DashboardMenu">
            <h2 className="DashboardTitle">Staff</h2>
            <ul className="DashboardList">
              <li className="DashboardListItem">
                Manage
              </li>
              <li className="DashboardListItem">
                Analytics
              </li>
              <li className="DashboardListItem">
                Reports
              </li>
            </ul>
          </div> */}
      </div>
    </div>
  );
}
