import { IFilter } from "../../../store/filters/filtersSlice";
import { Carousel, CarouselContent, CarouselItem } from "../Carousel/carousel";

type Props = {
  filters: IFilter[];
  activeFilter: string;
  activateFilter: (e: IFilter) => void;
};

export default function Filters({ filters, activeFilter, activateFilter }: Props) {
  return (
    <Carousel className='flex justify-between font-medium mb-6'>
      <CarouselContent>
        {filters.map((filter, key) => {
          return (
            <CarouselItem
              key={key}
              onClick={() => activateFilter(filter)}
              className={`max-w-[125px] h-full w-full cursor-pointer`}>
              <div
                className={` flex px-[15px] py-[8.5px]  justify-center items-center  ${
                  activeFilter === filter.title ? "text-[#2C66BC]" : "bg-[#2C66BC] text-white"
                } rounded-lg text-sm border-[2px] border-[#2C66BC] whitespace-nowrap overflow-hidden text-ellipsis`}
                style={{ maxWidth: "100%" }}>
                {filter.title}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
