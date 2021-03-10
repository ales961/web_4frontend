import React, {useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import "./Navbar.scss";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn, loggedUser, logout} from "../../store/ducks/Auth";
import {AppState} from "../../store/ducks";

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: AppState) => isLoggedIn(state));
    const authSession = useSelector((state: AppState) => loggedUser(state));
    const [responsiveOpen, setResponsiveOpen] = useState(false);
    function toggleResponsive() {
        setResponsiveOpen(!responsiveOpen);
    }
    return (
        <nav id="main-navbar" className={(responsiveOpen ? "responsive" : "")}>
            {isAuthenticated ? (
                <>
                    <NavLink to="/">Home</NavLink>
                    <span className="nav-username">{authSession?.username}</span>
                    <a className={"default-btn btn-navbar"} href="#" onClick={() => dispatch(logout(authSession))}>Logout</a>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                </>
            )}
            <a href="#" className="toggler-responsive" onClick={() => toggleResponsive()}>
                Nav
            </a>
        </nav>
    );
}

export default Navbar;