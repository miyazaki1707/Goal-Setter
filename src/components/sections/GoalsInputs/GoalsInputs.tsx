import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/modals/modalReducer";
import Input from "../../ui/Input/Input";
import DatePicker from "../../ui/DatePicker/DatePicker";
import { Goal } from "../../../store/goals/goals.interface";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/Select/select";
import { RootState } from "../../../store/store";
import { IFilter } from "../../../store/filters/filtersSlice";

type Props = {
  onGoalDataChange: (data: Partial<Goal>) => void;
};

export default function GoalsInputs({ onGoalDataChange }: Props) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string>("");
  const [goalName, setGoalName] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [motivation, setMotivation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const filters = useSelector((state: RootState) => state.filters.filters);

  useEffect(() => {
    onGoalDataChange({ title: goalName, date: dueDate, motivation, imageUrl: preview, category: category });
  }, [goalName, dueDate, motivation, preview, category]);

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

  return (
    <div>
      <div className='flex items-center mb-4'>
        <Link to={"/"}>
          <svg
            onClick={() => dispatch(closeModal())}
            className='-ml-6 cursor-pointer'
            width='25'
            height='25'
            viewBox='0 0 25 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6.00089 13.8376L14.3682 22.2132L12.5082 24.0911L0.90889 12.4918L12.5262 0.900665L14.3944 2.78682L6.00089 11.1803H24.0993V13.8376H6.00089Z'
              fill='#494949'
            />
          </svg>
        </Link>
        <p className='ml-3 text-[28px] leading-8'>Create a goal</p>
      </div>
      <div className='mb-4'>
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
        <Select
          onOpenChange={setIsSelectOpen}
          onValueChange={setCategory}>
          <SelectTrigger className='w-full bg-[#FAFAFA] border-[2px] focus:outline-none border-[#EBEBEB] rounded-xl '>
            <SelectValue placeholder='Select a category' />
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
      {isSelectOpen && <div className='fixed inset-0 z-10 bg-transparent' />}
    </div>
  );
}
