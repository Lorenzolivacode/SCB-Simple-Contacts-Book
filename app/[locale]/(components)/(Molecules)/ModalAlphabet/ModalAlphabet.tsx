import { generateAlphabetArray } from "@/app/[locale]/(function)/useAlphabet";
import Link from "next/link";
import React from "react";

function ModalAlphabet({ onClose }: { onClose: () => void }) {
  const alphabetArray = generateAlphabetArray();

  return (
    <div
      onClick={onClose}
      className="fixed flex-center top-0 left-0 w-full h-full z-i-1000"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-primary-very-dark-0d5 backd-blur-5px z-i--1" />{" "}
      {/* backdrop */}
      <div className="flex-wrap flex-center gap-8px w-full max-w-250px">
        {" "}
        {/* grid */}
        {alphabetArray.map((letter) => (
          <Link
            key={letter}
            href={`#${letter}`}
            className="radius-4px p-4px w-25p bg-primary-sat-medium-light txt-center"
          >
            {letter.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ModalAlphabet;
