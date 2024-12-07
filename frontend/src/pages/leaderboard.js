import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./leaderboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData, getGradeData } from "../backcon/databaseapi";

const Home = () => {

    const [userData, setUserData] = useState(null);
    const [name, setName] = useState("");
    const [grade, setGrade] = useState(null);
    React.useEffect(() =>{
        getUserData(uid)
            .then((datajsonResp) => {
                //if (gradeData) {return};
                setUserData(datajsonResp);
                setName(datajsonResp.name || "User");
            });
        //setName(datajsonResp.name || "User");
    },);
    return (
        <div className="leaderboard-wrapper">
            <h1>Top 5 Students</h1>
            <div className="First">
                <h2>
                    <span>1. </span> Student 1 {name}
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
