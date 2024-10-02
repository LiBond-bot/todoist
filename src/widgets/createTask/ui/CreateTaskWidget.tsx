// Ui
import { CreateTask } from "features/createTask/";
import { Title } from "shared/ui/title";

export const CreateTaskWidget = () => {
  return (
    <div className="mb-10 rounded-3xl bg-indigo-50 px-8 pb-8 pt-6">
      <Title titleName="Создать задачу" fontSize="text-2xl" />
      <CreateTask />
    </div>
  );
};

export default CreateTaskWidget;
