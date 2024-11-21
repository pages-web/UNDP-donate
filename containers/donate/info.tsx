"use client";
import { CardContent } from "../../app/[locale]/components/ui/card";
import ErxesForm from "../../app/[locale]/components/modals/WebModal";
import React from "react";
import { Button } from "@/app/[locale]/components/ui/button";
import { LoadingIcon } from "@/app/[locale]/components/ui/loading";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDonate } from "./donate";
import { deliveryInfoAtom, donateViewAtom } from "../../store/donate.store";
import { useAtom, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailZod } from "@/lib/zod";
import { z } from "zod";
import { Form } from "@/app/[locale]/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Нэрээ бүтнээр нь оруулана уу" }),
  email: emailZod,
});

const DonateInfo = () => {
  const [deliveryInfo, setDeliveryInfo] = useAtom(deliveryInfoAtom);
  const { loading, action, variables } = useDonate();
  const setView = useSetAtom(donateViewAtom);
  const t = useTranslations();
  const { description, ...defaultValues } = deliveryInfo;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const description = `${values.name} ${values.email}`;

    setDeliveryInfo({ ...values, description });

    action({
      variables: {
        ...variables,
        description,
        deliveryInfo: {
          ...values,
          description,
        },
      },
    });
  };

  return (
    <CardContent className="md:pt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-black"
        >
          <ErxesForm className="w-full" formId="eUpBMW" brandId="94ZGAG" />
          <Button
            type="submit"
            size="lg"
            className="w-full text-white mt-4"
            disabled={loading}
          >
            {loading && <LoadingIcon />}
            {t("Үргэлжлүүлэх")}
          </Button>
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
      </Form>
    </CardContent>
  );
};

export default DonateInfo;
