import Comments from "../../../models/Comments.Schema.js";
import Posts from "../../../models/Post.schema.js";

export const getAllComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comments.find({ postID: id }).populate("userID");
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

export const addComment = async (req, res) => {
  try {
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
