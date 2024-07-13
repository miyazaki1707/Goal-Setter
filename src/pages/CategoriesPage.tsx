import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Plus from "../components/ui/Plus/Plus";
import { Link } from "react-router-dom";
import CreateModal from "../components/modals/CreateModal/CreateModal";
import { IFilter } from "../store/filters/filtersSlice";
import { openModal } from "../store/modals/modalReducer";
import { useState } from "react";

export default function CategoriesPage() {
  const filters = useSelector((state: RootState) => state.filters.filters);
  const [selectedCategory, setSelectedCategory] = useState<IFilter>();
  const [type, setType] = useState<"create" | "add" | "edit">("create");
  const dispatch = useDispatch();

  const handleCategoryClick = (category: IFilter) => {
    setSelectedCategory(category);
    dispatch(openModal());
    setType("edit");
  };
  const plusClick = () => {
    setType("create");
  };
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
        <h1 className='text-3xl '>Categories</h1>
      </div>
      <div className='text-[#494949] text-[20px] leading-[24px]'>
        {filters.map((filter) => {
          if (filter.title !== "All")
            return (
              <div
                onClick={() => handleCategoryClick(filter)}
                key={filter.id}
                className='mb-4 break-all'>
                {filter.title}
              </div>
            );
        })}
      </div>
      <Plus
        modal
        onClick={plusClick}
      />
      <CreateModal
        title={"Category name"}
        filter={selectedCategory}
        buttonName='Create category'
        isDate={false}
        item='filter'
        type={type}
      />
    </div>
  );
}
