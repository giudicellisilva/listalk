import style from "./new-list.module.scss";
import Image from 'next/image';
import check from '../../../public/assets/check-icon.svg';
import ListElement from "../ElementList";
import { useState } from "react";

interface ListItem {
    category: string;
    content: string;
}

interface List {
    items: ListItem[];
    title: string;
    description: string
}

const ListForm = () => {
    let categories: string[] = []; /* esse array vai ter as categorias, 
    vai ter que pegar do endpoint que retorne essas categorias */

    const [listTitle, setListTitle] = useState('');
    const [listDescription, setListDescription] = useState('');

    let [listItems, setListItems] = useState<ListItem[]>([]); // esse array vai ser enviado para o endpoint na criação da lista
    
    const [itemContent, setItemContent] = useState('');
    const [itemCategory, setItemCategory] = useState('movies');

    function addItemToList(): void {
        const newItem: ListItem = {
            category: itemCategory,
            content: itemContent,
        };
        
        setListItems(oldItems => [...oldItems, newItem]);
    }

    function removeItemFromList(indexToRemove: number): void {
        setListItems(oldItems => oldItems.filter((_, index) => index !== indexToRemove));
    }

    function saveList(): void {
        const newList: List = {
            items: listItems,
            title: listTitle,
            description: listDescription
        };

        console.log(newList)
        
        // enviar aqui essa lista para o endpoint
    }

    return(
        <div>
            <div> 
              <input 
                placeholder="Edit the name list..." 
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}/>

              <input 
                placeholder="Add a description to your list here" 
                value={listDescription}
                onChange={(e) => setListDescription(e.target.value)}/>
            </div>

            <div>
            {listItems.map((item: ListItem, index: number) => (
                <ListElement 
                    key={index}
                    content={item.content}
                    isClickable={false} 
                    showDeleteIcon={true} 
                    onDeleteButtonClick={() => removeItemFromList(index)}
                />
            ))}
            </div>

            <div> 
                <input 
                placeholder="Enter another item to your list"
                value={itemContent}
                onChange={(e) => setItemContent(e.target.value)}
                />
                <button onClick={addItemToList}>
                    <Image
                        src={check}
                        alt="Adicionar item à lista"
                        width={15}
                        height={15}
                    />
                </button>
              </div>
              <div> 
                <select 
                name="category" id="category"
                value={itemCategory} 
                onChange={(e) => setItemCategory(e.target.value)}
                >
                    <option value="movies">Movie</option>
                </select>
              </div>

              <div> 
                <button>Cancel</button>
                <button onClick={saveList}>Save list</button>
              </div>
        </div>
    )
}

export default ListForm;