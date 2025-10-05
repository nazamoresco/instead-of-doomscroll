import { co, z } from "jazz-tools";

export const Suggestion = co.map({
  title: z.string(),
  doodle: co.optional(co.image()),
});

export const Suggestions = co.list(Suggestion);

export const AccountRoot = co.map({
  suggestions: Suggestions,
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