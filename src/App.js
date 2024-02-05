import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main_page';
import LoginPage from './pages/login_page';
import axios from 'axios';
import GoalItem from './components/goals/goal_item';



axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('access'))}`;
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
     
          <Routes>
              <Route path='/'  element={<MainPage />} />
              <Route path='/:goalId'  element={<GoalItem />} />
              <Route path='/auth' element={<LoginPage />} />
          </Routes>
    
    </>
  
  )
}

export default App;
