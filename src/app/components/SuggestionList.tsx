"use client";
import { useAccount } from "jazz-tools/react";
import { Account } from "../schema";

export function SuggestionList() {
  const { me } = useAccount(Account, { resolve: { root: { suggestions: true } } });

  return (
    <ul className="mt-8">
      {me?.root.suggestions.map((suggestion) => (
        suggestion && <li key={suggestion.$jazz.id}>{suggestion.title}</li>
      ))}
    </ul>
  );
}
