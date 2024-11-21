import { cn } from "../../../../lib/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { X } from "lucide-react";

export const WebModal = ({}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onClick = () => {
    window.location.href = pathname;
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild></DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[50] bg-black/20" />

        <div className="fixed inset-0 left-0 top-0 z-[50] h-screen w-screen">
          <div className="w-[12vw]">
            <ErxesForm brandId="94ZGAG" formId="eUpBMW" />
          </div>

          <DialogPrimitive.Close
            asChild
            onClick={onClick}
          ></DialogPrimitive.Close>
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
        onCompleted && onCompleted(data); // Амжилттай бөглөсний дараа дуудах
      },
    });
    const id = "erxes-script-" + formId;
    var script = document.createElement("script");
    script.src =
      "https://educated-space-donate.app.erxes.io/widgets/build/formWidget.bundle.js";
    script.async = true;
    const entry = document.getElementsByTagName("script")[0];

    if (entry.parentNode) {
      entry.parentNode.insertBefore(script, entry);
    } else {
      console.error("parentNode is null");
    }

    return () => {
      window.erxesSettings.forms = window.erxesSettings.forms.filter(
        (form: any) => form.form_id !== formId
      );
      const script = document.getElementById(id);
      if (script) {
        script.remove();
      }
      const container = document.getElementById("erxes-container-" + formId);
      if (container) {
        container.remove();
      }
      return;
    };
  }, [brandId, formId, onCompleted]);

  return (
    <div className={cn("erxes-form", className)} {...rest}>
      <div data-erxes-embed={formId}></div>
    </div>
  );
};

export default ErxesForm;
