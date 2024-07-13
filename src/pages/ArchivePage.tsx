import { Link } from "react-router-dom";
import GoalPreview from "../components/layout/Goal/GoalPreview/GoalPreview";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function ArchivePage() {
  const goals = useSelector((state: RootState) => state.goals.goals);
  // const returnGoals = () => {
  //   return [...goals];
  // };

  return (
    <div className='px-6 pt-4 relative min-h-screen'>
      <div className='flex items-center text-center mb-4'>
        <Link
          to={"/"}
          className='mr-4'>
          <svg
            width='22'
            height='22'
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5.09174 12.216L12.6984 19.8302L11.0075 21.5374L0.462646 10.9925L11.0238 0.45517L12.7222 2.16986L5.09174 9.80029H21.5449V12.216H5.09174Z'
              fill='#494949'
            />
          </svg>
        </Link>
        <h1 className='text-3xl '>Archive</h1>
      </div>
      <GoalPreview
        goals={() => goals}
        archived
      />
    </div>
  );
}
