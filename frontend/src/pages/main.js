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

    if (!uid) {
        navigate("/login");
        return null;
    }
    getUserData(uid).then((datajsonResp) => {
        setData(datajsonResp);
        setName(datajsonResp.data?.name);
    });

    return (
        <div class="main-wrapper">
            <h1>Welcome to StudyBuds!</h1>
            <p>User ID: {name}</p>
            <button onClick={() => {
                sessionStorage.clear();
                navigate("/"); }}>Log Out</button>
        </div>
    );
};

export default Main;