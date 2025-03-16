import type { SVGProps } from "react";
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#FF6200"
      d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5a9.9 9.9 0 0 1-3.9-.775 10.3 10.3 0 0 1-3.175-2.15q-1.35-1.35-2.15-3.175A9.9 9.9 0 0 1 2 12q0-2.075.775-3.9a10.3 10.3 0 0 1 2.15-3.175Q6.275 3.575 8.1 2.8A9.6 9.6 0 0 1 12 2q2.075 0 3.9.8a9.9 9.9 0 0 1 3.175 2.125q1.35 1.35 2.125 3.175.8 1.826.8 3.9a9.6 9.6 0 0 1-.8 3.9 9.9 9.9 0 0 1-2.125 3.175q-1.35 1.35-3.175 2.15A9.9 9.9 0 0 1 12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4 6.325 6.325 4 12t2.325 5.675T12 20"
    />
  </svg>
);
export default SvgPlus;
