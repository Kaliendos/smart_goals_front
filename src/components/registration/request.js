import axios from "axios"


export async function register_user(username, password) {
    const user = await axios.post("http://localhost:8000/auth/users/",
        {
            "username": username,
            "password": password
        }
    ).catch((e) => {
        console.log(e)
    })
  
    return user
}