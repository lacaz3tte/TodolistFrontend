
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForRoundedButton} from "../styles/styles"
import { addButton, cancelButton, menuButton } from '../svg/svg';


interface IData {
    allowChange:boolean
    downloadTasks:Array<ITransfer>
    showList:(list:Array<ITransfer>)=>void
    changeAllow:(e:boolean)=>void
    changeVisibleofListRoster: () => void
    changeVisiableofTaskModal: () => void
}


export const Buttons = ({downloadTasks,showList,changeAllow,allowChange,changeVisibleofListRoster,changeVisiableofTaskModal}:IData) => {

    const cancel = () => {
        showList(downloadTasks)
        changeAllow(true)
    }

    return(
        <>
            <button onClick={()=>{changeVisibleofListRoster()}} className={stylesForRoundedButton + ' ml-5 mt-5 '  }>
                {menuButton}
            </button>
            {allowChange
                ?
                <button onClick={()=>changeVisiableofTaskModal()} className={stylesForRoundedButton + ' ml-5 '  }>
                    {addButton}
                </button>
                :
                <button className={stylesForRoundedButton + "ml-5"} onClick={()=>cancel()}>
                    {cancelButton}
                </button>
            }
        </>
    )
}