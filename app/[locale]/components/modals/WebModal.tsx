import { cn } from "../../../../lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { X } from "lucide-react";

export const WebModalEn = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isFormSubmitted) {
    return null;
  }

  const handleFormCompletion = () => {
    setIsFormSubmitted(true);
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild></DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[50] bg-black/20" />

        <div className="fixed inset-0 left-0 top-0 z-[50] h-screen w-screen">
          <div className="w-[12vw]">
            <ErxesForm
              brandId="g_CB_U"
              formId="El15ya"
              className="w-full text-black"
              onCompleted={handleFormCompletion}
            />
          </div>

          <DialogPrimitive.Close asChild>
            <button className="absolute top-4 right-4 p-2 text-white bg-red-600 rounded-full">
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

const ErxesForm = ({
  brandId,
  formId,
  className,
  onCompleted,
  ...rest
}: {
  brandId: string;
  formId: string;
  className?: string;
  onCompleted?: (event: any) => void;
}) => {
  useEffect(() => {
    window.erxesSettings = { forms: [] };
    window.erxesSettings.forms.push({
      brand_id: brandId,
      form_id: formId,
      onAction: (data: any) => {
        onCompleted && onCompleted(data);
      },
    });

    const id = "erxes-script-" + formId;
    const script = document.createElement("script");
    script.src =
      "https://undp-donate.app.erxes.io/widgets/build/formWidget.bundle.js";
    script.async = true;
    const entry = document.getElementsByTagName("script")[0];

    if (entry.parentNode) {
      entry.parentNode.insertBefore(script, entry);
    } else {
      ("");
    }

    return () => {
      window.erxesSettings.forms = window.erxesSettings.forms.filter(
        (form: any) => form.form_id !== formId
      );
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      const container = document.getElementById("erxes-container-" + formId);
      if (container) {
        container.remove();
      }
    };
  }, [brandId, formId, onCompleted]);

  return (
    <div className={cn("erxes-form", className)} {...rest}>
      <div data-erxes-embed={formId}></div>
    </div>
  );
};

export default ErxesForm;
