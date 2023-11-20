import { useEffect, useState } from "react";
import ListElement from "../ElementList";
import Header from "./Header";
import style from "./dashboard.module.scss";
import { useMutation } from "react-query";
import { getList } from "@/api/list/getList";

const Dashboard = () =>{
    const [elementsList, setElementsList] = useState([]);

    useEffect(() => {
        mutate();
      },[]);

    const {status, mutate} = useMutation(
        async () =>{
            return getList();
        },
        {
            onSuccess: (res) =>{
                setElementsList(res.data);
                console.log("data", res.data)
            },

            onError: (error) =>{
                console.log(error)
            }
        }
    )

    return(
        <div className={style.dashboard}> 
            <Header />
            <h2 className={style.dashboard__title}>Your lists</h2>
            <div className={style.dashboard__content}>
            <ListElement content="aa" showDeleteIcon={false}  isClickable={false} onDeleteButtonClick={() => console.log("ss")} />

                {elementsList.map((list) =>{
                    return(
                        <ListElement content="aa" showDeleteIcon={false}  isClickable={false} onDeleteButtonClick={() => console.log("ss")} />
                    )
                })}
            </div>
            
        </div>
    )
}

export default Dashboard;