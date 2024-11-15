"use client";

import ProgressBar from "nextjs-progressbar";

type Props = { children?: React.ReactNode };

const ProgressProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <ProgressBar color="#00bfff" options={{ showSpinner: true }} />
    </>
  );
};

export default ProgressProvider;
