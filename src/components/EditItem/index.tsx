import { useMutation } from "react-query";
import BackgroundDropdownCenter from "../BackgroundDropdownCenter";
import DropdownLoading from "../DropdownLoading";
import style from "./editItem.module.scss";
import { useState } from "react";
import { updateItem } from "@/api/item/updateItem";
import { useFormik } from "formik";
import * as Yup from 'yup';

interface EditItemProps {
    idList: string | string[] | undefined;
    idItem: string;
    content: string;
    loadingItens: () => void;
    setVisible: (set: boolean) => void;
}


interface FormValues {
    item: string;
    // adicione outras propriedades do formulário conforme necessário
}

const EditItem = (props: EditItemProps) => {
    const [visible, setVisible] = useState(false);
    const errors: FormValues = {item: ""};

    const { status, mutate } = useMutation(
        async () => {
            return updateItem(props.idList, props.idItem, formik.values.item);
        },
        {
            onSuccess: (res) => {
            },

            onError: (error) => {
                console.log(error)
            }
        }
    )

    function createItem() {
        mutate();
        setVisible(true)
    }

    function createdItem() {
        props.loadingItens();
        props.setVisible(false);
        setVisible(false);
    }

    const validate = (values: FormValues) => {

        if (values.item === props.content) {
            errors.item = 'You did not change the value of the item';
        }

        return errors;
    };


    const formik = useFormik({
        initialValues: {
            item: props.content,
        },
        validate,
        validationSchema: Yup.object({
            item: Yup.string()
                .min(5, "Must be at least 5 characters or more")
                .required('Required')
        }),
        onSubmit: () => {
            createItem();
        },
    })

    return (
        <BackgroundDropdownCenter>
            <div className={style.editItem}>
                <button className={style.editItem__button_close} onClick={() => props.setVisible(false)}><img src="/assets/close.svg" alt="fechar" /></button>
                <form className={style.editItem__form} onSubmit={formik.handleSubmit}>
                    <label htmlFor="item" className={style.editItem__label}>
                        <p>Item</p>
                        <input
                            type="text"
                            name="item"
                            placeholder="Item"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.item} />

                        {formik.touched.item && formik.errors.item ? (
                            <span className={style.editItem__form__error}>{formik.errors.item}</span>
                        ) : null}
                    </label>
                    <button className={style.editItem__button_create} type="submit">Edit</button>
                </form>


                {visible && <DropdownLoading status={status} operationCompleted={createdItem} />}
            </div>
        </BackgroundDropdownCenter>
    )
}

export default EditItem;