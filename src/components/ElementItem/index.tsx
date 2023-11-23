import style from "./elementItem.module.scss";
import {useState} from "react"
import Image from "next/image";
import close from '../../../public/assets/close-icon.svg';
import { useMutation } from 'react-query';
import DropdownLoading from '../DropdownLoading';
import Confirmation from '../Confirmation';
import { deleteItem } from '@/api/item/deleteItem';
import EditItem from "../EditItem";

interface ElementItemProps {
    idList: string | string[] | undefined;
    idItem: string;
    content: string;
    loadingItens: () => void;
}

const ElementItem = (props: ElementItemProps) => {
    const [visible, setVisible] = useState(false);
    const [visibleConfirmation, setConfirmationVisible] = useState(false);
    const [visibleEditItem, setEditItemVisible] = useState(false);

    const {status, mutate} = useMutation(
        async () =>{
            return deleteItem(props.idList, props.idItem);
        },
        {
            onSuccess: (res) =>{
            
            },

            onError: (error) =>{
                console.log(error)
            }
        }
    )

    function deletedItem(){
        props.loadingItens();
        setVisible(false);
    }


    return (
        <div className={style.elementItem} >
            <span className={style.elementItem_content} onClick={() => setEditItemVisible(true)}>
                {props.content}
            </span>
            <Image className={style.elementItem__icon}
                onClick={() => setConfirmationVisible(true)}
                src={close}
                alt="Icone de deleção"
                width={18}
                height={18}
            />
            {visibleConfirmation && <Confirmation confirmação={mutate} cancelamento={setConfirmationVisible} setLoading={setVisible} />}
            {visible && <DropdownLoading status={status} operationCompleted={deletedItem} />}
            {visibleEditItem && <EditItem idList={props.idList} idItem={props.idItem} content={props.content} loadingItens={props.loadingItens} setVisible={setEditItemVisible} />}
        </div>
    )
}

export default ElementItem;