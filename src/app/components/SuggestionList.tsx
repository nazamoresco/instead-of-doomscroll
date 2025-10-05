"use client";
import { useAccount } from "jazz-tools/react";
import { Account } from "../schema";
import { Image } from "jazz-tools/react";

export function SuggestionList() {
  const { me } = useAccount(Account, { resolve: { root: { suggestions: true } } });

  return (
    <ul className="mt-8">
      {me?.root.suggestions.map((suggestion) => (
        suggestion && (
          <li key={suggestion.$jazz.id}>
            {suggestion.title}
            {suggestion.doodle && (
              <Image imageId={suggestion.doodle.$jazz.id} alt="Profile" width={600} />
            )}
          </li>
        )
      ))}
    </ul>
  );
}
