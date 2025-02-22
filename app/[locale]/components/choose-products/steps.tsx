import { useAtomValue, useAtom } from "jotai";
import { Button } from "../ui/button";
import { donateViewAtom } from "@/store/donate.store";
import { toast } from "sonner";
import { useDonate, ValidateProduct } from "@/containers/donate/donate";
import { useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { CopyIcon } from "lucide-react";

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
      <div className="flex  sm:flex-row justify-between px-4 w-full gap-2 sm:gap-4">
        <Button
          size="sm"
          variant={view === "" ? "default" : "outline"}
          className="w-full sm:w-[170px] h-[8px] px-0 rounded-full"
          onClick={() => setView("")}
          disabled={!!detail?.paidDate}
        ></Button>
        <Button
          size="sm"
          variant={view === "info" ? "default" : "outline"}
          className="w-full sm:w-[170px] h-[8px] px-0 rounded-full"
          onClick={() => validateProduct(() => setView("info"))}
          disabled={!!detail?.paidDate}
        ></Button>
        <Button
          size="sm"
          variant={view === "payment" ? "default" : "outline"}
          className="w-full sm:w-[170px] h-[8px] px-0 rounded-full"
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
        ></Button>
      </div>
    </div>
  );
};

export default Steps;
