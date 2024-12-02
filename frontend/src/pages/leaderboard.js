import React from "react";
import { Link } from "react-router-dom";
import "./leaderboard.css";

const Home = () => {
    return (
        /*
            <div className="home-container">
                <h1 className="title">Study Buds</h1>
                <div className="button-group">
                    <Link to="/sign-up" className="home-button">Sign Up</Link>
                    <Link to="/login" className="home-button">Login</Link>
                </div>
            </div>
        */
        <div className="leaderboard-wrapper">
            <h1>Top 5 Students</h1>
            <div className="First">
                <h2>
                    <span>1. </span> Student 1
                </h2>
            </div>
            <div className="Points">
                <p>(insert points)</p>
            </div>

            <div className="Second">
                <h2>
                    <span>2. </span> Student 2
                </h2>
            </div>
            <div className="Points">
                <p>(insert points)</p>
            </div>

            <div className="Third">
                <h2>
                    <span>3. </span> Student 3
                </h2>
            </div>
            <div className="Points">
                <p>(insert points)</p>
            </div>

            <div className="RunnerUps">
                <h2>
                    <span>4. </span> Student 4
                </h2>
            </div>
            <div className="Points">
                <p>(insert points)</p>
            </div>

            <div className="RunnerUps">
                <h2>
                    <span>5. </span> Student 5
                </h2>
            </div>
            <div className="Points">
                <p>(insert points)</p>
            </div>

            <div className="DotSpace">
                <p>.</p> <p>.</p> <p>.</p>
            </div>

            <div className="YourScore">
                <h2>
                    <span>Rank #. </span> Your Student
                </h2>
            </div>
        </div>
    );
};

export default Home;
