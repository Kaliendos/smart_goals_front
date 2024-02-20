import { is_authenticated } from "../components/auth/auth_utils";
import LoginForm from "../components/auth/login";
import { useNavigate } from "react-router-dom"

import { useEffect } from "react";

function LoginPage() {
    const navigate = useNavigate()
 
    useEffect(() => {
        if (is_authenticated()) {
            navigate("/goals")
        }
    }, [])

     return <LoginForm />
    

        
 }

export default LoginPage;