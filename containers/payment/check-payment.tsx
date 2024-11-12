import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import { useCheckInvoice } from "@/sdk/hooks/payment";
import { toast } from "sonner";
import { getLabel } from "@/lib/utils";
import { useDonate } from "../donate/donate";

const CheckPayment = ({ id, disabled }: { id: string; disabled?: boolean }) => {
  const { checkInvoice, loading } = useCheckInvoice();
  const { refetch } = useDonate();
  return (
    <Button
      size="lg"
      className="flex-1 w-full absolute bottom-1 left-0"
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
      Төлбөр шалгах
    </Button>
  );
};

export default CheckPayment;
