import { SuggestionList } from '../schema';

export const createSingletonSuggestionList = () => {
  const newList = SuggestionList.create([]);
  console.log("New SuggestionList ID:", newList.$jazz.id);
};
