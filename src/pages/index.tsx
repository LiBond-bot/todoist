// Виджеты
import { CreateTaskWidget } from "widgets/createTask";
import { ViewTasksWidget } from "widgets/viewTasks/";

// Компоненты
import { Layout } from "shared/ui/layout";
import { Header } from "widgets/header";

const MainPage = () => {
  return (
    <Layout>
      {/* Шапка */}
      <Header title="ToDo List" subtitle="Создай свою задачу" />

      {/* Виджет создания заметки */}
      <CreateTaskWidget />

      {/* Виджет отображения всех заметок */}
      <ViewTasksWidget />
    </Layout>
  );
};

export default MainPage;
