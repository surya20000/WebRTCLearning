import Comments from "../../../models/Comments.Schema.js";
import Posts from "../../../models/Post.schema.js";
import User from "../../../models/User.Schema.js";

export const getAllComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comments.find({ postID: id }).populate("userID");
    res.status(200).json({ comments });
  } catch (error) {
    console.log("ran into error", error.message);
    res.status(500).send(error);
  }
};

export const addComment = async (req, res) => {
  try {
    console.log("add comment fun");

    const postID = req.body.postID;

    await Comments.create(req.body);
    await Posts.findByIdAndUpdate({ _id: postID }, { $inc: { comments: 1 } });
    const comments = await Comments.find({ postID }).populate("userID");
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

// export const likeComment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const postID = req.body.currPostID;
//     const userId = req.body.userID;
//     const type = "Comment";
//     const foundComment = await Comments.findByIdAndUpdate(
//       { _id: id },
//       { $inc: { likes: 1 } }
//     );
//     if (!foundComment) {
//       res
//         .send(204)
//         .send("Comment is either deleted or is not available at this moment");
//       return;
//     }
//     await User.findByIdAndUpdate(
//       { _id: userId },
//       {
//         $push: {
//           userLikedPostsAndComments: { itemId: id, itemType: type },
//         },
//       },
//       { new: true }
//     );
//     const comments = await Comments.find({ postID }).populate("userID");
//     res.status(200).json({ comments });
//   } catch (error) {
//     console.log("ran into error2", error.message);
//     res.status(500).send(error);
//   }
// };
