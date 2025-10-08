"use client";
import { useAccount } from "jazz-tools/react";
import { Account } from "../schema";
import { createSingletonSuggestionList } from "../lib/createSingletonSuggestionList";

interface BigBangPopupProps {
  onHide: () => void;
  suggestionListIdSet: boolean;
}

export function BigBangPopup({ onHide, suggestionListIdSet }: BigBangPopupProps) {
  const { me } = useAccount(Account);
  const isAdmin = !!me;
  const canHide = isAdmin && !suggestionListIdSet;

  const handleBigBang = () => {
    createSingletonSuggestionList();

    if (canHide) {
      onHide();
    }
  };

  return (
    <div className="fixed top-10 left-10 bg-yellow-200 dark:bg-yellow-800 p-4 rounded-lg shadow-lg z-20">
      <h2 className="text-xl font-bold">Big Bang</h2>
      <p>Create initial Suggestion List</p>
      <button
        onClick={handleBigBang}
        className="mt-2 bg-blue-500 text-white p-2 rounded mr-2"
      >
        Big Bang!
      </button>
      {canHide && (
        <button
          onClick={onHide}
          className="mt-2 bg-red-500 text-white p-2 rounded"
        >
          Hide
        </button>
      )}
    </div>
  );
}