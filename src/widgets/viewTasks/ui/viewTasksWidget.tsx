import React, { FC } from "react";
import classNames from "classnames";

// Types
import { TaskType, TaskTemplate, TaskQuantityCards } from "shared/type/types";

// Store
import { observer } from "mobx-react-lite";
import { useStore } from "entities/Task/model/context";

// Images
import notaskImg from "shared/assets/img/notask.png";
import searchImg from "shared/assets/img/search.png";

// Ui
import { Title } from "shared/ui/title";
import { Plug } from "shared/ui/plug";
import { Task } from "entities/Task/ui/Task";
// import { Button } from "shared/ui/button";

// Features
import { SortingTasks } from "features/sortTask/ui/SortingTasks";
import { SearchTasks } from "features/searchTask/ui/SearchTasks";
import { ChangeViewTask } from "features/changeViewTask";
import { FilterDate, FilterPriority } from "features/filterTask";

const Tasks: FC<{
  tasks: TaskType[];
  onSearch(e: React.ChangeEvent<HTMLInputElement>): void;
  tasks_template: TaskTemplate;
  task_quantity: TaskQuantityCards;
}> = observer(({ tasks, onSearch, tasks_template, task_quantity }) => {
  // const TaskStore = useStore();

  // const resetFilters = () => {
  //   TaskStore.filter.filter.filterPriority = [];
  //   TaskStore.filter.filter.filterDate = {};
  // };

  return (
    <>
      <div className="flex gap-8">
        <div className="w-1/5">
          <Title titleName="Фильтры" fontSize="text-2xl" />

          <div className="mb-6 rounded-lg p-6 shadow-xl">
            <div className="mb-5">
              <Title titleName="По приоритету" fontSize="text-base" />
              <FilterPriority />
            </div>

            <div className="mb-5">
              <Title titleName="По дате создания" fontSize="text-base" />
              <FilterDate typeDateFilter="created" />
            </div>

            <div className="mb-5">
              <Title titleName="По дате изменения" fontSize="text-base" />
              <FilterDate typeDateFilter="updated" />
            </div>

            <div className="mb-5">
              <Title titleName="По сроку завершения" fontSize="text-base" />
              <FilterDate typeDateFilter="deadline" />
            </div>
            {/* <div>
              <Button onClick={resetFilters} name="Сбросить фильтры" />
            </div> */}
          </div>
        </div>

        <div className="w-4/5">
          {/* Заголовок */}
          <Title titleName="Задачи" fontSize="text-2xl" />

          <div className="flex flex-row justify-between">
            <div className="flex">
              <SearchTasks onSearch={onSearch} />
            </div>

            <div className="flex items-start">
              {/* Смена вида карточек */}
              <div className="mr-2">
                <ChangeViewTask />
              </div>
              {/* Сортировка */}
              <div>
                <SortingTasks />
              </div>
            </div>
          </div>

          {/* Задачи */}
          {tasks.length ? (
            <div
              className={classNames("mt-6", {
                "grid gap-x-6": tasks_template == "card",
                "grid-cols-3":
                  tasks_template == "card" && task_quantity == "3-cards",
                "grid-cols-4":
                  tasks_template == "card" && task_quantity == "4-cards",
                "grid-cols-5":
                  tasks_template == "card" && task_quantity == "5-cards",
              })}
            >
              {tasks.map((el) => (
                <Task
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  checked_task={el.checked}
                  priority={el.priority}
                  createDate={el.createDate}
                  finishDate={el.finishedDate}
                  lastEditDate={el.lastEditDate}
                  deadline={el.deadline}
                />
              ))}
            </div>
          ) : (
            <Plug text="Упс... Задачи не найдены!" img={searchImg} />
          )}
        </div>
      </div>
    </>
  );
});

export const ViewTasksWidget = observer(() => {
  const TaskStore = useStore();

  return TaskStore.tasks.length ? (
    <Tasks
      onSearch={(e) => {
        TaskStore.setSearch(e.target.value);
      }}
      tasks={TaskStore.tasks_output}
      tasks_template={TaskStore.tasks_view.tasks_template}
      task_quantity={TaskStore.tasks_view.tasks_cards_quan}
    />
  ) : (
    <Plug text="Список задач пустой, время выпить кофе!" img={notaskImg} />
  );
});
