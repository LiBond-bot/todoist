import { observer } from "mobx-react-lite";
import { useStore } from "entities/Task/model/context";

import { SelectType } from "shared/type/types";

// Components
import { InputText } from "shared/ui/formElements";
import { Button } from "shared/ui/button";
import { Select } from "shared/ui/formElements";

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

  const sendTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) return;
    if (typeof priority === "undefined") return;
    TaskStore.CreateTask(name, priority);
    setName(undefined);
    setPriority(undefined);
  };

  return (
    <div className="flex py-6">
      <form className="flex w-full" onSubmit={sendTask}>
        <InputText
          onChange={(e) => {
            setName(e?.target?.value);
          }}
          name="task"
          placeholder="Напишите название задачи"
        />
        <Select
          id="SelectPriority"
          data={dataPriority}
          onChange={(e) => {
            setPriority(Number(e?.target?.value));
          }}
          addClasses="mr-6 shadow-xl px-4 py-4 bg-white placeholder-slate-400 focus:outline-none focus:border-indigo-800 focus:ring-indigo-800 block rounded-md sm:text-sm focus:ring-2"
        />

        <Button name="Добавить задачу" />
      </form>
    </div>
  );
});
