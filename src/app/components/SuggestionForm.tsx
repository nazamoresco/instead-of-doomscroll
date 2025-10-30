"use client";
import { useRef, useState } from "react";
import { useAccount, useCoState } from "jazz-tools/react";
import { Account, Suggestion, SuggestionFeed } from "../schema";
import { DoodleCanvas, DoodleCanvasRef } from "./DoodleCanvas";
import { createJazzImage } from "../lib/createJazzImage";
import { Group } from "jazz-tools";

export function SuggestionForm() {
  const { me } = useAccount(Account);
  const suggestions = useCoState(
    SuggestionFeed,
    process.env.NEXT_PUBLIC_SUGGESTION_LIST_ID,
  );
  const [newSuggestion, setNewSuggestion] = useState("");
  const canvasRef = useRef<DoodleCanvasRef>(null);

  const handleAddSuggestion = async () => {
    if (!me) return;
    if (!suggestions) return;
    if (newSuggestion.trim() === "") return;
    const doodle = await createJazzImage(canvasRef.current, {
      owner: Group.create().makePublic("reader"),
      maxSize: 512,
      progressive: true,
    });

    const suggestion = Suggestion.create({
      title: newSuggestion,
      doodle: doodle,
      deleted: false,
    }, Group.create().makePublic("reader"))

    suggestions.$jazz.push(suggestion);
    setNewSuggestion("");
    canvasRef.current?.clear();
  };

  return (
    <div className="fixed bottom-0 inset-x-0 p-4 bg-white dark:bg-black shadow-lg z-10 md:bottom-10 md:right-10 md:w-auto md:rounded-lg md:inset-x-auto">
      <div className="flex flex-col md:flex-row">
        <input
          type="text"
          value={newSuggestion}
          onChange={(e) => setNewSuggestion(e.target.value)}
          placeholder="Enter a new suggestion"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddSuggestion}
          className="bg-blue-500 text-white p-2 rounded mt-2 w-full md:w-auto md:mt-0 md:ml-2"
        >
          Add Suggestion
        </button>
      </div>
      <DoodleCanvas ref={canvasRef} />
    </div>
  );
}
