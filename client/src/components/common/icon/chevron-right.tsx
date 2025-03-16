import type { SVGProps } from "react";
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#743E3E"
      d="m9.705 6-1.41 1.41 4.58 4.59-4.58 4.59L9.705 18l6-6z"
    />
  </svg>
);
export default SvgChevronRight;
