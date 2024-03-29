﻿import './App.css';
import { Route, Routes, useNavigate, Outlet} from 'react-router-dom';
import MainPage from './pages/main_page';
import LoginPage from './pages/login_page';
import GreetingPage from './pages/greeting_page';
import axios from 'axios';
import GoalItem from './components/goals/goal_item';
import RegForm from './components/registration/registration';
import { is_authenticated, is_refresh_alive } from './components/auth/auth_utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Help from './components/help/help';
import Footer from './components/footer/footer';




axios.defaults.baseURL = 'http://localhost:8000/'
if (localStorage.getItem('access')) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('access'))}`;
}

async function get_new_access_token() {
   //  alert(1)
    const tokens = await axios.post("auth/jwt/refresh/", {
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
    
    return error.response
})
function App() {
   
  
    
    const element = < FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#ffffff", "font-size": "2.5em" }} />
  
    return (
        <>  

            {is_authenticated() ? <div className="top_icons"> <Help /><span className="logout" title="Выйти" onClick={() => logout()}>{element} </span></div> : null}
            <div className="main_content">
       <Routes>
            <Route path='/goals' element={<MainPage />} />
            <Route path='/' element={<GreetingPage />} />
                <Route path='/auth' element={<LoginPage />} />
                <Route path='/registration' element={<RegForm />} />
                <Route path='/goals/:goalId' element={<GoalItem />} />
          </Routes>
            </div>
       <Footer />
    </>
  
  )
}

export default App;
