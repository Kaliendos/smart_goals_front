import { Link } from "react-router-dom";



function GoalListItem(props){
    return(
        <Link key={props.goal_data.id} to={`${props.goal_data.id}`}>
        <div className="goal_list_item">
           
                <span>{props.goal_data.title}</span>
        </div>
        </Link>
    )
}
export default GoalListItem;