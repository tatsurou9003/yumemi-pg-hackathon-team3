import type { SVGProps } from "react";
const SvgStarGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 12 11"
    {...props}
  >
    <path
      fill="#757575"
      d="m6 0 1.347 4.146h4.36L8.18 6.708l1.347 4.146L6 8.292l-3.527 2.562L3.82 6.708.294 4.146h4.359z"
    />
  </svg>
);
export default SvgStarGray;
