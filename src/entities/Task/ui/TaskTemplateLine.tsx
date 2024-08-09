import React, { FC } from "react";
import classNames from "classnames";

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

export const TaskTemplateLine: FC<{
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
}> = ({
  name,
  checked_task,
  priority,
  createDate,
  /* finishDate, lastEditDate,*/ TrackingValue,
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
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <Checkbox
              name="todo_done"
              addClass={`${Colors[color]}`}
              checked={checked_task ? true : false}
              onClick={onChecked}
            />
            <div>
              <div className="mb-0 font-bold">
                <input
                  type="text"
                  className={classNames(
                    "border-transparent bg-transparent p-0 text-lg focus:border-transparent focus:ring-0",
                    {
                      "line-through": checked_task == true,
                    },
                  )}
                  value={name}
                  onChange={TrackingValue}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex w-max gap-3 rounded-md bg-indigo-50 px-2 py-0.5">
              <div className="text-xs">
                <b>Создана:</b> {createDateConvert}
              </div>
              {/* {lastEditDate && <div className='text-xs'><b>Изменена:</b> {lastEditDateConvert}</div>} */}
              {/* {finishDate && <div className='text-xs'><b>Завершена:</b> {finishedDateConvert}</div>} */}
            </div>

            <div className="relative ml-4 mr-4">
              <TaskPriority
                priority={priority}
                activeNamePriority={true}
                editPriority={editPriority}
                activeEditPriority={activeEditPriority}
                setEditPriority={setEditPriority}
              />
            </div>

            <div
              className="cursor-pointer rounded-md p-1.5 text-2xl hover:bg-indigo-50"
              onClick={onDelete}
            >
              <RiDeleteBin6Line />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
