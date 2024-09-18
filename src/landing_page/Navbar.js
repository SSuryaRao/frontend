import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#007bff" }} // Blue background color
    >
      <div className="container-fluid p-2 d-flex justify-content-between">
        {/* Pushes the title to the far left */}
        <h1 className="navbar-brand text-white">Disaster Alert Portal</h1>

        {/* Pushes the buttons to the far right */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/flood">
                Flood
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/landslide">
                Landslide
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/earthquake">
                Earthquake
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/helpline">
                Helpline
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
