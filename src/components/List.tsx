
import { IPage } from '../interfaces/pageInterface';
import { ITransfer } from "../interfaces/transferInterface"
import { stylesForButton, stylesForRoundedButton} from "../styles/styles"
import { garbageSVG } from '../svg/svg';


interface IData {
    pages:Array<IPage>
    showList:(list:Array<ITransfer>)=>void
    deleteList:(page:IPage)=>void
    changeAllow:(e:boolean)=>void
    changeKey:(key:Array<string>)=>void
}


export const List = ({pages,showList,deleteList,changeAllow,changeKey}:IData) => {

    return(
        <>
            {pages.map((e)=>{
                return(
                    <div className= ' flex justify-between border-b-2 border-y-slate-300 dark:border-y-slate-700 m-3 font-medium text-lg'>
                        <button onClick={()=>{
                            showList(e.pages)
                            changeAllow(false)
                            changeKey([e.key.toString(),e.name])
                        }} className={stylesForButton + ' m-3 ' }>{e.name}</button>
                        <button onClick={()=>{deleteList(e)}} className={stylesForRoundedButton + ' m-3' } >
                            {garbageSVG}
                        </button>
                    </div>
            )
            })}
        </>
    )
}