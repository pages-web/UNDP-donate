import { Button } from "../../app/[locale]/components/ui/button";
import { LoadingIcon } from "../../app/[locale]/components/ui/loading";
import { useCheckInvoice } from "@/sdk/hooks/payment";
import { toast } from "sonner";
import { getLabel } from "@/lib/utils";
import { useDonate } from "../donate/donate";
import { ArrowLeftIcon } from "lucide-react";
import { useSetAtom } from "jotai";
import { deliveryInfoAtom, donateViewAtom } from "../../store/donate.store";
const CheckPayment = ({ id, disabled }: { id: string; disabled?: boolean }) => {
  const setView = useSetAtom(donateViewAtom);
  const { checkInvoice, loading } = useCheckInvoice();
  const { refetch } = useDonate();
  return (
    <div className="flex items-center gap-5 mt-10 px-4">
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="w-full  bg-white hover:bg-white text-black border border-[#EFEFEF]"
        disabled={loading}
        onClick={() => setView("")}
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2 -ml-2" />
        Back
      </Button>
      <Button
        size="lg"
        className=" w-full text-white rounded-[100px]"
        disabled={disabled || loading}
        onClick={() =>
          checkInvoice({
            variables: { id },
            onCompleted({ invoicesCheck }) {
              toast.info(getLabel(invoicesCheck));
              invoicesCheck === "paid" && refetch();
            },
          })
        }
      >
        {loading && <LoadingIcon />}
        Check payment
      </Button>
    </div>
  );
};

export default CheckPayment;
