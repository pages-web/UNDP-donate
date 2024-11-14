import { Button } from "../../app/[locale]/components/ui/button";
import { handleMethodAtom } from "@/store/payment.store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

const BackButton = ({ disabled }: { disabled?: boolean }) => {
  const handleMethod = useSetAtom(handleMethodAtom);
  const t = useTranslations();
  return (
    <Button
      size="lg"
      variant={"outline"}
      className="flex-1 w-full"
      onClick={() => handleMethod("")}
      disabled={disabled}
      type="button"
    >
      {t("Буцах")}
    </Button>
  );
};

export default BackButton;
