
import { ReactNode, useEffect, useState } from "react";
import { useMutation } from "react-query";
import api from "@/api/http-common";
import { getStorageItem } from "@/utils/localStore";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { getLists } from "@/api/list/getLists";


interface PrivateRouteProps{
    children: ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) =>{
    const [authorized, setAuthorized] = useState(false);
    const [token, setToken] = useState(getStorageItem("token"));
    const {push} = useRouter()
    
    useEffect(() =>{
        api.defaults.headers.authorization = `Bearer ${token}`;
        if(token != undefined){
            mutate();
        }else{
            push(APP_ROUTES.public.home);
        }

    }, []);

    const {status, mutate} = useMutation(
        async () =>{
            return getLists();
        },
        {
            onSuccess: (res) =>{
                setAuthorized(true);
            },

            onError: (erro) =>{
                push(APP_ROUTES.public.home);
            }
        }
    )


    return(
        <>
            {authorized && props.children}
        </>
    )
}

export default PrivateRoute;