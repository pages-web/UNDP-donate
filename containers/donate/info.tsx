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
import Lottie from "lottie-react";
import LoadingAnimation from "../../public/loadingAnimation.json";

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
    const newDescription = `${data.name} ${data.email}`;
    setDeliveryInfo({ ...data, description: newDescription });
    setIsLoading(false);
    setView("payment");
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
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Lottie
            animationData={LoadingAnimation}
            loop
            autoplay
            className="w-48 h-48"
          />
        </div>
      ) : (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-black"
          >
            <ErxesForm
              className="w-full"
              formId="eUpBMW"
              brandId="94ZGAG"
              onCompleted={onErxesFormCompleted}
            />
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full !mt-4"
              disabled={loading}
              onClick={() => setView("")}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2 -ml-2" />
              {t("Буцах")}
            </Button>
          </form>
        </FormProvider>
      )}
    </CardContent>
  );
};

export default DonateInfo;
