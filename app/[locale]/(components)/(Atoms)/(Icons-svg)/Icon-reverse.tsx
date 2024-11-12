import React from "react";

interface ReverseProps {
  width?: number;
  height?: number;
  fill?: string;
}
function IconReverse({
  width = 20,
  height = width,
  fill = "#fff7cd",
}: ReverseProps) {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(90)"
    >
      <path
        fill={fill}
        d="M17.6,4.2l-4-3a1,1,0,0,0-1.05-.09A.977.977,0,0,0,12,2V4H1A1,1,0,0,0,1,6H12V8a.988.988,0,0,0,.55.89A.99.99,0,0,0,13.6,8.8l4-3a1,1,0,0,0,0-1.6Z"
      />
      <path
        fill={fill}
        d="M.4,12.2l4-3a1,1,0,0,1,1.05-.09A.977.977,0,0,1,6,10v2H17a1,1,0,0,1,0,2H6v2a.988.988,0,0,1-.55.89A.99.99,0,0,1,4.4,16.8l-4-3a1,1,0,0,1,0-1.6Z"
      />
    </svg>
  );
}

export default IconReverse;
