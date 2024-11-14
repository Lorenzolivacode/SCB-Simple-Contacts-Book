"use client";
import React, { useEffect, useState } from "react";
import Jumper from "../../(Atoms)/Jumper/Jumper";

function LoadingComponent() {
  const [label, setLabel] = useState(" ");

  useEffect(() => {
    const interval = setInterval(() => {
      setLabel((prevLabel) => {
        if (prevLabel === " ...") {
          return " ";
        } else {
          return prevLabel + ".";
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-center flex-column w-full">
      <Jumper />
      <h1 className="txt-start">{`Loading${label}`}</h1>
    </div>
  );
}

export default LoadingComponent;
