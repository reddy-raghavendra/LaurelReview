import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <Link to="/"> The Laurel Review</Link>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbars">
            <div>
              <Link to="/">Submissions</Link>
            </div>
            <div>
              <Link to="/register">Subscriptions</Link>
            </div>
            <div>
              <Link to="/login"> Issues</Link>
            </div>
            <div>
              <Link to="/login"> Chapbook</Link>
            </div>
            <div>
              <Link to="/login"> Podcast</Link>
            </div>
            <div>
              <Link to="/login"> Login</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
