"use client";
import { hexToHsl } from "../../../../lib/utils";
import { configAtom } from "../../../../store/auth.store";
import { IConfig } from "../../../../types/auth.types";
import { useSetAtom } from "jotai";
import { useLayoutEffect } from "react";
import React from "react";
const ConfigProvider = ({
  children,
  config,
}: React.PropsWithChildren & { config: IConfig }) => {
  const setConfig = useSetAtom(configAtom);
  const { deliveryConfig, erxesAppToken, paymentIds, name, checkRemainder } =
    config || {};

  useLayoutEffect(() => {
    setConfig({
      deliveryConfig,
      erxesAppToken,
      paymentIds,
      name,
      checkRemainder,
    });
  }, []);

  return <>{children}</>;
};

export default ConfigProvider;
