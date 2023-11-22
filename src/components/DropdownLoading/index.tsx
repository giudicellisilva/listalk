import BackgroundDropdownCenter from "../BackgroundDropdownCenter";
import Loading from "../Loading";
import style from "./dropdownLoading.module.scss";

interface DropdownLoadingProps{
    status: string;
    operationCompleted: () => void;
}

const DropdownLoading = (props : DropdownLoadingProps) =>{
    return(
        <BackgroundDropdownCenter>
            <div className={style.dropdownLoading}>
                {props.status === "success" || props.status === "error" ? <button className={style.dropdownLoading__button} onClick={() => props.operationCompleted()}>
                <img className={style.dropdownLoading__img_close} src="/assets/close.svg" alt="" /></button> : false}
                {props.status === "loading"? <Loading /> : false}
                {props.status === "success" ? <img className={style.dropdownLoading__img} src="/assets/checkmark.svg" alt="" /> : false }
                {props.status === "error" ? <img src="/assets/error.svg" alt="" /> : false }
            </div>
        </BackgroundDropdownCenter>
    )
}

export default DropdownLoading;