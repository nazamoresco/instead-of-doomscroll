import { co, z } from "jazz-tools";

const SuggestionItem = co.map({
  text: z.string(),
});

export const Suggestion = co.map({
  title: z.string(),
  suggestions: co.list(SuggestionItem),
});
