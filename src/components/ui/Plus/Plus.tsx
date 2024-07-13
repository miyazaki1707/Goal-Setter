import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { openModal } from "../../../store/modals/modalReducer";
// import { RootState } from "../../../store/store"; useSelector

type Props = {
  page?: string;
  modal?: boolean;
  onClick?: () => void;
};

export default function Plus({ page, modal, onClick }: Props) {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const isFooter = ["/", "/ongoing", "/settings"].includes(pathname);
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleModal = (e: any) => {
    if (modal) {
      e.preventDefault();
      dispatch(openModal());
      onClick && onClick();
    } else {
      () => {};
    }
  };
  return (
    <Link to={`/${page}`}>
      <button
        onClick={toggleModal}
        className={`w-[50px] h-[50px] bg-[#2C66BC] rounded-full flex justify-center items-center fixed z-10 right-[20px]  md:bottom-[90px] md:left-[55%] transition-opacity duration-300
          ${!isFooter ? "bottom-10 right-5" : "bottom-20 right-5"}
          ${isVisible ? "" : "hidden"}`}>
        <svg
          width='23'
          height='23'
          viewBox='0 0 29 29'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M14 2L14 27'
            stroke='white'
            strokeWidth='3'
            strokeLinecap='round'
          />
          <path
            d='M2 15H27'
            stroke='white'
            strokeWidth='3'
            strokeLinecap='round'
          />
        </svg>
      </button>
    </Link>
  );
}
