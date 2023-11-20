import {useState} from "react";
import style from "./header.module.scss";

const Header = () =>{
    const [visible, setVisible] = useState(false);

    function visibleOrnotvisible(){
        if(visible){
            setVisible(!visible);
        }else{
            setVisible(!visible);
        }
    }
    return(
        <header className={style.header}>
            <img className={style.header__logo} src="/assets/pencil.svg" alt="icon pencil" />
            <button className={style.header__buttonUserLogin} onClick={() => visibleOrnotvisible()}>
                <img src="/assets/User.svg" alt="" />
            </button>
            {visible ? <div className={style.header__userLogin}>
                <img src="/assets/User.svg" alt="" />
                <button>Logout</button>
            </div> : false}
  
        </header>
    )
}

export default Header;