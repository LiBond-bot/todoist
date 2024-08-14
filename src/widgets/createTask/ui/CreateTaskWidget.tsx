// Ui
import { CreateTask } from "features/createTask/";
import { Title } from "shared/ui/title";

export const CreateTaskWidget = () => {
  return (
    <div className="pb-6">
      <Title titleName="Создать задачу" fontSize="text-2xl" />
      <CreateTask />
    </div>
  );
};

export default CreateTaskWidget;
