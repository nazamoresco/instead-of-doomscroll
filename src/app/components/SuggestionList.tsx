"use client";
import { useAccount } from "jazz-tools/react";
import { Account } from "../schema";
import { Image } from "jazz-tools/react";
import { useState, useEffect } from "react";

export function SuggestionList() {
  const { me } = useAccount(Account, {
    resolve: { root: { suggestions: true } },
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const suggestions = me?.root.suggestions.filter(Boolean);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentIndex((prevIndex) =>
          suggestions ? (prevIndex + 1) % suggestions.length : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestions]);

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const suggestion = suggestions[currentIndex];

  return (
    <ul className="mt-8">
      {suggestion && (
        <li key={suggestion.$jazz.id}>
          {suggestion.title}
          {suggestion.doodle && (
            <Image
              imageId={suggestion.doodle.$jazz.id}
              alt="Profile"
              width={512}
            />
          )}
        </li>
      )}
    </ul>
  );
}
