import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="">
           <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            SharePass
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to={"/encrypt"} className="nav-item nav-link">
                Encrypt
              </NavLink>
              <NavLink to={"/decrypt"} className="nav-item nav-link">
                Dycrypt
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
