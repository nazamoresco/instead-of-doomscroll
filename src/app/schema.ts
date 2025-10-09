import { co, z } from "jazz-tools";

const Suggestion = co.map({
  title: z.string(),
  doodle: co.optional(co.image()),
  deleted: z.boolean().default(false)
});

export type Suggestion = co.loaded<typeof Suggestion>;

export const SuggestionFeed = co.feed(Suggestion);

export const AccountRoot = co.map({
  suggestions: SuggestionFeed,
});

export const Account = co
  .account({
    root: AccountRoot,
    profile: co.profile(),
  })
  .withMigration((account) => {
    if (!account.$jazz.has('root')) {
      account.$jazz.set('root', {
        suggestions: [],
      });
    }
  });