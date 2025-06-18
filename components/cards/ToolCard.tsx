import { proxyImage } from "@/lib/proxyImage";
import type { ToolChild } from "@/types";

type Props = {
  item: ToolChild;
};
const ToolCard = ({ item }: Props) => {
  return (
    <a
      href={item.link}
      className="group relative w-full h-full overflow-hidden p-5 pb-8 rounded-3xl text-center flex flex-col justify-between items-center gap-12 border border-blue-200 transition-all duration-300 ease-out select-none"
    >
      <h3 className="font-bold text-lg group-hover:text-blue-main">
        {item.name}
      </h3>
      <img
        src={proxyImage(item.icon)}
        width={64}
        height={64}
        alt={`Tool icon - ${item.name}`}
        className="size-16 group-hover:scale-120 transition-all origin-bottom duration-300 ease-out"
        loading="lazy"
      />
      <div className="absolute -z-1 bg-blue-100 h-full aspect-square rounded-full bottom-0 left-1/2 translate-y-[calc(50%-1.25rem)] -translate-x-1/2 group-hover:h-[200%] transition-[height] duration-300 ease-in-out pointer-events-none"></div>
    </a>
  );
};

export default ToolCard;
