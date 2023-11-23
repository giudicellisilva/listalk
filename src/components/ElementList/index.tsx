import style from './element-list.module.scss';
import {useState} from "react"
import Image from "next/image";
import close from '../../../public/assets/close-icon.svg';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { deleteList } from '@/api/list/deleteList';
import DropdownLoading from '../DropdownLoading';
import Confirmation from '../Confirmation';

interface ElementListProps {
    id: string;
    content: string;
    isClickable: boolean;
    loadingLists: () => void;
}

const ElementList = (props: ElementListProps) => {
    const { push } = useRouter();
    const [visible, setVisible] = useState(false);
    const [visibleConfirmation, setConfirmationVisible] = useState(false);

    function routeListeelement(): void {
        push(`/list/${props.id}`)
    }

    const {status, mutate} = useMutation(
        async () =>{
            return deleteList(props.id);
        },
        {
            onSuccess: (res) =>{
            
            },

            onError: (error) =>{
                console.log(error)
            }
        }
    )

    function deletedList(){
        props.loadingLists();
        setVisible(false);
    }


    return (
        <div className={style.elementList} >
            <span className={style.elementListContent} onClick={() => routeListeelement()}>
                {props.content}
            </span>
            <Image className={style.elementList__icon}
                onClick={() => setConfirmationVisible(true)}
                src={close}
                alt="Icone de deleção"
                width={18}
                height={18}
            />
            {visibleConfirmation && <Confirmation confirmação={mutate} cancelamento={setConfirmationVisible} setLoading={setVisible} />}
            {visible && <DropdownLoading status={status} operationCompleted={deletedList} />}
        </div>
    )
}

export default ElementList;