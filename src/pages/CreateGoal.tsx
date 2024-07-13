import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { closeModal } from "../store/modals/modalReducer";
import GoalsInputs from "../components/sections/GoalsInputs/GoalsInputs";
import TasksList from "../components/sections/Tasks/TasksList/TasksList";
import { Button } from "../components/ui/Button/button";
import { Goal, Task } from "../store/goals/goals.interface";
import { addGoal } from "../store/goals/goalsSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGoal() {
  const navigate = useNavigate();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();
  const [goalData, setGoalData] = useState<Partial<Goal>>({});
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isWarning, setIsWarinig] = useState<boolean>(false);

  const handleGoalDataChange = (data: Partial<Goal>) => {
    setGoalData((prevData) => ({ ...prevData, ...data }));
  };

  const handleTasksChange = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const handleCreateGoal = () => {
    if (!goalData.title || !goalData.date || !goalData.imageUrl || !goalData.category) {
      setIsWarinig(true);
      return;
    }
    const newGoal: Goal = {
      id: Date.now(),
      title: goalData.title || "",
      date: goalData.date || "",
      motivation: goalData.motivation || "",
      category: goalData.category || "",
      imageUrl: goalData.imageUrl || "",
      tasks: tasks,
      archived: false,
    };
    setIsWarinig(false);
    dispatch(addGoal(newGoal));
    dispatch(closeModal());
    navigate("/");
  };

  return (
    <div className={`${isOpen && "overflow-x-hidden"}`}>
      <div className={`absolute top-0 left-0 min-w-[100%] min-h-[100%] z-10  py-5 px-10 bg-white pb-7`}>
        <GoalsInputs onGoalDataChange={handleGoalDataChange} />
        <TasksList onTasksChange={handleTasksChange} />
        {isWarning ? <div className='text-red-600 font-bold text-xl mb-3'>something blank</div> : ""}
        <Button
          onClick={handleCreateGoal}
          variant={"create"}>
          Create a goal
        </Button>
      </div>
    </div>
  );
}
