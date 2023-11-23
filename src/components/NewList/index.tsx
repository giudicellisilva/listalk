import { useState, useEffect } from "react";
import style from "./newList.module.scss";
import BackgroundDropdownCenter from "../BackgroundDropdownCenter";
import { useMutation } from "react-query";
import { getCategory } from "@/api/category/getCategory";
import { newCategory } from "@/api/category/newCategory";
import { postList } from "@/api/list/postList";
import DropdownLoading from "../DropdownLoading";

interface category{
    id: string;
    name: string;
}

interface NewListProps{
    setVisible(set: boolean): void;
    loadingLists(): void;
}

const NewList = (props: NewListProps) =>{
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dataCategory, setDataCategory] = useState<category[]>([]);
    const [category, setCategory] = useState("1");
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        mutate();
      },[]);

    const {status, mutate} = useMutation(
        async () =>{
            return getCategory();
        },
        {
            onSuccess: (res) =>{
                setDataCategory(res.data);
            },

            onError: (error) =>{
                console.log(error)
            }
        }
    )

    const {status: statusNewList, mutate: mutateNewList} = useMutation(
        async () =>{
            return postList(name, description, category);
        },
        {
            onSuccess: (res) =>{
            },

            onError: (error) =>{
                console.log(error);
            }
        }
    )

    // const {status: s, mutate: newCat} = useMutation(
    //     async () =>{
    //         return newCategory(name);
    //     },
    //     {
    //         onSuccess: (res) =>{
    //             console.log("data", res.data)
    //         },

    //         onError: (error) =>{
    //             console.log(error)
    //         }
    //     }
    // )

    function ListCreate(){
        mutateNewList();
        setVisible(true);
        
    }
    
    function ListCreated(){
        props.loadingLists()
        setVisible(false);
        props.setVisible(false)
    }



    return(
        <BackgroundDropdownCenter>
            <div className={style.newList}>
                <button className={style.newList__button_close} onClick={() => props.setVisible(false)}><img src="/assets/close.svg" alt="fechar" /></button>
                <label htmlFor="text" className={style.newList__label}>
                    <p>Name</p>
                    <input type="text" name="text"  placeholder="Enter your best e-mail" onChange={(e) => setName(e.target.value)} value={name}/>
                </label>
                <label htmlFor="description" className={style.newList__label}>
                    <p>Description</p>
                    <input type="text" name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                </label>
                <label htmlFor="" className={style.newList__label}>
                    <p>Category</p>
                    <select name="" id="" className={style.newList__category} value={category} onChange={(e) => setCategory(e.target.value)}>
                        {dataCategory.map((option) =>{
                            return(
                                <option key={option.id} value={option.id}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>
                {/* {status === "error" ? <p className={style.newList_errorLogin}>Erro no login...</p> : false} */}
                <button className={`${style.newList__button_create} `} onClick={() => ListCreate()}>Create</button>
                {/* <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                <button onClick={() => newCat()}>new category</button> */}
                {visible && <DropdownLoading status={statusNewList} operationCompleted={ListCreated} /> }
            </div>
        </BackgroundDropdownCenter>
    )
}

export default NewList;