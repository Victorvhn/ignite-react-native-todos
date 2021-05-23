import React, { useState } from "react";

import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === "") {
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleMarkTaskAsDone(id: number) {
    const taskToUpdateIndex = tasks.findIndex((task) => task.id === id);
    const taskToUpdate = tasks.find((task) => task.id === id);

    const updatedTask = {
      ...taskToUpdate,
      done: !taskToUpdate?.done,
    } as Task;

    tasks.splice(taskToUpdateIndex, 1, updatedTask);

    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks([...updatedTasks]);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}
