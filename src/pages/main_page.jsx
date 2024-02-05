

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { is_authenticated } from "../components/auth/auth_utils";
import Goals from "../components/goals/goal_list";



function MainPage() {
    
    const navigate = useNavigate()
    useEffect(()=>{
        if(!is_authenticated()){
            navigate("/auth")
            return
        }
   },[])

    
    return (
        <Goals />
    )
}
export default MainPage;