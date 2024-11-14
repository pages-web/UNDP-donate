import { memo } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../app/[locale]/components/ui/button";
import Image from "../../app/[locale]/components/ui/image";
import { RadioGroupItem } from "../../app/[locale]/components/ui/radio-group";
import React from "react";

export interface IPaymentOption {
  _id: string;
  name: string;
  kind: string;
}

interface PaymentTypeProps extends IPaymentOption {
  selected: boolean;
}

const PaymentType = ({ selected, _id, kind }: PaymentTypeProps) => {
  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          "h-auto items-center pt-5 pb-4 pl-6 gap-4 group rounded-2xl w-full border border-border/50 shadow-md ease-in duration-100 transition-colors relative",
          selected && "bg-primary/10 hover:bg-primary/10 border-primary"
        )}
        asChild
      >
        <div>
          <RadioGroupItem
            value={_id}
            id={_id}
            className={cn(
              "absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6",
              selected && "border-primary"
            )}
          />

          <div className="flex-auto text-left">
            <div className={"font-medium capitalize text-black"}>{kind}</div>
          </div>
          <label
            className={cn("absolute inset-0 rounded-2xl cursor-pointer")}
            htmlFor={_id}
          />
        </div>
      </Button>
    </div>
  );
};

export default memo(PaymentType);
