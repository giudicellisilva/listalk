import BackgroundDropdown from "../BackgroundDropdown";
import style from "./register.module.scss";

interface RegisterProps{
    setVisible: (set: boolean) => void;
}

const Register = (props: RegisterProps) => {
    return (
        <BackgroundDropdown>
            <div className={style.register}>
                <div className={style.register__title}>
                    <h2 className={style.title}>Welcome!</h2>
                    <h3 className={style.subtitle}>Your organized world awaits...</h3>
                </div>
                <div className={style.register__content}>
                    <button className={style.register__content__button_close} onClick={() => props.setVisible(false)}><img src="/assets/close.svg" alt="fechar" /></button>
                    <label htmlFor="email" className={style.register__content__label}>
                        <p>E-mail Adress</p>
                        <input type="email" name="email" placeholder="Enter your best e-mail"  />
                    </label>
                    <label htmlFor="password" className={style.register__content__label}>
                        <p>Password Adress</p>
                        <input type="password" name="password" placeholder="Enter a strong password" />
                    </label>
                    <button className={`${style.register__content__button_login} ${status === "loading" || status === "success" ? style.active : ""}`} >Register</button>
                </div>
            </div>
        </BackgroundDropdown>
    )
}

export default Register;