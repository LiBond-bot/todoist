import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid"

export type TaskType = { id: string; name: string, editor: boolean, checked: boolean }

class TaskStore {
    tasks: TaskType[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }
    
    CreateTask = (name: TaskType["name"]) => {
        this.tasks.push({ 'id': uuidv4(), 'name': name, editor: false, checked: false })
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

}

export default new TaskStore();
