"use client";
import { useCoStateWithSelector } from "jazz-tools/react";
import { Image } from "jazz-tools/react";
import { useState, useEffect } from "react";
import { Suggestion, SuggestionFeed } from "../schema";

export function SuggestionList() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const suggestions = useCoStateWithSelector(SuggestionFeed, process.env.NEXT_PUBLIC_SUGGESTION_LIST_ID, {
    resolve: true,
    select: (suggestionFeed) => {
      if (!suggestionFeed) return [];
  
      return Object.values(suggestionFeed?.perSession ?? {})
        .map(item => item.value)
        .filter(suggestion => !!suggestion && !suggestion.deleted);
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentIndex((prevIndex) => {
          if (!suggestions || suggestions.length === 0) return 0;
          return (prevIndex + 1) % suggestions.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestions]);

  const onDelete = (suggestion: Suggestion) => {
    suggestion.$jazz.set("deleted", true);
    setCurrentIndex((prevIndex) => {
      if (!suggestions || suggestions.length < 2) return 0;
      return prevIndex % (suggestions.length - 1);
    });
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const suggestion = suggestions[currentIndex];
  
  return suggestion && (
    <div key={suggestion.$jazz.id}>
      {suggestion.doodle && (
        <Image
          imageId={suggestion.doodle.$jazz.id}
          alt="Profile"
          width={512}
        />
      )}
      <button onClick={() => onDelete(suggestion)}>Delete</button>
      <p className="text-center text-xl"> {suggestion.title} </p>
      <p className="text-center text-xs mt-2 text-zinc-400 dark:text-zinc-600"> Click or press the right arrow key to see next! </p>
    </div>
  );
}
