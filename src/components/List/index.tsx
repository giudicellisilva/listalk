"use client";

import style from "./list.module.scss";
import Image from 'next/image';
import check from '../../../public/assets/check-icon.svg';
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { getList } from "@/api/list/getList";
import { getItens } from "@/api/item/getItems";
import { postItens } from "@/api/item/postItem";
import ElementItem from "../ElementItem";

interface ListItem {
    id: string;
    category: string;
    content: string;
}

interface List {
    items: ListItem[];
    title: string;
    description: string
}

interface ListProps{
    id: string | string[] | undefined;
}

const List = (props: ListProps) => {
    let categories: string[] = []; /* esse array vai ter as categorias, 
    vai ter que pegar do endpoint que retorne essas categorias */

    const [listTitle, setListTitle] = useState('');
    const [listDescription, setListDescription] = useState('');

    let [listItems, setListItems] = useState<ListItem[]>([]); // esse array vai ser enviado para o endpoint na criação da lista
    
    const [itemContent, setItemContent] = useState('');
    const [itemCategory, setItemCategory] = useState('movies');


    useEffect(() => {
        mutate();
        mutateItem();
      },[]);
    
    const {status, mutate} = useMutation(
        async () =>{
            return getList(props.id);
        },
        {
            onSuccess: (res) =>{
                setListTitle(res.data.name);
                setListDescription(res.data.description);
            },

            onError: (error) =>{
                console.log(error);
            }
        }
    )

    const {status: statusItem, mutate: mutateItem} = useMutation(
        async () =>{
            return getItens(props.id);
        },
        {
            onSuccess: (res) =>{
                console.log(res.data);
                setListItems(res.data)
            },

            onError: (error) =>{
                console.log(error);
            }
        }
    )

    const {status: statusNewItem, mutate: mutateNewItem} = useMutation(
        async () =>{
            return postItens(props.id, itemContent);
        },
        {
            onSuccess: (res) =>{
                console.log(res.data);
                mutateItem();
                setItemContent("");
            },

            onError: (error) =>{
                console.log(error);
            }
        }
    )

    const {status: statusDeleteItem, mutate: mutateDeleteItem} = useMutation(
        async () =>{
            return postItens(props.id, itemContent);
        },
        {
            onSuccess: (res) =>{
            },

            onError: (error) =>{
                console.log(error);
            }
        }
    )



    function addItemToList(): void {
        const newItem: ListItem = {
            id: "Aa",
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

    const getEnter = (e: any) =>{
        if(e.key === "Enter"){
            mutateNewItem();
        }
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

            
            <div className={style.newList__listItems_content}>
                {listItems.map((item: ListItem) => (
                    <ElementItem 
                        key={item.id}
                        idList={props.id}
                        idItem={item.id}
                        content={item.content}
                        loadingItens={mutateItem}
                    />
                ))}
            </div>
            

            <div className={style.newList__form}> 
                <div className={style.newList__listItem}> 
                    <div className={style.newList__listItem__content}> 
                        <input className={`${style.newList__listItem__content__input} ${style.inputText}`}
                        placeholder="Enter another item to your list"
                        value={itemContent}
                        onChange={(e) => setItemContent(e.target.value)}
                        onKeyUp={getEnter}
                        />
                        <button onClick={() => mutateNewItem()} 
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

export default List;