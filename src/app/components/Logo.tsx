import React from "react";
import Image from "next/image";

export function Logo() {
  return <Image src="/logo.svg" alt="Logo" width={640} height={510} priority />;
}
  