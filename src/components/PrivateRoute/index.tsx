
import { postLogin } from "@/api/login/postLogin";
import { ReactNode, useEffect } from "react";
import { useMutation } from "react-query";
import api from "@/api/http-common";

interface PrivateRouteProps{
    children: ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) =>{
    
    // useEffect(() =>{
    //     mutate();
    // }, []);

    // const {status, mutate} = useMutation(
    //     async () =>{
    //         return postToken();
    //     },
    //     {
    //         onSuccess: (res) =>{
    //             api.defaults.headers.authorization = `Bearer ${res.data.access_token}`;

    //         },

    //         onError: (erro) =>{
    //             console.log(erro);
    //         }
    //     }
    // )


    return(
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute;