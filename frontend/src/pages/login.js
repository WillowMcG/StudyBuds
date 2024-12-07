import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { getUserCred } from "../backcon/authapi";
import { getUserData } from "./../backcon/databaseapi";
// import "./../backcon/authapi" Not done

// setup taken from https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
// Some parts also from https://builtin.com/software-engineering-perspectives/react-api

const Login = () => {

    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        //const email = formData.get("email");
        event.preventDefault();
        const form = event.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        getUserCred(email, password).then(function(credjsonResp) {
            const uid = credjsonResp.data.uid;
            if(uid) {
                getUserData(uid).then(function(datajsonResp) {
                    setData({
                        credentials: credjsonResp,
                        database: datajsonResp
                    });
                    alert(`You were found in our database! Hello ${datajsonResp.name}!`);
                    navigate("/main", { state: { uid } });
                }).catch(function(err){
                    setData({
                        credentials: credjsonResp,
                        database: err
                    });
                    alert(`INVALID USER. AUTH PASSED, USER NOT EXISTING.`);
                })
            } else {
                setData(credjsonResp);
                alert(`You were not found in our database!`);
            }
            
            
        })
        //var val = auth.addNewUser(email, password)
        
    };
    return (
        <div class="log-in-wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Log In to StudyBuds!</h1>
                <div class ="input-box">
                    <input name="email" type="text" placeholder="User Email" required />
                </div>
                <div class ="input-box">
                    <input name="password" type="password" placeholder="Password" required />
                </div>
                <div class="remember-user-and-forgot-password">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit" class="login-button">Login</button>

                <div class="sign-up">
                    <p>New to StudyBuds? <a href="sign-up">Sign Up!</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;