import axios from "axios";


export async function get_goals() {

    const goals = await axios.get("goals/").catch((err) => {

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
        `goals/${goal_id}/`).catch((err)=>{
                return err;
        })
    return goal
}

export  async function patch_goal(goal_id, data){
    const goal =   await axios.patch(
        `goals/${goal_id}/`, data).catch((err)=>{
                return err;
        })
    return goal
}


export async function patchGoalIsDone(goal_id) {
    const goal = await axios.patch(
        `goals/${goal_id}/`, {"is_done": true}).catch((err) => {
            return err;
        })
    return goal
}
export async function patchGoalIsNotDone(goal_id) {
    const goal = await axios.patch(
        `goals/${goal_id}/`, { "is_done": false }).catch((err) => {
            return err;
        })
    return goal
}

