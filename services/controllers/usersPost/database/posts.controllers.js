import Posts from "../../../models/Post.schema.js";

export const createPost = async (req, res) => {
  try {
    await Posts.create(req.body);
    const allPosts = await Posts.find({});
    res.status(201).json({ posts: allPosts });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find({}).populate("createdBy");
    res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPost = await Posts.findByIdAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("createdBy");
    if (!foundPost) {
      res
        .status(204)
        .json({ message: "Invalid Request Or the Post is Not Present" });
      return;
    }
    res.status(200).json({ posts: foundPost });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPost = await Posts.findByIdAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true }
    ).populate("createdBy");
    if (!foundPost) {
      res
        .status(204)
        .json({ message: "Invalid Request Or the Post is Not Present" });
      return;
    }
    res.status(200).json({ posts: foundPost });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};
