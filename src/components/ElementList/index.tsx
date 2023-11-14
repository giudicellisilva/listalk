import style from './element-list.module.scss';
import Image from "next/image";
import close from '../../../public/assets/close-icon.svg';

interface ListElementProps {
    content: string;
    showDeleteIcon: boolean;
    isClickable: boolean;
    onDeleteButtonClick: () => void;
}

const ListElement = (props: ListElementProps) => {

    const clickableClass = props.isClickable ? style.clickable : '';

    return(
        <div className={`${style.elementList} ${clickableClass}`}>
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