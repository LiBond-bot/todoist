import { FC, useEffect, useState } from "react";
import { useStore } from "entities/Task/model/context";

import { observer } from "mobx-react-lite";

import { CustomDatePicker } from "shared/ui/dataPicker/index";

import { filterDateType } from "shared/type/types";

export const FilterDate: FC<{
  typeDateFilter: filterDateType;
}> = observer(({ typeDateFilter }) => {
  const TaskStore = useStore();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [typeDate, setTypeDate] = useState<filterDateType>(false);

  const handlerStartDate = (e: Date | null) => {
    if (e) setStartDate(e);
    setTypeDate(typeDateFilter);
  };

  const handlerEndDate = (e: Date | null) => {
    if (e) setEndDate(e);
    setTypeDate(typeDateFilter);
  };

  useEffect(() => {
    TaskStore.filterDateSet(startDate, endDate, typeDate);
  }, [TaskStore, typeDate, startDate, endDate]);

  return (
    <>
      <div className="flex gap-4">
        <div className="w-1/2">
          <CustomDatePicker
            selectDate={startDate ? startDate : null}
            callback={handlerStartDate as (e: Date | null) => void}
            placeholder="Начало"
          />
        </div>
        <div className="w-1/2">
          <CustomDatePicker
            selectDate={endDate ? endDate : null}
            callback={handlerEndDate as (e: Date | null) => void}
            placeholder="Конец"
          />
        </div>
      </div>
    </>
  );
});
