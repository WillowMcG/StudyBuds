import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./leaderboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData, getGradeData } from "../backcon/databaseapi";

const Home = () => {

    const [userData, setUserData] = useState(null);
    const [name, setName] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const {
        uid,
        grade,
    } = location.state || {};

    React.useEffect(() =>{
        getUserData(uid)
            .then((datajsonResp) => {
                setUserData(datajsonResp);
                setName(datajsonResp.name || "User");
            });
        //setName(datajsonResp.name || "User");
    });
    return (
        <div className="leaderboard-wrapper">
            <h1>Top 5 Students</h1>
            <div className="First">
                <h2>
                    <span>1. </span> Test User #105
                </h2>
            </div>
            <div className="Points">
                <p></p>
            </div>

            <div className="Second">
                <h2>
                    <span>2. </span> Test User #104
                </h2>
            </div>
            <div className="Points">
                <p></p>
            </div>

            <div className="Third">
                <h2>
                    <span>3. </span> Test User #103
                </h2>
            </div>
            <div className="Points">
                <p></p>
            </div>

            <div className="RunnerUps">
                <h2>
                    <span>4. </span> Test User #102
                </h2>
            </div>
            <div className="Points">
                <p></p>
            </div>

            <div className="RunnerUps">
                <h2>
                    <span>5. </span> Test User #101
                </h2>
            </div>

            <div className="DotSpace">
                <p>.</p> <p>.</p> <p>.</p>
            </div>

            <div className="YourScore">
                <h2>
                    <span>Rank #. {name}</span>
                </h2>
            </div>
        </div>
    );
};

export default Home;
