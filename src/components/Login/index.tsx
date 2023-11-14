import BackgroundDropdown from "../BackgroundDropdown";
import style from "./login.module.scss";

interface LoginProps{
    setVisibileLogin: (set: boolean)  => void;
}

const Login = (props: LoginProps) =>{

    return(
        <BackgroundDropdown>
            <div className={style.login}>
                <div className={style.login__title}>
                    <h2 className={style.title}>Welcome back!</h2>
                    <h3 className={style.subtitle}>Your organized world awaits...</h3>
                </div>
                <div className={style.login__content}>
                    <button className={style.login__content__button_close} onClick={() => props.setVisibileLogin(false)}><img src="/assets/close.svg" alt="fechar" /></button>
                    <label htmlFor="email" className={style.login__content__label}>
                        <p>E-mail Adress</p>
                        <input type="email" name="email"  placeholder="Enter your best e-mail" />
                    </label>
                    <label htmlFor="password" className={style.login__content__label}>
                        <p>E-mail Adress</p>
                        <input type="password" name="password" placeholder="Enter a strong password" />
                    </label>
                    <button className={style.login__content__button_login}>Login</button>
                </div>
            </div>
        </BackgroundDropdown>
    )
}

export default Login;