import axios from "axios"


export async function post_sub_goal(goal_id, data){
    const sub_goal = await axios.post(
    `goals/${goal_id}/sub_goals/`,
        data
        )
    return sub_goal
}

export async function delete_sub_goal(goal_id, sub_goal_id){
    const sub_goal = await axios.delete(`goals/${goal_id}/sub_goals/${sub_goal_id}`)
    return sub_goal
}