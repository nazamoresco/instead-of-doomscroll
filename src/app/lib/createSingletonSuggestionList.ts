import { SuggestionList } from '../schema';
import { Group } from 'jazz-tools';

export const createSingletonSuggestionList = () => {
  const group = Group.create();
  group.addMember("everyone", "writeOnly");
  group.makePublic("reader");

  const newList = SuggestionList.create([], group);
  console.log("New SuggestionList ID:", newList.$jazz.id);
  process.env.NEXT_PUBLIC_SUGGESTION_LIST_ID = newList.$jazz.id;
};
