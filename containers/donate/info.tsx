"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "../../app/[locale]/components/ui/card";

import { Button } from "../../app/[locale]/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../app/[locale]/components/ui/form";
import { Input } from "../../app/[locale]/components/ui/input";
import { emailZod } from "../../lib/zod";
import { useAtom, useSetAtom } from "jotai";
import { deliveryInfoAtom, donateViewAtom } from "../../store/donate.store";
import { useDonate } from "./donate";
import { LoadingIcon } from "../../app/[locale]/components/ui/loading";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
const formSchema = z.object({
  name: z.string().min(2, { message: "Нэрээ бүтнээр нь оруулана уу" }),
  email: emailZod,
});

const DonateInfo = () => {
  const { loading, action, variables } = useDonate();
  const [deliveryInfo, setDeliveryInfo] = useAtom(deliveryInfoAtom);
  const setView = useSetAtom(donateViewAtom);

  const { description, ...defaultValues } = deliveryInfo;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
  }

  const t = useTranslations();
  return (
    <CardContent className="md:pt-0 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-black"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t("Таныр")} </FormLabel>
                <FormControl>
                  <Input placeholder="Бат" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t("Танэйл")} </FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full text-white"
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
