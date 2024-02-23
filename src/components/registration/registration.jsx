import React, { useContext, useEffect, useState } from "react";
import './registration.css'
import { useNavigate } from "react-router-dom";
//import "./registration.css"
import StyledBtn from "../../UI/btn/btn";
import { Link } from "react-router-dom"
import { register_user } from "./request";
import Validator from "../../utils";


function RegForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [repeatPasswordErr, setRepeatPasswordErr] = useState("")
    const navigate = useNavigate()
    // Валидаторы полей

    const validator = new Validator()
 

    const validators  = {
        
        "is_username_correct": validator.validate_username(username),
        "is_password_correct": validator.validate_password(password, 50, 8),
        "isrepeatPasswordCorrect": validator.validate_repeat_password(password, repeatPassword),
        "isPasswordSymbolsCorrect": validator.validate_password_symbols(password)
     
        
    }

    const handleEmailChange = (event) => {
        setUsername(event.target.value);
        setUsernameErr("")
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordErr("")
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
        setRepeatPasswordErr("")
    };


    function setErrState() {

        console.log(validators)
        if (!validators["is_username_correct"]) {
            setUsernameErr("Неправильный формат почты")
        }
        if (!validators["is_password_correct"]) {
            setPasswordErr("Пароль слишком короткий")
        }
        if (!validators["isrepeatPasswordCorrect"]) {
            setRepeatPasswordErr("Пароли не совпадают")
        }

        if (!validators["isUserExists"]) {
            setUsernameErr("Пользователь с таким email уже существует")
        }
        if (!validators["isPasswordSymbolsCorrect"]) {
            setPasswordErr("Пароль должен содержать цифры, буквы и не быть популярным")
        }

    }
  

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(validators, validator.is_valid())
        validators["isUserExists"] = await validator.validate_username_not_exists(username)
        setErrState()
        validator.register_validators(validators)
     
        if (validator.is_valid()) {
            const res = await register_user(username, password)
            if (res.status !== 201) {
               alert("Что то пошло не так, попробуйте подобрать более надежный пароль")
                return
            }
            navigate("/auth")
        }
    };

    const style = {
        border: "none",
        marginTop: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "10em",
        height: "2.5em",
        padding: "0.5em",
        borderRadius: "1em",
        backgroundColor: "green",
        fontSize: "1.1em",

    }

 

    return (
        <div>
        <form onSubmit={handleSubmit} className="login_form">
            <div className="login_form_content">
                <div className="form_row">
                    <label className="error_msg" htmlFor="username">{usernameErr }</label>
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
                    <label className="error_msg" htmlFor="password">{passwordErr}</label>
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
                    <label className="error_msg" htmlFor="repeat_password">{repeatPasswordErr}</label>
                    <input
                        placeholder="повторите пароль"
                        type="password"
                        id="password"
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                        required
                    />
                </div>
                    <div className="btn_group">
                        <StyledBtn handler={(e) => { handleSubmit(e) }} text="Зарегистрироваться" backgroundColor="green" />
                        <span>Уже есть аккаунт ?</span>
                        <Link to="/auth"> <span className="login_span">Войти</span></Link>
                </div>

            </div>
            </form>
        </div>

    );
}
export default RegForm;