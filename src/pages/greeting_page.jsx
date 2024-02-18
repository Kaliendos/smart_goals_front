import StyledBtn from '../UI/btn/btn';
import './greeting.css'
import { Link } from "react-router-dom"
function Greeting() {
    return (
        <div className="content">
            <h1>SMART Goals - управляйте своими целями</h1>
            <p>Данное приложение поможет вам управлять своими целями по методологии SMART</p>
            <h2>Что вы сможете сделать с помощью этого приложения:</h2>
            <ul>
                <li>Создавать цели</li>
                <li>Создавать подцели</li>
                <li>Настраивать срок дедлайна</li>
                <li>Задавать параметры измеримости, реливантности и конкретности цели</li>
                <li>Отслеживать прогресс выполнения</li>
            </ul>
            <Link to="/registration"><span className="getStarted"><StyledBtn text="Начать работу" handler={() => { }} /></span></Link>
        </div>
    )
}
export default Greeting;