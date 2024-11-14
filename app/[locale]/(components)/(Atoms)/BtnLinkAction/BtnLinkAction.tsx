import Link from "next/link";
import React from "react";

interface BtnProps {
  contact: string;
  label: string;
}
function BtnLinkAction({ contact, label }: BtnProps) {
  return (
    <Link
      rel="noopener noreferrer"
      target="_blank"
      href={contact}
      className="grow-1 txt-center bg-primary-sat-medium-light p-4px radius-4px max-w-220px hover-transition-40ms-easyin hover-active-scale-98 hover-active-opacity-85"
    >
      {label}
    </Link>
  );
}

export default BtnLinkAction;
