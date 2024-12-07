import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { addNewAccount } from "../backcon/authapi";
import { createNewUserData } from "./../backcon/databaseapi";

// setup taken from https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const handleSubmit = (event) => {
        //const email = formData.get("email");
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.name.value;
        const grade = form.grade.value;
        const email = form.email.value;
        const password = form.password.value;
        addNewAccount(email, password).then(function(credjsonResp) {
            const uid = credjsonResp.data.uid;
            if(uid) {
                createNewUserData(uid, name, email, grade).then(function(datajsonResp) {
                    setData({
                        credentials: credjsonResp,
                        database: datajsonResp
                    });
                    alert(`Welcome, ${name}!`);
                    navigate("/main", { state: { uid } });
                }).catch(function(err){
                    setData({
                        credentials: credjsonResp,
                        database: err
                    });
                    alert(`Something went wrong (DB, contact Admin).`);
                })
            } else {
                setData(credjsonResp);
                alert(`Something went wrong (Cred)!`);
            }
            
            
        })
        //const auth = AuthAccessor(); Not working, keep on tweekin'
        //var val = auth.addNewUser(email, password);
        setData(email)
    };
    return (
        <div class="sign-up-wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Create Your StudyBuds Account!</h1>
                <div class ="input-box">
                    <input type="text" name="name" placeholder="Full Name" required />
                </div>
                <div class ="input-box">
                    <input type="text" name="grade" placeholder="Grade Level" required />
                </div>
                <div class ="input-box">
                    <input type="text" name="email" placeholder="User Email" required />
                </div>
                <div class ="input-box">
                    <input type="password" name="password" placeholder="Password" required />
                </div>
                <div class ="input-box">
                    <input type="password" name="passCopy" placeholder="Retype Password" required />
                </div>
                {/* 
                <div class = "password-reqs">
                    <p>Password Requirements: </p>
                    <ul>
                        <li>At least ONE <b>capital letter</b></li>
                        <li>At least ONE <b>lowercase letter</b></li>
                        <li>At least ONE <b>number</b></li>
                        <li>At least ONE <b>special character</b></li>
                        (Acceptable characters: ~`!@#$%^&*()_-+={[}]|:;"'<,>.?)
                        <li>Passwords must be between <b>8 and 20 characters long</b></li>
                    </ul>
                </div>
                */}

                <div class="sign-up-agreement">
                    <label><input type="checkbox" />I agree to the terms of service</label>
                </div>

                <button type="submit" class="signup-button">Sign Up</button>

                <div class="log-in">
                    <p>Already have a StudyBuds Account? <a href="login">Log In!</a></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;