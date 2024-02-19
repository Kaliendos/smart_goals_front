import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { delete_goal, patchGoalIsDone, patch_goal, patchGoalIsNotDone } from "./request";
import SubGoalModal from "../sub_goal_modal_window/sub_goal_modal";
import SubGoal from "../sub_goals/sub_goals"
import { date_format, time_delay } from "../../utils";
import { is_authenticated } from "../auth/auth_utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faLeftLong, faPenToSquare, faCirclePlus, faX, faCheck, faCircleQuestion 
} from '@fortawesome/free-solid-svg-icons'


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
        const goal_item = await axios.get(`goals/${goal_id}`)
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
            } catch (err) {
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
    async function patch_relevant(goal_id){
        const new_relevant = prompt("Введите значение")
        await patch_goal(goal_id, {"relevant": new_relevant})
        window.location.reload()
    }
    async function setGoalIsDone(goalId) {
        const confirm = window.confirm("Подтвердите выполнение цели")
        if (confirm) {
            if (!goal.is_done) {
                await patchGoalIsDone(goal.id)
                window.location.reload()
            } else {
                await patchGoalIsNotDone(goal.id)
                window.location.reload()
            }
        }
    }


    const backIcon = <FontAwesomeIcon icon={faLeftLong} style={{ color: "#ffffff", "font-size": "2.5em" }} />
    const deleteGoalIcon = <FontAwesomeIcon icon={faX} style={{ color: "red", "font-size": "2em" }} />
    const editIcon = <FontAwesomeIcon icon={faPenToSquare}  />
    const addIcon = <FontAwesomeIcon icon={faCirclePlus} style={{ "font-size": "2em" }} />
    const chekIcon = <FontAwesomeIcon icon={faCheck} style={{ "font-size": "2.5em", color: "green" }} />
    const question = < FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#ffffff", "font-size": "2.5em" }} />
    return (
        <>
            <div className={goal.is_done ? "goal_page_is_done" :  "goal_page"}>
                <Link to="/">{backIcon }</Link>
                <div className="goal_card_row">
                    <h2>{goal.title}</h2>
                    <div className="goal_card_row_btn_group">
                        <span className="delete_btn" onClick={() => delete_goal_by_id(goal.id)}>{deleteGoalIcon}</span>
                        <span onClick={()=>setGoalIsDone(goal.id) }>{chekIcon}</span>
                    </div>
                </div>
                <div className="goal_card_row">
                    <span>Дата окончания: {date_format(goal.deadline)} { time_delay(goal.deadline)}</span>
                </div>
                <div className="goal_card_row">
                    <span>Цель считается достигнутой, когда: {goal.measurable}</span>
                </div>
                <div className="goal_card_row">
                    <span>Параметр измеримости:  {goal.max_value_to_achieve_goal}</span>
                </div>
                <div className="goal_card_row">
                    <span>Достигнуто: {goal.managed_value}</span>
                    <span onClick={() => patch_managed_goal(goal.id)}>{editIcon}</span>
                </div>
                <div className="goal_card_row">
                    <span>Прогресс: {goal.progress} %</span>
                </div>
                <div className="goal_card_row">
                    <span>Если цель не будет достигнута, то: {goal.relevant} </span> <span onClick={() => patch_relevant(goal.id)}>{editIcon}</span>
                </div>
            <h2>Подцели: </h2>
            <div className="sub_goals">
            {goal.sub_goals?.map(sg=>{
                return <SubGoal goal_id={goalId} subgoal={sg} />
            })}
            <SubGoalModal goal_id={goal.id} active={modalActive} setActive={()=>setModalActive(false)}/>
                    <span className="add_btn" onClick={() => { setModalActive(true) }}>{ addIcon }</span>
            </div>
          
        </div>
        </>

    )
}
export default GoalItem;