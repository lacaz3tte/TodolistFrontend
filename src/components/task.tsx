
import { Reorder } from 'framer-motion' 
import { stylesForButton, stylesForTaskDiv, stylesForInputText, stylesForTextarea, stylesForRoundedButton } from "../styles/styles"
import {  acceptSVG, garbageSVG, renameSVG } from "../svg/svg"
import { useState, useRef, useEffect } from "react"
import { ITransfer } from "../interfaces/transferInterface"

interface IData {
    data : ITransfer,
    allowChange:Boolean,
    deleteItem:(key:number)=>void,
    renameItem:(renameValue:string,key:number)=>void
    onDragEnd:()=>void
}

export const Task = ({data,deleteItem,renameItem,onDragEnd,allowChange}:IData) => {

    const getDate = (date:number)=>{
        return new Date(date).toDateString()
    }

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const textareaRef2 = useRef<HTMLTextAreaElement | null>(null);
    
    const [rename, setRename] = useState(false)
    const [renameValue,setRenameValue] = useState(data.data)

    useEffect(() => {
        if(textareaRef && textareaRef.current){
          textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }}, [rename ,data.data]);  

    useEffect(() => {
        if(textareaRef2 && textareaRef2.current){
          textareaRef2.current.style.height = "10px";
          textareaRef2.current.style.height = textareaRef2.current.scrollHeight + "px";
        }}, [rename, renameValue]); 

    return(
        <Reorder.Item value={data} id={data.data} onDragEnd={onDragEnd}>
            {rename  
            ?    
                <div className={ stylesForTaskDiv }>
                    <textarea autoFocus
                        ref={ textareaRef2 }
                        className = { stylesForInputText + ' overflow-hidden resize-none outline-none hover:cursor-pointer ml-5 ' } 
                        value = { renameValue } 
                        onChange = { e => {setRenameValue(e.target.value)}}>
                    </textarea>
                    <button className={stylesForRoundedButton} 
                        onClick={()=>{
                            renameItem(renameValue,data.key) 
                            setRename(false)
                        }}>
                        {acceptSVG}
                    </button>
                </div>
            :
                <div className={stylesForTaskDiv + ' cursor-pointer'}>
                    <div className=' w-3/4'>
                        <div className="flex">
                            <textarea ref={textareaRef} readOnly  className={stylesForTextarea + ' font-medium text-lg border-b-2 border-y-slate-300 dark:border-y-slate-700'} >{data.data}</textarea>
                        </div>
                        <div className='text-xs pl-3 pt-2 text-slate-300 dark:text-slate-500 '>
                            <p>Written: {getDate(data.date)}</p>
                            <p>{ data.updated!==-1 && 'Updated: ' + getDate(data.updated) }</p>
                        </div>
                    </div>
                    {allowChange
                    ?
                    <div className='w-1/4 flex items-center justify-around'>
                        <button className={stylesForRoundedButton + ' ml-5'}
                            onClick={()=>{setRename(true)}}>
                            {renameSVG}
                        </button>
                        <button className={stylesForRoundedButton  } onClick={()=>{deleteItem(data.key)}}>
                            {garbageSVG}
                        </button>
                    </div>
                    :
                    <></>}

                </div>
            }
        </Reorder.Item>
    )
}
