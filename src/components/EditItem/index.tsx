import { useMutation } from "react-query";
import BackgroundDropdownCenter from "../BackgroundDropdownCenter";
import DropdownLoading from "../DropdownLoading";
import style from "./editItem.module.scss";
import {useState} from "react";
import { updateItem } from "@/api/item/updateItem";
import { Content } from "next/font/google";

interface EditItemProps{
    idList: string | string[] | undefined;
    idItem: string;
    content: string;
    loadingItens: () => void;
    setVisible: (set: boolean) => void;
}

const EditItem = (props: EditItemProps) =>{
    const [content, setContent] = useState(props.content);
    const[visible, setVisible] = useState(false);

    const {status, mutate} = useMutation(
        async () =>{
            return updateItem(props.idList, props.idItem, content);
        },
        {
            onSuccess: (res) =>{
            },

            onError: (error) =>{
                console.log(error)
            }
        }
    )

    function createItem(){
        mutate();
        setVisible(true)
    }

    function createdItem(){
        props.loadingItens();
        props.setVisible(false);
        setVisible(false);
    }
    return(
        <BackgroundDropdownCenter>
            <div className={style.editItem}>
                <button className={style.editItem__button_close} onClick={() => props.setVisible(false)}><img src="/assets/close.svg" alt="fechar" /></button>
                <label htmlFor="text" className={style.editItem__label}>
                    <p>Item</p>
                    <input type="text" name="text"  placeholder="Enter your best e-mail" onChange={(e) => setContent(e.target.value)} value={content}/>
                </label>
                <button className={`${style.editItem__button_create} `} onClick={() => createItem()}>Edit</button>

                {visible && <DropdownLoading status={status} operationCompleted={createdItem} /> }
            </div>
        </BackgroundDropdownCenter>
    )
}

export default EditItem;