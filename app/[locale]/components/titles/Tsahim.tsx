"use client";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Donate from "../../../../containers/donate/donate";
import Copy from "../../copy";
import { useTranslations } from "next-intl";

const Tsahim = ({ products }: any) => {
  const t = useTranslations();

  return (
    <Tabs defaultValue="qpay">
      <TabsList className="grid grid-cols-2 mx-4 mt-4">
        <TabsTrigger value="qpay">{t("Цахимаар")}</TabsTrigger>
        <TabsTrigger value="account">{t("Хандивынданс")}</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 space-y-4 pb-8">
        <Copy />
      </TabsContent>
      <TabsContent value="qpay">
        <Donate products={products} />
      </TabsContent>
    </Tabs>
  );
};

export default Tsahim;
