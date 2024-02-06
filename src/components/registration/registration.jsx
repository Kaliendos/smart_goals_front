import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
//import "./registration.css"
import StyledBtn from "../../UI/btn/btn";
import { Link } from "react-router-dom"
import { register_user } from "./request";

function RegForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleEmailChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register_user(username, password)
    };


    return (
        <form onSubmit={handleSubmit} className="login_form">
            <div className="login_form_content">
                <div className="form_row">
                    <input
                        placeholder="email"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form_row">
                    <input
                        placeholder="пароль"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="form_row">
                    <input
                        placeholder="повторите пароль"
                        type="password"
                        id="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="btn_group">
                    <Link to ="/auth"> <span>Войти</span></Link>
                    <StyledBtn handler={(e) => { handleSubmit(e) }} text="Регистрация" backgroundColor="green" />
                </div>

            </div>
        </form>

    );
}
export default RegForm;