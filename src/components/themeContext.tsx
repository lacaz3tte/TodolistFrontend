import React, { createContext, useContext,useEffect, useState} from "react";

interface ThemeContext {
    theme: boolean
    changeTheme:()=>void
}

const ThemeContext = createContext<Partial<ThemeContext>>({})

/* const ThemeContext = createContext<ThemeContext>({
    theme:true,
    changeTheme:()=>{}
}) */

export const useTheme = () => {
    return useContext(ThemeContext)
} 

export const ThemeProvider = ({children}:React.PropsWithChildren) => {

    const [theme,setTheme] = useState(true)
    const changeTheme = () => {
        setTheme(e=>!e)
    }

    useEffect(()=>{console.log(theme);
    },[theme])


    return(
        <ThemeContext.Provider 
            value={{
                theme,
                changeTheme
                }
            }>
            {children}
        </ThemeContext.Provider>
    )
}