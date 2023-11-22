import style from "./backgroundDropdown.module.scss";
import {ReactNode}from "react";

interface BackgroundDropdownCenterProps{
    children: ReactNode;
}

const BackgroundDropdownCenter = (props: BackgroundDropdownCenterProps) =>{
    return(
        <div className={style.backgroundDropdown}>
            {props.children}
        </div>
    )
}

export default BackgroundDropdownCenter;