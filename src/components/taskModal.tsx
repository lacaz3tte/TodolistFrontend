
import { useRef, useEffect, useState } from "react";
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForButton,  stylesForDiv,  stylesForInputText } from "../styles/styles"



export const TaskModal = () => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const [description,setDescription] = useState('')

    useEffect(() => {
        if(textareaRef && textareaRef.current){
            textareaRef.current.style.height = "10px";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }}, [description]);  

    return(
        <>
            <div className='fixed left-0 right-0 bottom-0 top-0 bg-black/50'>
                <div className={'w-1/2 p-5 rounded-md bg-white absolute top-10 left-1/2 -translate-x-1/2 text-black dark:text-white dark:bg-black border text-center ' 
                    + stylesForDiv}
                    onClick={(e)=>{e.stopPropagation()}}
                >
                    <input className={stylesForInputText + ' w-full' } type={'text'} autoFocus placeholder='Header'></input>
                    <textarea
                        ref= {textareaRef}
                        value = {description}
                        className = { stylesForInputText + ' w-full overflow-hidden resize-none outline-none mt-5 h-9' } 
                        placeholder = 'Discription'
                        onChange={(e)=>{setDescription(e.target.value)}}
                    >
                    </textarea>
                    <div>
                        <button className={stylesForButton + " font-medium text-lg "} >Add task</button>
                    </div>
                </div>
            </div> 
        </>
    )
}