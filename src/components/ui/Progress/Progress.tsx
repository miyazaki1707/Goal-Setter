import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../../lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <div className='relative'>
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(" border-dashed  h-[1px] w-full overflow-hidden rounded-full  dark:bg-neutral-800", className)}
      style={{
        backgroundImage: "linear-gradient(to right, #fff 40%, #CBCBCB 40%)",
        backgroundSize: "10px 1px",
        backgroundRepeat: "repeat-x",
      }}
      {...props}>
      <div className='absolute -top-[4px] left-0 w-2 h-2 bg-[#494949] rounded-full'></div>
      <div
        className={`absolute -top-[4px] right-0 w-2 h-2 ${
          value && value === 100 ? "bg-[#494949]" : "bg-[#CBCBCB]"
        }  rounded-full`}></div>
      <div
        className={`absolute h-[15px] w-[2px] -top-[7.5px] bg-[#494949] ${
          (value && value === 100) || value === 0 ? "hidden" : ""
        }`}
        style={{ left: `calc(${value}% )` }}></div>
      <ProgressPrimitive.Indicator
        className='h-full w-full flex-1 bg-[#494949] transition-all dark:bg-neutral-50'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}></ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  </div>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
