"use client";

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
        <div className={style.newList}>
            <div className={style.newList__infos}> 
              <input className={`${style.newList__title} ${style.inputText}`}
                placeholder="Edit the name list..." 
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}/>

              <input className={`${style.newList__description} ${style.inputText}`}
                placeholder="Add a description to your list here" 
                value={listDescription}
                onChange={(e) => setListDescription(e.target.value)}/>
            </div>

            
            {listItems.map((item: ListItem, index: number) => (
                <ListElement 
                    key={index}
                    content={item.content}
                    isClickable={false} 
                    showDeleteIcon={true} 
                    onDeleteButtonClick={() => removeItemFromList(index)}
                />
            ))}
            

            <div className={style.newList__form}> 
                <div className={style.newList__listItem}> 
                    <div className={style.newList__listItem__content}> 
                        <input className={`${style.newList__listItem__content__input} ${style.inputText}`}
                        placeholder="Enter another item to your list"
                        value={itemContent}
                        onChange={(e) => setItemContent(e.target.value)}
                        />
                        <button onClick={addItemToList} 
                        className={style.newList__button}
                        id={style.addItem}
                        >
                            <Image
                                src={check}
                                alt="Adicionar item à lista"
                                width={15}
                                height={15}
                            />
                        </button>
                    </div>
                
                    <div> 
                        <select className={`${style.newList__listItem__category} ${style.inputText}`}
                        name="category" id="category"
                        value={itemCategory} 
                        onChange={(e) => setItemCategory(e.target.value)}
                        >
                            <option value="movies">Movie</option>
                        </select>
                    </div>
                </div>

                <div className={style.newList__form__buttons}> 
                    <button className={style.newList__button} id={style.cancelButton}> 
                        <span> Cancel </span>
                    </button>
                    <button className={style.newList__button}
                    onClick={saveList}>
                        <span> Save list </span>
                    </button>
                </div>
            </div> 
        </div>

    )
}

export default ListForm;