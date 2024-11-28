"use client";
import { useAtomValue, useAtom } from "jotai";
import { Button } from "../ui/button";
import { donateViewAtom } from "@/store/donate.store";
import { toast } from "sonner";
import { useDonate, ValidateProduct } from "@/containers/donate/donate";
import { useEffect } from "react";

const Steps = ({
  validateProduct,
}: {
  description?: string;
  validateProduct: ValidateProduct;
}) => {
  const { detail } = useDonate();
  const [view, setView] = useAtom(donateViewAtom);

  useEffect(() => {
    if (detail?.paidDate) {
      setView("success");
    }
  }, [detail?.paidDate]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between px-4 w-full">
        <Button
          size="sm"
          variant={view === "" ? "default" : "outline"}
          className="w-[170px] h-[8px] px-0 rounded-full "
          onClick={() => setView("")}
          disabled={!!detail?.paidDate}
        />
        <Button
          size="sm"
          variant={view === "info" ? "default" : "outline"}
          className="w-[170px] h-[8px] px-0 rounded-full "
          onClick={() => validateProduct(() => setView("info"))}
          disabled={!!detail?.paidDate}
        />
        <Button
          size="sm"
          variant={view === "payment" ? "default" : "outline"}
          className="w-[170px] h-[8px] px-0 rounded-full "
          onClick={() => {
            validateProduct(() => {
              if (!detail?.description) {
                toast.error("Мэдээлэлээ оруулана уу");
                return setView("info");
              }
              setView("payment");
            });
          }}
          disabled={!!detail?.paidDate}
        />
      </div>
    </div>
  );
};

export default Steps;
