"use client";
import { useCoState } from "jazz-tools/react";
import { Image } from "jazz-tools/react";
import { useState, useEffect } from "react";
import { SuggestionList as SuggestionListSchema } from "../schema";

export function SuggestionList() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const suggestionFeed = useCoState(SuggestionListSchema, process.env.NEXT_PUBLIC_SUGGESTION_LIST_ID, {
    resolve: true
  });

  const suggestions = Array.from(suggestionFeed?.inCurrentSession?.all || []);

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

  const suggestion = suggestions[currentIndex]?.value;

  return suggestion && (
    <div key={suggestion.$jazz.id}>
      {suggestion.doodle && (
        <Image
          imageId={suggestion.doodle.$jazz.id}
          alt="Profile"
          width={512}
        />
      )}
      <p className="text-center text-xl"> {suggestion.title} </p>
      <p className="text-center text-xs mt-2 text-zinc-400 dark:text-zinc-600"> Click or press the right arrow key to see next! </p>
    </div>
  );
}
