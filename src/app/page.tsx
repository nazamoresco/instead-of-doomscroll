'use client';
import { Logo } from './components/Logo';
import { PlusIcon } from './components/PlusIcon';
import { SuggestionForm } from "./components/SuggestionForm";
import { SuggestionList } from "./components/SuggestionList";
import { BigBangPopup } from "./components/BigBangPopup";
import { useState } from 'react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [hidePopup, setHidePopup] = useState(false);

  const suggestionListIdSet = !!process.env.NEXT_PUBLIC_SUGGESTION_LIST_ID;
  const showPopup = (suggestionListIdSet || !hidePopup);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center">
        <Logo className="w-32 h-32 absolute top-0 left-0 m-4" />
        <div className="absolute top-0 right-0 m-4">
          <button onClick={() => setShowForm(!showForm)}>
            <PlusIcon className="w-32 h-32" />
          </button>
        </div>
        {showForm && <SuggestionForm />}
        {showPopup && (
          <BigBangPopup
            onHide={() => setHidePopup(true)}
            suggestionListIdSet={suggestionListIdSet}
          />
        )}
        <SuggestionList />
      </main>
    </div>
  );
}
