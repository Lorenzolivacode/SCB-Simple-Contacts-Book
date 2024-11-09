import React from "react";

interface DetailsProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}
function IconDetailsList({
  width = 25,
  height = width,
  stroke = "#ffd46b",
}: DetailsProps) {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5H21"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M11 9H16"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <rect
        height="4"
        rx="1"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        width="4"
        x="3"
        y="5"
      />
      <path
        d="M11 15H21"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M11 19H16"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <rect
        height="4"
        rx="1"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        width="4"
        x="3"
        y="15"
      />
    </svg>
  );
}

export default IconDetailsList;
