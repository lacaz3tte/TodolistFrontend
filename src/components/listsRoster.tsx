
import { useState } from 'react';
import { IPage } from '../interfaces/pageInterface';
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForButton } from "../styles/styles"
import { darkMenuButton, lightMenuButton } from '../svg/svg';
import { List } from './List';
import { useTheme } from './themeContext';


interface IData {
    downloadTasks:Array<ITransfer>
    pages:Array<IPage>
    showModalWindow:(e:boolean)=>void
    showList:(list:Array<ITransfer>)=>void
    deleteList:(page:IPage)=>void
    changeAllow:(e:boolean)=>void
    changeKey:(key:Array<string>)=>void
}


export const ListsRoster = ({showModalWindow,downloadTasks,pages,showList,deleteList,changeAllow,changeKey}:IData) => {

    const [animation,setAnimation] = useState([' -top-full', ' hidden'])

    const themeData = useTheme()

    const toggle = () => {
        
        animation[0] ===' -top-full'
        ?
            setAnimation([' top-0', ' block'])
        : 
            setAnimation([' -top-full', ' hidden'])
    }

    
    return(
        <>
            <button onClick={()=>toggle()} className={stylesForButton + ' ml-5 mt-5 '  }>
                {themeData.theme?lightMenuButton:darkMenuButton}
            </button>    
            <div className={' transform absolute mt-5 left-1/4 -translate-x-full border rounded-md w-2/12 duration-1000 ' + animation[0] }>
                <p>
                    <button onClick={()=>{
                        showList(downloadTasks)
                        changeAllow(true)
                    }} className={stylesForButton + ' m-3' }>All tasks</button>
                </p>
                <List deleteList={deleteList} showList={showList} pages={pages} changeAllow={changeAllow} changeKey={changeKey}></List>
                <button onClick={()=>{showModalWindow(true)}} className={stylesForButton + ' m-3' }>Add new list</button>
            
            </div>
        </>
    )
}