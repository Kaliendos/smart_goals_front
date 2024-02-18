import "./sub_goals.css"

import { date_format } from "../../utils"
import { delete_sub_goal } from "./request"
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'



function SubGoal({ goal_id, subgoal }) {
    const [checked, setChecked] = useState(subgoal.is_done);
    const [cssClass, setCssClass] = useState(subgoal.is_done ? "sub_goal_is_done" : "");
    const navigate = useNavigate()
    async function delete_subgoal_handler() {
        await delete_sub_goal(goal_id, subgoal.id)
        window.location.reload()
    }
    async function handleChange() {
        const patch_subgoal = await axios.patch(`http://localhost:8000/goals/${goal_id}/sub_goals/${subgoal.id}/`, {
            is_done: !checked
        })
       
        
        if (patch_subgoal.response) {
            if (patch_subgoal.response.status === 401) {
                navigate("/auth")
            }
        }
        setChecked(!checked)
        !checked ? setCssClass("sub_goal_is_done")  : setCssClass("")
    }
    const trashIcon = <FontAwesomeIcon icon={faTrashCan} style={{ color: 'red' }} />
    return (
        <div className="sub_goal_item">
            <input type="checkbox" className="checkbox_subgoal" id="scales" name="scales" checked={checked} onChange={() => handleChange()} />
            <span className={ cssClass } key={subgoal.id}>{subgoal.title} до {date_format(subgoal.deadline)}</span>
            <span className="trash" onClick={() => delete_subgoal_handler()}>{ trashIcon}</span>
        </div>
    )
}
export default SubGoal