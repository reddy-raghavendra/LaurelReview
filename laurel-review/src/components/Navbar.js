import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <div id="navbarNavAltMarkup">
            <div className="navbars">
              <div>
                  <a href="https://thelaurelreview.submittable.com/submit">Submissions</a>
              </div>
              <div>
                <Link to="/register">Subscriptions</Link>
              </div>
              {/* <div>
                <Link to="/login"> Issues</Link>
              </div>
              <div>
                <Link to="/login"> Chapbook</Link>
              </div>
              <div>
                <Link to="/login"> Podcast</Link> */}
              {/* </div> */}
              <div>
                <Link to="/login"> Login</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <img
          src="http://www.laurelreview.org/themes/laurelv1/img/bg-masthead.jpg"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
          }}
        />
    </div>
  );
}

export default Navbar;
