import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="title">Study Buds</h1>
            <div className="button-group">
                <Link to="/sign-up" className="home-button">Sign Up</Link>
                <Link to="/login" className="home-button">Login</Link>
            </div>
        </div>
    );
};

export default Home;
