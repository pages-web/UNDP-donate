import React, { useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const WebModal: React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const handleClose = () => {
    window.location.href = pathname;
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild />
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[50] bg-black/20" />
        <div className="fixed inset-0 z-[50] flex justify-center items-center">
          <div className="w-[12vw]">
            <ErxesForm brandId="94ZGAG" formId="eUpBMW" />
          </div>
          <DialogPrimitive.Close
            asChild
            onClick={handleClose}
          >
            <button aria-label="Close modal">
              <X />
            </button>
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

declare global {
  interface Window {
    erxesSettings: {
      forms: Array<{
        brand_id: string;
        form_id: string;
        onAction?: (data: any) => void;
      }>;
    };
  }
}

interface ErxesFormProps {
  brandId: string;
  formId: string;
  className?: string;
  onCompleted?: (event: any) => void;
}

const ErxesForm: React.FC<ErxesFormProps> = ({
  brandId,
  formId,
  className,
  onCompleted,
  ...rest
}) => {
  useEffect(() => {
    const setupErxes = () => {
      window.erxesSettings = { forms: [] };
      window.erxesSettings.forms.push({
        brand_id: brandId,
        form_id: formId,
        onAction: (data: any) => {
          if (onCompleted) onCompleted(data);
        },
      });

      const scriptId = `erxes-script-${formId}`;
      const script = document.createElement("script");
      script.src = "https://educated-space-donate.app.erxes.io/widgets/build/formWidget.bundle.js";
      script.async = true;

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(script, firstScriptTag);

      return scriptId;
    };

    const scriptId = setupErxes();

    return () => {
      window.erxesSettings.forms = window.erxesSettings.forms.filter((form) => form.form_id !== formId);
      const script = document.getElementById(scriptId);
      if (script) script.remove();

      const container = document.getElementById(`erxes-container-${formId}`);
      if (container) container.remove();
    };
  }, [brandId, formId, onCompleted]);

  return (
    <div className={cn("erxes-form", className)} {...rest}>
      <div data-erxes-embed={formId} />
    </div>
  );
};

export default ErxesForm;
