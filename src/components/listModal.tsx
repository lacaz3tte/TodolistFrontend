
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForButton,  stylesForDiv,  stylesForInputText } from "../styles/styles"
import {ChooseTaskForList} from "./chooseTasksForList"



interface IData {
    addPage:boolean
    downloadTasks:Array<ITransfer>
    nameofPage:string
    showModalWindow:(e:boolean)=>void
    addTask:(e:ITransfer)=>void
    deleteTask:(e:ITransfer)=>void
    addList:()=>void
    addNameofPage:(e:string)=>void
}


export const ListModal = ({addPage,downloadTasks,nameofPage,showModalWindow,addTask,deleteTask,addList,addNameofPage}:IData) => {
    
    return(
        <>
            {addPage ?
            <div className='fixed left-0 right-0 bottom-0 top-0 bg-black/50' 
                onClick={()=>{showModalWindow(false)}}
            >
                <div className={'w-[500px] p-5 rounded-md bg-white absolute top-10 left-1/2 -translate-x-1/2 text-black dark:text-white dark:bg-black border text-center ' 
                + stylesForDiv }
                    onClick={(e)=>{e.stopPropagation()}}
                >
                    <input className={stylesForInputText } type={'text'} autoFocus placeholder='Add the name of page...' 
                        value={nameofPage} onChange={(e)=>{addNameofPage(e.target.value)}}></input>
                    <div>
                        {downloadTasks.map((e)=>{return(
                            <ChooseTaskForList addTask={addTask} deleteTask={deleteTask} e={e}></ChooseTaskForList>
                        )})}
                    </div>
                    <button className={stylesForButton + " font-medium text-lg "} onClick={()=>addList()}>Add list</button>
                </div>
            </div> 
            :
            ''
            }
        </>
    )
}