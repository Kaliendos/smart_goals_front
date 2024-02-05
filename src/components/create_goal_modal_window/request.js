import axios from "axios";

export async function send_goal_data(data){
   
    const goal =  await axios.post(
        "http://localhost:8000/goals/", data).catch((error) => {
            return error
        })
        
    return goal.status
    
}
