import { observer } from "mobx-react-lite";
import { useStore } from "entities/Task/model/context";

// Components
import { InputText } from "shared/ui/formElements";
import { Button } from "shared/ui/button";
import { Select } from "shared/ui/formElements";
import { CustomDatePicker } from "shared/ui/dataPicker/index";

// Config
import config from "shared/config/config.json";
import { useState } from "react";

export const CreateTask = observer(() => {
  const TaskStore = useStore();

  const dataPriority = config.priorityConfig.map((priority) => ({
    value: priority.idPriority.toString(),
    name: priority.namePriority + " приоритет",
  }));

  const [name, setName] = useState<string | undefined>();
  const [priority, setPriority] = useState<number | undefined>(
    Number(dataPriority[0].value),
  );
  const [deadline, setDeadline] = useState(null);

  const sendTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) return;
    if (typeof priority === "undefined") return;
    TaskStore.CreateTask(name, priority, deadline);
    setDeadline(null);
    setName(undefined);
    setPriority(undefined);
  };

  return (
    <div className="flex">
      <form className="flex w-full gap-5" onSubmit={sendTask}>
        <div className="w-3/4">
          <InputText
            onChange={(e) => {
              setName(e?.target?.value);
            }}
            name="task"
            placeholder="Напишите название задачи"
          />
        </div>
        <div className="w-1/5">
          <CustomDatePicker
            selectDate={deadline ? deadline : null}
            callback={setDeadline as (e: Date | null) => void}
            placeholder="Срок завершения задачи"
          />
        </div>
        <div className="w-1/6">
          <Select
            id="SelectPriority"
            data={dataPriority}
            onChange={(e) => {
              setPriority(Number(e?.target?.value));
            }}
            addClasses="mr-6 shadow-xl px-4 py-3.5 bg-white focus:outline-none focus:border-indigo-800 focus:ring-indigo-800 block rounded-md focus:ring-2"
          />
        </div>

        <div className="w-1/6">
          <Button name="Добавить задачу" />
        </div>
      </form>
    </div>
  );
});
