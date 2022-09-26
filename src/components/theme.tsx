import { darkThemeSVG, lightThemeSVG } from "../svg/svg"
import { useTheme } from "./themeContext"



export const Theme = () => {
    
    const themeData = useTheme()
    

    const change = () =>{
        if(themeData.theme===true){
            themeData.changeTheme!==undefined && themeData.changeTheme()
            document.documentElement.classList.add('dark')
        } else {
            themeData.changeTheme!==undefined && themeData.changeTheme()
            document.documentElement.classList.remove('dark')
        }
    }

    return(
        <>
            <button className="bg-transparent border-white dark:border-black  fixed top-8 right-10 rounded-full p-2 border-solid 
            border-2 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors duration-300" 
            onClick={()=>change()}>
                {themeData.theme===true?lightThemeSVG:darkThemeSVG}
            </button>
        </>
    )
}