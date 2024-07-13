import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Goal, Task } from "../store/goals/goals.interface";
import TaskCard from "../components/ui/TaskCard/TaskCard";
import { updateTaskStatus } from "../store/goals/goalsSlice";

export default function OngoingPage() {
  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.goals.goals);

  const countIsOngoing = () => {
    let ongoing: number = 0;
    goals.map((item: Goal) => {
      !item.archived &&
        item.tasks &&
        item.tasks.map((task: Task) => {
          if (task.isItOngoing === true && task.complete === false) ongoing += 1;
        });
    });
    return ongoing;
  };

  const starClick = (goalId: number, taskId: number) => {
    dispatch(updateTaskStatus({ goalId, taskId, payload: "isItOngoing" }));
  };

  const roundClick = (goalId: number, taskId: number) => {
    dispatch(updateTaskStatus({ goalId, taskId, payload: "complete" }));
  };

  countIsOngoing();
  return (
    <div className='px-6 pt-4 relative min-h-screen'>
      <h1 className='text-3xl mb-4'>Ongoing</h1>
      {countIsOngoing() == 0 ? (
        <div className='mt-7 flex flex-col justify-center items-center text-center'>
          <svg
            className='max-w-[188px] max-h-[188px] w-[100%] h-[100%] mb-5'
            viewBox='0 0 37 37'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M20.2868 1.9187L24.4599 10.3745C24.7501 10.9626 25.3112 11.3701 25.9603 11.4643L35.2921 12.8203C36.9268 13.0581 37.5789 15.0663 36.3965 16.2186L29.6441 22.8005C29.1748 23.2581 28.9603 23.918 29.0714 24.564L30.6652 33.858C30.9446 35.4857 29.2358 36.7268 27.774 35.9589L19.4278 31.5712C18.8474 31.2663 18.1535 31.2663 17.5732 31.5712L9.22693 35.9589C7.76514 36.7276 6.05638 35.4857 6.33577 33.858L7.92953 24.564C8.04067 23.918 7.82611 23.2581 7.35686 22.8005L0.604397 16.2186C-0.577998 15.0655 0.0741716 13.0573 1.70884 12.8203L11.0407 11.4643C11.6897 11.3701 12.2508 10.9626 12.541 10.3745L16.7141 1.9187C17.4443 0.437622 19.5559 0.437622 20.2868 1.9187Z'
              fill={`#D7D6D6`}
            />
          </svg>
          <p className='text-[24px] text-[#D7D6D6]'>
            You can <b> mark</b> your tasks and they will appear here.
          </p>
        </div>
      ) : (
        <>
          {goals.map((goal: Goal) => {
            if (!goal.archived)
              return (
                <div key={goal.id}>
                  {goal.tasks?.map((task: Task) => {
                    if (task.isItOngoing === true)
                      return (
                        <TaskCard
                          key={task.id}
                          starClick={() => starClick(goal.id, task.id)}
                          roundClick={() => roundClick(goal.id, task.id)}
                          payload={task.title}
                          name={goal.title}
                          isItOngoing={task.isItOngoing}
                          id={goal.id}
                        />
                      );
                  })}
                </div>
              );
          })}
        </>
      )}
    </div>
  );
}
