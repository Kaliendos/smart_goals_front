import "./sub_goals.css"

import { date_format } from "../../utils"
import { delete_sub_goal } from "./request"

function SubGoal({goal_id, subgoal}){

    async function delete_subgoal_handler(){
        await delete_sub_goal(goal_id, subgoal.id)
        window.location.reload()
    }


    return (
        <div className="sub_goal_item">
           <input type="checkbox" id="scales" name="scales" />
            <span key={subgoal.id}>{subgoal.title} до {date_format(subgoal.deadline)}</span>
            <span onClick={()=>delete_subgoal_handler()}>Удалить</span>
        </div>
    )
}
export default SubGoal