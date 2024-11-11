import React from "react";

interface SearchProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}
function IconSearch({
  width = 20,
  height = width,
  fill = "#a78960",
  stroke = "#ffd46b",
}: SearchProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconSearch;
