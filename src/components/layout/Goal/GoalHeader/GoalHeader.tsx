import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../../../ui/MenuBar/menubar";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../../../../store/goals/goalsSlice";

type Props = {
  activeTab: string;
  setTab: (e: string) => void;
};

export default function GoalHeader({ activeTab, setTab }: Props) {
  const location = useLocation();
  const { goal } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickToComplete = () => {
    dispatch(deleteGoal({ goalId: goal.id }));
    navigate("/");
  };
  const back = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <button onClick={() => back()}>
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
        </button>
        {!goal.archived ? (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className='cursor-pointer'>
                <svg
                  width='6'
                  height='20'
                  viewBox='0 0 6 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M3 20C2.3125 20 1.72396 19.7552 1.23438 19.2656C0.744792 18.776 0.5 18.1875 0.5 17.5C0.5 16.8125 0.744792 16.224 1.23438 15.7344C1.72396 15.2448 2.3125 15 3 15C3.6875 15 4.27604 15.2448 4.76562 15.7344C5.25521 16.224 5.5 16.8125 5.5 17.5C5.5 18.1875 5.25521 18.776 4.76562 19.2656C4.27604 19.7552 3.6875 20 3 20ZM3 12.5C2.3125 12.5 1.72396 12.2552 1.23438 11.7656C0.744792 11.276 0.5 10.6875 0.5 10C0.5 9.3125 0.744792 8.72396 1.23438 8.23438C1.72396 7.74479 2.3125 7.5 3 7.5C3.6875 7.5 4.27604 7.74479 4.76562 8.23438C5.25521 8.72396 5.5 9.3125 5.5 10C5.5 10.6875 5.25521 11.276 4.76562 11.7656C4.27604 12.2552 3.6875 12.5 3 12.5ZM3 5C2.3125 5 1.72396 4.75521 1.23438 4.26563C0.744792 3.77604 0.5 3.1875 0.5 2.5C0.5 1.8125 0.744792 1.22396 1.23438 0.734375C1.72396 0.244792 2.3125 0 3 0C3.6875 0 4.27604 0.244792 4.76562 0.734375C5.25521 1.22396 5.5 1.8125 5.5 2.5C5.5 3.1875 5.25521 3.77604 4.76562 4.26563C4.27604 4.75521 3.6875 5 3 5Z'
                    fill='#494949'
                  />
                </svg>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={clickToComplete}>Delete</MenubarItem>
                <MenubarSeparator />
                <Link to={`/goal/${goal.id}/edit`}>
                  <MenubarItem>Edit</MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <></>
        )}
      </div>
      <div className='flex justify-between items-end px-4 font-medium'>
        <div
          onClick={() => setTab("Description")}
          className={`${
            activeTab === "Description" ? "text-[#2C66BC]  border-[#2C66BC]" : "text-[#494949] border-[#FFF]"
          } text-[16px] pb-1 border-b-[2px] cursor-pointer`}>
          Description
        </div>
        <div
          onClick={() => setTab("Tasks")}
          className={` ${
            activeTab === "Tasks" ? "text-[#2C66BC]  border-[#2C66BC]" : "text-[#494949] border-[#FFF]"
          } text-[16px] pb-1 border-b-[2px] cursor-pointer`}>
          Tasks
        </div>
        <div
          onClick={() => setTab("Notes")}
          className={` ${
            activeTab === "Notes" ? "text-[#2C66BC] border-[#2C66BC]" : "text-[#494949] border-[#FFF]"
          } text-[16px] border-b-[2px] pb-1 cursor-pointer`}>
          Notes
        </div>
      </div>
    </div>
  );
}
