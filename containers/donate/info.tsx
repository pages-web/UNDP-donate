import React, { useState, useEffect } from "react";
import { CardContent } from "../../app/[locale]/components/ui/card";
import ErxesFormMn from "../../app/[locale]/components/modals/WebModal";

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
import { Form } from "@/app/[locale]/components/ui/form";
import { LoadingIcon } from "@/app/[locale]/components/ui/loading";

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

  return (
    <CardContent className="md:pt-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* <ErxesFormMn
            className="w-full"
            formId="eUpBMW"
            brandId="94ZGAG"
            onCompleted={onErxesFormCompleted}
          /> */}
          <div className="flex items-center gap-5">
            <Button
              type="button"
              size="lg"
              className="w-full  bg-white hover:bg-white"
              disabled={loading}
              onClick={() => setView("")}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2 -ml-2 " />
              {t("Буцах")}
            </Button>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-[100px] text-white font-normal"
              disabled={loading}
            >
              {loading && <LoadingIcon />}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default DonateInfo;
