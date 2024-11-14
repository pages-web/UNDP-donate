import NavbarTop from "./navbar-top";
import React from "react";

import { getConfig } from "../../../../sdk/queries/auth";

export default async function NavbarWrapper(props: any) {
  const { config } = await getConfig();
  const { logo } = config?.uiOptions || {};

  return <NavbarTop logo={logo} {...props} />;
}
