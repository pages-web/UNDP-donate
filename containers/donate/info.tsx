import React, { useState, useEffect } from "react";
import { CardContent } from "../../app/[locale]/components/ui/card";
import ErxesForm from "../../app/[locale]/components/modals/WebModal";
import { Button } from "../../app/[locale]/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDonate } from "./donate";
import { deliveryInfoAtom, donateViewAtom } from "../../store/donate.store";
import { useAtom, useSetAtom } from "jotai";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailZod } from "../../lib/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Нэрээ бүтнээр нь оруулана уу" }),
  email: emailZod,
});

const DonateInfo: React.FC = () => {
  const [deliveryInfo, setDeliveryInfo] = useAtom(deliveryInfoAtom);
  const { loading, action, variables } = useDonate();
  const setView = useSetAtom(donateViewAtom);
  const t = useTranslations();
  const { description, ...defaultValues } = deliveryInfo;

  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onErxesFormCompleted = (data: any) => {
    if (data?.status !== "ERROR") {
      const newDescription = `${data.name} ${data.email}`;
      setDeliveryInfo({ ...data, description: newDescription });
      setIsLoading(false);
      setView("payment");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newDescription = `${values.name} ${values.email}`;
    setDeliveryInfo({ ...values, description: newDescription });

    action({
      variables: {
        ...variables,
        description: newDescription,
        deliveryInfo: { ...values, description: newDescription },
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CardContent className="md:pt-0">
      <ErxesForm
        className="w-full"
        formId="El15ya"
        brandId="g_CB_U"
        onCompleted={onErxesFormCompleted}
      />

      <div className="flex items-center gap-4 mt-4 md:mt-10 ">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full md:w-full bg-white hover:bg-white text-black border border-[#EFEFEF]"
          disabled={loading}
          onClick={() => setView("")}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 -ml-2" />
          Back
        </Button>
      </div>
    </CardContent>
  );
};

export default DonateInfo;
