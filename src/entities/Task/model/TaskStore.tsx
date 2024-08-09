import { makeAutoObservable, reaction } from "mobx";
import { v4 as uuidv4 } from "uuid";

import {
  TaskType,
  OrderType,
  FiledType,
  TaskTemplate,
  TaskQuantityCards,
  FilterType,
} from "shared/type/types";

class TaskStore {
  private storage_name = "tasks";

  private getTasks = async () => {
    try {
      const string = await localStorage.getItem(this.storage_name);
      return string ? JSON.parse(string) : [];
    } catch (error) {
      return [];
    }
  };

  private setTasks = async () => {
    await localStorage.setItem(this.storage_name, JSON.stringify(this.tasks));
  };

  tasks: TaskType[] = [];
  tasks_filter: TaskType[] = [];
  tasks_output: TaskType[] = [];

  // Фильтры
  filter: {
    search: string;
    sort: {
      field?: FiledType;
      order?: OrderType;
    };
    filter: {
      field?: FilterType;
      filterPriority?: number[];
    };
  } = {
    search: "",
    sort: {},
    filter: {
      field: false,
      filterPriority: [],
    },
  };

  // Отображение карточек задач
  tasks_view: {
    tasks_template: TaskTemplate;
    tasks_cards_quan: TaskQuantityCards;
  } = {
    tasks_template: "line",
    tasks_cards_quan: "3-cards",
  };

  private search_handelr = (tasks: TaskType[]) => {
    if (this.filter.search) {
      return tasks.filter((task) => task.name.indexOf(this.filter.search) >= 0);
    } else {
      return tasks;
    }
  };

  // Фильтрация по приоритету
  private filter_prioritety = (tasks: TaskType[]) => {
    // Фильтрация по приоритету, если он установлен
    if (this.filter.filter.filterPriority !== undefined) {
      // Дублируем массив заметок
      const filterTasks = tasks;

      // Фильтруем массив по установленному приоритету
      if (this.filter.filter.filterPriority?.length > 0) {
        // Удаляем из массива все элементы
        tasks = [];
        this.filter.filter.filterPriority.forEach((item) => {
          // Выбираем заметки по текущему приоритету
          const TasksCurrnetPriority = filterTasks.filter(
            (task) => task.priority == item,
          );

          // Вносим в массив отфильтрованные данные
          tasks = tasks.concat(TasksCurrnetPriority);
        });
      }
    }

    return tasks;
  };

  private sort_handelr = (tasks: TaskType[]) => {
    if (this.filter.sort.field) {
      const sort = tasks.concat();

      // Сортировка по приоритету
      if (this.filter.sort.field == "priority") {
        // По убыванию
        if (this.filter.sort.order == "DESC") {
          return sort.sort((a, b) => (a.priority > b.priority ? -1 : 1));
        }

        // По возрастанию
        if (this.filter.sort.order == "ASC") {
          return sort.sort((a, b) => (a.priority < b.priority ? -1 : 1));
        }
      }

      // Сортировка по дате создания
      if (this.filter.sort.field == "date") {
        // От новой к старой
        if (this.filter.sort.order == "ASC") {
          return sort.sort((a, b) => {
            const c: Date = new Date(a.createDate);
            const d: Date = new Date(b.createDate);

            return c.getTime() - d.getTime();
          });
        }

        // старой к новой
        if (this.filter.sort.order == "DESC") {
          return sort.sort((a, b) => {
            const c: Date = new Date(a.createDate);
            const d: Date = new Date(b.createDate);

            return d.getTime() - c.getTime();
          });
        }
      }

      return tasks;
    } else {
      return tasks;
    }
  };

  private filter_handler = (tasks: TaskType[]) => {
    if (this.filter.search) tasks = this.search_handelr(tasks);
    if (this.filter.sort.field) tasks = this.sort_handelr(tasks);
    if (this.filter.filter.field) tasks = this.filter_prioritety(tasks);

    return tasks;
  };

  constructor({ storage_name }: { storage_name?: string }) {
    makeAutoObservable(this, {}, { autoBind: true });

    // Установка параметров
    if (typeof storage_name === "string") {
      this.storage_name = storage_name;
    }

    // Получание Task из LocalStorage
    this.getTasks().then((tasks) => {
      this.tasks = tasks;
    });

    // Реакция на изменения
    reaction(
      () => ({
        tasks: this.tasks,
        search: this.filter.search,
        sort_field: this.filter.sort.field,
        sort_order: this.filter.sort.order,
        filter_field: this.filter.filter.field,
        filter_filterPriority: this.filter.filter.filterPriority,
      }),
      ({ tasks }) => {
        this.tasks_filter = this.filter_handler(tasks);
        this.tasks_output = this.tasks_filter;
        this.setTasks();
      },
    );
  }

  // Создание задачи
  CreateTask = (name: TaskType["name"], priority: TaskType["priority"]) => {
    priority = Number(priority);
    const createDate = new Date();
    const task = {
      id: uuidv4(),
      name: name,
      createDate: createDate,
      lastEditDate: undefined,
      finishedDate: undefined,
      priority: priority,
      editor: false,
      checked: false,
    };

    this.tasks = [...this.tasks, task];
  };

  // Удаление задачи
  DeleteTask = (id: TaskType["id"]) => {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });
  };

  // Отметка о выполнении задачи
  CheckedTask = (id: TaskType["id"]) => {
    const index = this.tasks.findIndex((task) => task.id == id);
    if (index !== -1) {
      const finishDate = new Date();

      this.tasks[index].checked = !this.tasks[index].checked;

      if (this.tasks[index].checked == false) {
        this.tasks[index].finishedDate = undefined;
      } else {
        this.tasks[index].finishedDate = finishDate;
      }

      this.setTasks();
    }
  };

  // Редактирование задачи
  EditTask = (id: TaskType["id"], name: TaskType["name"]) => {
    const index = this.tasks.findIndex((task) => task.id == id);
    if (index !== -1) {
      const lastEditDate = new Date();

      this.tasks[index].name = name;

      this.tasks[index].lastEditDate = lastEditDate;

      this.setTasks();
    }
  };

  // Редактирование приоритета
  EditPriority = (id: TaskType["id"], idPriority: TaskType["priority"]) => {
    const index = this.tasks.findIndex((task) => task.id == id);
    if (index !== -1) {
      if (this.tasks[index].priority != idPriority) {
        this.tasks[index].priority = idPriority;
      }

      this.setTasks();
    }
  };

  // Устанавливаем сортировку, если ее нет, сбрасываем значения
  setSort = (field: FiledType) => {
    if (!["none"].includes(field)) {
      this.filter.sort.field = field;
      // Порядок сортировки по умолчанию
      this.filter.sort.order = "ASC";
    } else {
      this.filter.sort.field = undefined;
      this.filter.sort.order = undefined;
    }
  };

  // Меняем порядок сортировки
  changeOrder = () => {
    this.filter.sort.order = this.filter.sort.order === "ASC" ? "DESC" : "ASC";
  };

  // Устанавливаем поиск. Если поиск не пустой, то срабатывает функция прослушки
  setSearch = (value?: string) => {
    if (typeof value === "string") {
      this.filter.search = value;
    }
  };

  // Меняем отображение карточек
  setTasksTemplate = (value?: TaskTemplate) => {
    if (typeof value === "string") {
      this.tasks_view.tasks_template = value;
    }
  };

  setQuantityCards = (value?: TaskQuantityCards) => {
    if (typeof value === "string") {
      this.tasks_view.tasks_cards_quan = value;
    }
  };

  // Устанавливаем значения фильтра
  setFilterType = (field: FilterType) => {
    this.filter.filter.field = field;
  };

  // Устанавливаем значения фильтра приоритета
  setFilterPriority = (field: 0 | 1 | 2) => {
    const index = this.filter.filter.filterPriority?.indexOf(field);

    if (this.filter.filter.filterPriority !== undefined) {
      if (this.filter.filter.filterPriority?.length > 0) {
        if (index == -1) {
          this.filter.filter.filterPriority = [
            ...this.filter.filter.filterPriority,
            field,
          ];
        }
      } else {
        this.filter.filter.filterPriority = [field];
      }
    }
  };

  // Удаляем значение фильтра приоритета
  deleteFilterPriority = (field: 0 | 1 | 2) => {
    if (this.filter.filter.filterPriority) {
      const i = this.filter.filter.filterPriority.indexOf(field);

      const res = this.filter.filter.filterPriority?.filter(
        (item, index, array) => {
          return i !== index;
        },
      );

      this.filter.filter.filterPriority = res;
    }
  };
}

export default new TaskStore({});
