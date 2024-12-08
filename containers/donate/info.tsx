"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "../../app/[locale]/components/ui/card";

import { Button } from "../../app/[locale]/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../app/[locale]/components/ui/form";
import { Input } from "../../app/[locale]/components/ui/input";
import { phoneZod } from "@/lib/zod";
import { useAtom, useSetAtom } from "jotai";
import { deliveryInfoAtom, donateViewAtom } from "@/store/donate.store";
import { useDonate } from "./donate";
import { LoadingIcon } from "../../app/[locale]/components/ui/loading";
import { ArrowLeftIcon } from "lucide-react";
import { emailZod } from "@/lib/zod";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "required",
  }),
  phone: phoneZod,
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
    const description = `${values.name} ${values.phone}  ${values.email}`;

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

  return (
    <CardContent className="md:pt-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="+976 **** ****" {...field} />
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
                <FormLabel>Your email</FormLabel>
                <FormControl>
                  <Input placeholder="@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
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
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-[32px] text-white"
              disabled={loading}
            >
              {loading && <LoadingIcon />}
              Үргэлжлүүлэх
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default DonateInfo;
