import { Logo } from './components/Logo';
import { SuggestionForm } from "./components/SuggestionForm";
import { SuggestionList } from "./components/SuggestionList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center">
        <Logo />
        <SuggestionForm />
        <SuggestionList />
      </main>
    </div>
  );
}
