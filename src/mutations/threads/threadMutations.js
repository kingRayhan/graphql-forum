import isAuthenticated from "../../middlewares/isAuthenticated";
import Thread from "../../models/Thread";

export default {
  createThread(parent, args, { req }) {
    return Thread.create({
      ...args.data,
      author: req.userId,
    });
  },
  updateThread(parent, args) {
    return Thread.findByIdAndUpdate(args._id, args.data, { new: true });
  },
  async deleteThread(parent, args) {
    let query = Thread.findById(args._id);
    let data = await query;
    await query.deleteOne();
    return data;
  },
};
