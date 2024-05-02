export type FiledType = "none" | "priority" | "date" 
export type OrderType = "ASC" | "DESC"

export type TaskType = { 
    id: string;
    name: string,
    createDate:any,
    priority: number,
    editor: boolean,
    checked: boolean 
}