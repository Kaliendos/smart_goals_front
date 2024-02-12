import "./goals.css"
import { useEffect, useState } from "react"
import { get_goals } from "./request"
import { Link, useNavigate } from "react-router-dom"
import Modal from "../create_goal_modal_window/create_goal_modal"
import GoalListItem from "./goal_list_item"
import axios from 'axios'
import StyledBtn from "../../UI/btn/btn"
import { is_authenticated } from "../auth/auth_utils"


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


    return(
          <div className="goals_list">
              <Modal  active={modalActive} setActive={()=>setModalActive(false)}/>
            {goals.map(goal => {

             return <GoalListItem  key={goal.id} goal_data={goal} />
        
        })}
       
            <StyledBtn handler= {()=>setModalActive(true)} text="Добавить цель" backgroundColor = "green" />
        </div> 

    
    )
}
export default Goals;