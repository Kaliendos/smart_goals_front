import axios from "axios";


export async function get_goals() {

    const goals = await axios.get("http://localhost:8000/goals/").catch((err) => {

        if (err.response.status === 401) {
            console.log("instance of", err instanceof axios.AxiosError)
            return err
        }
    })
    if (goals.data) {
        return goals.data
    }
    return goals

}

export  async function delete_goal(goal_id){
    const goal =   await axios.delete(
        `http://localhost:8000/goals/${goal_id}/`).catch((err)=>{
                return err;
        })
}

export  async function patch_goal(goal_id, data){
    const goal =   await axios.patch(
        `http://localhost:8000/goals/${goal_id}/`, data).catch((err)=>{
                return err;
        })
    return goal
}

