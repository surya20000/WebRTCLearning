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
