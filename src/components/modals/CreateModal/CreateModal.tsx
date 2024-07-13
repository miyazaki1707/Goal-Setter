import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch, useEffect, useRef, useState } from "react";
import Input from "../../ui/Input/Input";
import DatePicker from "../../ui/DatePicker/DatePicker";
import { Button } from "../../ui/Button/button";
import { Task } from "../../../store/goals/goals.interface";
import { addTaskToGoal, deleteTask, editTask } from "../../../store/goals/goalsSlice";
import { useLocation } from "react-router-dom";
import { closeModal } from "../../../store/modals/modalReducer";
import { IFilter, addFilter, deleteFilter, editFilter } from "../../../store/filters/filtersSlice";

interface TaskModalProps {
  onAddTask?: (task: Task) => void;
  title?: string;
  placeholder?: string;
  isDate?: boolean;
  buttonName?: string;
  filter?: IFilter;
  task?: Task;
  item: "filter" | "task";
  type: "create" | "edit" | "add";
  setOnTaskClick?: Dispatch<boolean>;
  setOnFilterClick?: Dispatch<boolean>;
}

export default function CreateModal({
  onAddTask,
  title,
  placeholder,
  buttonName,
  isDate = true,
  filter,
  task,
  type,
  item,
  setOnTaskClick,
  setOnFilterClick,
}: TaskModalProps) {
  const location = useLocation();
  const { goal } = location.state || {};
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>(task ? task?.date : "");
  const [isWarning, setIsWarinig] = useState<boolean>(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (type === "edit") {
        filter && setName(filter.title);
        task && setName(task.title);
        task && setDueDate(task.date);
      } else if (type === "create") {
        setName("");
      }
    }
  }, [isOpen, type, filter, task]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && (containerRef.current as HTMLElement).contains(event.target as Node)) {
        dispatch(closeModal());
        setDueDate("");
        setOnTaskClick && setOnTaskClick(false);
        setOnFilterClick && setOnFilterClick(false);
        if (type === "create" || type === "add") {
          setName("");
          setDueDate("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const createTask = () => {
    if (item === "task" && name !== "" && dueDate !== "") {
      const newTask: Task = { id: Date.now(), title: name, date: dueDate, isItOngoing: false, complete: false };
      onAddTask && onAddTask(newTask);
      type === "add" && dispatch(addTaskToGoal({ goalId: goal.id, task: newTask }));
      dispatch(closeModal());
      setName("");
      setDueDate("");
      setIsWarinig(false);
    } else {
      setIsWarinig(true);
    }
  };

  const actionsWithFilter = () => {
    if (item === "filter" && type === "create") {
      if (name.trim() !== "") {
        dispatch(addFilter({ title: name, id: Date.now() }));
        dispatch(closeModal());
        setName("");
      } else {
        setIsWarinig(true);
      }
    } else if (item === "filter" && type === "edit" && filter) {
      dispatch(editFilter({ id: filter.id, text: name }));
      dispatch(closeModal());
    }
  };

  const onEditTask = () => {
    if (task)
      dispatch(
        editTask({
          goalId: goal.id,
          taskId: task.id,
          title: name,
          date: dueDate,
        }),
      );
  };

  const onClick = () => {
    if (item === "task") {
      if (type === "create" || type === "add") {
        createTask();
      }
      if (type === "edit") {
        onEditTask();
      }
    }
    if (item === "filter") {
      actionsWithFilter();
    }
    setOnTaskClick && setOnTaskClick(false);
    setOnFilterClick && setOnFilterClick(false);
  };

  const clickOnDelete = () => {
    if (type === "create" || type === "add") {
    } else {
      if (item === "task") {
        goal && task && dispatch(deleteTask({ goalId: goal.id, taskId: task.id }));
      } else {
        filter && dispatch(deleteFilter({ filterId: filter.id }));
      }
    }
    setName("");
    setDueDate("");
    dispatch(closeModal());
  };

  return (
    <div>
      {isOpen && (
        <div className='absolute top-0 bg-[#0000004D] w-full left-0 h-full'>
          <div
            ref={containerRef}
            className='w-full h-full z-0'></div>
          <div className='bg-white fixed max-w-[400px] w-full bottom-0 px-7 rounded-3xl border-t-0 z-10'>
            <div className='mt-8'>
              <p className='text-2xl pb-6'>{title}</p>
              <div className='pb-4'>
                <Input
                  type='create'
                  placeholder={placeholder ? placeholder : ""}
                  value={name}
                  change={(e) => setName(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-between mb-4'>
                {isDate && (
                  <div className={`max-w-36 ${dueDate !== "" ? "w-full" : "w-28"} h-[39px] `}>
                    <DatePicker
                      selected={dueDate}
                      variant='smallest'
                      placeholder='Set date'
                      onSelect={setDueDate}
                    />
                  </div>
                )}
                <div
                  className='cursor-pointer bg-[#EBEBEB] p-2 h-[39px] rounded-lg'
                  onClick={() => clickOnDelete()}>
                  <svg
                    width='21'
                    height='25'
                    viewBox='0 0 21 25'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M4.04815 24.1875C3.36241 24.1875 2.77672 23.9446 2.29107 23.459C1.8054 22.9733 1.56256 22.3876 1.56256 21.7019V4.25001H0.187561V2.18755H6.37503V0.971222H14.625V2.18755H20.8125V4.25001H19.4375V21.7019C19.4375 22.3964 19.1969 22.9844 18.7156 23.4656C18.2344 23.9469 17.6465 24.1875 16.9519 24.1875H4.04815ZM17.375 4.25001H3.62503V21.7019C3.62503 21.8253 3.6647 21.9267 3.74403 22.006C3.82337 22.0853 3.92474 22.125 4.04815 22.125H16.9519C17.0577 22.125 17.1547 22.0809 17.2428 21.9928C17.331 21.9046 17.375 21.8077 17.375 21.7019V4.25001ZM6.93035 19.375H8.99282V7.00001H6.93035V19.375ZM12.0072 19.375H14.0697V7.00001H12.0072V19.375Z'
                      fill='#B5B5B5'
                    />
                  </svg>
                </div>
              </div>
              {isWarning ? <div className='text-red-600 font-bold text-xl mb-3'>something blank</div> : ""}
            </div>
            <Button
              className='mb-[18px]'
              variant={"create"}
              onClick={onClick}>
              {buttonName ? buttonName : `${type} ${item}`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}