"use client";
import { JazzReactProvider, PasskeyAuthBasicUI } from "jazz-tools/react";
import { Account } from "../schema";

const apiKey = process.env.NEXT_PUBLIC_JAZZ_API_KEY;

export function JazzWrapper({ children }: { children: React.ReactNode }) {
  return (
    <JazzReactProvider
      sync={{ peer: `wss://cloud.jazz.tools/?key=${apiKey}` }}
      AccountSchema={Account}
    >
      <PasskeyAuthBasicUI appName="JazzFest">
        {children}
      </PasskeyAuthBasicUI>

    </JazzReactProvider>
  );
}
