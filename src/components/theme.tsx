import {useState} from 'react'
import { darkThemeSVG, lightThemeSVG } from "../svg/svg"



export const Theme = () => {
    const [theme,setTheme] = useState(true)

    const change = () =>{
        if(theme===true){
            document.documentElement.classList.add('dark')
            setTheme(!theme)
        } else {
            document.documentElement.classList.remove('dark')
            setTheme(!theme)
        }
    }

    return(
        <>
            <button className="bg-transparent  fixed top-8 right-10 rounded-full p-2 border-none 
           hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors duration-300 dark:text-white" 
            onClick={()=>change()}>
                {theme===true?lightThemeSVG:darkThemeSVG}
            </button>
        </>
    )
}