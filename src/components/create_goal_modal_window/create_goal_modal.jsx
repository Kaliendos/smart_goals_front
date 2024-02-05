import React, { useEffect, useState } from 'react';
import "./modal.css"
import { send_goal_data } from './request';

const Modal = ({active, setActive}) => {
  const [title, setTitle] = useState("")
  const [reward, setReward] = useState("")
  const [max_value_to_achieve_goal, setMax_value_to_achieve_goal] = useState(0)
  const [managed_value, setManagedValue] = useState(0)
  const [deadline, setDeadline] = useState()

  const request_data = {
    "title": title,
    "max_value_to_achieve_goal": max_value_to_achieve_goal,
    "managed_value": managed_value,
    "deadline": deadline,
  }
  if(reward !== ""){
    request_data.reward = reward
  }
  async function submit_handler(e){

    await send_goal_data(request_data)
  }
  return(
    <div className={active ? 'modal active' : 'modal'} onClick={()=>setActive(false)}>
        <div className='modal_content' onClick={e => e.stopPropagation()}>
          <form onSubmit={submit_handler}>
            <div className='form_content'>
            <button  className="close_btn" onClick={()=>setActive(false)}>X</button>
              <div className='form_row'>
                <label htmlFor="title">Ваша цель:</label>
                <input
                id='title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                />
              </div>
              <div className='form_row'>
                <label htmlFor="reward">Как наградите себя?:</label>
                <input
                id='reward'
                value={reward}
                onChange={(e)=>setReward(e.target.value)}/>
              </div>
              <div className='form_row'>
                <label htmlFor="deadline">Когда цель должна быть достигнута?</label>
                <input
                  id='deadline'
                  type="date"
                  value={deadline}
                  onChange={(e)=>setDeadline(e.target.value)}
                  required
                  />
              </div>
              <div className='form_row'>
                <label htmlFor="achive_value">Критерий достижимости</label>
                <input
                  id='achive_value'
                  type="number"
                  value={max_value_to_achieve_goal}
                  onChange={(e)=>setMax_value_to_achieve_goal(e.target.value)}
                  required
                  />
              </div>
              <div className='form_row'>
                <label htmlFor="managed">Достигнуто:</label>
                <input
                  id="managed"
                  type="number"
                  value={managed_value}
                  onChange={(e)=>setManagedValue(e.target.value)}
                  required
                  />
              </div>
            </div>
            <button type="submit" className='create_btn'>Создать цель</button>
          </form>
        </div>
    </div>
  )
}

export default Modal;