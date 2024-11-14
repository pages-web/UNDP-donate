import { Button } from "../../app/[locale]/components/ui/button";
import { LoadingIcon } from "../../app/[locale]/components/ui/loading";
import { useCheckInvoice } from "../../sdk/hooks/payment";
import { toast } from "sonner";
import { getLabel } from "../../lib/utils";
import { useDonate } from "../donate/donate";
import { useTranslations } from "next-intl";
import React from "react";
const CheckPayment = ({ id, disabled }: { id: string; disabled?: boolean }) => {
  const { checkInvoice, loading } = useCheckInvoice();
  const { refetch } = useDonate();
  const t = useTranslations();
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
      {t("Төлбөршалгах")}
    </Button>
  );
};

export default CheckPayment;
