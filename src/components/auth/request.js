import axios from "axios";

function setRefreshDeadline() {
    const date = new Date()
    const day = date.getDate()
    const refresh_deadline = date.setDate(day + 15)
    localStorage.setItem("refresh_deadline", refresh_deadline)
    
}


export async function get_auth_token(username, password){
   
    const tokens =  await axios.post(
        "http://45.82.153.228/auth/jwt/create", {
        "username": username,
        "password": password
        }).catch(
        e=>{return e.response})
    if (tokens.status === 200) {
        localStorage.setItem("access", JSON.stringify(tokens.data.access))
        localStorage.setItem("refresh", JSON.stringify(tokens.data.refresh))
        setRefreshDeadline() // Установить ключ refresh_deadline в localstorage
      
        return tokens
    }
   return tokens
}


