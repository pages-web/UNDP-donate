import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../app/[locale]/components/ui/alert";
import { Button } from "../../app/[locale]/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../app/[locale]/components/ui/form";
import { LoadingIcon } from "../../app/[locale]/components/ui/loading";
import { emailZod } from "../../lib/zod";
import { currentUserAtom } from "../../store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import { InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../app/[locale]/components/ui/input-otp";
import { useTranslations } from "next-intl";
import React from "react";
const formSchema = z.object({
  email: emailZod,
});

const PhoneDetail = ({
  kind,
  loading,
  handleCreate,
  errorDescription,
  data,
}: {
  kind?: string;
  loading: boolean;
  handleCreate: (values: { email: string }) => void;
  errorDescription?: string;
  data: {
    apiResponse: {
      error?: string;
      text?: string;
    };
  };
}) => {
  const { email } = useAtomValue(currentUserAtom) || {};
  const { error, text } = data?.apiResponse || {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: email || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleCreate(values);
  }
  const t = useTranslations();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-12 flex justify-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={8}
                    render={({ slots }) => (
                      <>
                        <InputOTPGroup>
                          {slots.slice(0, 4).map((slot, index) => (
                            <InputOTPSlot
                              key={index}
                              {...slot}
                              className="ring-0"
                            />
                          ))}
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          {slots.slice(4).map((slot, index) => (
                            <InputOTPSlot
                              key={index}
                              {...slot}
                              className="ring-0"
                            />
                          ))}
                        </InputOTPGroup>
                      </>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {(error || errorDescription) && (
          <Alert variant="destructive">
            <InfoIcon className="h-4 w-4 rotate-180" />
            <AlertTitle> {t("Алдааарлаа")} </AlertTitle>
            <AlertDescription className="text-xs">
              {error || errorDescription}
            </AlertDescription>
          </Alert>
        )}
        <div className="pt-4">
          <Button size="lg" className="flex-1 w-full" disabled={loading}>
            {loading && <LoadingIcon />} {t("Хүсэлтээх")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PhoneDetail;
