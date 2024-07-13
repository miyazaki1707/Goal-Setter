import { Link } from "react-router-dom";
import { Separator } from "../components/ui/Separator/separator";

export default function SettingsPage() {
  return (
    <div className='px-6 pt-4 relative'>
      <div className='text-[32px] leading-[37.5px] mb-6'>Settings</div>
      <div className='pb-2 flex flex-col'>
        <b className='font-medium text-[18px] leading-[21px] '>Archive</b>
        <Link
          to={"/archive"}
          className='text-[#494949] text-[16px] leading-[18.75px] pt-5'>
          Goals archive
        </Link>
      </div>
      <Separator />
      <div className='pt-8 flex flex-col'>
        <b className='font-medium text-[18px] leading-[21px]pb-5'>Support</b>
        <a
          href='mailto:miyazaki1707@gmail.com'
          className='text-[#494949] text-[16px] leading-[18.75px] pt-5 mb-2'>
          Help
        </a>
        <Separator />
        <a
          href='https://t.me/kimdokja1'
          className='text-[#494949] text-[16px] leading-[18.75px] pt-5 mb-2'>
          Contact us
        </a>
        <Separator />
      </div>
    </div>
  );
}
