'use client';
import { Logo } from './components/Logo';
import { SuggestionForm } from "./components/SuggestionForm";
import { SuggestionList } from "./components/SuggestionList";
import { useState } from 'react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center">
        <div className="absolute top-0 left-0 m-4">
          <Logo />
        </div>
        <div className="absolute top-0 right-0 m-4">
          <button onClick={() => setShowForm(!showForm)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        {showForm && <SuggestionForm />}
        <SuggestionList />
      </main>
    </div>
  );
}
