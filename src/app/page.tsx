import Image from "next/image";
import { SuggestionForm } from "./components/SuggestionForm";
import { SuggestionList } from "./components/SuggestionList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={640}
          height={510}
          priority
        />
        <SuggestionForm />
        <SuggestionList />
      </main>
    </div>
  );
}
