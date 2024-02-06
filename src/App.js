import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main_page';
import LoginPage from './pages/login_page';
import axios from 'axios';
import GoalItem from './components/goals/goal_item';
import RegistrationPage from './pages/registration_page';
import RegForm from './components/registration/registration';


if (localStorage.getItem('access')) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('access'))}`;
}
console.log("stary", axios.defaults.headers.common['Authorization'])
 async function get_new_access_token() {
    const tokens = await axios.post("http://localhost:8000/auth/jwt/refresh/", {
        "refresh": JSON.parse(localStorage.getItem('refresh'))
    })
     return tokens.data.access
   
}

axios.interceptors.response.use((config) => {
    return config
},async (error) => {
    if (localStorage.getItem('access') && error.response.status === 401) {
        const new_token =  await get_new_access_token()
        localStorage.setItem("access", JSON.stringify(new_token))
        window.location.reload()
    }
})

function App() {

  

    return (
        <>
        <h1>ывпывп</h1>
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
