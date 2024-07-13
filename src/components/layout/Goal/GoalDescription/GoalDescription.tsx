import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../../ui/Button/button";
import { useDispatch } from "react-redux";
import { completeGoal, unarchiveGoal } from "../../../../store/goals/goalsSlice";

type Props = {};

export default function GoalDescription({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { goal } = location.state || {};
  const dispatch = useDispatch();
  const parseDate = (date: string) => {
    let [year, month, day] = date.slice(0, date.indexOf("T")).split("-");
    const dateObj = new Date(date);
    month = dateObj.toLocaleString("en", { month: "long" });
    return { day, month, year };
  };
  const parsedDate = parseDate(goal.date);

  const clickToComplete = () => {
    dispatch(completeGoal({ goalId: goal.id }));
    navigate("/");
  };

  const unarchivedGoal = () => {
    dispatch(unarchiveGoal({ goalId: goal.id }));
    navigate("/");
  };

  return (
    <div className='mt-6 flex flex-col justify-center items-center break-all'>
      <div className='mb-5'>
        <img
          className='max-w-[211px] w-full max-h-[196px] h-full rounded-xl'
          src={goal.imageUrl}
          alt='image'
        />
      </div>
      <div className='text-[16px] w-full px-4'>
        <h1 className='pb-8 font-medium text-[24px] text-center'>{goal.title}</h1>
        {goal.motivation && (
          <div className='flex mb-6'>
            <svg
              className='max-w-6 w-full max-h-6 h-full mr-3'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z'
                fill='#494949'
              />
            </svg>
            {goal.motivation}
          </div>
        )}
        <div className='flex mb-6 items-center'>
          <CalendarIcon className='max-w-6 w-full max-h-6 h-full mr-3' />
          <p>{`${parsedDate.day} ${parsedDate.month} ${parsedDate.year}`}</p>
        </div>
        {goal.category && (
          <div className='flex mb-6 items-center'>
            <svg
              className='max-w-6 w-full max-h-6 h-full mr-3'
              viewBox='0 0 21 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M0.375 17.1667L5.4375 9L0.375 0.833332H13.875C14.25 0.833332 14.6016 0.920832 14.9297 1.09583C15.2578 1.27083 15.525 1.51389 15.7312 1.825L20.625 9L15.7312 16.175C15.525 16.4861 15.2578 16.7292 14.9297 16.9042C14.6016 17.0792 14.25 17.1667 13.875 17.1667H0.375ZM4.48125 14.8333H13.875L17.8687 9L13.875 3.16667H4.48125L8.1375 9L4.48125 14.8333Z'
                fill='#494949'
              />
            </svg>
            <p>{goal.category}</p>
          </div>
        )}
      </div>
      {!goal.archived ? (
        <Button
          onClick={clickToComplete}
          variant={"create"}>
          Complete goal
        </Button>
      ) : (
        <Button
          onClick={unarchivedGoal}
          variant={"create"}>
          Unarchived goal
        </Button>
      )}
    </div>
  );
}
{
}
