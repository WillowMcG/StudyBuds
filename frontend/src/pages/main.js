import React, { useState } from "react";
import "./main.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserCred, addNewUser } from "../backcon/authapi";
import { getUserData } from "../backcon/databaseapi";
// import "./../backcon/authapi" Not done

// setup taken from https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
// Some parts also from https://builtin.com/software-engineering-perspectives/react-api

const Main = () => {
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { uid } = location.state || {};

    React.useEffect(() => {
        if (!uid) {
            navigate("/login");
        } else {
            // Fetch user data
            getUserData(uid).then((datajsonResp) => {
                setData(datajsonResp);
                setName(datajsonResp.data?.name || "User");
            });
        }
    }, [uid, navigate]);

    // Render nothing while redirect
    if (!uid) return null;

    return (
        <div className="main-container">
            <div className="header">
                <button className="menu-button">&#9776;</button>
                <button className="arrow-button left-arrow">&#x276E;</button>
                <h1>Unit 3: Integration By Parts</h1>
                <button className="arrow-button right-arrow">&#x276F;</button>
                <p className="score">9,325</p>
            </div>
            <div className="content">

                <button className="play-button">Play {name}</button>
            </div>
        </div>
    );
};

export default Main;