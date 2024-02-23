import React, { useState } from "react";
import { get_auth_token } from "./request";
import { useNavigate } from "react-router-dom";
import "./login.css"
import StyledBtn from "../../UI/btn/btn";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'


function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errPassword, setErrPassword] = useState("")
    const [showPassword, setShowPassword] = useState("password")


    const navigate = useNavigate();
   

    const handleEmailChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrPassword("")
    };
    const switchShowPasword = () =>{
        if (showPassword === "password") {
            setShowPassword("text")
        } else {
            setShowPassword("password")
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const tokens = await get_auth_token(username, password)
            if (tokens.status === 200) {
                return navigate("/goals/")
            }else if (tokens.response.data.detail === "No active account found with the given credentials") {
                setErrPassword("Неправильный логин или пароль")
            }
        } catch (error) {
            console.error("Ошибка при получении токенов авторизации:", error);
        }
    };

    const icon = <FontAwesomeIcon icon={faEye} color="white" fontSize="1.2em" onClick={() => switchShowPasword()} />

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
                {icon}
                <div className="form_row">
                    <input
                        placeholder="пароль"
                        type={showPassword}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <span style={{color:"red"} }>{errPassword}</span>
                <div className="btn_group">
                    <StyledBtn handler={handleSubmit} text="Войти" backgroundColor="green" is_active={true} />
                    <span>Нет аккаунта ?</span>
                    <Link to="/registration">
                        <span className="reg_span">Зарегистрироваться</span>
                    </Link>
                </div>
                
            </div>
        </form>
    );
}
export default LoginForm;