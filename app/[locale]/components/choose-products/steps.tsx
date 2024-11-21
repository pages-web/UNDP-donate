"use client";
import { useAtom, useAtomValue } from "jotai";
import { Button } from "../ui/button";
import { donateItemAtom, donateViewAtom } from "@/store/donate.store";
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
    <div className="flex gap-2">
      <Button
        size="sm"
        variant={view === "" ? "default" : "outline"}
        className="h-4 w-4 px-0 rounded-full"
        onClick={() => setView("")}
        disabled={!!detail?.paidDate}
      />
      <Button
        size="sm"
        variant={view === "info" ? "default" : "outline"}
        className="h-4 w-4 px-0 rounded-full"
        onClick={() => validateProduct(() => setView("info"))}
        disabled={!!detail?.paidDate}
      />
      <Button
        size="sm"
        variant={view === "payment" ? "default" : "outline"}
        className="h-4 w-4 px-0 rounded-full"
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
      <Button
        size="sm"
        variant={view === "success" ? "default" : "outline"}
        className="h-4 w-4 px-0 rounded-full"
      />
    </div>
  );
};

export default Steps;
