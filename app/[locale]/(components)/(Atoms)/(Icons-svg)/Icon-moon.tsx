import React from "react";

interface SunProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}
function IconMoon({
  width = 20,
  height = width,
  fill = "#ffd46b",
  stroke = "#ffd46b",
}: SunProps) {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M28.0527 4.41085C22.5828 5.83695 18.5455 10.8106 18.5455 16.7273C18.5455 23.7564 24.2436 29.4545 31.2727 29.4545C37.1894 29.4545 42.1631 25.4172 43.5891 19.9473C43.8585 21.256 44 22.6115 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C25.3885 4 26.744 4.14149 28.0527 4.41085Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconMoon;
