import type { SVGProps } from "react";
const SvgPhotoCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="#000">
      <path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      <path d="M20 5h-3.17l-1.24-1.35A2 2 0 0 0 14.12 3H9.88c-.56 0-1.1.24-1.48.65L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5" />
    </g>
  </svg>
);
export default SvgPhotoCamera;
