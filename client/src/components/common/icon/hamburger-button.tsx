import type { SVGProps } from "react";

export const HamburgerButton: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
