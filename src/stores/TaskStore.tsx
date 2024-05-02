import { makeAutoObservable, observe, reaction } from "mobx";
import { v4 as uuidv4 } from "uuid"

import { TaskType, OrderType, FiledType } from '../types';

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

    filter: {
        search: string,
        sort: {
            field?: FiledType,
            order?: OrderType,
        }
    } = {
        search: "",
        sort: {}
    }

    search_handelr = (tasks:TaskType[]) => {
        
        if (this.filter.search) {
            return tasks.filter((task) => task.name.indexOf(this.filter.search) >= 0)
        } else {
            return tasks
        }
    }

    sort_handelr = (tasks:TaskType[]) => {

        if (this.filter.sort.field) {

            let sort = tasks.concat();

            // Сортировка по приоритету
            if(this.filter.sort.field == 'priority') {

                // По убыванию
                if(this.filter.sort.order == 'DESC'){ return sort.sort((a, b) => (a.priority > b.priority ? -1 : 1)); }

                // По возрастанию
                if(this.filter.sort.order == 'ASC'){ return sort.sort((a, b) => (a.priority < b.priority ? -1 : 1)); }
            }

            // Сортировка по дате создания
            if(this.filter.sort.field == 'date') {

                // От новой к старой
                if(this.filter.sort.order == 'ASC'){ 
                    return sort.sort((a,b) => {
                            let c:any = new Date(a.createDate);
                            let d:any = new Date(b.createDate);
                            
                            return c.getTime()-d.getTime();
                        }
                    );
                }

                // старой к новой
                if(this.filter.sort.order == 'DESC'){ 
                    return sort.sort((a,b) =>
                        {
                            let c:any = new Date(a.createDate);
                            let d:any = new Date(b.createDate);
                            
                            return d.getTime() - c.getTime();
                        }
                    );
                }
            }
            
            return tasks;

        } else {
            return tasks
        }

    }

    filter_handler = (tasks:TaskType[]) => {
        if(this.filter.search) tasks = this.search_handelr(tasks)
        if(this.filter.sort.field) tasks = this.sort_handelr(tasks)
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
        reaction(() => (
            {
                tasks: this.tasks,
                search: this.filter.search,
                sort_field: this.filter.sort.field,
                sort_order: this.filter.sort.order
            }), 
            ({tasks}) => {
                this.tasks_filter = this.filter_handler(tasks)
                this.tasks_output = this.tasks_filter
                this.setTasks()
            }
        )
    }
    
    // Создание задачи
    CreateTask = (name: TaskType["name"], priority:TaskType["priority"]) => {
        priority = Number(priority)
        const createDate = new Date();

        this.tasks = [...this.tasks, { 'id': uuidv4(), 'name': name, createDate: createDate, 'priority': priority, editor: false, checked: false }]
    }

    // Удаление задачи
    DeleteTask = (id: TaskType["id"]) => {
        this.tasks = this.tasks.filter((task) => {
            return task.id !== id
        })
    }

    // Отметка о выполнении задачи
    CheckedTask = (id: TaskType["id"]) => {
        const index = this.tasks.findIndex((task) => task.id == id)
        if (index !== -1) {
            this.tasks[index].checked = !this.tasks[index].checked;
            this.setTasks()
        }

    }

    // Редактирование задачи
    EditTask = (id: TaskType["id"], name: TaskType["name"]) => {
        const index = this.tasks.findIndex((task) => task.id == id)
        if (index !== -1) {
            this.tasks[index].name = name;
            this.setTasks()
        }
    }

    // Устанавливаем значение сортировки. Если есть сортировка, то срабатывает фунция прослушки
    setSort = (field:FiledType, value?: OrderType) => {
        if (!['none'].includes(field)) {
            this.filter.sort.field = field
            this.filter.sort.order = this.filter.sort.order === "ASC" ?  "DESC" : "ASC" 
        } else {
            this.filter.sort.field = undefined;
        }
    }

    // Устанавливаем поиск. Если поиск не пустой, то срабатывает функция прослушки
    setSearch = (value?: string) => {
        if(typeof value === "string") {
            this.filter.search = value
        }
    }

}

export default new TaskStore({});

