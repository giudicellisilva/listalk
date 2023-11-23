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
import { getCategory } from "@/api/category/getCategory";
import { updateList } from "@/api/list/updateList";
import DropdownLoading from "../DropdownLoading";
import Header from "@/components/Header";
import { useRouter } from 'next/navigation'

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

interface ListProps {
    id: string | string[] | undefined;
}

interface category {
    id: string;
    name: string;
}

const List = (props: ListProps) => {
    const [categories, setCategories] = useState<category[]>();
    const [listItems, setListItems] = useState<ListItem[]>([]);

    const [listTitle, setListTitle] = useState('');
    const [listDescription, setListDescription] = useState('');
    const [listCategory, setListCategory] = useState('movies');

    const [itemContent, setItemContent] = useState('');

    const [visible, setVisible] = useState(false);

    const router = useRouter()

    

    useEffect(() => {
        mutateCategory();
        mutate();
        mutateItem();
    }, []);

    const { status, mutate } = useMutation(
        async () => {
            return getList(props.id);
        },
        {
            onSuccess: (res) => {
                setListTitle(res.data.name);
                setListDescription(res.data.description);
                setListCategory(res.data.category.id)
            },

            onError: (error) => {
                console.log(error);
            }
        }
    )

    const { status: statusUpdateList, mutate: mutateUpdateList } = useMutation(
        async () => {
            return updateList(props.id, listTitle, listDescription, listCategory);
        },
        {
            onSuccess: (res) => {
            },

            onError: (error) => {
                console.log(error);
            }
        }
    )

    const { status: statusItem, mutate: mutateItem } = useMutation(
        async () => {
            return getItens(props.id);
        },
        {
            onSuccess: (res) => {
                setListItems(res.data)
            },

            onError: (error) => {
                console.log(error);
            }
        }
    )

    const { status: statusNewItem, mutate: mutateNewItem } = useMutation(
        async () => {
            return postItens(props.id, itemContent);
        },
        {
            onSuccess: (res) => {
                mutateItem();
                setItemContent("");
            },

            onError: (error) => {
                console.log(error);
            }
        }
    )

    const { status: statusDeleteItem, mutate: mutateDeleteItem } = useMutation(
        async () => {
            return postItens(props.id, itemContent);
        },
        {
            onSuccess: (res) => {
            },

            onError: (error) => {
                console.log(error);
            }
        }
    )

    const { status: statusCategory, mutate: mutateCategory } = useMutation(
        async () => {
            return getCategory();
        },
        {
            onSuccess: (res) => {
                setCategories(res.data)
            },

            onError: (error) => {
                console.log(error)
            }
        }
    )

    const getEnter = (e: any) => {
        if (e.key === "Enter") {
            mutateNewItem();
        }
    }

    function callUpdateList() {
        mutateUpdateList();
        setVisible(true);
    }

    function updatedList() {
        setVisible(false);
    }

    return (
        <div className={style.newList}>
            <Header />

            <button className={style.newList__button_back} onClick={() => router.back()} >
                <img src="/assets/goBack.svg" alt="" />
            </button>

            <div className={style.newList__content}>

                <div className={style.newList__content__infos}>
                    <input className={`${style.newList__content__title} ${style.inputText}`}
                        placeholder="Edit the name list..."
                        value={listTitle}
                        onChange={(e) => setListTitle(e.target.value)} />

                    <input className={`${style.newList__content__description} ${style.inputText}`}
                        placeholder="Add a description to your list here"
                        value={listDescription}
                        onChange={(e) => setListDescription(e.target.value)} />
                </div>


                <div className={style.newList__content__listItems_content}>
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


                <div className={style.newList__content__form}>
                    <div className={style.newList__content__listItem}>
                        <div className={style.newList__content__listItem__content}>
                            <input className={`${style.newList__content__listItem__content__input} ${style.inputText}`}
                                placeholder="Enter another item to your list"
                                value={itemContent}
                                onChange={(e) => setItemContent(e.target.value)}
                                onKeyUp={getEnter}
                            />
                            <button onClick={() => mutateNewItem()}
                                className={style.newList__content__button}
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
                            <select className={`${style.newList__content__listItem__category} ${style.inputText}`}
                                name="category" id="category"
                                value={listCategory}
                                onChange={(e) => setListCategory(e.target.value)}
                            >
                                {categories?.map((category) => {
                                    return (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                })}

                            </select>
                        </div>
                    </div>

                    <div className={style.newList__content__form__buttons}>
                        <button className={style.newList__content__button} id={style.cancelButton} onClick={() => mutate()}>
                            <span> Cancel </span>
                        </button>
                        <button className={style.newList__content__button} onClick={() => callUpdateList()}>
                            <span> Save list </span>
                        </button>
                        {visible && <DropdownLoading status={statusUpdateList} operationCompleted={updatedList} />}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default List;