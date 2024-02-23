import "./goals.css"
import { useEffect, useState } from "react"
import { get_goals } from "./request"
import {  useNavigate } from "react-router-dom"
import Modal from "../create_goal_modal_window/create_goal_modal"
import GoalListItem from "./goal_list_item"
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'



function Goals() {
    const [goals, setGoals] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        const get_goals_list = async () => {
            try {
                const goals_list = await get_goals()
                setGoals(goals_list)
                if (goals_list.response.status === 401) {
                    navigate("/auth")
                }
              
                
            } catch (err) {
                console.log(err)
                //navigate("/auth")
            }
        }
        get_goals_list()
    }, [])

    if (goals instanceof axios.AxiosError) {
        return
 
    }
    const add_icon = <FontAwesomeIcon icon={faCirclePlus}  style={{color: "white", fontSize: "2.5em"}} />

    return(
          <div className="goals_list">
              <Modal  active={modalActive} setActive={()=>setModalActive(false)}/>
            {goals.map(goal => {

             return <GoalListItem  key={goal.id} goal_data={goal} />
        
        })}

            <span className="addBtn" onClick={() => setModalActive(true)}>{add_icon}</span>
        </div> 

    
    )
}
export default Goals;
