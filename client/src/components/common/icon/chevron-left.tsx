import type { SVGProps } from "react";
const SvgChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      fill="#fff"
      d="M31.41 14.82 28.59 12l-12 12 12 12 2.82-2.82L22.25 24z"
    />
  </svg>
);
export default SvgChevronLeft;
