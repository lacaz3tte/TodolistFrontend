import { stylesForButton, stylesForInputDiv, stylesForInputText, } from "../styles/styles"
import {useRef, useEffect} from 'react'

interface IEnterData {
    enterTask:(value:string)=>void
    addHandler:()=>void
    value:string
    allowChange:boolean
}


export const AddTask = ({enterTask, value, addHandler,allowChange}:IEnterData) => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    
    useEffect(() => {
      if(textareaRef && textareaRef.current){
        textareaRef.current.style.height = "10px";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }}, [value]);  
  
  
    return (
      allowChange
      ?
      <div className={stylesForInputDiv } >
        <textarea 
          ref={textareaRef}
          value={value}
          className={stylesForInputText + ' resize-none overflow-hidden h-10 ' }
          placeholder="Enter your task..." 
          onChange={(e)=>{enterTask(e.target.value)}}>
        </textarea>
        <button className={stylesForButton + ' h-9'} onClick={()=>{addHandler()}}>
          Enter
        </button>
      </div>
      :
      <></>
    )
}  