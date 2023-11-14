import style from "./new-list.module.scss";
import Image from 'next/image';
import check from '../../../public/assets/check-icon.svg';
import ListElement from "../ElementList";

interface ListItem {
    category: string;
    content: string;
}

const ListForm = () => {

    let listItems: ListItem[] = []; // esse array vai ser enviado para o endpoint na criação da lista

    return(
        <div>
            <div> 
              <input value="Edit the name list..." />
              <input value="Add a description to your list here" />
            </div>

            <div>
            {listItems.map((item: ListItem) => (
                <ListElement 
                    content={item.content}
                    isClickable={false} 
                    showDeleteIcon={true} 
                />
            ))}
            </div>

            <div> 
                <input placeholder="Enter your another item to your list"/>
                <button>
                    <Image
                        src={check}
                        alt="Adicionar item à lista"
                        width={15}
                        height={15}
                    />
                </button>
              </div>
              <div> 
                <input type="dropdown" />
              </div>

              <div> 
                <button>Cancel</button>
                <button>Save list</button>
              </div>
            
        </div>
    )
}

export default ListForm;