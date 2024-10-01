import React, { FC } from "react";

// Store
import { observer } from "mobx-react-lite";

// components
import { InputText } from "shared/ui/formElements";

import { IoMdSearch } from "react-icons/io";
export const SearchTasks: FC<{
  onSearch(e: React.ChangeEvent<HTMLInputElement>): void;
}> = observer(({ onSearch }) => {
  return (
    <>
      <div className="relative">
        <IoMdSearch
          style={{
            marginLeft: "1rem",
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: " translateY(-50%)",
          }}
          size="1.5em"
          className="text-indigo-800"
        />
        <InputText
          name="search"
          placeholder="Поиск задачи"
          onChange={onSearch}
        />
      </div>
    </>
  );
});
