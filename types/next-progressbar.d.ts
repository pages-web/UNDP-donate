declare module "next-progressbar" {
  import { ComponentType } from "react";

  interface NextNProgressProps {
    color?: string;
    startPosition?: number;
    stopDelayMs?: number;
    height?: number;
    showOnShallow?: boolean;
  }

  const NextNProgress: ComponentType<NextNProgressProps>;

  export default NextNProgress;
}
