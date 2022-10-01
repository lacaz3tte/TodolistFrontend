import { useState} from 'react';
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForButton } from "../styles/styles"
import { acceptSVG, cancelButton } from '../svg/svg';

interface IData {
    addTask:(e:ITransfer)=>void
    deleteTask:(e:ITransfer)=>void
    e:ITransfer
}


export const ChooseTaskForList = ({addTask,deleteTask,e}:IData) => {
    const [added,setAdded] = useState(false)
    
    const [enableAdd,setEnableAdd] = useState(false)
    const [enableDelete,setEnableDelete] = useState(true)

    const changeButtons = () => {
        setEnableAdd(!enableAdd)
        setEnableDelete(!enableDelete)
    }

    return(
    <div className={" duration-500 flex items-center justify-between bg-transparent m-5" }>
        <div className={added?' text-green-600':' text-red-600'}>
            {added?acceptSVG:cancelButton}
        </div>
        <p className='w-1/2 overflow-hidden text-ellipsis inline-block'>
            {e.data}
        </p>
        <div>
            <button className={stylesForButton } disabled={enableAdd} onClick={()=>{
                addTask(e)
                setAdded(true)
                changeButtons()
            }}>Add</button>
            <button className={stylesForButton + ' ml-2' } disabled={enableDelete} onClick={()=>{
                deleteTask(e)
                setAdded(false)
                changeButtons()
            }}>Delete</button>
        </div>
    </div>)
}