import style from './element-list.module.scss';
import Image from "next/image";
import close from '../../../public/assets/close-icon.svg';
import { useRouter } from 'next/navigation';

interface ListElementProps {
    content: string;
    showDeleteIcon: boolean;
    isClickable: boolean;
    onDeleteButtonClick: () => void;
}

const ListElement = (props: ListElementProps) => {
    const {push} = useRouter();

    const clickableClass = props.isClickable ? style.clickable : '';

    function routeListeelement(): void{
        push(`/dashboard/list/${1}`)
    }

    return(
        <div className={`${style.elementList} ${clickableClass}`} onClick={() => routeListeelement()}>
            {props.showDeleteIcon && 
                <Image className={style.elementList__icon}
                    onClick={props.onDeleteButtonClick}
                    src={close}
                    alt="Icone de deleção"
                    width={15}
                    height={15}
                />
            } 
            <span className={style.elementListContent}> 
                {props.content} 
            </span> 
        </div>
    )
}

export default ListElement;