import React from "react";
import { Tabs, TabsContent } from "../../components/ui/tabs";
import Donate from "../../../../containers/donate/donate";

import { useTranslations } from "next-intl";

const Tsahim = ({ products }: any) => {
  const t = useTranslations();

  return (
    <Tabs defaultValue="qpay" className="">
      <TabsContent value="qpay">
        <Donate products={products} />
      </TabsContent>
    </Tabs>
  );
};

export default Tsahim;
