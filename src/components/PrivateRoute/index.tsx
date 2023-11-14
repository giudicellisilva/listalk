
import { postToken } from "@/api/token/postToken";
import { ReactNode, useEffect } from "react";
import { useMutation } from "react-query";

interface PrivateRouteProps{
    children: ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) =>{
    
    useEffect(() =>{
        mutate();
    }, []);

    const {status, mutate} = useMutation(
        async () =>{
            return postToken();
        },
        {
            onSuccess: (res) =>{
                console.log(res.data);
            },

            onError: (erro) =>{
                console.log(erro);
            }
        }
    )


    return(
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute;