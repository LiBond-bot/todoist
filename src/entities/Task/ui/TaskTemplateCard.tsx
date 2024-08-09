import React, { FC } from "react";
import classNames from "classnames";

import { useStore } from "entities/Task/model/context";
import { observer } from "mobx-react-lite";

// Types
import { TaskType } from "shared/type/types";

// Icons
import { RiDeleteBin6Line } from "react-icons/ri";

// helpers
import { dateConversion } from "shared/helpers/dateConversion";

// Ui
import { TaskPriority } from "./TaskPriority";
import { Checkbox } from "shared/ui/formElements/ui/checkbox";

// Config
import config from "shared/config/config.json";

export const TaskTemplateCard: FC<{
  id: TaskType["id"];
  name: TaskType["name"];
  checked_task: TaskType["checked"];
  priority: TaskType["priority"];
  createDate: TaskType["createDate"];
  finishDate: TaskType["lastEditDate"];
  lastEditDate: TaskType["finishedDate"];
  activeEditPriority: boolean;
  TrackingValue: React.ChangeEventHandler<HTMLInputElement>;
  onChecked: (e: React.MouseEvent<HTMLElement>) => void;
  onDelete: () => void;
  editPriority: (e: React.MouseEvent<HTMLElement>) => void;
  setEditPriority(e: React.MouseEvent<HTMLElement>): void;
}> = observer(
  ({
    name,
    checked_task,
    priority,
    createDate,
    /*finishDate, lastEditDate,*/ TrackingValue,
    onChecked,
    onDelete,
    editPriority,
    activeEditPriority,
    setEditPriority,
  }) => {
    // Конвертирование дат
    // let finishedDateConvert;
    // let lastEditDateConvert;

    const createDateConvert = dateConversion(createDate);
    // if(finishDate){ finishedDateConvert = dateConversion(finishDate)}
    // if(lastEditDate){ lastEditDateConvert = dateConversion(lastEditDate)}

    const TaskStore = useStore();
    const countCards = TaskStore.tasks_view.tasks_cards_quan;

    const Colors = {
      green: "border-green-600",
      red: "border-red-600",
      yellow: "border-amber-600",
    };

    type ColorsKey = keyof typeof Colors;

    let color: ColorsKey = "green";

    const priorities = config.priorityConfig;

    priorities.map((el) => {
      if (priority == el.idPriority) {
        color = el.color as ColorsKey;
      }
    });

    return (
      <>
        <div
          className={classNames("mb-6 rounded-lg p-6 shadow-xl", {
            "opacity-50": checked_task == true,
          })}
        >
          <div className="flex flex-col">
            <div className="flex-column mb-3 flex w-full justify-between">
              <div className="flex flex-1 items-center">
                <Checkbox
                  name="todo_done"
                  addClass={`${Colors[color]}`}
                  checked={checked_task ? true : false}
                  onClick={onChecked}
                />

                <input
                  type="text"
                  className={classNames(
                    "w-full border-transparent bg-transparent p-0 text-lg font-bold focus:border-transparent focus:ring-0",
                    {
                      "line-through": checked_task == true,
                    },
                  )}
                  value={name}
                  onChange={TrackingValue}
                />
              </div>

              <div
                className="cursor-pointer rounded-md p-1.5 text-2xl hover:bg-indigo-50"
                onClick={onDelete}
              >
                <RiDeleteBin6Line />
              </div>
            </div>
            <div
              className={classNames("flex justify-between", {
                "flex-col items-end": countCards != "3-cards",
                "items-center": countCards == "3-cards",
              })}
            >
              <div
                className={classNames(
                  "flex w-max gap-3 rounded-md bg-indigo-50 px-2 py-0.5",
                  {
                    "order-2": countCards != "3-cards",
                  },
                )}
              >
                <div className="text-sm">
                  <b>Создана:</b> {createDateConvert}
                </div>

                {/* {lastEditDate && <div className='text-sm'>Изменена: {lastEditDateConvert}</div>} */}

                {/* {finishDate && <div className='text-sm'>Завершена: {finishedDateConvert}</div>} */}
              </div>

              <div
                className={classNames("ml-4 flex flex-row items-center", {
                  "order-1 mb-3": countCards != "3-cards",
                })}
              >
                <TaskPriority
                  priority={priority}
                  activeNamePriority={false}
                  editPriority={editPriority}
                  activeEditPriority={activeEditPriority}
                  setEditPriority={setEditPriority}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);
