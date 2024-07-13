import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";
type Props = {
  name: string;
  payload: string;
  isItOngoing: boolean;
  roundClick: () => void;
  starClick: () => void;
  id: number;
  preview?: boolean;
  onClick?: () => void;
};

export default function TaskCard({ name, payload, isItOngoing, roundClick, starClick, preview, onClick }: Props) {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const [isRemoving, setIsRemoving] = useState(false);

  const handleClick = () => {
    setIsRemoving(true);
    api.start({
      from: { x: 0 },
      to: { x: 300 },
    });
  };

  useEffect(() => {
    if (isRemoving) {
      const timer = setTimeout(() => {
        roundClick();
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [isRemoving, roundClick]);
  return (
    <animated.div
      className='max-w-[400px] min-h-[48px] break-all text-[#969696] text-base flex  items-center py-4 px-4 rounded-md shadow-md'
      style={{ ...springs }}>
      <div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
            // roundClick();
          }}
          className='w-8 h-8 border-[3px] border-[#2C66BC] rounded-full mr-3 cursor-pointer'></div>
      </div>
      <div
        onClick={onClick ? () => onClick : () => {}}
        className='w-full flex flex-col justify-start items-start'>
        <p className={`${preview ? "text-[16px]" : "text-[14px] pb-1"} text-[#494949] `}>{name}</p>
        <p className={`${preview ? "text-[14px]" : "text-[16px]"} text-[#969696]`}>{payload}</p>
      </div>
      <div className='w-full flex justify-end'>
        <svg
          onClick={(e) => {
            e.stopPropagation();
            starClick();
          }}
          className='max-w-[28px] max-h-[28px] w-[100%] h-[100%] ml-4 cursor-pointer'
          viewBox='0 0 37 37'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M20.2868 1.9187L24.4599 10.3745C24.7501 10.9626 25.3112 11.3701 25.9603 11.4643L35.2921 12.8203C36.9268 13.0581 37.5789 15.0663 36.3965 16.2186L29.6441 22.8005C29.1748 23.2581 28.9603 23.918 29.0714 24.564L30.6652 33.858C30.9446 35.4857 29.2358 36.7268 27.774 35.9589L19.4278 31.5712C18.8474 31.2663 18.1535 31.2663 17.5732 31.5712L9.22693 35.9589C7.76514 36.7276 6.05638 35.4857 6.33577 33.858L7.92953 24.564C8.04067 23.918 7.82611 23.2581 7.35686 22.8005L0.604397 16.2186C-0.577998 15.0655 0.0741716 13.0573 1.70884 12.8203L11.0407 11.4643C11.6897 11.3701 12.2508 10.9626 12.541 10.3745L16.7141 1.9187C17.4443 0.437622 19.5559 0.437622 20.2868 1.9187Z'
            fill={`#${isItOngoing ? "2C66BC" : "D7D6D6"}`}
          />
        </svg>
      </div>
    </animated.div>
  );
}
