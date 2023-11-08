import BackgroundDropdown from "../BackgroundDropdown";
import style from "./login.module.scss";

interface LoginProps{
    setVisibileLogin: (set: boolean)  => void;
}

const Login = (props: LoginProps) =>{

    return(
        <BackgroundDropdown>
            <div>
                <h2 className={style.title}>Welcome back!</h2>
                <h3 className={style.subtitle}>Your organized world awaits...</h3>
            </div>
            <div  className={style.login}>
                <button className={style.login__button_close} onClick={() => props.setVisibileLogin(false)}><img src="/assets/close.svg" alt="fechar" /></button>
                <label htmlFor="email">
                    <p>E-mail Adress</p>
                    <input type="email" name="email"  placeholder="Enter your best e-mail" />
                </label>
                <label htmlFor="password">
                    <p>E-mail Adress</p>
                    <input type="password" name="password" placeholder="Enter a strong password" />
                </label>
                <button>Login</button>
            </div>
        </BackgroundDropdown>
    )
}

export default Login;