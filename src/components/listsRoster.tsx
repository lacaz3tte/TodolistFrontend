
import { useEffect, useState } from 'react';
import { IPage } from '../interfaces/pageInterface';
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForButton, stylesForDiv, stylesForListDiv } from "../styles/styles"
import { List } from './List';


interface IData {
    showListRoster:boolean
    downloadTasks:Array<ITransfer>
    pages:Array<IPage>
    showModalWindow:(e:boolean)=>void
    showList:(list:Array<ITransfer>)=>void
    deleteList:(page:IPage)=>void
    changeAllow:(e:boolean)=>void
    changeKey:(key:Array<string>)=>void
}


export const ListsRoster = ({showModalWindow,downloadTasks,pages,showList,deleteList,changeAllow,changeKey,showListRoster}:IData) => {

    const cancel = () => {
        showList(downloadTasks)
        changeAllow(true)
    }
    
    return(
        <>
            <div className={ showListRoster?stylesForListDiv + ' -top-full': stylesForListDiv + ' top-0'}>
                <p>
                    <button onClick={()=>cancel()} className={stylesForButton + ' m-3' }>All tasks</button>
                </p>
                <List deleteList={deleteList} showList={showList} pages={pages} changeAllow={changeAllow} changeKey={changeKey}></List>
                <button onClick={()=>{showModalWindow(true)}} className={stylesForButton + ' m-3' }>Add new list</button>
            
            </div>
        </>
    )
}