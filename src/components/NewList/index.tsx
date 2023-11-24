import { useState } from "react";
import style from "./newList.module.scss";
import BackgroundDropdownCenter from "../BackgroundDropdownCenter";
import { useMutation } from "react-query";
// import { newCategory } from "@/api/category/newCategory";
import { postList } from "@/api/list/postList";
import DropdownLoading from "../DropdownLoading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFormik } from "formik";
import * as Yup from 'yup';

interface category {
    id: string;
    name: string;
}

interface NewListProps {
    setVisible(set: boolean): void;
    loadingLists(): void;
}

interface FormValues {
    name: string;
    description: string;
}

const NewList = (props: NewListProps) => {
    const [category, setCategory] = useState("1");
    const [visible, setVisible] = useState(false);
    const categories: category[] = useSelector((state: RootState) => state.categories);
    const errors: FormValues = { name: "", description: "" };


    const { status: statusNewList, mutate: mutateNewList } = useMutation(
        async () => {
            return postList(formik.values.name, formik.values.description, category);
        },
        {
            onSuccess: (res) => {
            },

            onError: (error) => {
                console.log(error);
            }
        }
    )

    // const {status: s, mutate: newCat} = useMutation(
    //     async () =>{
    //         return newCategory(name);
    //     },
    //     {
    //         onSuccess: (res) =>{
    //             console.log("data", res.data)
    //         },

    //         onError: (error) =>{
    //             console.log(error)
    //         }
    //     }
    // )

    function ListCreate() {
        mutateNewList();
        setVisible(true);

    }

    function ListCreated() {
        props.loadingLists()
        setVisible(false);
        props.setVisible(false)
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            description: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Must be at least 3 characters or more")
                .required('Required'),
            description: Yup.string()
                .min(5, "Must be at least 5 characters or more")
                .required('Required'),
        }),
        onSubmit: () => {
            ListCreate();
        },
    })


    return (
        <BackgroundDropdownCenter>
            <div className={style.newList}>
                <button className={style.newList__button_close} onClick={() => props.setVisible(false)}><img src="/assets/close.svg" alt="Close" /></button>
                <form className={style.newList__form} onSubmit={formik.handleSubmit} >
                    <label htmlFor="name" className={style.newList__label}>
                        <p>Name</p>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        
                        {formik.touched.name && formik.errors.name ? (
                            <span className={style.newList__form__error}>{formik.errors.name}</span>
                        ) : null}
                    </label>



                    <label htmlFor="description" className={style.newList__label}>
                        <p>Description</p>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />

                        {formik.touched.description && formik.errors.description ? (
                            <span className={style.newList__form__error}>{formik.errors.description}</span>
                        ) : null}
                    </label>



                    <label htmlFor="" className={style.newList__label}>
                        <p>Category</p>
                        <select name="" id="" className={style.newList__category} value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((option) => {
                                return (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                )
                            })}
                        </select>
                    </label>

                    <button className={style.newList__button_create} type="submit">Submit</button>
                </form>
            </div>

            {visible && <DropdownLoading status={statusNewList} operationCompleted={ListCreated} />}
        </BackgroundDropdownCenter>
    )
}

export default NewList;