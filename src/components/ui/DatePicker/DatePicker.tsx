"use client";
import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../Button/button";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/popover";
import { Calendar } from "../Calendar/calendar";

type DatePickerProps = {
  placeholder: string;
  variant?: "smallest" | "default";
  selected?: string;
  onSelect?: (date: string) => void;
};

export default function DatePicker({ placeholder, variant, selected, onSelect }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selected ? parseISO(selected) : undefined);
  React.useEffect(() => {
    if (selected) {
      setDate(parseISO(selected));
    } else {
      setDate(undefined);
    }
  }, [selected]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onSelect && selectedDate) {
      onSelect(selectedDate.toISOString());
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <Popover>
      <PopoverTrigger
        className='px-4'
        asChild>
        <Button
          variant={"date"}
          className={cn(
            "w-full h-full justify-start text-left font-normal relative ",
            !date && "text-muted-foreground",
          )}>
          <CalendarIcon
            className={`mr-[5px] ${variant === "smallest" ? "h-6 w-5" : "h-7 w-6"} ${
              date === undefined ? "" : "hidden"
            } text-[#AAAAAA] absolute right-0`}
          />
          {date ? format(date, "PPP") : <span className='text-[#969696] text-base'>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={handleSelect}
          fromDate={tomorrow}
          modifiers={{ disabled: { before: tomorrow } }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
