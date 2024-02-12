import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { delete_goal, patch_goal } from "./request";
import SubGoalModal from "../sub_goal_modal_window/sub_goal_modal";
import SubGoal from "../sub_goals/sub_goals"
import { date_format } from "../../utils";
import { is_authenticated } from "../auth/auth_utils";


function GoalItem() {
    const {goalId} = useParams()
    const navigate = useNavigate()
    const [goal, setGoal] = useState({})
    const [modalActive, setModalActive] = useState(false)
    if (!is_authenticated()) {
 
        navigate("/auth")
    }
    async function get_goal_by_id(goal_id){
        try{
        const goal_item = await axios.get(`http://localhost:8000/goals/${goal_id}`)
            .catch((error) => {
                return error
            })
            if (goal_item.data) {
                return goal_item.data
            }
            if (goal_item.response.status === 404) {
                navigate("/not_found/123")
            }
            if (goal_item.response.status === 401) {
                navigate("/auth")
            }
            return
            
            
       }catch(e){
            if(!goal.data){
                throw Error("Свойство goal.data пустое")
            }
        }
    }
    useEffect(()=>{
        const get_goal = async () => {
            try {
                setGoal(await get_goal_by_id(goalId))
            } catch(err){
                console.log(err)
            }
 
            
        }
        get_goal()
    }, [])
  
    async function delete_goal_by_id(goal_id){
       const confirm = window.confirm("Вы уверены?");
       if(confirm){
        await delete_goal(goalId)
        navigate("/")
       }
    }
   
    async function patch_managed_goal(goal_id){
        const new_managed_value = prompt("Введите значение")
        await patch_goal(goal_id, {"managed_value": new_managed_value})
        window.location.reload()
    }
    async function patch_max_value(goal_id){
        const new_max_value = prompt("Введите значение")
        await patch_goal(goal_id, {"max_value_to_achieve_goal": new_max_value})
        window.location.reload()
    }
 
    return (
        <>
         <Link to="/">К списку целей</Link>
        <div className="goal_page">
                <h2>{goal.title}</h2>
                <span>Дата окончания: {date_format(goal.deadline)}</span>
            <p>Награда: {goal.reward}</p>
            <div className="goal_card_row">
                <p>Критерий достижимости: {goal.max_value_to_achieve_goal}</p>
                <span onClick={()=>patch_max_value(goal.id)}/>
            </div>
            <div className="goal_card_row">
                <span>Достигнуто: {goal.managed_value}</span>
                <span onClick={()=>patch_managed_goal(goal.id)}>Edit</span>
            </div>
            <p>Прогресс: {goal.progress} %</p>
            <h3>Подцели: </h3>
            <div className="sub_goals">
            {goal.sub_goals?.map(sg=>{
                return <SubGoal goal_id={goalId} subgoal={sg} />
            })}
            <SubGoalModal goal_id={goal.id} active={modalActive} setActive={()=>setModalActive(false)}/>
            <span className="add_btn" onClick={()=>{setModalActive(true)}}>Добавить</span>
            </div>
            <span className="delete_btn" onClick={()=>delete_goal_by_id(goal.id)}>Отказаться от цели</span>
        </div>
        </>

    )
}
export default GoalItem;