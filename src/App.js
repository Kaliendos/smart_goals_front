import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main_page';
import LoginPage from './pages/login_page';
import axios from 'axios';
import GoalItem from './components/goals/goal_item';
import RegistrationPage from './pages/registration_page';
import RegForm from './components/registration/registration';
import { is_authenticated, is_refresh_alive } from './components/auth/auth_utils';
import { useNavigate } from "react-router-dom";
import StyledBtn from './UI/btn/btn';


if (localStorage.getItem('access')) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('access'))}`;
}

async function get_new_access_token() {
   //  alert(1)
    const tokens = await axios.post("http://localhost:8000/auth/jwt/refresh/", {
        "refresh": JSON.parse(localStorage.getItem('refresh'))
    })
     return tokens.data.access
   
}

function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("refresh_deadline")
    window.location.reload()

}

axios.interceptors.response.use((config) => {
    return config
}, async (error) => {
 
    if (localStorage.getItem('access') && error.response.status === 401) {
        if (!is_refresh_alive()) {
            logout()
        }
        const new_token =  await get_new_access_token()
        localStorage.setItem("access", JSON.stringify(new_token))
        window.location.reload()
    }
    if (error.response.status === 401) {
        console.log(error)
        return error
    }
    if (error.response.status === 404) {
       
        return error
    }
})

function App() {
     
    return (
        <>
            {is_authenticated() ? < StyledBtn text="Выйти" handler={logout}/> : null}
         <Routes>
            <Route path='/' element={<MainPage />} />
                <Route path='/auth' element={<LoginPage />} />
                <Route path='/registration' element={<RegForm />} />
           <Route path='/:goalId'  element={<GoalItem />} />
 
    
          </Routes>
    
    </>
  
  )
}

export default App;
