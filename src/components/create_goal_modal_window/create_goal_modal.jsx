import React, { useState } from 'react';
import "./modal.css"
import { send_goal_data } from './request';

const Modal = ({active, setActive}) => {
  const [title, setTitle] = useState("")
  const [measurable, setMeasurable] = useState("")
  const [max_value_to_achieve_goal, setMax_value_to_achieve_goal] = useState(0)
  const [managed_value, setManagedValue] = useState(0)
  const [deadline, setDeadline] = useState()
  const [relevant, setRelevant] = useState("")
  const request_data = {
    "title": title,
    "max_value_to_achieve_goal": max_value_to_achieve_goal,
    "managed_value": managed_value,
      "deadline": deadline,
      "measurable": measurable,
      "relevant": relevant
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
                <label htmlFor="reward">Как понять, что цель Достингнута?:</label>
                <input
                id='measurable'
                 value={measurable}
                              onChange={(e) => setMeasurable(e.target.value)}
                              required
                          />
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
                      <label htmlFor="relevant">Что произойдет, если цель не будет достигнута?:</label>
                      <input
                          id="relevant"
                          type="text"
                          value={relevant}
                              onChange={(e) => setRelevant(e.target.value)}
                           />
                </div>
              <div className='form_row'>
                          <label htmlFor="achive_value">Параметр измеримости</label>
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