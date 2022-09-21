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
            <button className="bg-white dark:bg-black transition-colors fixed top-8 right-10 rounded-full p-2 border-solid border-2 hover:border-black dark:hover:border-gray-600" 
            onClick={()=>change()}>
                {themeData.theme===true?lightThemeSVG:darkThemeSVG}
            </button>
        </>
    )
}