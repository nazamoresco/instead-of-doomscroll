"use client";
import { useAccount, useCoStateWithSelector } from "jazz-tools/react";
import { useState, useEffect } from "react";
import { Account, Suggestion, SuggestionFeed } from "../schema";
import { SvgImage } from "./SvgImage";

export function SuggestionList() {
  const { me } = useAccount(Account);
  const [currentIndex, setCurrentIndex] = useState(0);

  const suggestions = useCoStateWithSelector(
    SuggestionFeed,
    process.env.NEXT_PUBLIC_SUGGESTION_LIST_ID,
    {
      resolve: true,
      select: (suggestionFeed) => {
        if (!suggestionFeed) return [];

        // TODO: This is clearly not scalable, probably some kind of pagination
        return Object.values(suggestionFeed?.perAccount ?? {})
          .map((item) => Array.from(item.all))
          .flat()
          .map((item) => item && item.value)
          .filter((suggestion) => !!suggestion && !suggestion.deleted);
      },
    },
  );

  const showNextSuggestion = () => {
    setCurrentIndex((prevIndex) => {
      if (!suggestions || suggestions.length === 0) return 0;
      return (prevIndex + 1) % suggestions.length;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        showNextSuggestion();
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
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const suggestion = suggestions[currentIndex];

  return (
    suggestion && (
      <div
        key={suggestion.$jazz.id}
        className="w-full relative"
        onClick={showNextSuggestion}
      >
        {me.canWrite(suggestion) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(suggestion);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center z-10"
          >
            X
          </button>
        )}
        {suggestion.doodle && <SvgImage svg={suggestion.doodle} />}
        <p className="text-center text-xl"> {suggestion.title} </p>
        <p className="text-center text-xs mt-2 text-zinc-400 dark:text-zinc-600">
          Click or press the right arrow key to see next!
        </p>
      </div>
    )
  );
}
