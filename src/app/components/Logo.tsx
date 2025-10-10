import React from "react";
import { ReactSVG } from "react-svg";

export function Logo({ className }: { className?: string }) {
  return <ReactSVG src="/logo.svg" className={className} />;
}
