import BackgroundDropdown from "../BackgroundDropdown";
import style from "./new-list.module.scss";


const ListForm = () =>{

    return(
        <div>
            <div> 
              <input value="Edit the name list..." />
              <input value="Add a description to your list here" />
            </div>
        </div>
    )
}

export default ListForm;