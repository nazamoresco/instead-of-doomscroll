import { Logo } from './components/Logo';
import { SuggestionForm } from "./components/SuggestionForm";
import { SuggestionList } from "./components/SuggestionList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center">
        <div className="absolute top-0 left-0 m-4">
          <Logo />
        </div>
        <SuggestionForm />
        <SuggestionList />
      </main>
    </div>
  );
}
