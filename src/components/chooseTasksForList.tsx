import { useState} from 'react';
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForButton } from "../styles/styles"

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
    <div className={" duration-500 flex items-center justify-between bg-transparent m-5" + (added?' text-sky-300':' text-black dark:text-white ')}>
        <p className='w-1/2 overflow-hidden text-ellipsis'>
            {e.data}
        </p>
        <div>
            <button className={stylesForButton + ' disabled:border-none'} disabled={enableAdd} onClick={()=>{
                addTask(e)
                setAdded(true)
                changeButtons()
            }}>Add</button>
            <button className={stylesForButton+ " ml-10 disabled:border-none"} disabled={enableDelete} onClick={()=>{
                deleteTask(e)
                setAdded(false)
                changeButtons()
            }}>Delete</button>
        </div>
    </div>)
}