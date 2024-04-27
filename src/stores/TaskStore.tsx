import { makeAutoObservable, observe, reaction } from "mobx";
import { v4 as uuidv4 } from "uuid"

export type FiledType = "priority"
export type OrderType = "ASC" | "DESC"

export type TaskType = { 
    id: string;
    name: string,
    createDate:any,
    priority: number,
    editor: boolean,
    checked: boolean 
}

class TaskStore {
    private storage_name = "tasks"

    private getTasks = async () => {
       try {
            const string = await localStorage.getItem(this.storage_name)
            return string ? JSON.parse(string) : []
       } catch (error) {
            return []
       }
    }

    private setTasks = async () => {
        await localStorage.setItem(this.storage_name, JSON.stringify(this.tasks))
    }

    tasks: TaskType[] = [];
    tasks_filter: TaskType[] = []
    tasks_output: TaskType[] = []
    activeSort: boolean = false;

    filter: {
        search: string,
        sort: {
            field?: FiledType,
            order?: OrderType
        }
    } = {
        search: "",
        sort: {}
    }

    private search_handelr = (tasks:TaskType[]) => {
        if (this.filter.search) {
            return tasks.filter((task) => task.name.indexOf(this.filter.search) >= 0)
        } else {
            return tasks
        }
    }

    private sort_handelr = (tasks:TaskType[]) => {
        // TODO: Сделать сортировку для задач
        return tasks
    }

    private filter_handler = (tasks:TaskType[]) => {
        if(this.filter.search)  tasks = this.search_handelr(tasks)
        if(this.filter.sort.field)  tasks = this.sort_handelr(tasks)
        return tasks
    }

    constructor({storage_name}:{storage_name?:string}) {
        makeAutoObservable(this, {}, { autoBind: true });

        // Установка параметров
        if (typeof storage_name === "string") {
            this.storage_name = storage_name
        }

        // Получание Task из LocalStorage
        this.getTasks().then((tasks) => {
            this.tasks = tasks
        })

        // Реакция на изменения
        reaction(() => ({tasks: this.tasks, search: this.filter.search, sort: this.filter.sort}), ({tasks}) => {
            this.tasks_filter = this.filter_handler(tasks)
            this.tasks_output = this.tasks_filter
            this.setTasks()
        })
    }
    
    CreateTask = (name: TaskType["name"], priority:TaskType["priority"]) => {
        
        priority = Number(priority)
        const createDate = new Date();

        this.tasks = [...this.tasks, { 'id': uuidv4(), 'name': name, createDate: createDate, 'priority': priority, editor: false, checked: false }]
  
    }

    DeleteTask = (id: TaskType["id"]) => {
        this.tasks = this.tasks.filter((task) => {
            return task.id !== id
        })


    }

    CheckedTask = (id: TaskType["id"]) => {
        const index = this.tasks.findIndex((task) => task.id == id)
        if (index !== -1) {
            this.tasks[index].checked = !this.tasks[index].checked;
        }


    }

    EditTask = (id: TaskType["id"], name: TaskType["name"]) => {
        const index = this.tasks.findIndex((task) => task.id == id)
        if (index !== -1) {
            this.tasks[index].name = name;
        }
        
   
    }

    setSort = (field:FiledType,value?: OrderType) => {
        if (['priority'].includes(field)) {
            this.filter.sort.field = field
            this.filter.sort.order = this.filter.sort.order === "ASC" ?  "DESC" : "ASC" 
        }

    
    }

    setSearch = (value?: string) => {
        if(typeof value === "string") {
            this.filter.search = value
        }

     
    }


    // // Сортировка задач
    // SortTasks = () => {
        
    //     if(!tasks.length) {tasks = this.tasks.concat();}

    //     if(this.SortParam == 'default'){
    //         tasks = this.tasks.concat();
    //         this.activeSort = false;
    //     }

    //     if(this.SortParam == 'priority'){
    //         this.activeSort = true;

    //         if(this.TypeSort == 'des' || this.TypeSort == ''){tasks = tasks.sort((a, b) => (a.priority > b.priority ? -1 : 1));}
    //         if(this.TypeSort == 'asc'){tasks = tasks.sort((a, b) => (a.priority < b.priority ? -1 : 1));}

    //     }
    // }
    
}

export default new TaskStore({});

