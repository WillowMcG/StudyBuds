import React, { useState } from "react";
import "./login.css";
// import "./../backcon/authapi" Not done

// setup taken from https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
// Some parts also from https://builtin.com/software-engineering-perspectives/react-api

const Login = () => {

    const [data, setData] = useState(null);

    const handleSubmit = (event) => {
        //const email = formData.get("email");
        event.preventDefault();
        const form = event.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        //const auth = AuthAccessor(); Not working, keep on tweekin'
        //var val = auth.addNewUser(email, password);
        setData(email)
        alert(`Your email is '${email}'`);
    };
    return (
        <div class="log-in-wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Log In to StudyBuds!</h1>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'No data'}
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
                    <p>New to StudyBuds? <a href="#">Sign Up!</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;