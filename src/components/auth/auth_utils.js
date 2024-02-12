const access = JSON.parse(localStorage.getItem("access"));
const refresh = JSON.parse(localStorage.getItem("access"))
const refreshLifeTimeMinutes = 0.5


export  function is_authenticated(){
  if(access){
    return true
  }
  return false
}


export function is_refresh_alive() {
    const now = new Date().getTime()
    const refresh_deadline = localStorage.getItem("refresh_deadline")
    const diff = new Date(parseInt(refresh_deadline)).getTime() - now
    
    if (!refresh_deadline) {
        return true
    }
    if (diff <= 0) {
        return false
    } else {
        return true
    }
    
  
}