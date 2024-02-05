import "./sub_goals.css"

import { date_format } from "../../utils"
import { delete_sub_goal } from "./request"
import { useState } from "react";
import axios from "axios"


function SubGoal({ goal_id, subgoal }) {
    const [checked, setChecked] = useState(subgoal.is_done);
    const [cssClass, setCssClass] = useState(subgoal.is_done ? "sub_goal_is_done" : "");
    async function delete_subgoal_handler() {
        await delete_sub_goal(goal_id, subgoal.id)
        window.location.reload()
    }
    async function handleChange() {
        await axios.patch(`http://localhost:8000/goals/${goal_id}/sub_goals/${subgoal.id}/`, {
            is_done: !checked
        })
        setChecked(!checked)
        !checked ? setCssClass("sub_goal_is_done")  : setCssClass("")
    }

    return (
        <div className="sub_goal_item">
            <input type="checkbox" id="scales" name="scales" checked={checked} onChange={()=>handleChange()} />
            <span className={ cssClass } key={subgoal.id}>{subgoal.title} до {date_format(subgoal.deadline)}</span>
            <span onClick={()=>delete_subgoal_handler()}>Удалить</span>
        </div>
    )
}
export default SubGoal