
import { useState } from 'react';
import { IPage } from '../interfaces/pageInterface';
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForRoundedButton,stylesForButton, stylesForDiv } from "../styles/styles"
import { cancelButton, menuButton } from '../svg/svg';
import { List } from './List';


interface IData {
    allowChange:boolean
    downloadTasks:Array<ITransfer>
    pages:Array<IPage>
    showModalWindow:(e:boolean)=>void
    showList:(list:Array<ITransfer>)=>void
    deleteList:(page:IPage)=>void
    changeAllow:(e:boolean)=>void
    changeKey:(key:Array<string>)=>void
}


export const ListsRoster = ({showModalWindow,downloadTasks,pages,showList,deleteList,changeAllow,changeKey,allowChange}:IData) => {

    const [animation,setAnimation] = useState([' -top-full', ' hidden'])

    const toggle = () => {
        
        animation[0] ===' -top-full'
        ?
            setAnimation([' top-0', ' block'])
        : 
            setAnimation([' -top-full', ' hidden'])
    }

    const cancel = () => {
        showList(downloadTasks)
        changeAllow(true)
    }

    
    return(
        <>
            <button onClick={()=>toggle()} className={stylesForRoundedButton + '  ml-5 mt-5 '  }>
                {menuButton}
            </button>
            {allowChange?
                <></>:
                <button className={stylesForRoundedButton + "ml-5"} onClick={()=>cancel()}>{cancelButton}</button>
            }
            <div className={' transform absolute mt-5 left-1/4 -translate-x-full border rounded-md w-2/12 duration-1000 ' + stylesForDiv + animation[0] }>
                <p>
                    <button onClick={()=>cancel()} className={stylesForButton + ' m-3' }>All tasks</button>
                </p>
                <List deleteList={deleteList} showList={showList} pages={pages} changeAllow={changeAllow} changeKey={changeKey}></List>
                <button onClick={()=>{showModalWindow(true)}} className={stylesForButton + ' m-3' }>Add new list</button>
            
            </div>
        </>
    )
}