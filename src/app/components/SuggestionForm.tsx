"use client";
import { useRef, useState } from "react";
import { useAccount, useCoState } from "jazz-tools/react";
import { Account, SuggestionFeed } from "../schema";
import { DoodleCanvas, DoodleCanvasRef } from "./DoodleCanvas";
import { createJazzImage } from "../lib/createJazzImage";
import { Group } from "jazz-tools";


export function SuggestionForm() {
  const { me } = useAccount(Account);
  const suggestions = useCoState(SuggestionFeed, process.env.NEXT_PUBLIC_SUGGESTION_LIST_ID);
  const [newSuggestion, setNewSuggestion] = useState("");
  const canvasRef = useRef<DoodleCanvasRef>(null);

  const handleAddSuggestion = async () => {
    if(!me) return;
    if (!suggestions) return;
    if (newSuggestion.trim() === "") return;
    const doodle = await createJazzImage(canvasRef.current, {
      owner: Group.create().makePublic("reader"),
      maxSize: 512,
      progressive: true
    });

    suggestions.$jazz.push({ title: newSuggestion, doodle: doodle, deleted: false,  });
    setNewSuggestion("");
    canvasRef.current?.clear();
  };

  return (
    <div className="fixed bottom-10 right-10 bg-white dark:bg-black p-4 rounded-lg shadow-lg z-10">
      <div className="flex">
        <input
          type="text"
          value={newSuggestion}
          onChange={(e) => setNewSuggestion(e.target.value)}
          placeholder="Enter a new suggestion"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddSuggestion}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Add Suggestion
        </button>
      </div>
      <DoodleCanvas ref={canvasRef} />
    </div>
  );
}
