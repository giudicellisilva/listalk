import {useState} from "react";
import style from "./header.module.scss";
import { useMutation } from "react-query";
import { postLogout } from "@/api/login/postLogout";
import { removeStorageItem } from "@/utils/localStore";
import { useRouter } from "next/navigation";
import {useSelector} from "react-redux";
import type { RootState } from "@/redux/store";

const Header = () =>{
    const {push} = useRouter();
    const [visible, setVisible] = useState(false);
    const userLogin: string = useSelector((state: RootState) => state.userLogin);

    function visibleOrnotvisible(){
        if(visible){
            setVisible(!visible);
        }else{
            setVisible(!visible);
        }
    }

    const { status, mutate } = useMutation(
        async () => {
            return postLogout();
        },
        {
            onSuccess: (res) => {
                console.log(res.data)
            },

            onError: (error) => {
                console.log(error);
            }
        }
    )

    function logout(){
        removeStorageItem("token");
        push("/");

    }

    return(
        <header className={style.header}>
            <img className={style.header__logo} src="/assets/pencil.svg" alt="icon pencil" />
            <button className={style.header__buttonUserLogin} onClick={() => visibleOrnotvisible()}>
                <img src="/assets/User.svg" alt="" />
            </button>
            {visible ? <div className={style.header__userLogin}>
                <img src="/assets/User.svg" alt="" />
                <p>{userLogin}</p>
                <button onClick={logout}>Logout</button>
            </div> : false}
  
        </header>
    )
}

export default Header;