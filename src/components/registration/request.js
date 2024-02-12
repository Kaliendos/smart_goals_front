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

export async function check_user_exists(username) {
    const user = await axios.get(`http://localhost:8000/check_user_exists/?user=${username}`)
   
    return user.data
}