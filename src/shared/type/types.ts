// Tasks types
export type TaskType = { 
    id: string;
    name: string,
    createDate: Date,
    lastEditDate: Date | undefined,
    finishedDate: Date | undefined,
    priority: number,
    editor: boolean,
    checked: boolean 
}
export type TaskTemplate = "line" | "card"
export type TaskQuantityCards = "3-cards" | "4-cards" | "5-cards"


// Sort and filters types
export type FiledType = "none" | "priority" | "date" 
export type OrderType = "ASC" | "DESC"
export type FilterType = false | "priority"


// Form types
export type SelectType = { 
    value: string;
    name: string,
}