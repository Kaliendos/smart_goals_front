const user = JSON.parse(localStorage.getItem("access"));
const refresh = JSON.parse(localStorage.getItem("access"))


export default function getAuthHeader() {
    if (user && user.access_token) {
      return `Bearer ${user.access_token}`;
    } else {
      return null;
    }
  }

export  function is_authenticated(){
  if(user){
    return true
  }
  return false
}

function new_feature(){
  return 0;
}

function refresh_token(req) {
    console.log(()=>req)
}