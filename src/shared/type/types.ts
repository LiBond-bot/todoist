export type FiledType = "none" | "priority" | "date" 
export type OrderType = "ASC" | "DESC"
export type TaskTemplate = "line" | "card"
export type TaskQuantityCards = "3-cards" | "4-cards" | "5-cards"

export type TaskType = { 
    id: string;
    name: string,
    createDate:any,
    priority: number,
    editor: boolean,
    checked: boolean 
}