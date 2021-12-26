import { GLOBAL_COLOR } from "../utils/constants";

export const CartIcon = ({ height, width, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
  >
    <path fill="none" d="M0 0H24V24H0z" />
    <path
      d="M5.5 20c.828 0 1.5.672 1.5 1.5S6.328 23 5.5 23 4 22.328 4 21.5 4.672 20 5.5 20zm13 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM2.172 1.757l3.827 3.828V17L20 17v2H5c-.552 0-1-.448-1-1V6.413L.756 3.172l1.415-1.415zM16 3c.552 0 1 .448 1 1v2h2.993C20.55 6 21 6.456 21 6.995v8.01c0 .55-.45.995-1.007.995H8.007C7.45 16 7 15.544 7 15.005v-8.01C7 6.445 7.45 6 8.007 6h2.992L11 4c0-.552.448-1 1-1h4zm-6 5H9v6h1V8zm6 0h-4v6h4V8zm3 0h-1v6h1V8zm-4-3h-2v1h2V5z"
      fill={fill ? fill : GLOBAL_COLOR}
    />
  </svg>
);

export const FbIcon = ({ height, width, fill, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={height}
    height={width}
    viewBox="0 0 15.1 25"
  >
    <path
      id="Icon_feather-facebook"
      data-name="Icon feather-facebook"
      d="M22.6,3H19.3a5.5,5.5,0,0,0-5.5,5.5v3.3H10.5v4.4h3.3V25h4.4V16.2h3.3l1.1-4.4H18.2V8.5a1.1,1.1,0,0,1,1.1-1.1h3.3Z"
      transform="translate(-9 -1.5)"
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : GLOBAL_COLOR}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    />
  </svg>
);

export const TwitterIcon = ({ height, width, fill, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={height}
    height={width}
    viewBox="0 0 29.973 25.249"
  >
    <path
      id="Icon_feather-twitter"
      data-name="Icon feather-twitter"
      d="M28.473,4.5a13.364,13.364,0,0,1-3.85,1.876,5.493,5.493,0,0,0-9.637,3.678v1.226A13.07,13.07,0,0,1,3.952,5.723s-4.9,11.034,6.13,15.939A14.271,14.271,0,0,1,1.5,24.114c11.034,6.13,24.521,0,24.521-14.1A5.517,5.517,0,0,0,25.923,9a9.465,9.465,0,0,0,2.55-4.5Z"
      transform="translate(0 -2.885)"
      fill={fill ? fill : "none"}
      stroke={stroke ? stroke : GLOBAL_COLOR}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    />
  </svg>
);

export const IgIcon = ({ height, width, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={height}
    height={width}
    viewBox="0 0 22.005 22"
  >
    <path
      id="Icon_awesome-instagram"
      data-name="Icon awesome-instagram"
      d="M11,7.6a5.641,5.641,0,1,0,5.641,5.641A5.632,5.632,0,0,0,11,7.6ZM11,16.9a3.667,3.667,0,1,1,3.667-3.667A3.674,3.674,0,0,1,11,16.9Zm7.187-9.538a1.316,1.316,0,1,1-1.316-1.316A1.313,1.313,0,0,1,18.187,7.366ZM21.922,8.7a6.511,6.511,0,0,0-1.777-4.61,6.554,6.554,0,0,0-4.61-1.777c-1.816-.1-7.261-.1-9.077,0a6.544,6.544,0,0,0-4.61,1.772A6.532,6.532,0,0,0,.072,8.7c-.1,1.816-.1,7.261,0,9.077a6.511,6.511,0,0,0,1.777,4.61,6.562,6.562,0,0,0,4.61,1.777c1.816.1,7.261.1,9.077,0a6.511,6.511,0,0,0,4.61-1.777,6.554,6.554,0,0,0,1.777-4.61c.1-1.816.1-7.256,0-9.072ZM19.576,19.723a3.713,3.713,0,0,1-2.091,2.091c-1.448.574-4.885.442-6.485.442s-5.042.128-6.485-.442a3.713,3.713,0,0,1-2.091-2.091c-.574-1.448-.442-4.885-.442-6.485S1.854,8.2,2.423,6.753A3.713,3.713,0,0,1,4.515,4.662C5.963,4.087,9.4,4.22,11,4.22s5.042-.128,6.485.442a3.713,3.713,0,0,1,2.091,2.091c.574,1.448.442,4.885.442,6.485S20.15,18.279,19.576,19.723Z"
      transform="translate(0.005 -2.238)"
      fill={fill ? fill : GLOBAL_COLOR}
    />
  </svg>
);

export const PlayIcon = ({ height, width, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z"
      fill={fill ? fill : GLOBAL_COLOR}
    />
  </svg>
);

export const ContinueIcon = ({ height, width, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={!width ? "24" : width}
    height={!height ? "24" : height}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4.82-4.924A7 7 0 0 0 9.032 5.658l.975 1.755A5 5 0 0 1 17 12h-3l2.82 5.076zm-1.852 1.266l-.975-1.755A5 5 0 0 1 7 12h3L7.18 6.924a7 7 0 0 0 7.788 11.418z"
      fill={fill ? fill : "rgba(231,76,60,1)"}
    />
  </svg>
);

export const RightArrowIcon = ({ height, width, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ? width : "5"}
    height={height ? height : "7.747"}
    viewBox="0 0 5 7.747"
  >
    <path
      id="Icon_awesome-angle-right"
      data-name="Icon awesome-angle-right"
      d="M6.57,11.032,3.278,14.323a.578.578,0,0,1-.82,0l-.547-.547a.578.578,0,0,1,0-.82l2.333-2.333L1.911,8.289a.578.578,0,0,1,0-.82l.545-.552a.578.578,0,0,1,.82,0l3.292,3.292a.579.579,0,0,1,0,.823Z"
      transform="translate(-1.74 -6.746)"
      fill={fill ? fill : "#d6d5d5"}
    />
  </svg>
);

export const LineIcon = ({ height, width, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ? width : "100%"}
    height={height ? height : "1"}
  >
    <g
      id="Rectangle_37"
      data-name="Rectangle 37"
      fill="#C7C7C7"
      stroke="#C7C7C7"
      strokeWidth="1"
    >
      <rect
        width={width ? width : "100%"}
        height={height ? height : "1"}
        stroke="none"
      />
      <rect x="0.5" y="0.5" width="100%" fill={fill ? fill : "none"} />
    </g>
  </svg>
);
