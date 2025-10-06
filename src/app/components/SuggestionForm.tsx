"use client";
import { useRef, useState } from "react";
import { useAccount } from "jazz-tools/react";
import { Account } from "../schema";
import { DoodleCanvas } from "./DoodleCanvas";
import { createJazzImage } from "../lib/createJazzImage";


export function SuggestionForm() {
  const { me } = useAccount(Account, { resolve: { root: { suggestions: true } } });
  const [newSuggestion, setNewSuggestion] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAddSuggestion = async () => {
    if (!me) return; // not loaded yet
    if (newSuggestion.trim() === "") return;
    const doodle = await createJazzImage(canvasRef.current, {
      owner: me.$jazz.owner,
      maxSize: 512,
      progressive: true
    });

    me.root.suggestions.$jazz.push({ title: newSuggestion, doodle: doodle });
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
