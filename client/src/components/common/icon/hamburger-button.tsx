import * as React from "react";
import type { SVGProps } from "react";

export const HamburgerButton = (
  props: SVGProps<SVGSVGElement>,
): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path fill="#fff" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
    </svg>
  );
};
