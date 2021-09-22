import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header className="row">
          <div className="col-12  py-3 bg-dark">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <NavLink className="navbar-brand" to="/">
                Best Store
              </NavLink>
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
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/home">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Tests Pages
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li className="dropdown-item">
                        <NavLink className="nav-link" to="/posts">
                          Posts
                        </NavLink>
                      </li>
                      <div className="dropdown-divider"></div>
                      <li className="dropdown-item">
                        <NavLink className="nav-link" to="/users">
                          Users
                        </NavLink>
                      </li>
                      <li></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link disabled"
                      to="/404"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      404
                    </NavLink>
                  </li>
                </ul>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </nav>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
