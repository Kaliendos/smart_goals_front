import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import './help.css'

function Help() {
    const handleMouseOver = () => {
        setShowTooltip(true);
    };

    const handleMouseOut = () => {
        setShowTooltip(false);
    };
    const [showTooltip, setShowTooltip] = useState(false);
    const helpIcon = <FontAwesomeIcon icon={faCircleQuestion} style={{fontSize: "2em"}} />
    return (
        <div>
            <div className="icon" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <span className="helpIcon">{helpIcon}</span>
            </div>
      
            {showTooltip && <div className="tooltip">
                Параметр измеримости: Цифровое значение до достижения цели. Например если цель похудеть на 10кг
                то   Параметр измеримости = 10
            </div>}
            
        </div>
    )
}
export default Help;