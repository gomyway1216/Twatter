import { Context, getUserId } from "../utils";
// import { tweet } from "./Mutation/tweets";

// export default {
//   me(parent, args, ctx: Context, info) => {
//     const id = getUserId(ctx)
//     return ctx.db.query.user({ where: { id } }, info)
//   },

//   feed: async (parent, args, ctx: Context, info) => {
//     console.log({ info })
//     return ctx.db.query.tweets(
//       {
//         ...args
//       },
//       info
//     )
//   },
//   tweet: async (parent, args, ctx: Context, info) => {
//     return ctx.db.query.tweet(
//       {
//         where: {
//           id: args.id
//         }
//       },
//       info
//     );
//   }
// }

export default {
  me: (parent, args, ctx: Context, info) => {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },

  users: (parent, args, ctx: Context, info) => {
    return ctx.db.query.users({}, info);
  },

  feed: async (parent, args, ctx: Context, info) => {
    console.log({ info });
    return ctx.db.query.tweets(
      {
        ...args
      },
      info
    );
  }
};
