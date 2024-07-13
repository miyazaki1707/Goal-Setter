import { useEffect, useState } from "react";
import { Button } from "../../../ui/Button/button";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../store/modals/modalReducer";
import TaskModal from "../../../modals/CreateModal/CreateModal";
import { Task } from "../../../../store/goals/goals.interface";

type Props = {
  onTasksChange: (tasks: Task[]) => void;
};

export default function TasksList({ onTasksChange }: Props) {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    onTasksChange(tasks);
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };
  const toggleTaskOngoing = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? { ...task, isItOngoing: !task.isItOngoing } : task)),
    );
  };

  return (
    <div className='pb-10'>
      <p>Tasks</p>
      {tasks.map((task: Task, index: number) => (
        <div
          key={index}
          className='max-w-[315px] min-h-[48px] break-all text-[#969696] text-base flex justify-between items-center py-[10px] px-4 rounded-md shadow-md'>
          <p>{task.title}</p>
          <svg
            onClick={() => toggleTaskOngoing(index)}
            className='max-w-[28px] max-h-[28px] w-[100%] h-[100%] ml-4'
            viewBox='0 0 37 37'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M20.2868 1.9187L24.4599 10.3745C24.7501 10.9626 25.3112 11.3701 25.9603 11.4643L35.2921 12.8203C36.9268 13.0581 37.5789 15.0663 36.3965 16.2186L29.6441 22.8005C29.1748 23.2581 28.9603 23.918 29.0714 24.564L30.6652 33.858C30.9446 35.4857 29.2358 36.7268 27.774 35.9589L19.4278 31.5712C18.8474 31.2663 18.1535 31.2663 17.5732 31.5712L9.22693 35.9589C7.76514 36.7276 6.05638 35.4857 6.33577 33.858L7.92953 24.564C8.04067 23.918 7.82611 23.2581 7.35686 22.8005L0.604397 16.2186C-0.577998 15.0655 0.0741716 13.0573 1.70884 12.8203L11.0407 11.4643C11.6897 11.3701 12.2508 10.9626 12.541 10.3745L16.7141 1.9187C17.4443 0.437622 19.5559 0.437622 20.2868 1.9187Z'
              fill={`#${task.isItOngoing === true ? "2C66BC" : "D7D6D6"}`}
            />
          </svg>
        </div>
      ))}
      <Button
        onClick={() => dispatch(openModal())}
        className='w-[100%] font-normal mt-4'
        variant={"ghost"}>
        Add a new task
      </Button>
      <TaskModal
        title='Task name'
        buttonName='Add Task'
        onAddTask={addTask}
        item='task'
        type='create'
      />
    </div>
  );
}
