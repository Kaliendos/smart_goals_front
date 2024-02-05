import axios from "axios";

export async function get_auth_token(username, password){
   
    const tokens =  await axios.post(
        "http://localhost:8000/auth/jwt/create", {
        "username": username,
        "password": password
        }).catch(
        e=>{return e.response})
    if (tokens.status === 200) {
        localStorage.setItem("access", JSON.stringify(tokens.data.access))
        localStorage.setItem("refresh", JSON.stringify(tokens.data.refresh))
      
        return tokens
    }
   return tokens
}


