// Store
import { observer } from "mobx-react-lite";
import { useStore } from "entities/Task/model/context";

// Config
import config from "shared/config/config.json";

// UI
import { Checkbox } from "shared/ui/formElements/ui/checkbox";

export const FilterPriority = observer(() => {
  const priorities = config.priorityConfig;

  const TaskStore = useStore();

  const getFilterPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (TaskStore.filter.filter.field != "priority") {
      TaskStore.setFilterType("priority");
    }

    const value = Number(e.currentTarget.value) as 0 | 1 | 2;

    if (e.currentTarget.checked === false) {
      TaskStore.deleteFilterPriority(value);
    }

    if (e.currentTarget.checked === true) {
      TaskStore.setFilterPriority(value);
    }
  };

  return (
    <>
      <div>
        {priorities.map((el, key) => (
          <div key={key} className="mb-1 flex">
            <Checkbox
              name={el.idPriority.toString()}
              value={el.idPriority.toString()}
              onChange={getFilterPriority}
            />
            <label htmlFor={el.idPriority.toString()}>{el.namePriority}</label>
          </div>
        ))}
      </div>
    </>
  );
});
