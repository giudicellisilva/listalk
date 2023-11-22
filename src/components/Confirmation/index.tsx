import BackgroundDropdownCenter from "../BackgroundDropdownCenter";
import style from "./confirmation.module.scss";

interface ConfirmationProps{
    confirmação: () => void;
    cancelamento: (set: boolean) => void;
    setLoading: (set: boolean) => void;
}
const Confirmation = (props: ConfirmationProps) =>{

    function confirmation(){
        props.confirmação();
        props.setLoading(true);
        props.cancelamento(false);
    }

    return(
        <BackgroundDropdownCenter>
            <div className={style.confirmation}>
                <img className={style.confirmation__alert} src="/assets/brakeWarning.svg" alt="icon alert" />
                <p className={style.confirmation__text_confirma}>Você tem certeza que deseja excluir?</p>
                <p className={style.confirmation__text_alert}>Você não poderá recuperar após excluir!</p>
                <div className={style.confirmation__buttons}>
                    <button className={style.confirmation__buttons___cancelar} onClick={() => props.cancelamento(false)}>Cancelar</button>
                    <button className={style.confirmation__buttons___confirmar} onClick={() => confirmation()}>Confirmar</button>
                </div>
            </div>
        </BackgroundDropdownCenter>
    )
}

export default Confirmation;