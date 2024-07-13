import { useLocation, useNavigate } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../components/ui/MenuBar/menubar";
import { useDispatch, useSelector } from "react-redux";
import { completeGoal, editGoal } from "../store/goals/goalsSlice";
import { useState } from "react";
import { RootState } from "../store/store";
import { Goal } from "../store/goals/goals.interface";
import Input from "../components/ui/Input/Input";
import DatePicker from "../components/ui/DatePicker/DatePicker";
import { Button } from "../components/ui/Button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select/select";
import { IFilter } from "../store/filters/filtersSlice";

export default function GoalEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const goals = useSelector((state: RootState) => state.goals.goals);
  const goal = goals.find((goal: Goal) => goal.id === Number(pathname.split("/")[2]));

  const [preview, setPreview] = useState<string>(goal ? goal.imageUrl : "");
  const [goalName, setGoalName] = useState<string>(goal ? goal.title : "");
  const [dueDate, setDueDate] = useState<string>(goal ? goal.date : "");
  const [motivation, setMotivation] = useState<string>(goal && goal.motivation ? goal.motivation : "");
  const [category, setCategory] = useState<string>(goal ? goal.category : "");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const filters = useSelector((state: RootState) => state.filters.filters);

  const clickToBack = () => {
    navigate(-1);
  };
  const clickToComplete = () => {
    goal && dispatch(completeGoal({ goalId: goal.id }));
    navigate(-1);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditGoal = () => {
    if (goal) {
      dispatch(
        editGoal({
          goalId: goal.id,
          title: goalName,
          date: dueDate,
          motivation: motivation,
          imageUrl: preview,
          category: category,
        }),
      );
      navigate(`/`);
    }
  };
  return (
    <div className='px-6 pt-4 relative'>
      <div className='flex justify-between items-center'>
        <button onClick={() => clickToBack()}>
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
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className='mt-6'>
        <div className='mb-4 max-w-[320px] w-full h-[232px] flex justify-center items-center'>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            id='photo-upload'
            onChange={handleFileChange}
          />
          <label htmlFor='photo-upload'>
            {preview ? (
              <img
                src={preview}
                alt='Preview'
                className='max-w-[320px] w-full h-[232px] flex justify-center items-center rounded-xl'
              />
            ) : (
              <div className='max-w-[320px] w-full h-[232px] flex justify-center items-center flex-col bg-[#EBEBEB] rounded-xl'>
                <svg
                  width='67'
                  height='60'
                  viewBox='0 0 74 67'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M60.7484 20.2904V13.2031H53.6909V7.96453H60.7969V0.847504H66.0448V8.01289H73.1338V13.2516H65.9964V20.2904H60.7484ZM33.3756 54.4123C37.2165 54.4123 40.4355 53.115 43.0325 50.5203C45.6295 47.9256 46.928 44.7128 46.928 40.8819C46.928 37.038 45.6263 33.8145 43.023 31.2113C40.4198 28.608 37.2009 27.3064 33.3662 27.3064C29.4794 27.3064 26.2503 28.606 23.679 31.2053C21.1077 33.8046 19.822 37.0371 19.822 40.9028C19.822 44.7269 21.1103 47.9345 23.6869 50.5256C26.2634 53.1168 29.493 54.4123 33.3756 54.4123ZM33.3535 48.6345C31.1407 48.6345 29.2952 47.8973 27.8171 46.4227C26.3389 44.9483 25.5998 43.1087 25.5998 40.9039C25.5998 38.6471 26.3408 36.7765 27.8226 35.2921C29.3045 33.8077 31.1571 33.0656 33.3806 33.0656C35.5519 33.0656 37.3928 33.7982 38.9032 35.2635C40.4136 36.7288 41.1688 38.5976 41.1688 40.8699C41.1688 43.09 40.4221 44.9391 38.9286 46.4173C37.4351 47.8954 35.5767 48.6345 33.3535 48.6345ZM6.82102 66.9684C5.21966 66.9684 3.81276 66.3622 2.60031 65.1497C1.38781 63.9372 0.781563 62.5303 0.781563 60.929V20.8679C0.781563 19.2803 1.38781 17.8737 2.60031 16.6481C3.81281 15.4226 5.21971 14.8098 6.82102 14.8098H17.7941L23.9032 8.01289H49.0034V17.8906H56.1094V24.9779H65.9871V60.929C65.9871 62.5303 65.3743 63.9372 64.1488 65.1497C62.9232 66.3622 61.5166 66.9684 59.929 66.9684H6.82102Z'
                    fill='#AAAAAA'
                  />
                </svg>
                <p className='pt-4 text-[#AAAAAA]'>Add photo</p>
              </div>
            )}
          </label>
        </div>
        <div className='pb-5'>
          <Input
            value={goalName}
            change={(e) => setGoalName(e.target.value)}
            placeholder='What is your goal?'
            type='text'
            label='Name'
          />
        </div>
        <div className='pb-5'>
          <p className='text-[#494949] mb-2'>Due Date</p>
          <DatePicker
            selected={dueDate}
            onSelect={setDueDate}
            placeholder='Set a due date'
          />
        </div>
        <div className='pb-5'>
          <Input
            placeholder='Why you want to achieve it?'
            type='text'
            label='Motivation'
            value={motivation}
            change={(e) => setMotivation(e.target.value)}
          />
        </div>
        <div className='pb-5'>
          <p className='mb-2'>Category</p>
          {/* <Select>
            <SelectTrigger className='w-full bg-[#FAFAFA] border-[2px] border-[#EBEBEB] rounded-xl '>
              <SelectValue placeholder='Categories' />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter: IFilter) => {
                if (filter.title !== "All") {
                  return (
                    <SelectItem
                      onSelect={() => setCategory(filter.title)}
                      key={filter.id}
                      value={filter.title}>
                      {filter.title}
                    </SelectItem>
                  );
                }
              })}
            </SelectContent>
          </Select> */}
          <Select
            value={category}
            onOpenChange={setIsSelectOpen}
            onValueChange={setCategory}>
            <SelectTrigger className='w-full bg-[#FAFAFA] border-[2px] focus:outline-none border-[#EBEBEB] rounded-xl '>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter: IFilter) => {
                if (filter.title !== "All") {
                  return (
                    <SelectItem
                      value={filter.title}
                      key={filter.id}>
                      {filter.title}
                    </SelectItem>
                  );
                }
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        onClick={handleEditGoal}
        variant={"create"}>
        Edit a goal
      </Button>
      {isSelectOpen && <div className='fixed inset-0 z-10 bg-transparent' />}
    </div>
  );
}
