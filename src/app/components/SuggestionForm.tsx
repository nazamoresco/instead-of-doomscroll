"use client";
import { useState } from "react";
import { useAccount } from "jazz-tools/react";
import { Account, Suggestion } from "../schema";

export function SuggestionForm() {
  const { me } = useAccount(Account, { resolve: { root: { suggestions: true } } });
  const [newSuggestion, setNewSuggestion] = useState("");

  const handleAddSuggestion = () => {
    if (!me) return; // not loaded yet
    if (newSuggestion.trim() !== "") {
      me.root.suggestions.$jazz.push({ title: newSuggestion });
      setNewSuggestion("");
    }
  };

  return (
    <div className="mt-8">
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
    </div>
  );
}
