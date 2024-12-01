import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../app/[locale]/components/ui/alert";
import { BanIcon, InfoIcon } from "lucide-react";
import Image from "../../app/[locale]/components/ui/image";
import { DialogFooter } from "../../app/[locale]/components/ui/dialog";
import { Button } from "../../app/[locale]/components/ui/button";
import { useSetAtom } from "jotai";
import { handleMethodAtom } from "@/store/payment.store";
import BackButton from "./back-button";
import CheckPayment from "./check-payment";
import Link from "next/link";

const getName = (name: string) => {
  if (name === "Trade and Development bank") return "TDB";
  if (name === "National investment bank") return "NIB";
  if (name === "Chinggis khaan bank") return "CKHB";
  return name;
};

const QrDetail = ({
  errorDescription,
  status,
  qrCode,
  id,
  urls,
}: {
  errorDescription?: string;
  status: string;
  qrCode: string;
  id: string;
  urls: { name: string; logo: string; link: string }[];
}) => {
  return (
    <div className="relative w-full">
      <div className="max-h-[60vh] overflow-auto pb-14">
        <QrContainer error={errorDescription}>
          {qrCode ? (
            <img
              src={qrCode}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
              height={256}
              width={256}
              alt=""
            />
          ) : (
            <BanIcon
              className="h-20 w-20 text-input absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
              strokeWidth={1}
            />
          )}
        </QrContainer>
        {!!urls?.length && (
          <div className="pt-4 grid grid-cols-3 gap-4 md:hidden">
            {urls.map((url) => (
              <Button
                className="text-xs flex flex-col gap-1 items-center justify-center px-2 py-3 shadow border border-border/10 h-auto rounded-md"
                variant={"ghost"}
                size="sm"
                asChild
              >
                <Link href={url.link}>
                  <Image
                    src={url.logo}
                    className="h-12 w-12 block rounded-md object-contain"
                    alt=""
                    height={164}
                    width={164}
                  />
                  <span className="h-4 overflow-hidden mt-1 text-neutral-600">
                    {getName(url.name)}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        )}
        <div className="pt-4">
          <CheckPayment id={id} />
        </div>
      </div>
    </div>
  );
};

export const QrContainer = ({
  children,
  loading,
  error,
}: React.PropsWithChildren & { loading?: boolean; error?: string }) => (
  <>
    <div className="">
      <div className="relative aspect-square mx-auto max-w-80">
        <div className=" rounded-lg absolute inset-0"></div>
        <div className="">{children}</div>
      </div>
    </div>
    {error && (
      <Alert variant="destructive">
        <InfoIcon className="h-4 w-4 rotate-180" />
        <AlertTitle>Алдаа гарлаа</AlertTitle>
        <AlertDescription className="text-xs">{error}</AlertDescription>
      </Alert>
    )}
    {loading && (
      <div className="pt-4">
        {/* <BackButton disabled /> */}
        <Button size="lg" className="flex-1 w-full" disabled>
          Төлбөр шалгах
        </Button>
      </div>
    )}
  </>
);

export default QrDetail;
