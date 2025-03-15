import type { SVGProps } from "react";

const SvgHamburgerButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="#fff" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
  </svg>
);
export default SvgHamburgerButton;
