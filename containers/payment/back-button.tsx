import { Button } from "@/components/ui/button";
import { handleMethodAtom } from "@/store/payment.store";
import { useSetAtom } from "jotai";

const BackButton = ({ disabled }: { disabled?: boolean }) => {
  const handleMethod = useSetAtom(handleMethodAtom);
  return (
    <Button
      size="lg"
      variant={"outline"}
      className="flex-1 w-full"
      onClick={() => handleMethod("")}
      disabled={disabled}
      type="button"
    >
      Буцах
    </Button>
  );
};

export default BackButton;
