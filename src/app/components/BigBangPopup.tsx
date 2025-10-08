"use client";
import { useAccount } from "jazz-tools/react";
import { Account } from "../schema";

interface BigBangPopupProps {
  onHide: () => void;
  suggestionListIdSet: boolean;
}

export function BigBangPopup({ onHide, suggestionListIdSet }: BigBangPopupProps) {
  const { me } = useAccount(Account);
  const isAdmin = !!me;
  const canHide = isAdmin && !suggestionListIdSet;

  return (
    <div className="fixed top-10 left-10 bg-yellow-200 dark:bg-yellow-800 p-4 rounded-lg shadow-lg z-20">
      <h2 className="text-xl font-bold">Big Bang</h2>
      <p>This is the Big Bang popup for admins.</p>
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