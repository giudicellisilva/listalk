import style from "./header.module.scss";

const Header = () =>{
    return(
        <header className={style.header}>
            <img className={style.header__logo} src="/assets/pencil.svg" alt="icon pencil" />
            <button className={style.header__userLogin}>
                <img src="/assets/User.svg" alt="" />
                <div className={style.header__userLogin__dropdown}>
                    <img src="" alt="" />
                    <button>Logout</button>
                </div>
            </button>
        </header>
    )
}

export default Header;