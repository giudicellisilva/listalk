import { useEffect, useState } from "react";
import ElementList from "../ElementList";
import Header from "./Header";
import style from "./pageList.module.scss";
import { useMutation } from "react-query";
import { getLists } from "@/api/list/getLists";
import NewList from "../NewList";

interface ElementList{
    id: string;
    name: string;
    description: string;
    category: {id: string};
}

const PageList = () =>{
    const [elementsList, setElementsList] = useState<ElementList[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        mutate();
      },[]);

    const {status, mutate} = useMutation(
        async () =>{
            return getLists();
        },
        {
            onSuccess: (res) =>{
                setElementsList(res.data);
            },

            onError: (error) =>{
                console.log(error)
            }
        }
    )

    return(
        <div className={style.pageList}> 
            <Header />
            <h2 className={style.pageList__title}>Your lists</h2>
            <div className={style.pageList__content}>
                {elementsList.map((list) =>{
                    return(
                        <ElementList key={list.id} id={list.id} content={list.name} isClickable={true} loadingLists={mutate} />
                    )
                })}
            </div>
            <div className={style.pageList__div}>
                <button className={style.pageList__div__button_newList} onClick={() => setVisible(true)}>Add new list</button>

            </div>
            {visible? <NewList setVisible={setVisible} loadingLists={mutate}></NewList>: false}
        </div>
    )
}

export default PageList;