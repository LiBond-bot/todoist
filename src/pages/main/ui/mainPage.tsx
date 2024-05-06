import React from 'react';

// Виджеты
import CreateTaskWidget from '../../../widgets/createTask/ui/CreateTaskWidget';
import { ViewTasksWidget } from '../../../widgets/viewTasks/ui/viewTasksWidget';

// Компоненты
import { Layout } from '../../../shared/ui/layout';
import { Header } from '../../../widgets/header';


export const MainPage = () => {

    return (
        <Layout>
      
            {/* Шапка */}
            <Header title="ToDo List" subtitle="Создай свою задачу"/>
            
            {/* Виджет создания заметки */}
            <CreateTaskWidget />

            {/* Виджет отображения всех заметок */}
            <ViewTasksWidget />

        </Layout>
    );
}

