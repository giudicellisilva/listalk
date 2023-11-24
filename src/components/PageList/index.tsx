import { useEffect, useState } from "react";
import ElementList from "../ElementList";
import style from "./pageList.module.scss";
import { useMutation } from "react-query";
import { getLists } from "@/api/list/getLists";
import NewList from "../NewList";
import Header from "../Header";
import { getCategory } from "@/api/category/getCategory";
import { useDispatch, useSelector } from 'react-redux';
import { setArray } from '@/redux/categories/categoriesSlice';
import type { RootState} from '@/redux/store';

interface ElementList {
    id: string;
    name: string;
    description: string;
    category: { id: string };
}

interface category {
    id: string;
    name: string;
}

const PageList = () => {
    const [elementsList, setElementsList] = useState<ElementList[]>([]);
    const [elementsFilter, setElementsFilter] = useState<ElementList[]>([]);
    const [visible, setVisible] = useState(false);
    const [category, setCategory] = useState("0");
    const categories: category[] = useSelector((state: RootState) => state.categories);
    const dispatch = useDispatch();
    
    useEffect(() => {
        mutate();
        mutateCategory();
    }, []);

    useEffect(() => {
        filterList();
    }, [category]);

    const { status, mutate } = useMutation(
        async () => {
            return getLists();
        },
        {
            onSuccess: (res) => {
                setElementsList(res.data);
                setElementsFilter(res.data);
            },

            onError: (error) => {
                console.log(error)
            }
        }
    )

    const { status: statusCategory, mutate: mutateCategory } = useMutation(
        async () => {
            return getCategory();
        },
        {
            onSuccess: (res) => {
                dispatch(setArray(res.data))
            },

            onError: (error) => {
                console.log(error)
            }
        }
    )

    function filterList(){
        if(category != "0"){
            setElementsFilter(elementsList.filter( (element) => element.category.id == category))
        }else{
            setElementsFilter(elementsList)
        }
    }

    return (
        <div className={style.pageList}>
            <Header />
            <h2 className={style.pageList__title}>Your lists</h2>
            <div className={style.pageList__categories}>
                <select className={style.pageList__categories__category}
                    name="category" id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option key="0" value="0"></option>
                    {categories?.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}

                </select>
            </div>
            <div className={style.pageList__content}>
                {elementsFilter.map((list) => {
                    return (
                        <ElementList key={list.id} id={list.id} content={list.name} isClickable={true} loadingLists={mutate} />
                    )
                })}
            </div>
            <div className={style.pageList__div}>
                <button className={style.pageList__div__button_newList} onClick={() => setVisible(true)}>Add new list</button>

            </div>
            {visible ? <NewList setVisible={setVisible} loadingLists={mutate}></NewList> : false}
            {/* {visible ? <SignupForm /> : false} */}
        </div>
    )
}

export default PageList;