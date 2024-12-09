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
import { phoneZod, emailZod } from "@/lib/zod";
import { useAtom, useSetAtom } from "jotai";
import { deliveryInfoAtom, donateViewAtom } from "@/store/donate.store";
import { useDonate } from "./donate";
import { LoadingIcon } from "../../app/[locale]/components/ui/loading";
import { ArrowLeftIcon } from "lucide-react";
import useCreateCustomer from "../../sdk/graphql/mutations/customers";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "required",
  }),
  primaryPhone: phoneZod,
  primaryEmail: emailZod,
});

const DonateInfo = () => {
  const {
    loading: creatingCustomer,
    createCustomer,
    _id: customerId,
  } = useCreateCustomer();
  const { loading: processingOrder, action, variables } = useDonate();
  const [deliveryInfo, setDeliveryInfo] = useAtom(deliveryInfoAtom);
  const setView = useSetAtom(donateViewAtom);

  const { description, ...defaultValues } = deliveryInfo;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Create customer
      const customerData = await createCustomer({
        variables: {
          firstName: values.firstName,
          primaryPhone: values.primaryPhone,
          primaryEmail: values.primaryEmail,
        },
      });

      const newCustomerId = customerData?.data?.customersAdd?._id;

      // Prepare description and order data
      const description = `${values.firstName} ${values.primaryPhone} ${values.primaryEmail}`;

      setDeliveryInfo({ ...values, description });

      // Proceed with the order action
      action({
        variables: {
          ...variables,
          description,
          deliveryInfo: {
            ...values,
            description,
          },
          customerId: newCustomerId,
        },
      });
    } catch (error) {
      console.error("Error creating customer or processing order:", error);
    }
  }

  return (
    <CardContent className="md:pt-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="firstName"
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
            name="primaryPhone"
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
            name="primaryEmail"
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
              disabled={creatingCustomer || processingOrder}
              onClick={() => setView("")}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2 -ml-2" />
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-[32px] text-white"
              disabled={creatingCustomer || processingOrder}
            >
              {(creatingCustomer || processingOrder) && <LoadingIcon />}
              Үргэлжлүүлэх
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default DonateInfo;
