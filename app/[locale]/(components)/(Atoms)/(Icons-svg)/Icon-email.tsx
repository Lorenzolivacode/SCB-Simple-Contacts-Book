import React from "react";

interface EmailProps {
  width?: number;
  height?: number;
  fill?: string;
}
function IconEmail({
  width = 20,
  height = width,
  fill = "#ffffff",
}: EmailProps) {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      fill={fill}
      version="1.1"
      id="Livello_1"
      xmlns="http://www.w3.org/2000/svg"
      /* xmlns:xlink="http://www.w3.org/1999/xlink" */ x="0px"
      y="0px"
      viewBox="0 0 100 100" /* style="enable-background:new 0 0 100 100;" */ /* xml:space="preserve" */
    >
      <g>
        <path
          d="M57.5,50.1c0.2-0.7,0.3-1.6,0.3-2.6c0-3.6-1.8-5.4-5.4-5.4c-2.2,0-4.2,0.8-5.9,2.5c-1.7,1.7-2.5,3.6-2.5,5.8
		c0,2.8,0.6,4.5,2.6,6.4c0.8,0.8,1.6,1.8,1.5,2.9l-2,8.6c-0.4,1.5-1.5,2.6-3.1,2.6l-0.9,0c-5,0-9-1.4-11.9-4.3
		c-3-2.9-4.5-6.8-4.5-11.7c0-8,3-14.9,9-20.8c6-5.9,13-8.9,21.2-8.9c5.8,0,10.5,1.5,14.1,4.4c3.5,2.9,5.3,6.7,5.3,11.5
		c0,2-0.3,4.1-0.9,6.5l-2.1,8.1l-0.4,1.4c-0.4,1.3-0.5,2.4-0.5,3.3c0,2.1,1,3.2,3,3.2c3.1,0,6-2.2,8.5-6.5c2.6-4.3,3.9-9.1,3.9-14.4
		c0-8.9-3.2-16.1-9.5-21.6c-6.4-5.5-14.7-8.3-24.9-8.3c-11,0-20.1,3.6-27.3,10.8C17.9,30.9,14.3,40,14.3,51c0,9.5,2.8,17.5,8.4,24.1
		c6.8,8,17.4,12,31.7,12c7,0,14.1-1.1,21.4-3.3c1.9-0.6,4,0.6,4.5,2.5l0.9,3.6c0.5,1.8-0.6,3.6-2.4,4.1c-7.7,2.2-15.9,3.3-24.7,3.3
		c-17.2,0-30.4-5-39.6-15c-8-8.6-12-19.2-12-31.6c0-13.7,4.7-25.1,14.2-34.4S38,2.6,51.9,2.6c13.1,0,24,3.8,32.6,11.4
		c8.6,7.6,12.9,17.2,12.9,28.8c0,8.8-2.7,16.1-8.2,21.9c-5.5,5.8-12.3,8.7-20.6,8.7c-4.4,0-7.9-0.8-10.6-2.4c-2.6-1.6-4-3.7-4-6.4
		c0-1.2,0.3-2.9,0.8-4.8L57.5,50.1z"
        />
      </g>
    </svg>
  );
}

export default IconEmail;
