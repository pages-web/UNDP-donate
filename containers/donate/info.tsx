import React from "react";
import { CardContent } from "../../app/[locale]/components/ui/card";
import ErxesForm from "../../app/[locale]/components/modals/WebModal";
import { Button } from "@/app/[locale]/components/ui/button";
import { LoadingIcon } from "@/app/[locale]/components/ui/loading";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDonate } from "./donate";
import { deliveryInfoAtom, donateViewAtom } from "../../store/donate.store";
import { useAtom, useSetAtom } from "jotai";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import { emailZod } from "@/lib/zod";
import { z } from "zod";
import { Form } from "@/app/[locale]/components/ui/form";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Нэрээ бүтнээр нь оруулана уу" }),
  email: emailZod,
});

// Main component
const DonateInfo: React.FC = () => {
  const [deliveryInfo, setDeliveryInfo] = useAtom(deliveryInfoAtom);
  const { loading, action, variables } = useDonate();
  const setView = useSetAtom(donateViewAtom);
  const t = useTranslations();
  const { description, ...defaultValues } = deliveryInfo;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onErxesFormCompleted = (data: any) => {
    const newDescription = `${data.name} ${data.email}`;
    setDeliveryInfo({ ...data, description: newDescription });
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

  return (
    <CardContent className="md:pt-0">
      <FormProvider {...form}>
        {" "}
        {/* Wrap with FormProvider */}
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
      </FormProvider>{" "}
      {/* End of FormProvider */}
    </CardContent>
  );
};

export default DonateInfo;
