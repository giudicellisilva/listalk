import {useState} from "react";
import BackgroundDropdown from "../BackgroundDropdown";
import style from "./login.module.scss";
import { useMutation } from "react-query";
import api from "@/api/http-common";
import { postLogin } from "@/api/login/postLogin";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { setStorageItem } from "@/utils/localStore";

interface LoginProps{
    setVisibileLogin: (set: boolean)  => void;
}

const Login = (props: LoginProps) =>{
    const [login, setLogin] = useState("");
    const [password, setPasseword] = useState("");
    const {push} = useRouter();

    const {status, mutate} = useMutation(
        async () =>{
            return postLogin(login, password);
        },
        {
            onSuccess: (res) =>{
                console.log(res.data)
                api.defaults.headers.authorization = `Bearer ${res.data.access_token}`;
                console.log(setStorageItem("token", res.data.access_token))
                push(APP_ROUTES.private.list.name);
            },

            onError: (erro) =>{
                console.log(erro);
            }
        }
    )

    const getEnter = (e: any) =>{
        if(e.key === "Enter"){
            mutate();
        }
    }

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
                        <input type="email" name="email"  placeholder="Enter your best e-mail" onChange={(e) => setLogin(e.target.value)} value={login}/>
                    </label>
                    <label htmlFor="password" className={style.login__content__label}>
                        <p>Password Adress</p>
                        <input type="password" name="password" placeholder="Enter a strong password" onChange={(e) => setPasseword(e.target.value)} value={password} onKeyUp={getEnter}/>
                    </label>
                    {status === "error" ? <p className={style.login__content_errorLogin}>Erro no login...</p> : false}
                    <button className={`${style.login__content__button_login} ${status === "loading" || status === "success" ? style.active: ""}`} onClick={() => mutate()}>Login</button>
                </div>
            </div>
        </BackgroundDropdown>
    )
}

export default Login;