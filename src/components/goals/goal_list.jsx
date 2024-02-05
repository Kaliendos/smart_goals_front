import "./goals.css"
import { useEffect, useState } from "react"
import { get_goals } from "./request"
import { Link } from "react-router-dom"
import Modal from "../create_goal_modal_window/create_goal_modal"
import GoalListItem from "./goal_list_item"
import axios from 'axios'

function Goals() {
    const [goals, setGoals] = useState([])
    const [modalActive, setModalActive] = useState(false)

    useEffect(()=>{
        const get_goals_list = async () => {
            try {
                setGoals(await get_goals())
            } catch (err) {
                console.log(err)
            }
        }
        get_goals_list()
    }, [])

    if (goals instanceof axios.AxiosError) {
        return
 
    }


    return(
          <div className="goals_list">
              <Modal  active={modalActive} setActive={()=>setModalActive(false)}/>
            {goals.map(goal=>{
            return <GoalListItem  key={goal.id} goal_data={goal} />
        
        })}
            <button onClick={()=>setModalActive(true)}>Добавить цель</button>
        </div> 

    
    )
}
export default Goals;