import { Progress } from "../../../ui/Progress/Progress";
import { Goal, Task } from "../../../../store/goals/goals.interface";
import { Link } from "react-router-dom";

type Props = {
  goals: () => Goal[] | Goal[];
  archived: boolean;
};

export default function GoalPreview({ goals, archived }: Props) {
  const remainingDays = (isoDateString: string) => {
    const differenceInMilliseconds = new Date(isoDateString).getTime() - new Date().getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));
    if (differenceInDays <= 1 && differenceInDays > 0) return "today";
    if (differenceInDays < 0) return "less";
    return differenceInDays > 1 ? differenceInDays + " days" : differenceInDays + " day ";
  };
  const parseDate = (date: string) => {
    let [year, month, day] = date.slice(0, date.indexOf("T")).split("-");
    const dateObj = new Date(date);
    month = dateObj.toLocaleString("en", { month: "long" });
    return { day, month, year };
  };

  const getTaskProgress = (tasks: Task[]) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.complete).length;
    return Math.floor((completedTasks / tasks.length) * 100);
  };

  return (
    <div className='pb-14'>
      {goals().map((item) => {
        if (archived) {
          if (item.archived) {
            return (
              <Link
                to={`/goal/${item.id}`}
                state={{ goal: item }}
                key={item.id}
                className='flex mb-7 w-full cursor-pointer break-all'>
                <img
                  className='max-w-[106px] w-full h-[114px] rounded-xl mr-3'
                  src={item.imageUrl}
                  alt=''
                />
                <div className='w-full mt-2'>
                  <div className='mb-8'>
                    <p className='text-[#494949] text-[16px]'>{item.title}</p>
                    <p
                      className={`text-[14px] mt-2  ${
                        remainingDays(item.date) !== "less" ? "text-[#AAAAAA]" : "text-red-700"
                      }`}>
                      {remainingDays(item.date) !== "less"
                        ? remainingDays(item.date)
                        : `${parseDate(item.date).day} ${parseDate(item.date).month}`}
                    </p>
                  </div>
                  <div className='w-max-[189px] w-full'>
                    <Progress value={item.tasks && item.tasks?.length > 0 ? getTaskProgress(item.tasks) : 100} />
                  </div>
                </div>
              </Link>
            );
          }
        } else {
          if (!item.archived) {
            return (
              <Link
                to={`/goal/${item.id}`}
                state={{ goal: item }}
                key={item.id}
                className='flex mb-7 w-full cursor-pointer break-all'>
                <img
                  className='max-w-[106px] w-full h-[114px] rounded-xl mr-3'
                  src={item.imageUrl}
                  alt=''
                />
                <div className='w-full mt-2'>
                  <div className='mb-8'>
                    <p className='text-[#494949] text-[16px]'>{item.title}</p>
                    <p className='text-[14px] mt-2 text-[#AAAAAA]'>{remainingDays(item.date)}</p>
                  </div>
                  <div className='w-max-[189px] w-full'>
                    <Progress value={item.tasks && item.tasks?.length > 0 ? getTaskProgress(item.tasks) : 100} />
                  </div>
                </div>
              </Link>
            );
          }
        }
        return null;
      })}
    </div>
  );
}
