import { useState } from "react";
import { post_sub_goal } from "../sub_goals/request";
import { date_validator } from "../../utils";

function SubGoalModal({active, setActive, goal_id}){
    const [title, setTitle] = useState("")
    const [deadline, setDeadline] = useState("")

    const request_data = {
        "title": title,
        "deadline": deadline
    }
    const validators = [date_validator(deadline)]
    function is_valid(validators){
        for(let i = 0; i < validators.length; i++){
            if(!validators[i]){
                return false
            }
        return true
        }
    }
 
    async function submit_handler(e) {
        e.preventDefault()
        if(is_valid(validators)){
            await post_sub_goal(goal_id, request_data)
        }
        setActive(false)
        window.location.reload()
        
    }
    return(
        <div className={active ? 'modal active' : 'modal'} onClick={()=>setActive(false)}>
            <div className='modal_content' onClick={e => e.stopPropagation()}>
              <form onSubmit={submit_handler}>
                <div className='form_content'>
                <button className="close_btn" onClick={()=>setActive(false)}>X</button>
                    <div className="form_row">
                        <label htmlFor="title">Подцель:</label>
                        <input
                        id='title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                        />
                    </div>
                    <div className="form_row">
                        <label htmlFor="deadline">Срок достижения:</label>
                        <input
                        type="date"
                        id='deadline'
                        value={deadline}
                        onChange={(e)=>setDeadline(e.target.value)}
                        required
                        />
                    </div>
                
                </div>
                <button type="submit" className="create_btn">Создать подцель</button>
              </form>
            </div>
        </div>
    )
}

export default SubGoalModal;