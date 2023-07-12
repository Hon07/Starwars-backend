import React from "react";
import { Link } from "react-router-dom";
import logo from "/workspace/STARWARSPROJECT/src/front/img/starwars.png";
import { useContext } from "react";
import { MyContext } from "../store/appContext";
const Navbar = () => {
  const { actions, store } = useContext(MyContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Star Wars Logo" width="50" height="50" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav nav-fill justify-content-between">
            <li className="nav-item">
              <Link className="nav-link" to="/people">
                People
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vehicles">
                Vehicles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planets">
                Planets
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites {store.favorites.length}
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ color: "green", backgroundColor: "black" }}
              >
                {store.favorites.map((favorite) => (
                  <div className="d-flex">
                    {" "}
                    <li
                      className="dropdown-item"
                      key={favorite.index}
                      style={{ color: "white" }}
                    >
                      {favorite.name}
                    </li>
                    <button
                      className="btn btn-danger"
                      onClick={() => actions.removeFavorites(favorite.index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
