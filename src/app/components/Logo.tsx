import React from "react";
import Image from "next/image";

export function Logo() {
  return <Image src="/logo.svg" alt="Logo" width={128} height={128} priority />;
}
  