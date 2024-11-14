import { StarIcon } from "lucide-react";
import { cn } from "../../../../lib/utils";
import React from "react";
const Rate = ({ rate }: { rate: number }) => {
  const intRate = Math.floor(rate);
  return (
    <div className="inline-flex text-neutral-300 gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          strokeWidth={2.5}
          className={cn(
            "h-4 w-4",
            intRate >= i + 1 && "fill-amber-400 text-amber-400"
          )}
        />
      ))}
    </div>
  );
};

export default Rate;
