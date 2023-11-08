import style from "./backgroundDropdown.module.scss";
import {ReactNode}from "react";

interface BackgroundDropdownProps{
    children: ReactNode;
}

const BackgroundDropdown = (props: BackgroundDropdownProps) =>{
    return(
        <div className={style.backgroundDropdown}>
            {props.children}
        </div>
    )
}

export default BackgroundDropdown;