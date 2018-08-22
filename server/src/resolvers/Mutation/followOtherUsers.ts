import { Context, getUserId } from "../../utils";
export default {
  follow: async (parent, args, ctx: Context, info) => {
    const id = getUserId(ctx);

    //we need to update "my" ("my" is who the id above is) user record in the database
    //we're going to use the database's "updateUser" function, we need to pass it:
    //1) where: who I am (we use the id from getUserId for this)
    //2) data: what is the "update" to the user's data - in this case the user we're following
    return await ctx.db.mutation.updateUser(
      {
        where: {
          id: id
        },
        data: {
          following: {
            connect: {
              username: args.username
            }
          }
        }
      },
      info
    );
  }
};
