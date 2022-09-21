import { ITransfer } from "./transferInterface"

export interface IPage{
    key:number
    name:string
    pages:Array<ITransfer>
}