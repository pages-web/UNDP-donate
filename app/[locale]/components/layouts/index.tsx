import NavbarTop from "./navbar-top";

import { getConfig } from "../../../../sdk/queries/auth";
import Footer from "./footer";

import React from "react";

export const revalidate = 300;

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = async ({ children }: DefaultLayoutProps) => {
  const { config } = await getConfig();
  const logo = config?.uiOptions?.logo || "/images/default-logo.png";

  return (
    <div className=" py-5 flex flex-col gap-5 bg-[#EBEBEB] pb-20">
      <div className="px-[30px]">
        <NavbarTop logo={logo} />
      </div>

      {children}
      <div className="px-[30px]">
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
