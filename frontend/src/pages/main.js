import React, { useState } from "react";
import "./main.css";
import { getUserCred, addNewUser } from "../backcon/authapi";
import { getUserData } from "../backcon/userapi";
// import "./../backcon/authapi" Not done

// setup taken from https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
// Some parts also from https://builtin.com/software-engineering-perspectives/react-api

const Main = () => {
    return (
        <div class="main-wrapper">
            <h1>Welcome to StudyBuds!</h1>
            <button type = "submit"> Play </button>
        </div>
    );
};

export default Main;