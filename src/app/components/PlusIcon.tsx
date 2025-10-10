import React from "react";
import { ReactSVG } from "react-svg";

export function PlusIcon({ className }: { className: string }) {
  return <ReactSVG src="/plus.svg" className={className} />;
}
