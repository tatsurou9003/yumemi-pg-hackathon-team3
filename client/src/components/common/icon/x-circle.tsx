import type { SVGProps } from "react";
const SvgXCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g clipPath="url(#x-circle_svg__a)">
      <path
        stroke="#F5F5F5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="m10 6-4 4m0-4 4 4m4.667-2A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0"
      />
    </g>
    <defs>
      <clipPath id="x-circle_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgXCircle;
