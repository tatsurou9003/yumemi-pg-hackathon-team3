import type { SVGProps } from "react";
const SvgPaperClip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g clipPath="url(#paper-clip_svg__a)">
      <path
        stroke="#F5F5F5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="m14.293 7.367-6.126 6.126a4.002 4.002 0 1 1-5.66-5.66l6.126-6.126a2.668 2.668 0 1 1 3.774 3.773l-6.134 6.127A1.334 1.334 0 0 1 4.387 9.72l5.66-5.653"
      />
    </g>
    <defs>
      <clipPath id="paper-clip_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPaperClip;
