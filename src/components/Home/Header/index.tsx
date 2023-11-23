import Link from "next/link";
import style from "./header.module.scss";
import { useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";

const Header = () =>{
    const [visibleLogin, setVisibleLogin] = useState(false);
    const [visibleRegister, setRegisterVisible] = useState(false);
    return(
        <header className={style.header}>
            <img className={style.header__logo} src="/assets/pencil.svg" alt="icon pencil" />
            {/* <nav className={style.header__nav}>
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}>About</Link>
            </nav> */}
            <div>
                <button className={style.header__button_login} onClick={() => setVisibleLogin(true)}>Login</button>
                <button className={style.header__button_register} onClick={() => setRegisterVisible(true)}>Register</button>
            </div>
            {visibleLogin? <Login setVisibleLogin={setVisibleLogin} /> : false}
            {visibleRegister && <Register setVisible={setRegisterVisible} />}
        </header>
    )
}

export default Header;