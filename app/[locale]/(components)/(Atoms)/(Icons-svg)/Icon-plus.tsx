import React from "react";

interface SunProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}
function IconPlus({ width = 20, height = width, stroke = "#fff" }: SunProps) {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12H18M12 6V18"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconPlus;
